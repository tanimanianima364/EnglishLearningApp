import { SRSFields } from './srs'

export type VocabularySource = 'pronunciation' | 'listening' | 'speaking' | 'conversation' | 'reading' | 'writing' | 'grammar' | 'dictation' | 'morphology' | 'flashcard'
export type AcquisitionLevel = 'not_acquired' | 'learning' | 'mastered'

export interface WordEncounter {
  date: string              // 'YYYY-MM-DD'
  source: VocabularySource
  context: string           // original sentence, truncated to 100 chars
  wasCorrectUsage: boolean  // true = user actively produced the word
}

export interface VocabularyEntry {
  word: string
  meaning?: string
  encounters: WordEncounter[]
  firstSeen: string
  lastSeen: string
  totalCount: number
  correctCount: number
  level: AcquisitionLevel
  corpusFrequency?: number
  isAcademic?: boolean
  isBusiness?: boolean
  srs?: SRSFields
  packId?: string
}

export interface VocabularyData {
  words: Record<string, VocabularyEntry>
  version: number
}
