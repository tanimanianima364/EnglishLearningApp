import { useState, useEffect } from 'react'

interface ProgressData {
  pronunciationScores: number[]
  listeningScores: number[]
  speakingSessionsCompleted: number
  totalTimeSpent: number
  streakDays: number
  lastSessionDate: string
  grammarScores: number[]
  readingScores: number[]
  writingScores: number[]
  dictationScores: number[]
  morphologyScores: number[]
  flashcardScores: number[]
}

const defaultProgress: ProgressData = {
  pronunciationScores: [],
  listeningScores: [],
  speakingSessionsCompleted: 0,
  totalTimeSpent: 0,
  streakDays: 0,
  lastSessionDate: '',
  grammarScores: [],
  readingScores: [],
  writingScores: [],
  dictationScores: [],
  morphologyScores: [],
  flashcardScores: []
}

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressData>(defaultProgress)

  useEffect(() => {
    const savedProgress = localStorage.getItem('englishLearningProgress')
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [])

  const saveProgress = (newProgress: ProgressData) => {
    setProgress(newProgress)
    localStorage.setItem('englishLearningProgress', JSON.stringify(newProgress))
  }

  const addPronunciationScore = (score: number) => {
    const newProgress = {
      ...progress,
      pronunciationScores: [...progress.pronunciationScores, score],
      lastSessionDate: new Date().toISOString().split('T')[0]
    }
    saveProgress(newProgress)
  }

  const addListeningScore = (score: number) => {
    const newProgress = {
      ...progress,
      listeningScores: [...progress.listeningScores, score],
      lastSessionDate: new Date().toISOString().split('T')[0]
    }
    saveProgress(newProgress)
  }

  const addSpeakingSession = (duration: number) => {
    const newProgress = {
      ...progress,
      speakingSessionsCompleted: progress.speakingSessionsCompleted + 1,
      totalTimeSpent: progress.totalTimeSpent + duration,
      lastSessionDate: new Date().toISOString().split('T')[0]
    }
    saveProgress(newProgress)
  }

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    
    if (progress.lastSessionDate === yesterday) {
      const newProgress = {
        ...progress,
        streakDays: progress.streakDays + 1,
        lastSessionDate: today
      }
      saveProgress(newProgress)
    } else if (progress.lastSessionDate !== today) {
      const newProgress = {
        ...progress,
        streakDays: 1,
        lastSessionDate: today
      }
      saveProgress(newProgress)
    }
  }

  const addGrammarScore = (score: number) => {
    const newProgress = {
      ...progress,
      grammarScores: [...(progress.grammarScores || []), score],
      lastSessionDate: new Date().toISOString().split('T')[0]
    }
    saveProgress(newProgress)
  }

  const addReadingScore = (score: number) => {
    const newProgress = {
      ...progress,
      readingScores: [...(progress.readingScores || []), score],
      lastSessionDate: new Date().toISOString().split('T')[0]
    }
    saveProgress(newProgress)
  }

  const addWritingScore = (score: number) => {
    const newProgress = {
      ...progress,
      writingScores: [...(progress.writingScores || []), score],
      lastSessionDate: new Date().toISOString().split('T')[0]
    }
    saveProgress(newProgress)
  }

  const addDictationScore = (score: number) => {
    const newProgress = {
      ...progress,
      dictationScores: [...(progress.dictationScores || []), score],
      lastSessionDate: new Date().toISOString().split('T')[0]
    }
    saveProgress(newProgress)
  }

  const addMorphologyScore = (score: number) => {
    const newProgress = {
      ...progress,
      morphologyScores: [...(progress.morphologyScores || []), score],
      lastSessionDate: new Date().toISOString().split('T')[0]
    }
    saveProgress(newProgress)
  }

  const addFlashcardScore = (score: number) => {
    const newProgress = {
      ...progress,
      flashcardScores: [...(progress.flashcardScores || []), score],
      lastSessionDate: new Date().toISOString().split('T')[0]
    }
    saveProgress(newProgress)
  }

  const getAveragePronunciationScore = () => {
    if (progress.pronunciationScores.length === 0) return 0
    return Math.round(
      progress.pronunciationScores.reduce((sum, score) => sum + score, 0) / progress.pronunciationScores.length
    )
  }

  const getAverageListeningScore = () => {
    if (progress.listeningScores.length === 0) return 0
    return Math.round(
      progress.listeningScores.reduce((sum, score) => sum + score, 0) / progress.listeningScores.length
    )
  }

  const getTotalSessions = () => {
    return progress.pronunciationScores.length + progress.listeningScores.length + progress.speakingSessionsCompleted +
      (progress.grammarScores?.length || 0) + (progress.readingScores?.length || 0) +
      (progress.writingScores?.length || 0) + (progress.dictationScores?.length || 0) +
      (progress.morphologyScores?.length || 0) +
      (progress.flashcardScores?.length || 0)
  }

  const resetProgress = () => {
    saveProgress(defaultProgress)
  }

  return {
    progress,
    addPronunciationScore,
    addListeningScore,
    addSpeakingSession,
    addGrammarScore,
    addReadingScore,
    addWritingScore,
    addDictationScore,
    addMorphologyScore,
    addFlashcardScore,
    updateStreak,
    getAveragePronunciationScore,
    getAverageListeningScore,
    getTotalSessions,
    resetProgress
  }
}