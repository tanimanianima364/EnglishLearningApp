import { STOP_WORDS } from './wordExtractor'
import {
  WORD_FREQUENCY, WORD_DATA, MAX_FREQUENCY_RANK
} from '../data/wordFrequency'

export { MAX_FREQUENCY_RANK }

export type FrequencyBand = 'core' | 'common' | 'intermediate' | 'advanced' | 'rare'

const SUFFIX_STRIPS = ['ing', 'ed', 'er', 'est', 'ly', 'es', 's', 'tion', 'ment', 'ness', 'ful', 'less', 'able', 'ible', 'ize', 'ise']

/**
 * Get the frequency rank of a single word (1 = most common).
 * Attempts basic suffix stripping for inflected forms.
 * Returns MAX_FREQUENCY_RANK + 1 for unknown words.
 */
export function getWordFrequency(word: string): number {

  const w = word.toLowerCase().replace(/[^a-z'-]/g, '')
  if (!w) return MAX_FREQUENCY_RANK + 1

  // Direct lookup
  if (WORD_FREQUENCY[w] !== undefined) return WORD_FREQUENCY[w]

  // Try suffix stripping
  for (const suffix of SUFFIX_STRIPS) {
    if (w.endsWith(suffix) && w.length > suffix.length + 2) {
      const stem = w.slice(0, -suffix.length)
      if (WORD_FREQUENCY[stem] !== undefined) return WORD_FREQUENCY[stem]
      // Try with trailing 'e' restored (e.g., "making" → "mak" → "make")
      if (WORD_FREQUENCY[stem + 'e'] !== undefined) return WORD_FREQUENCY[stem + 'e']
    }
  }

  // Try doubling removal (e.g., "running" → "runn" → "run")
  if (w.endsWith('ing') && w.length > 5) {
    const stem = w.slice(0, -4) // remove doubled consonant + ing
    if (WORD_FREQUENCY[stem] !== undefined) return WORD_FREQUENCY[stem]
  }

  return MAX_FREQUENCY_RANK + 1
}

/**
 * Get extended word data including academic/business flags.
 */
export function getWordData(word: string): { rank: number; isAcademic: boolean; isBusiness: boolean } {

  const w = word.toLowerCase().replace(/[^a-z'-]/g, '')

  if (WORD_DATA[w]) return WORD_DATA[w]

  const rank = getWordFrequency(w)
  return { rank, isAcademic: false, isBusiness: false }
}

/**
 * Get word category tags.
 */
export function getWordCategories(word: string): string[] {
  const data = getWordData(word)
  const cats: string[] = []
  if (data.isAcademic) cats.push('Academic')
  if (data.isBusiness) cats.push('Business')
  return cats
}

/**
 * Score a text by average content-word frequency rank.
 * Lower score = more frequent vocabulary.
 * Ignores stop words and words shorter than 2 chars.
 */
export function scoreContentFrequency(text: string): number {

  const words = text
    .toLowerCase()
    .replace(/[^a-z'-\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length >= 2 && !STOP_WORDS.has(w))

  if (words.length === 0) return 1 // all stop words = very frequent

  const totalRank = words.reduce((sum, w) => sum + getWordFrequency(w), 0)
  return Math.round(totalRank / words.length)
}

/**
 * Get a human-readable frequency band for a rank.
 */
export function getFrequencyBand(rank: number): FrequencyBand {
  if (rank <= 500) return 'core'
  if (rank <= 1500) return 'common'
  if (rank <= 2500) return 'intermediate'
  if (rank <= 3000) return 'advanced'
  return 'rare'
}

/**
 * Get display config for a frequency band.
 */
export function getFrequencyBandDisplay(band: FrequencyBand): { label: string; labelJa: string; color: string; bg: string } {
  switch (band) {
    case 'core': return { label: 'Core', labelJa: '基礎', color: '#155724', bg: '#d4edda' }
    case 'common': return { label: 'Common', labelJa: '日常', color: '#004085', bg: '#cce5ff' }
    case 'intermediate': return { label: 'Intermediate', labelJa: '中頻度', color: '#856404', bg: '#fff3cd' }
    case 'advanced': return { label: 'Advanced', labelJa: '発展', color: '#721c24', bg: '#f8d7da' }
    case 'rare': return { label: 'Rare', labelJa: '低頻度', color: '#383d41', bg: '#e2e3e5' }
  }
}

/**
 * Sort items by their text content's frequency score (most frequent first).
 * textExtractor pulls the relevant text from each item.
 */
export function sortByFrequency<T>(items: T[], textExtractor: (item: T) => string): T[] {
  return [...items].sort((a, b) => {
    const scoreA = scoreContentFrequency(textExtractor(a))
    const scoreB = scoreContentFrequency(textExtractor(b))
    return scoreA - scoreB
  })
}
