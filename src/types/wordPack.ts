export interface WordPackWord {
  word: string
  meaning: string
  meaningJa: string
  exampleSentence: string
  tags?: string[]
}

export interface WordPackMeta {
  id: string
  name: string
  nameJa: string
  description: string
  descriptionJa: string
  icon: string
  category: 'professional' | 'test-prep' | 'specialized'
  wordCount: number
  unlockThreshold: number
  color: string
}

export interface WordPackData {
  meta: WordPackMeta
  words: WordPackWord[]
}

export interface WordPackProgress {
  packId: string
  isActive: boolean
  isUnlocked: boolean
  wordsAdded: number
  wordsMastered: number
  activatedDate?: string
}

export interface WordPackState {
  packs: Record<string, WordPackProgress>
  version: number
}
