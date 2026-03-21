export type MorphemeType = 'prefix' | 'root' | 'suffix'

export interface Morpheme {
  id: string
  type: MorphemeType
  form: string
  meaning: string
  meaningJa: string
  origin?: 'latin' | 'greek' | 'english' | 'french'
  partOfSpeechEffect?: string
  examples: string[]
}

export interface MorphemePart {
  morphemeId: string
  form: string
  meaning: string
}

export interface WordDecomposition {
  id: string
  word: string
  definition: string
  definitionJa: string
  parts: MorphemePart[]
  breakdown: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface DecomposeExercise {
  type: 'decompose'
  word: string
  options: { label: string; morphemeId: string }[]
  correctParts: string[]
  explanation: string
}

export interface BuildExercise {
  type: 'build'
  targetWord: string
  targetMeaning: string
  availableMorphemes: { label: string; morphemeId: string }[]
  correctMorphemeIds: string[]
  explanation: string
}

export interface PredictMeaningExercise {
  type: 'predict_meaning'
  word: string
  parts: { form: string; meaning: string }[]
  options: string[]
  correctAnswer: string
  explanation: string
}

export interface MatchExercise {
  type: 'match'
  pairs: { morpheme: string; meaning: string }[]
  explanation: string
}

export type MorphologyExerciseItem =
  | DecomposeExercise
  | BuildExercise
  | PredictMeaningExercise
  | MatchExercise

export interface MorphologyLesson {
  id: string
  title: string
  titleJa: string
  category: 'prefixes' | 'roots' | 'suffixes' | 'mixed'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  description: string
  morphemeIds: string[]
  exercises: MorphologyExerciseItem[]
}

export interface MorphologyProgress {
  completedLessons: string[]
  lessonScores: Record<string, number[]>
  morphemeMastery: Record<string, { seen: number; correct: number }>
  lastSessionDate: string
}
