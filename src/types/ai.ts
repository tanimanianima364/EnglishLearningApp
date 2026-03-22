export type AIModel = 'claude-sonnet-4-20250514' | 'claude-haiku-4-5-20251001'
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
export type RegisterMode = 'formal' | 'informal' | 'academic' | 'casual'

export interface AISettings {
  apiKey: string | null
  model: AIModel
  isEnabled: boolean
  tokenBudgetDaily: number
  tokensUsedToday: number
  lastResetDate: string
}

export interface GrammarCorrection {
  original: string
  corrected: string
  explanation: string
  severity: 'minor' | 'significant' | 'critical'
}

export interface ConversationAIResponse {
  text: string
  corrections: GrammarCorrection[]
  vocabularySuggestions: string[]
}

export interface EssayFeedback {
  overallScore: number
  cefrLevel: CEFRLevel
  categories: {
    grammar: { score: number; errors: GrammarCorrection[]; summary: string }
    vocabulary: { score: number; range: string; suggestions: string[]; summary: string }
    coherence: { score: number; summary: string; missingTransitions: string[] }
    structure: { score: number; summary: string; suggestions: string[] }
    register: { score: number; consistency: string; summary: string }
    taskAchievement: { score: number; summary: string }
  }
  rewriteSuggestion: string
  strengths: string[]
  areasToImprove: string[]
}

export interface SpeakingEvaluation {
  cefrLevel: CEFRLevel
  overallScore: number
  fluency: { score: number; fillerWords: string[]; wpm: number; summary: string }
  grammar: { score: number; errors: GrammarCorrection[]; summary: string }
  vocabulary: { score: number; typeTokenRatio: number; summary: string }
  coherence: { score: number; summary: string }
  content: { score: number; summary: string }
  suggestions: string[]
}

export type EssayPromptType = 'opinion' | 'formal_letter' | 'report' | 'academic' | 'creative' | 'proposal' | 'review' | 'editorial'
