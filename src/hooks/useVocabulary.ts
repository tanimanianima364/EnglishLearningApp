import { useState, useEffect, useCallback } from 'react'
import {
  VocabularyData,
  VocabularyEntry,
  VocabularySource,
  AcquisitionLevel,
  WordEncounter
} from '../types/vocabulary'
import { extractWords, truncateContext, computeLevel } from '../utils/wordExtractor'
import { getWordData } from '../utils/frequencyUtils'
import { Message } from './useConversation'

const STORAGE_KEY = 'englishLearningVocabulary'
const MAX_ENCOUNTERS = 50

const defaultVocabulary: VocabularyData = {
  words: {},
  version: 1
}

function todayStr(): string {
  return new Date().toISOString().split('T')[0]
}

export const useVocabulary = () => {
  const [vocabulary, setVocabulary] = useState<VocabularyData>(defaultVocabulary)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed: VocabularyData = JSON.parse(saved)
      // Recalculate levels on load (handles 30-day staleness) + backfill frequency
      for (const key of Object.keys(parsed.words)) {
        parsed.words[key].level = computeLevel(parsed.words[key])
        if (parsed.words[key].corpusFrequency === undefined) {
          const wd = getWordData(key)
          parsed.words[key].corpusFrequency = wd.rank
          parsed.words[key].isAcademic = wd.isAcademic
          parsed.words[key].isBusiness = wd.isBusiness
        }
      }
      setVocabulary(parsed)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
    }
  }, [])

  const saveVocabulary = (newData: VocabularyData) => {
    setVocabulary(newData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
  }

  const recordWords = useCallback((
    words: string[],
    source: VocabularySource,
    context: string,
    wasCorrectUsage: boolean,
    meanings?: Record<string, string>
  ) => {
    const date = todayStr()
    const ctx = truncateContext(context)

    setVocabulary(prev => {
      const updated = { ...prev, words: { ...prev.words } }

      for (const word of words) {
        const encounter: WordEncounter = { date, source, context: ctx, wasCorrectUsage }
        const existing = updated.words[word]

        if (existing) {
          const encounters = [...existing.encounters, encounter]
          // Cap at MAX_ENCOUNTERS, keeping most recent
          const trimmed = encounters.length > MAX_ENCOUNTERS
            ? encounters.slice(encounters.length - MAX_ENCOUNTERS)
            : encounters

          const entry: VocabularyEntry = {
            ...existing,
            encounters: trimmed,
            lastSeen: date,
            totalCount: existing.totalCount + 1,
            correctCount: existing.correctCount + (wasCorrectUsage ? 1 : 0),
            meaning: meanings?.[word] || existing.meaning,
            level: 'not_acquired' // will be recomputed below
          }
          entry.level = computeLevel(entry)
          updated.words[word] = entry
        } else {
          const wd = getWordData(word)
          const entry: VocabularyEntry = {
            word,
            meaning: meanings?.[word],
            encounters: [encounter],
            firstSeen: date,
            lastSeen: date,
            totalCount: 1,
            correctCount: wasCorrectUsage ? 1 : 0,
            level: 'not_acquired',
            corpusFrequency: wd.rank,
            isAcademic: wd.isAcademic,
            isBusiness: wd.isBusiness
          }
          updated.words[word] = entry
        }
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const recordPronunciation = useCallback((
    targetText: string,
    transcript: string,
    _score: number
  ) => {
    const targetWords = extractWords(targetText)
    const spokenWords = extractWords(transcript)
    const spokenSet = new Set(spokenWords)
    const targetSet = new Set(targetWords)

    // Words user spoke that match target → correct usage
    const correctWords = spokenWords.filter(w => targetSet.has(w))
    if (correctWords.length > 0) {
      recordWords(correctWords, 'pronunciation', targetText, true)
    }

    // Target words user didn't produce → passive encounter
    const missedWords = targetWords.filter(w => !spokenSet.has(w))
    if (missedWords.length > 0) {
      recordWords(missedWords, 'pronunciation', targetText, false)
    }

    // Words user spoke that aren't in target → still active production
    const extraWords = spokenWords.filter(w => !targetSet.has(w))
    if (extraWords.length > 0) {
      recordWords(extraWords, 'pronunciation', transcript, true)
    }
  }, [recordWords])

  const recordListening = useCallback((
    questions: Array<{ id: string; text: string; options: string[]; correctAnswer: number }>,
    _answers: Record<string, number>,
    _score: number
  ) => {
    // All question text and options are passive reading exposure
    for (const q of questions) {
      const allText = [q.text, ...q.options].join(' ')
      const words = extractWords(allText)
      if (words.length > 0) {
        recordWords(words, 'listening', q.text, false)
      }
    }
  }, [recordWords])

  const recordSpeaking = useCallback((
    promptText: string,
    transcript: string
  ) => {
    // Prompt words → passive encounter
    const promptWords = extractWords(promptText)
    if (promptWords.length > 0) {
      recordWords(promptWords, 'speaking', promptText, false)
    }

    // User's spoken words → active production
    const spokenWords = extractWords(transcript)
    if (spokenWords.length > 0) {
      recordWords(spokenWords, 'speaking', transcript, true)
    }
  }, [recordWords])

  const recordConversation = useCallback((
    messages: Message[],
    scenarioVocabulary?: { word: string; meaning: string }[]
  ) => {
    // Build meanings map from scenario vocabulary
    const meanings: Record<string, string> = {}
    if (scenarioVocabulary) {
      for (const v of scenarioVocabulary) {
        // Handle entries like "check / bill"
        const parts = v.word.toLowerCase().split(/\s*\/\s*/)
        for (const part of parts) {
          const trimmed = part.trim()
          if (trimmed) meanings[trimmed] = v.meaning
        }
      }
    }

    for (const msg of messages) {
      const words = extractWords(msg.text)
      if (words.length === 0) continue

      if (msg.sender === 'user') {
        // User messages → active production
        recordWords(words, 'conversation', msg.text, true, meanings)
      } else {
        // AI messages → passive encounter
        recordWords(words, 'conversation', msg.text, false, meanings)
      }
    }
  }, [recordWords])

  const getWordsByLevel = useCallback((level: AcquisitionLevel): VocabularyEntry[] => {
    return Object.values(vocabulary.words)
      .filter(entry => entry.level === level)
      .sort((a, b) => b.lastSeen.localeCompare(a.lastSeen))
  }, [vocabulary])

  const getAllWords = useCallback((): VocabularyEntry[] => {
    return Object.values(vocabulary.words)
      .sort((a, b) => b.lastSeen.localeCompare(a.lastSeen))
  }, [vocabulary])

  const searchWords = useCallback((query: string): VocabularyEntry[] => {
    const lower = query.toLowerCase()
    return Object.values(vocabulary.words)
      .filter(entry => entry.word.includes(lower))
      .sort((a, b) => b.lastSeen.localeCompare(a.lastSeen))
  }, [vocabulary])

  const getStats = useCallback(() => {
    const all = Object.values(vocabulary.words)
    return {
      total: all.length,
      notAcquired: all.filter(w => w.level === 'not_acquired').length,
      learning: all.filter(w => w.level === 'learning').length,
      mastered: all.filter(w => w.level === 'mastered').length
    }
  }, [vocabulary])

  const resetVocabulary = useCallback(() => {
    saveVocabulary(defaultVocabulary)
  }, [])

  return {
    vocabulary,
    recordPronunciation,
    recordListening,
    recordSpeaking,
    recordConversation,
    getWordsByLevel,
    getAllWords,
    searchWords,
    getStats,
    resetVocabulary
  }
}
