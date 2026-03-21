import { useState, useEffect, useCallback } from 'react'
import { MorphologyProgress } from '../types/morphology'

const STORAGE_KEY = 'englishLearningMorphology'

const defaultProgress: MorphologyProgress = {
  completedLessons: [],
  lessonScores: {},
  morphemeMastery: {},
  lastSessionDate: ''
}

export const useMorphology = () => {
  const [progress, setProgress] = useState<MorphologyProgress>(defaultProgress)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setProgress(JSON.parse(saved))
    }
  }, [])

  const save = (p: MorphologyProgress) => {
    setProgress(p)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
  }

  const submitLessonScore = useCallback((lessonId: string, score: number) => {
    setProgress(prev => {
      const updated: MorphologyProgress = {
        ...prev,
        completedLessons: prev.completedLessons.includes(lessonId)
          ? prev.completedLessons
          : [...prev.completedLessons, lessonId],
        lessonScores: {
          ...prev.lessonScores,
          [lessonId]: [...(prev.lessonScores[lessonId] || []), score]
        },
        lastSessionDate: new Date().toISOString().split('T')[0]
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const updateMorphemeMastery = useCallback((morphemeIds: string[], wasCorrect: boolean) => {
    setProgress(prev => {
      const mastery = { ...prev.morphemeMastery }
      for (const id of morphemeIds) {
        const existing = mastery[id] || { seen: 0, correct: 0 }
        mastery[id] = {
          seen: existing.seen + 1,
          correct: existing.correct + (wasCorrect ? 1 : 0)
        }
      }
      const updated = { ...prev, morphemeMastery: mastery }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const getLessonBestScore = useCallback((lessonId: string): number | null => {
    const scores = progress.lessonScores[lessonId]
    if (!scores || scores.length === 0) return null
    return Math.max(...scores)
  }, [progress])

  const isLessonCompleted = useCallback((lessonId: string): boolean => {
    return progress.completedLessons.includes(lessonId)
  }, [progress])

  const getOverallStats = useCallback(() => {
    const allScores = Object.values(progress.lessonScores).flat()
    const masteryEntries = Object.values(progress.morphemeMastery)
    const masteredCount = masteryEntries.filter(m => m.seen >= 3 && m.correct / m.seen >= 0.7).length
    return {
      completedCount: progress.completedLessons.length,
      averageScore: allScores.length > 0
        ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
        : 0,
      totalAttempts: allScores.length,
      morphemesMastered: masteredCount,
      morphemesTotal: masteryEntries.length
    }
  }, [progress])

  const getMorphemeMastery = useCallback((morphemeId: string) => {
    return progress.morphemeMastery[morphemeId] || { seen: 0, correct: 0 }
  }, [progress])

  const resetMorphology = useCallback(() => {
    save(defaultProgress)
  }, [])

  return {
    progress,
    submitLessonScore,
    updateMorphemeMastery,
    getLessonBestScore,
    isLessonCompleted,
    getOverallStats,
    getMorphemeMastery,
    resetMorphology
  }
}
