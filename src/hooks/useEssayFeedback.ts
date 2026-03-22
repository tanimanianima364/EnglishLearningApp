import { useState, useCallback } from 'react'
import { EssayFeedback, EssayPromptType, CEFRLevel } from '../types/ai'
import { callClaudeJSON, isAIAvailable } from '../services/aiService'
import { essayReviewPrompt } from '../services/aiPrompts'
import { scoreContentFrequency, getFrequencyBand } from '../utils/frequencyUtils'
import { useProgress } from './useProgress'

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
  },
  // C2 prompts
  {
    id: 'opinion-c2',
    type: 'opinion',
    title: 'The Role of Dissent in Democratic Societies',
    titleJa: '民主主義社会における反対意見の役割',
    prompt: 'Critically evaluate the claim that dissent is essential to the health of democratic societies. Consider historical and contemporary examples, examine potential counterarguments, and argue for a nuanced position on the limits of tolerable dissent.',
    targetLevel: 'C2',
    wordCountTarget: 450
  },
  {
    id: 'letter-c2',
    type: 'formal_letter',
    title: 'Open Letter to an International Organization',
    titleJa: '国際機関への公開書簡',
    prompt: 'Write a formal open letter to the United Nations Human Rights Council, advocating for the protection of digital privacy rights in the age of mass surveillance. Present a compelling argument drawing on legal precedents, ethical principles, and empirical evidence of harm.',
    targetLevel: 'C2',
    wordCountTarget: 400
  },
  {
    id: 'creative-c2',
    type: 'creative',
    title: 'The Weight of Silence',
    titleJa: '沈黙の重み',
    prompt: 'Write a reflective literary essay exploring the concept of silence — not merely as the absence of sound, but as a communicative act, a political strategy, and a psychological state. Employ sophisticated literary devices including extended metaphor, paradox, and shifts in register.',
    targetLevel: 'C2',
    wordCountTarget: 400
  },
  {
    id: 'report-c2-2',
    type: 'report',
    title: 'Digital Literacy and Misinformation',
    titleJa: 'デジタルリテラシーと偽情報',
    prompt: 'Write a formal report assessing the effectiveness of current digital literacy programmes in combating the spread of misinformation. Analyse empirical data, evaluate pedagogical approaches, and propose evidence-based policy recommendations for educational institutions and governments.',
    targetLevel: 'C2',
    wordCountTarget: 420
  },
  // C2 diversified text types (proposal, review, editorial)
  {
    id: 'proposal-c2-1',
    type: 'proposal',
    title: 'Municipal Green Energy Transition',
    titleJa: '自治体の再生エネルギー転換提案',
    prompt: 'Draft a formal proposal to your city council requesting funding for a comprehensive municipal green-energy transition programme. Present a cost-benefit analysis, address potential objections from stakeholders, outline implementation timelines, and cite relevant precedents from comparable municipalities. Adopt a persuasive yet measured register appropriate for a civic audience.',
    targetLevel: 'C2',
    wordCountTarget: 450
  },
  {
    id: 'proposal-c2-2',
    type: 'proposal',
    title: 'Interdisciplinary Research Centre',
    titleJa: '学際的研究センター設立提案',
    prompt: 'Write a proposal for establishing an interdisciplinary research centre at a major university, focusing on the intersection of artificial intelligence and cognitive science. Justify the academic need, outline the governance structure, propose staffing and funding models, and anticipate institutional resistance. Use formal academic register throughout.',
    targetLevel: 'C2',
    wordCountTarget: 450
  },
  {
    id: 'review-c2-1',
    type: 'review',
    title: 'Comparative Book Review: Digital Privacy',
    titleJa: '比較書評：デジタルプライバシー',
    prompt: 'Write a review for a literary magazine comparing two contrasting books on digital privacy: one arguing that surveillance capitalism is an existential threat to democracy, the other contending that data transparency ultimately benefits society. Summarise each position fairly, evaluate the strength of their evidence, and offer your own synthesis. Maintain the register appropriate for an intellectually engaged general readership.',
    targetLevel: 'C2',
    wordCountTarget: 420
  },
  {
    id: 'review-c2-2',
    type: 'review',
    title: 'Critical Review: Documentary Film',
    titleJa: '批評レビュー：ドキュメンタリー映画',
    prompt: 'Write a critical review of a documentary film that examines the relationship between globalisation and cultural identity. Analyse the filmmaker\'s rhetorical strategies, evaluate the balance between emotional appeal and empirical evidence, and situate the work within the broader discourse on cultural imperialism. Write for an educated audience familiar with film criticism conventions.',
    targetLevel: 'C2',
    wordCountTarget: 400
  },
  {
    id: 'editorial-c2-1',
    type: 'editorial',
    title: 'The Erosion of Public Discourse',
    titleJa: '公共的議論の侵食',
    prompt: 'Write a persuasive editorial for a broadsheet newspaper arguing that the quality of public discourse has been fundamentally degraded by algorithmic content curation. Draw on evidence from political science, psychology, and media studies. Employ rhetorical devices — including rhetorical questions, tricolon, and antithesis — to engage readers while maintaining intellectual credibility.',
    targetLevel: 'C2',
    wordCountTarget: 430
  },
  {
    id: 'editorial-c2-2',
    type: 'editorial',
    title: 'Rethinking Higher Education',
    titleJa: '高等教育の再考',
    prompt: 'Write an opinion article for an international education journal arguing that the traditional university model is no longer fit for purpose in the twenty-first century. Critically examine the assumptions underpinning current higher education systems, propose concrete alternatives, and address the strongest counterarguments. Demonstrate mastery of hedging, concessive structures, and academic register.',
    targetLevel: 'C2',
    wordCountTarget: 440
  },
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
  const { addEssayEvalLevel } = useProgress()

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
      if (result.cefrLevel) addEssayEvalLevel(result.cefrLevel)
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
      addEssayEvalLevel(basicFeedback.cefrLevel)
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
