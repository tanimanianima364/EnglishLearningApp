import { useState, useEffect, useCallback } from 'react'

interface GrammarProgress {
  completedLessons: string[]
  lessonScores: Record<string, number[]>
  lastLessonDate: string
}

const STORAGE_KEY = 'englishLearningGrammar'

const defaultGrammarProgress: GrammarProgress = {
  completedLessons: [],
  lessonScores: {},
  lastLessonDate: ''
}

export const useGrammar = () => {
  const [grammarProgress, setGrammarProgress] = useState<GrammarProgress>(defaultGrammarProgress)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setGrammarProgress(JSON.parse(saved))
    }
  }, [])

  const saveGrammarProgress = (newProgress: GrammarProgress) => {
    setGrammarProgress(newProgress)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress))
  }

  const submitLessonScore = useCallback((lessonId: string, score: number) => {
    setGrammarProgress(prev => {
      const newProgress = {
        ...prev,
        completedLessons: prev.completedLessons.includes(lessonId)
          ? prev.completedLessons
          : [...prev.completedLessons, lessonId],
        lessonScores: {
          ...prev.lessonScores,
          [lessonId]: [...(prev.lessonScores[lessonId] || []), score]
        },
        lastLessonDate: new Date().toISOString().split('T')[0]
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress))
      return newProgress
    })
  }, [])

  const getLessonScore = useCallback((lessonId: string): number | null => {
    const scores = grammarProgress.lessonScores[lessonId]
    if (!scores || scores.length === 0) return null
    return scores[scores.length - 1]
  }, [grammarProgress])

  const getLessonBestScore = useCallback((lessonId: string): number | null => {
    const scores = grammarProgress.lessonScores[lessonId]
    if (!scores || scores.length === 0) return null
    return Math.max(...scores)
  }, [grammarProgress])

  const getOverallStats = useCallback(() => {
    const allScores = Object.values(grammarProgress.lessonScores).flat()
    return {
      completedCount: grammarProgress.completedLessons.length,
      averageScore: allScores.length > 0
        ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
        : 0,
      totalAttempts: allScores.length
    }
  }, [grammarProgress])

  const isLessonCompleted = useCallback((lessonId: string): boolean => {
    return grammarProgress.completedLessons.includes(lessonId)
  }, [grammarProgress])

  const resetGrammar = useCallback(() => {
    saveGrammarProgress(defaultGrammarProgress)
  }, [])

  return {
    grammarProgress,
    submitLessonScore,
    getLessonScore,
    getLessonBestScore,
    getOverallStats,
    isLessonCompleted,
    resetGrammar
  }
}
