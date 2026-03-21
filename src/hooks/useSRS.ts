import { useState, useEffect, useCallback } from 'react'
import { ResponseQuality, FlashcardItem, SessionMode, SRSStats, SRSSettings } from '../types/srs'
import { VocabularyData } from '../types/vocabulary'
import { calculateSRS, buildSessionQueue, getDueCards, getNewCards, initializeSRS } from '../utils/srsAlgorithm'

const VOCAB_KEY = 'englishLearningVocabulary'

function todayStr(): string {
  return new Date().toISOString().split('T')[0]
}

function readVocab(): VocabularyData {
  const saved = localStorage.getItem(VOCAB_KEY)
  if (saved) return JSON.parse(saved)
  return { words: {}, version: 2 }
}

function writeVocab(data: VocabularyData) {
  localStorage.setItem(VOCAB_KEY, JSON.stringify(data))
}

export const useSRS = () => {
  const [settings, setSettings] = useState<SRSSettings>({ dailyNewCardLimit: 20 })
  const [refreshKey, setRefreshKey] = useState(0)

  const refresh = () => setRefreshKey(k => k + 1)

  const getDueCount = useCallback((): number => {
    const vocab = readVocab()
    return getDueCards(vocab, []).length
  }, [refreshKey])

  const getNewCount = useCallback((): number => {
    const vocab = readVocab()
    return getNewCards(vocab, [], 9999).length
  }, [refreshKey])

  const buildQueue = useCallback((mode: SessionMode, activePacks: string[] = []): FlashcardItem[] => {
    const vocab = readVocab()
    return buildSessionQueue(vocab, mode, activePacks, settings.dailyNewCardLimit)
  }, [settings.dailyNewCardLimit, refreshKey])

  const processReview = useCallback((word: string, quality: ResponseQuality) => {
    const vocab = readVocab()
    const entry = vocab.words[word]
    if (!entry) return

    const currentSRS = entry.srs || initializeSRS()
    const result = calculateSRS(
      { easeFactor: currentSRS.easeFactor, interval: currentSRS.interval, repetitions: currentSRS.repetitions },
      quality
    )

    entry.srs = {
      easeFactor: result.easeFactor,
      interval: result.interval,
      repetitions: result.repetitions,
      nextReviewDate: result.nextReviewDate,
      lastReviewDate: todayStr(),
      lastQuality: quality,
      isNewInSRS: false
    }

    // Also record as a flashcard encounter
    entry.encounters = [
      ...entry.encounters.slice(-(49)),
      {
        date: todayStr(),
        source: 'flashcard' as const,
        context: `SRS review: ${quality >= 2 ? 'correct' : 'incorrect'}`,
        wasCorrectUsage: quality >= 2
      }
    ]
    entry.totalCount += 1
    if (quality >= 2) entry.correctCount += 1
    entry.lastSeen = todayStr()

    writeVocab(vocab)
    refresh()
  }, [])

  const initializeWordSRS = useCallback((word: string) => {
    const vocab = readVocab()
    const entry = vocab.words[word]
    if (!entry || entry.srs) return
    entry.srs = initializeSRS()
    writeVocab(vocab)
    refresh()
  }, [])

  const initializePackWords = useCallback((words: { word: string; meaning: string; meaningJa: string }[], packId: string) => {
    const vocab = readVocab()
    const today = todayStr()

    for (const w of words) {
      const key = w.word.toLowerCase()
      if (vocab.words[key]) {
        // Word exists, just add SRS and packId if missing
        if (!vocab.words[key].srs) {
          vocab.words[key].srs = initializeSRS()
        }
        if (!vocab.words[key].packId) {
          vocab.words[key].packId = packId
        }
        if (!vocab.words[key].meaning) {
          vocab.words[key].meaning = `${w.meaning} (${w.meaningJa})`
        }
      } else {
        // Create new entry
        vocab.words[key] = {
          word: key,
          meaning: `${w.meaning} (${w.meaningJa})`,
          encounters: [],
          firstSeen: today,
          lastSeen: today,
          totalCount: 0,
          correctCount: 0,
          level: 'not_acquired',
          srs: initializeSRS(),
          packId
        }
      }
    }

    writeVocab(vocab)
    refresh()
  }, [])

  const getSRSStats = useCallback((): SRSStats => {
    const vocab = readVocab()
    const entries = Object.values(vocab.words).filter(e => e.srs)
    const today = todayStr()

    const dueToday = entries.filter(e => e.srs && !e.srs.isNewInSRS && e.srs.nextReviewDate <= today).length
    const newAvailable = entries.filter(e => e.srs?.isNewInSRS).length
    const easeFactors = entries.filter(e => e.srs && !e.srs.isNewInSRS).map(e => e.srs!.easeFactor)
    const avgEase = easeFactors.length > 0
      ? Math.round((easeFactors.reduce((a, b) => a + b, 0) / easeFactors.length) * 100) / 100
      : 2.5

    return {
      dueToday,
      newAvailable,
      totalInSRS: entries.filter(e => e.srs && !e.srs.isNewInSRS).length,
      averageEaseFactor: avgEase
    }
  }, [refreshKey])

  const updateSettings = useCallback((partial: Partial<SRSSettings>) => {
    setSettings(prev => ({ ...prev, ...partial }))
  }, [])

  return {
    settings,
    getDueCount,
    getNewCount,
    buildQueue,
    processReview,
    initializeWordSRS,
    initializePackWords,
    getSRSStats,
    updateSettings
  }
}
