import { AcquisitionLevel, VocabularyEntry } from '../types/vocabulary'

export const STOP_WORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'am', 'do', 'does', 'did', 'have', 'has', 'had', 'having',
  'will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might', 'must',
  'to', 'of', 'in', 'on', 'at', 'for', 'with', 'as', 'by', 'from',
  'and', 'or', 'but', 'not', 'no', 'nor', 'so', 'yet',
  'it', 'its', 'this', 'that', 'these', 'those',
  'he', 'she', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
  'my', 'your', 'his', 'our', 'their', 'mine', 'yours', 'ours', 'theirs',
  'if', 'then', 'than', 'when', 'where', 'who', 'whom', 'which', 'what',
  'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other',
  'some', 'such', 'any', 'only', 'own', 'same', 'just', 'also', 'very',
  'about', 'up', 'out', 'into', 'over', 'after', 'before', 'between',
  'under', 'again', 'there', 'here', 'through', 'during', 'above', 'below'
])

export function extractWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z'\-\s]/g, '')
    .split(/\s+/)
    .map(w => w.replace(/^['\-]+|['\-]+$/g, ''))
    .filter(w => w.length >= 2 && !STOP_WORDS.has(w))
}

export function truncateContext(text: string, maxLen: number = 100): string {
  if (text.length <= maxLen) return text
  return text.slice(0, maxLen - 3) + '...'
}

export function computeLevel(entry: VocabularyEntry): AcquisitionLevel {
  const uniqueDates = new Set(entry.encounters.map(e => e.date)).size
  const ratio = entry.totalCount > 0 ? entry.correctCount / entry.totalCount : 0
  const today = new Date()
  const lastSeenDate = new Date(entry.lastSeen)
  const daysSinceLastSeen = Math.floor(
    (today.getTime() - lastSeenDate.getTime()) / 86400000
  )

  if (
    entry.totalCount >= 5 &&
    ratio >= 0.8 &&
    uniqueDates >= 5 &&
    daysSinceLastSeen <= 30
  ) {
    return 'mastered'
  }

  if (
    entry.totalCount >= 3 &&
    entry.correctCount >= 1 &&
    uniqueDates >= 2
  ) {
    return 'learning'
  }

  return 'not_acquired'
}
