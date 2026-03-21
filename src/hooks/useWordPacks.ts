import { useState, useEffect, useCallback } from 'react'
import { WordPackProgress, WordPackState } from '../types/wordPack'
import { VocabularyData } from '../types/vocabulary'

const PACK_KEY = 'englishLearningWordPacks'
const VOCAB_KEY = 'englishLearningVocabulary'

const defaultState: WordPackState = {
  packs: {},
  version: 1
}

function readVocab(): VocabularyData {
  const saved = localStorage.getItem(VOCAB_KEY)
  if (saved) return JSON.parse(saved)
  return { words: {}, version: 2 }
}

export const useWordPacks = () => {
  const [state, setState] = useState<WordPackState>(defaultState)

  useEffect(() => {
    const saved = localStorage.getItem(PACK_KEY)
    if (saved) setState(JSON.parse(saved))
  }, [])

  const save = (newState: WordPackState) => {
    setState(newState)
    localStorage.setItem(PACK_KEY, JSON.stringify(newState))
  }

  const getBaseMasteredCount = useCallback((): number => {
    const vocab = readVocab()
    return Object.values(vocab.words)
      .filter(e => e.level === 'mastered' && !e.packId)
      .length
  }, [])

  const isPackUnlocked = useCallback((packId: string, threshold: number = 2000): boolean => {
    return getBaseMasteredCount() >= threshold
  }, [getBaseMasteredCount])

  const isPackActive = useCallback((packId: string): boolean => {
    return state.packs[packId]?.isActive || false
  }, [state])

  const getPackProgress = useCallback((packId: string): WordPackProgress => {
    return state.packs[packId] || {
      packId,
      isActive: false,
      isUnlocked: false,
      wordsAdded: 0,
      wordsMastered: 0
    }
  }, [state])

  const getActivePacks = useCallback((): string[] => {
    return Object.entries(state.packs)
      .filter(([_, p]) => p.isActive)
      .map(([id]) => id)
  }, [state])

  const activatePack = useCallback((packId: string) => {
    const updated = {
      ...state,
      packs: {
        ...state.packs,
        [packId]: {
          ...getPackProgress(packId),
          isActive: true,
          isUnlocked: true,
          activatedDate: new Date().toISOString().split('T')[0]
        }
      }
    }
    save(updated)
  }, [state, getPackProgress])

  const deactivatePack = useCallback((packId: string) => {
    const updated = {
      ...state,
      packs: {
        ...state.packs,
        [packId]: {
          ...getPackProgress(packId),
          isActive: false
        }
      }
    }
    save(updated)
  }, [state, getPackProgress])

  const updatePackProgress = useCallback((packId: string, wordsAdded: number) => {
    const vocab = readVocab()
    const wordsMastered = Object.values(vocab.words)
      .filter(e => e.packId === packId && e.level === 'mastered')
      .length

    const updated = {
      ...state,
      packs: {
        ...state.packs,
        [packId]: {
          ...getPackProgress(packId),
          wordsAdded,
          wordsMastered
        }
      }
    }
    save(updated)
  }, [state, getPackProgress])

  return {
    packStates: state.packs,
    getBaseMasteredCount,
    isPackUnlocked,
    isPackActive,
    getPackProgress,
    getActivePacks,
    activatePack,
    deactivatePack,
    updatePackProgress
  }
}
