import { ResponseQuality, SRSParams, SRSResult, SRSFields, FlashcardItem, SessionMode } from '../types/srs'
import { VocabularyData, VocabularyEntry } from '../types/vocabulary'
import { getFrequencyBand, getWordData } from './frequencyUtils'

function todayStr(): string {
  return new Date().toISOString().split('T')[0]
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

/**
 * Core SM-2 calculation.
 */
export function calculateSRS(params: SRSParams, quality: ResponseQuality): SRSResult {
  const today = todayStr()
  let { easeFactor, interval, repetitions } = params

  switch (quality) {
    case 0: // Again
      repetitions = 0
      interval = 1
      easeFactor = Math.max(1.3, easeFactor - 0.2)
      break
    case 1: // Hard
      repetitions += 1
      interval = Math.max(1, Math.round(interval * 1.2))
      easeFactor = Math.max(1.3, easeFactor - 0.15)
      break
    case 2: // Good
      repetitions += 1
      if (repetitions === 1) interval = 1
      else if (repetitions === 2) interval = 6
      else interval = Math.round(interval * easeFactor)
      break
    case 3: // Easy
      repetitions += 1
      if (repetitions === 1) interval = 1
      else if (repetitions === 2) interval = 6
      else interval = Math.round(interval * easeFactor * 1.3)
      easeFactor = Math.min(3.0, easeFactor + 0.15)
      break
  }

  return {
    easeFactor,
    interval,
    repetitions,
    nextReviewDate: addDays(today, interval)
  }
}

/**
 * Initialize SRS fields for a word entering the SRS system.
 */
export function initializeSRS(): SRSFields {
  return {
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReviewDate: todayStr(),
    isNewInSRS: true
  }
}

/**
 * Convert VocabularyEntry to FlashcardItem.
 */
function entryToFlashcard(entry: VocabularyEntry): FlashcardItem {
  const wd = getWordData(entry.word)
  const srs = entry.srs || initializeSRS()
  const lastContext = entry.encounters.length > 0
    ? entry.encounters[entry.encounters.length - 1].context
    : ''

  return {
    word: entry.word,
    meaning: entry.meaning || '',
    exampleContext: lastContext,
    corpusFrequency: entry.corpusFrequency,
    frequencyBand: getFrequencyBand(entry.corpusFrequency || wd.rank),
    isAcademic: entry.isAcademic || wd.isAcademic,
    isBusiness: entry.isBusiness || wd.isBusiness,
    packId: entry.packId,
    isNew: srs.isNewInSRS,
    srs
  }
}

/**
 * Get cards due for review (nextReviewDate <= today, not new).
 */
export function getDueCards(vocabulary: VocabularyData, activePacks: string[]): FlashcardItem[] {
  const today = todayStr()
  return Object.values(vocabulary.words)
    .filter(entry => {
      if (!entry.srs || entry.srs.isNewInSRS) return false
      if (entry.packId && !activePacks.includes(entry.packId)) return false
      return entry.srs.nextReviewDate <= today
    })
    .map(entryToFlashcard)
    .sort((a, b) => a.srs.nextReviewDate.localeCompare(b.srs.nextReviewDate))
}

/**
 * Get new cards (never reviewed in SRS), sorted by corpus frequency.
 */
export function getNewCards(vocabulary: VocabularyData, activePacks: string[], limit: number): FlashcardItem[] {
  return Object.values(vocabulary.words)
    .filter(entry => {
      if (entry.srs && !entry.srs.isNewInSRS) return false
      if (entry.packId && !activePacks.includes(entry.packId)) return false
      // Must have a meaning to be useful as a flashcard
      return !!entry.meaning
    })
    .map(entryToFlashcard)
    .sort((a, b) => (a.corpusFrequency || 9999) - (b.corpusFrequency || 9999))
    .slice(0, limit)
}

/**
 * Count new cards already introduced today.
 */
export function getNewCardsIntroducedToday(vocabulary: VocabularyData): number {
  const today = todayStr()
  return Object.values(vocabulary.words)
    .filter(entry =>
      entry.srs &&
      !entry.srs.isNewInSRS &&
      entry.srs.lastReviewDate === today &&
      entry.srs.repetitions <= 1
    ).length
}

/**
 * Build a session queue with interleaving.
 */
export function buildSessionQueue(
  vocabulary: VocabularyData,
  mode: SessionMode,
  activePacks: string[],
  dailyNewLimit: number
): FlashcardItem[] {
  const alreadyNew = getNewCardsIntroducedToday(vocabulary)
  const remainingNew = Math.max(0, dailyNewLimit - alreadyNew)

  if (mode === 'review_only') {
    return getDueCards(vocabulary, activePacks)
  }

  if (mode === 'new_only') {
    return getNewCards(vocabulary, activePacks, remainingNew)
  }

  // all_due: interleave reviews and new cards (1 new per 5 reviews)
  const reviews = getDueCards(vocabulary, activePacks)
  const newCards = getNewCards(vocabulary, activePacks, remainingNew)
  const queue: FlashcardItem[] = []
  let newIdx = 0

  for (let i = 0; i < reviews.length; i++) {
    queue.push(reviews[i])
    if ((i + 1) % 5 === 0 && newIdx < newCards.length) {
      queue.push(newCards[newIdx++])
    }
  }

  // Add remaining new cards at the end
  while (newIdx < newCards.length) {
    queue.push(newCards[newIdx++])
  }

  return queue
}

/**
 * Preview the next interval for each quality option.
 */
export function previewIntervals(srs: SRSFields): Record<ResponseQuality, number> {
  const params: SRSParams = {
    easeFactor: srs.easeFactor,
    interval: srs.interval,
    repetitions: srs.repetitions
  }
  return {
    0: calculateSRS(params, 0).interval,
    1: calculateSRS(params, 1).interval,
    2: calculateSRS(params, 2).interval,
    3: calculateSRS(params, 3).interval
  }
}

/**
 * Format interval for display.
 */
export function formatInterval(days: number): string {
  if (days < 1) return '<1d'
  if (days === 1) return '1d'
  if (days < 30) return `${days}d`
  if (days < 365) return `${Math.round(days / 30)}mo`
  return `${(days / 365).toFixed(1)}y`
}
