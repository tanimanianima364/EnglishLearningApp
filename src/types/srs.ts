import { FrequencyBand } from '../utils/frequencyUtils'

export type ResponseQuality = 0 | 1 | 2 | 3 // Again=0, Hard=1, Good=2, Easy=3

export interface SRSFields {
  easeFactor: number
  interval: number
  repetitions: number
  nextReviewDate: string
  lastReviewDate?: string
  lastQuality?: number
  isNewInSRS: boolean
}

export interface SRSParams {
  easeFactor: number
  interval: number
  repetitions: number
}

export interface SRSResult {
  easeFactor: number
  interval: number
  repetitions: number
  nextReviewDate: string
}

export interface FlashcardItem {
  word: string
  meaning: string
  exampleContext: string
  corpusFrequency?: number
  frequencyBand: FrequencyBand
  isAcademic: boolean
  isBusiness: boolean
  packId?: string
  isNew: boolean
  srs: SRSFields
}

export type SessionMode = 'all_due' | 'new_only' | 'review_only'

export interface FlashcardSessionState {
  mode: SessionMode
  queue: FlashcardItem[]
  currentIndex: number
  isFlipped: boolean
  totalCards: number
  reviewed: number
  correctCount: number
  currentStreak: number
  bestStreak: number
  sessionStartTime: number
}

export interface SRSSettings {
  dailyNewCardLimit: number
}

export interface SRSStats {
  dueToday: number
  newAvailable: number
  totalInSRS: number
  averageEaseFactor: number
}
