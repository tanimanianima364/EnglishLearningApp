import { useState, useCallback } from 'react'
import { EssayFeedback, EssayPromptType, CEFRLevel } from '../types/ai'
import { callClaudeJSON, isAIAvailable } from '../services/aiService'
import { essayReviewPrompt } from '../services/aiPrompts'
import { scoreContentFrequency, getFrequencyBand } from '../utils/frequencyUtils'

export interface EssayPrompt {
  id: string
  type: EssayPromptType
  title: string
  titleJa: string
  prompt: string
  targetLevel: CEFRLevel
  wordCountTarget: number
}

const essayPrompts: EssayPrompt[] = [
  // Opinion (3)
  {
    id: 'opinion-1',
    type: 'opinion',
    title: 'Remote Work vs Office Work',
    titleJa: 'リモートワークとオフィスワーク',
    prompt: 'Some people believe that working from home is more productive than working in an office. To what extent do you agree or disagree? Give reasons and examples to support your opinion.',
    targetLevel: 'B1',
    wordCountTarget: 200
  },
  {
    id: 'opinion-2',
    type: 'opinion',
    title: 'Social Media and Youth',
    titleJa: 'SNSと若者',
    prompt: 'Social media has a negative impact on young people\'s mental health. Discuss both sides of the argument and give your own opinion.',
    targetLevel: 'B2',
    wordCountTarget: 280
  },
  {
    id: 'opinion-3',
    type: 'opinion',
    title: 'Artificial Intelligence in Education',
    titleJa: '教育におけるAI',
    prompt: 'Artificial intelligence will eventually replace human teachers in the classroom. Critically evaluate this claim, considering pedagogical, ethical, and practical perspectives.',
    targetLevel: 'C1',
    wordCountTarget: 350
  },
  // Formal Letter (3)
  {
    id: 'letter-1',
    type: 'formal_letter',
    title: 'Complaint to a Service Provider',
    titleJa: 'サービス業者への苦情',
    prompt: 'Write a formal letter to the manager of a delivery company complaining about a damaged parcel you received. Describe the situation, explain the impact, and request appropriate compensation.',
    targetLevel: 'B1',
    wordCountTarget: 180
  },
  {
    id: 'letter-2',
    type: 'formal_letter',
    title: 'Job Application Cover Letter',
    titleJa: '求職カバーレター',
    prompt: 'Write a cover letter applying for a marketing coordinator position at an international company. Highlight your relevant experience, skills, and explain why you are a suitable candidate.',
    targetLevel: 'B2',
    wordCountTarget: 250
  },
  {
    id: 'letter-3',
    type: 'formal_letter',
    title: 'Proposal to Local Government',
    titleJa: '地方自治体への提案書',
    prompt: 'Write a formal letter to your local council proposing the establishment of a community garden in an unused public space. Present the benefits, address potential objections, and outline a feasible implementation plan.',
    targetLevel: 'C1',
    wordCountTarget: 320
  },
  // Report (3)
  {
    id: 'report-1',
    type: 'report',
    title: 'Survey Results: Commuting Habits',
    titleJa: '調査報告：通勤習慣',
    prompt: 'Write a report summarizing the results of a survey about how people in your area commute to work. Include an introduction, key findings, and recommendations for improving public transport.',
    targetLevel: 'B1',
    wordCountTarget: 220
  },
  {
    id: 'report-2',
    type: 'report',
    title: 'Customer Satisfaction Analysis',
    titleJa: '顧客満足度分析',
    prompt: 'Write a report analyzing customer satisfaction data for a retail chain. The data shows declining satisfaction in service speed but improving product quality ratings. Include findings, analysis, and actionable recommendations.',
    targetLevel: 'B2',
    wordCountTarget: 300
  },
  {
    id: 'report-3',
    type: 'report',
    title: 'Environmental Impact Assessment',
    titleJa: '環境影響評価',
    prompt: 'Write a formal report assessing the environmental impact of a proposed industrial development near a wetland area. Consider biodiversity, water quality, air pollution, and community effects. Provide evidence-based recommendations.',
    targetLevel: 'C2',
    wordCountTarget: 400
  },
  // Academic (3)
  {
    id: 'academic-1',
    type: 'academic',
    title: 'Benefits of Bilingualism',
    titleJa: 'バイリンガリズムの利点',
    prompt: 'Discuss the cognitive and social benefits of bilingualism. Use evidence from research to support your arguments and consider any potential drawbacks.',
    targetLevel: 'B2',
    wordCountTarget: 300
  },
  {
    id: 'academic-2',
    type: 'academic',
    title: 'Urbanization and Public Health',
    titleJa: '都市化と公衆衛生',
    prompt: 'Examine the relationship between rapid urbanization and public health outcomes in developing countries. Discuss specific challenges, cite relevant theoretical frameworks, and propose policy interventions.',
    targetLevel: 'C1',
    wordCountTarget: 380
  },
  {
    id: 'academic-3',
    type: 'academic',
    title: 'Language Acquisition Theories',
    titleJa: '言語習得理論',
    prompt: 'Compare and contrast nativist and constructivist theories of language acquisition. Evaluate the empirical evidence supporting each perspective, identify their respective limitations, and argue which provides a more comprehensive account of how humans acquire language.',
    targetLevel: 'C2',
    wordCountTarget: 450
  },
  // Creative (3)
  {
    id: 'creative-1',
    type: 'creative',
    title: 'A Memorable Journey',
    titleJa: '忘れられない旅',
    prompt: 'Write a narrative about a journey that changed your perspective on something important. Use descriptive language and include dialogue where appropriate.',
    targetLevel: 'B1',
    wordCountTarget: 200
  },
  {
    id: 'creative-2',
    type: 'creative',
    title: 'The Last Bookshop',
    titleJa: '最後の本屋',
    prompt: 'Write a short story set in a future where physical books have become extremely rare. A young person discovers the last bookshop in the city. Use vivid sensory details and develop at least two characters.',
    targetLevel: 'B2',
    wordCountTarget: 300
  },
  {
    id: 'creative-3',
    type: 'creative',
    title: 'Between Two Worlds',
    titleJa: '二つの世界の狭間で',
    prompt: 'Write a reflective personal essay exploring the experience of navigating between two cultures or languages. Employ literary devices such as metaphor, juxtaposition, and shifting registers to convey the complexity of cultural identity.',
    targetLevel: 'C1',
    wordCountTarget: 380
  }
]

interface OfflineFeedback {
  wordCount: number
  sentenceCount: number
  paragraphCount: number
  averageSentenceLength: number
  vocabularyFrequencyScore: number
  vocabularyBand: string
}

export function useEssayFeedback() {
  const [essay, setEssay] = useState('')
  const [selectedPrompt, setSelectedPrompt] = useState<EssayPrompt | null>(null)
  const [feedback, setFeedback] = useState<EssayFeedback | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const selectPrompt = useCallback((prompt: EssayPrompt) => {
    setSelectedPrompt(prompt)
    setEssay('')
    setFeedback(null)
  }, [])

  const getOfflineFeedback = useCallback((text: string): OfflineFeedback => {
    const trimmed = text.trim()
    const words = trimmed.split(/\s+/).filter(w => w.length > 0)
    const sentences = trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const paragraphs = trimmed.split(/\n\s*\n/).filter(p => p.trim().length > 0)

    const wordCount = words.length
    const sentenceCount = sentences.length
    const paragraphCount = Math.max(paragraphs.length, 1)
    const averageSentenceLength = sentenceCount > 0 ? Math.round(wordCount / sentenceCount) : 0

    const vocabularyFrequencyScore = scoreContentFrequency(trimmed)
    const vocabularyBand = getFrequencyBand(vocabularyFrequencyScore)

    return {
      wordCount,
      sentenceCount,
      paragraphCount,
      averageSentenceLength,
      vocabularyFrequencyScore,
      vocabularyBand
    }
  }, [])

  const analyzeEssay = useCallback(async () => {
    if (!selectedPrompt || !essay.trim()) return

    setIsAnalyzing(true)
    setFeedback(null)

    try {
      const systemPrompt = essayReviewPrompt(
        selectedPrompt.type,
        selectedPrompt.prompt,
        selectedPrompt.targetLevel
      )

      const result = await callClaudeJSON<EssayFeedback>(
        systemPrompt,
        [{ role: 'user', content: essay }],
        { maxTokens: 3000 }
      )

      setFeedback(result)
    } catch (error) {
      // Fallback: generate basic offline feedback
      const offline = getOfflineFeedback(essay)
      const freqScore = offline.vocabularyFrequencyScore
      const vocabScore = freqScore <= 500 ? 40 : freqScore <= 1500 ? 55 : freqScore <= 2500 ? 70 : 80

      const basicFeedback: EssayFeedback = {
        overallScore: Math.min(Math.round(vocabScore * 0.6 + (offline.wordCount >= selectedPrompt.wordCountTarget ? 30 : 15) + (offline.paragraphCount >= 3 ? 10 : 5)), 100),
        cefrLevel: offline.vocabularyBand === 'rare' || offline.vocabularyBand === 'advanced' ? 'C1' : offline.vocabularyBand === 'intermediate' ? 'B2' : 'B1',
        categories: {
          grammar: { score: 0, errors: [], summary: 'AI analysis unavailable. Grammar could not be checked offline.' },
          vocabulary: { score: vocabScore, range: offline.vocabularyBand, suggestions: [], summary: `Vocabulary frequency band: ${offline.vocabularyBand}. Average rank: ${freqScore}.` },
          coherence: { score: 0, summary: 'AI analysis required for coherence evaluation.', missingTransitions: [] },
          structure: { score: offline.paragraphCount >= 3 ? 60 : 35, summary: `${offline.paragraphCount} paragraph(s) detected. ${offline.sentenceCount} sentences, averaging ${offline.averageSentenceLength} words each.`, suggestions: [] },
          register: { score: 0, consistency: 'unknown', summary: 'AI analysis required for register evaluation.' },
          taskAchievement: { score: offline.wordCount >= selectedPrompt.wordCountTarget ? 65 : 35, summary: `Word count: ${offline.wordCount} / ${selectedPrompt.wordCountTarget} target.` }
        },
        rewriteSuggestion: '',
        strengths: [
          `Essay contains ${offline.wordCount} words across ${offline.paragraphCount} paragraph(s).`,
          `Vocabulary frequency band: ${offline.vocabularyBand}.`
        ],
        areasToImprove: [
          'Connect an API key for detailed grammar, coherence, and register analysis.',
          ...(offline.wordCount < selectedPrompt.wordCountTarget ? [`Try to reach the target word count of ${selectedPrompt.wordCountTarget}.`] : []),
          ...(offline.paragraphCount < 3 ? ['Consider organizing your essay into at least 3 paragraphs.'] : [])
        ]
      }

      setFeedback(basicFeedback)
    } finally {
      setIsAnalyzing(false)
    }
  }, [essay, selectedPrompt, getOfflineFeedback])

  const resetEssay = useCallback(() => {
    setEssay('')
    setFeedback(null)
  }, [])

  return {
    prompts: essayPrompts,
    selectedPrompt,
    selectPrompt,
    essay,
    setEssay,
    feedback,
    isAnalyzing,
    analyzeEssay,
    getOfflineFeedback,
    resetEssay
  }
}
