/**
 * C2-Level Evaluation: Agent-to-Agent Conversation Testing
 *
 * Tests whether the conversation agents can support C2-level English learning
 * by simulating dialogues and evaluating against CEFR criteria.
 *
 * Uses Gemini API for AI-powered tests (Tests 1 evaluation, 2, and 3).
 *
 * Usage:
 *   GEMINI_API_KEY=... npx tsx src/tests/c2-evaluation.ts
 *   npx tsx src/tests/c2-evaluation.ts              # runs Test 1 (offline) only
 *   npx tsx src/tests/c2-evaluation.ts --test 2     # runs a specific test
 */

import { GoogleGenerativeAI, Content } from '@google/generative-ai'
import { conversationPrompt } from '../services/aiPrompts'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

interface CEFRCriteria {
  vocabularyRange: number       // 0-10
  vocabularyAccuracy: number    // 0-10
  grammaticalComplexity: number // 0-10
  responseNaturalness: number   // 0-10
  topicFlexibility: number      // 0-10
  nuanceUnderstanding: number   // 0-10
}

interface TurnResult {
  turn: number
  userMessage: string
  agentResponse: string
  correction?: string
  suggestion?: string
}

interface TestResult {
  testName: string
  turns: TurnResult[]
  evaluation: CEFRCriteria
  estimatedLevel: CEFRLevel
  summary: string
  limitations: string[]
}

// ---------------------------------------------------------------------------
// Gemini API Wrapper
// ---------------------------------------------------------------------------

const GEMINI_MODEL = 'gemini-2.5-flash-lite'

class GeminiClient {
  private genAI: GoogleGenerativeAI

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey)
  }

  /** Extract text from response, skipping thinking parts */
  private extractText(response: any): string {
    try {
      // Try standard text() first
      const text = response.text()
      if (text) return text
    } catch { /* fall through */ }

    // Manually extract text parts, skipping thought blocks
    const candidates = response.candidates || []
    const parts: string[] = []
    for (const candidate of candidates) {
      for (const part of (candidate.content?.parts || [])) {
        if (part.text && !part.thought) {
          parts.push(part.text)
        }
      }
    }
    return parts.join('')
  }

  /** Single-turn generation with system instruction (JSON output) */
  async generate(systemPrompt: string, userMessage: string, maxTokens = 8192): Promise<string> {
    const model = this.genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: systemPrompt,
      generationConfig: {
        maxOutputTokens: maxTokens,
        responseMimeType: 'application/json',
      },
    })
    const result = await model.generateContent(userMessage)
    return this.extractText(result.response)
  }

  /** Multi-turn chat with system instruction */
  async chat(
    systemPrompt: string,
    history: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>,
    userMessage: string,
    maxTokens = 8192
  ): Promise<string> {
    const model = this.genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: systemPrompt,
      generationConfig: { maxOutputTokens: maxTokens },
    })
    const chat = model.startChat({ history: history as Content[] })
    const result = await chat.sendMessage(userMessage)
    return this.extractText(result.response)
  }
}

// ---------------------------------------------------------------------------
// Mock Agent Logic (extracted from useChatAgent — no React dependencies)
// ---------------------------------------------------------------------------

const GRAMMAR_CHECKS: { pattern: RegExp; correction: string; tip: string }[] = [
  { pattern: /\bi am go\b/i, correction: 'I am going', tip: 'Use "going" (present continuous) after "am".' },
  { pattern: /\bhe don't\b/i, correction: "he doesn't", tip: 'Third person singular uses "doesn\'t", not "don\'t".' },
  { pattern: /\bshe don't\b/i, correction: "she doesn't", tip: 'Third person singular uses "doesn\'t".' },
  { pattern: /\bit don't\b/i, correction: "it doesn't", tip: 'Third person singular uses "doesn\'t".' },
  { pattern: /\bi am agree\b/i, correction: 'I agree', tip: '"Agree" is not used with "am". Say "I agree".' },
  { pattern: /\bmore better\b/i, correction: 'better', tip: '"Better" is already comparative. Don\'t add "more".' },
  { pattern: /\bmore worse\b/i, correction: 'worse', tip: '"Worse" is already comparative.' },
  { pattern: /\bcan able to\b/i, correction: 'can / am able to', tip: 'Use either "can" or "am able to", not both.' },
  { pattern: /\bdoes .+ has\b/i, correction: 'does ... have', tip: 'After "does", use the base form "have", not "has".' },
  { pattern: /\bi have went\b/i, correction: 'I have gone / I went', tip: 'Use "gone" with "have" (present perfect) or "went" (past simple).' },
  { pattern: /\byesterday i have\b/i, correction: 'Yesterday I ...ed', tip: 'With "yesterday", use past simple, not present perfect.' },
  { pattern: /\bsince \d+ years\b/i, correction: 'for ... years', tip: 'Use "for" with durations, "since" with specific points in time.' },
  { pattern: /\bi am not have\b/i, correction: "I don't have", tip: 'Use "don\'t have" for negation, not "am not have".' },
  { pattern: /(?<!\bdoes\s)\bhe have\b/i, correction: 'he has', tip: 'Third person singular: "he has", not "he have".' },
  { pattern: /(?<!\bdoes\s)\bshe have\b/i, correction: 'she has', tip: 'Third person singular: "she has".' },
]

function detectGrammarIssue(text: string): { correction: string; tip: string } | null {
  for (const check of GRAMMAR_CHECKS) {
    if (check.pattern.test(text)) {
      return { correction: check.correction, tip: check.tip }
    }
  }
  return null
}

function detectTopic(text: string): string {
  const lower = text.toLowerCase()
  const topics: [string, string[]][] = [
    // Abstract topics first (C1/C2 content often discusses these)
    ['philosophy', ['philosophy', 'philosophical', 'ethics', 'consciousness', 'existential', 'metaphysics', 'epistemology', 'free will', 'determinism', 'dialectic', 'moral', 'virtue']],
    ['science', ['science', 'scientific', 'research', 'hypothesis', 'theory', 'empirical', 'methodology', 'paradigm', 'cognitive', 'neuroscience']],
    ['politics', ['politics', 'political', 'government', 'democracy', 'policy', 'ideology', 'neoliberal', 'sovereignty', 'institutional']],
    ['education', ['education', 'pedagogy', 'curriculum', 'academic', 'learning', 'acquisition', 'scaffolding', 'pedagogical', 'literacy']],
    ['linguistics', ['linguistics', 'linguistic', 'language', 'syntax', 'semantics', 'bilingual', 'sociolinguistics', 'discourse', 'proficiency', 'certifications']],
    // Concrete topics
    ['family', ['family', 'mother', 'father', 'sister', 'brother', 'parent', 'child', 'kid', 'wife', 'husband']],
    ['work', ['work', 'job', 'office', 'boss', 'colleague', 'career', 'company', 'meeting', 'project']],
    ['travel', ['travel', 'trip', 'vacation', 'flight', 'hotel', 'country', 'abroad', 'tourist', 'beach']],
    ['food', ['food', 'eat', 'cook', 'restaurant', 'lunch', 'dinner', 'breakfast', 'recipe', 'meal', 'delicious']],
    ['hobby', ['hobby', 'game', 'sport', 'music', 'movie', 'book', 'read', 'play', 'guitar', 'piano', 'soccer', 'tennis']],
    ['study', ['study', 'learn', 'school', 'university', 'class', 'exam', 'english', 'student', 'teacher']],
    ['technology', ['phone', 'computer', 'internet', 'app', 'ai', 'technology', 'software', 'social media', 'website']],
    ['weather', ['weather', 'rain', 'sun', 'snow', 'cold', 'hot', 'warm', 'temperature', 'season', 'summer', 'winter']],
    ['health', ['health', 'exercise', 'gym', 'run', 'walk', 'doctor', 'sick', 'sleep', 'tired', 'stress']],
    ['daily', ['today', 'morning', 'night', 'weekend', 'plan', 'usually', 'everyday', 'routine', 'busy', 'free time']],
  ]
  for (const [topic, keywords] of topics) {
    if (keywords.some(k => lower.includes(k))) return topic
  }
  return 'general'
}

const TOPIC_RESPONSES: Record<string, string[]> = {
  work: [
    "That sounds interesting! What do you enjoy most about your work?",
    "How long have you been working there? Do you find it challenging?",
    "Work-life balance is important. How do you manage your time between work and personal life?",
    "I see! What skills do you think are most important for your job?",
    "That's great! Have you ever thought about changing careers, or are you happy where you are?",
    "How do you handle stressful situations at work?",
    "Do you work with a team, or do you mostly work independently?",
  ],
  travel: [
    "That sounds amazing! What was the most memorable part of your trip?",
    "I'd love to hear more! What kind of food did you try there?",
    "Traveling really broadens your perspective. Where would you like to go next?",
    "Did you have any surprising or unexpected experiences during your travels?",
    "Do you prefer traveling alone or with friends? Why?",
    "What's your dream destination that you haven't visited yet?",
    "How do you usually plan your trips? Do you like to have a detailed schedule?",
  ],
  food: [
    "That sounds delicious! Do you enjoy cooking, or do you prefer eating out?",
    "What's your favorite cuisine? I'm curious to know!",
    "Have you ever tried cooking a dish from another country?",
    "Is there a food you didn't like as a child but enjoy now?",
    "What would you recommend to someone visiting your city for the first time?",
    "Do you think food culture is important for understanding a country?",
    "What's the most unusual food you've ever tried?",
  ],
  hobby: [
    "That's a great hobby! How did you get started with it?",
    "How often do you get to enjoy that? I think hobbies are really important for relaxation.",
    "Have you ever tried teaching your hobby to someone else?",
    "Would you like to turn your hobby into a career, or do you prefer keeping it as a hobby?",
    "What other hobbies are you interested in trying?",
    "How has your hobby changed over the years?",
  ],
  family: [
    "Family is so important! Do you get to spend a lot of time together?",
    "That's wonderful! What do you usually do when you're together as a family?",
    "How has your family influenced who you are today?",
    "Do you have any family traditions that are special to you?",
    "What's the best advice a family member has ever given you?",
  ],
  study: [
    "That's great that you're learning! What motivates you to study English?",
    "How long have you been studying? I can tell you're making great progress!",
    "What do you find most challenging about learning English?",
    "Do you have any tips for staying motivated when studying?",
    "What's the best way you've found to practice outside of class?",
    "Have you ever tried watching movies or reading books in English?",
  ],
  technology: [
    "Technology is changing so fast! What tech do you use most in your daily life?",
    "That's interesting! Do you think technology makes our lives better or more complicated?",
    "Have you tried any AI tools recently? What did you think?",
    "How do you feel about social media? Do you use it a lot?",
    "What technology do you think will change the world the most in the next 10 years?",
  ],
  weather: [
    "The weather really affects our mood, doesn't it? What's your favorite season?",
    "I agree! What do you like to do on days like that?",
    "Do you think the weather in your area has changed over the years?",
    "What's the most extreme weather you've ever experienced?",
    "If you could live anywhere with perfect weather, where would it be?",
  ],
  health: [
    "Taking care of your health is so important! What do you do to stay healthy?",
    "That's great! Regular exercise makes a big difference. How often do you work out?",
    "Do you think mental health is as important as physical health?",
    "What helps you relax when you're feeling stressed?",
    "Have you tried any new health habits recently?",
  ],
  daily: [
    "Sounds like a busy day! What's your favorite part of your daily routine?",
    "How do you usually spend your weekends?",
    "Do you consider yourself a morning person or a night owl?",
    "If you had an extra hour every day, what would you do with it?",
    "What's one thing you'd like to change about your daily routine?",
  ],
  general: [
    "That's really interesting! Can you tell me more about that?",
    "I see! What made you think about that?",
    "That's a great point! What do you think would happen if...?",
    "Interesting perspective! Have you always felt that way?",
    "I'd love to hear more! Why is that important to you?",
    "That's something I hadn't considered. What other thoughts do you have on this?",
    "Great! Let me ask you — if you could change one thing about that, what would it be?",
  ],
}

const FOLLOW_UP_PATTERNS: { triggers: string[]; responses: string[] }[] = [
  {
    triggers: ['yes', 'yeah', 'sure', 'of course', 'definitely', 'absolutely', 'right'],
    responses: [
      "Great! Can you tell me more about that? I'd like to hear the details.",
      "Awesome! What specifically makes you feel that way?",
      "Nice! Could you give me an example?",
    ]
  },
  {
    triggers: ["i don't know", "i'm not sure", 'maybe', 'hard to say', 'difficult question'],
    responses: [
      "That's okay! It can be a tricky question. Let me rephrase it — what's the first thing that comes to your mind?",
      "No pressure! Take your time. Sometimes it helps to think of a specific example.",
      "That's a perfectly fine answer! Let's try a different question.",
    ]
  },
  {
    triggers: ['no', 'not really', 'nope', 'never', "i don't think"],
    responses: [
      "I see, that's totally fine! What about something different — what interests you?",
      "No worries! Is there something else you'd rather talk about?",
      "Got it! Let me ask you something different then.",
    ]
  },
  {
    triggers: ['thank', 'thanks', 'helpful', 'useful'],
    responses: [
      "You're welcome! Your English is coming along nicely. Shall we keep talking?",
      "Happy to help! You're doing great. Want to continue practicing?",
      "My pleasure! Is there anything specific you'd like to practice?",
    ]
  },
  {
    triggers: ['what about you', 'how about you', 'and you', 'your opinion'],
    responses: [
      "Good question! If I were in that situation, I think I would... actually, I'm more curious about YOUR thoughts! What would you do?",
      "I appreciate you asking! I think it depends on the situation. But let me turn the question back to you — what's your experience been?",
      "That's nice of you to ask! I'd say it's complicated. But I want to hear YOUR perspective — what do you think?",
    ]
  },
]

const GREETING_RESPONSES = [
  "Hi there! Great to see you. I'm your English conversation partner. What would you like to talk about today? We could discuss your hobbies, work, travel, or anything you're interested in!",
  "Hello! Welcome to our English chat. Feel free to talk about anything — your day, your interests, or even ask me questions. I'm here to help you practice!",
  "Hey! Nice to meet you. I'd love to have a conversation with you in English. What's on your mind today?",
]

const CONVERSATION_STARTERS = [
  "By the way, I'm curious — what do you do for fun in your free time?",
  "Let me ask you something — if you could travel anywhere tomorrow, where would you go?",
  "Here's an interesting question — what's the best movie or book you've enjoyed recently?",
  "I have a question for you — what skill would you like to learn if time and money weren't an issue?",
  "Let me change the topic a bit — what's something that made you happy recently?",
  "Here's something fun to think about — if you could have dinner with anyone, living or dead, who would it be?",
]

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

// Advanced detection functions (mirroring useChatAgent.ts improvements)
function detectRegister(text: string): 'casual' | 'formal' | 'academic' {
  const lower = text.toLowerCase()
  const academicWords = ['epistemological', 'paradigm', 'fundamental', 'ontological', 'empirical', 'pedagogical', 'discourse', 'hegemony', 'dialectic', 'postulate', 'extrapolate', 'corroborate', 'substantiate', 'nuanced', 'implications', 'ramifications', 'proliferate', 'systemic', 'structural', 'commodification', 'underpinning', 'predicated', 'constitutes', 'manifests']
  const formalConnectors = ['moreover', 'nevertheless', 'notwithstanding', 'furthermore', 'consequently', 'albeit', 'insofar', 'nonetheless', 'conversely', 'accordingly', 'one might argue', 'it is worth noting', 'that said']
  const academicCount = academicWords.filter(w => lower.includes(w)).length
  if (academicCount >= 2) return 'academic'
  if (academicCount === 1 && formalConnectors.some(c => lower.includes(c))) return 'academic'
  if (formalConnectors.some(c => lower.includes(c))) return 'formal'
  return 'casual'
}

function detectComplexity(text: string): 'basic' | 'intermediate' | 'advanced' {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  if (sentences.length === 0) return 'basic'
  const totalWords = text.split(/\s+/).filter(w => w.length > 0).length
  const avgLen = totalWords / sentences.length
  if (avgLen > 20) return 'advanced'
  const subPatterns = [/,\s*(which|who|whom|that|where|when|while|although|though|because|whereas)\b/i, /\b(however|nevertheless|furthermore|moreover|consequently)\b/i, /\b(had\s+\w+\s+\w+ed|had\s+\w+\s+been)\b/i, /\b(were\s+\w+\s+to)\b/i]
  if (subPatterns.some(p => p.test(text)) || avgLen > 14) return 'intermediate'
  return 'basic'
}

function extractKeyPoints(text: string): string[] {
  const stops = new Set(['i', 'me', 'my', 'we', 'our', 'you', 'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as', 'and', 'but', 'or', 'not', 'so', 'yet', 'if', 'when', 'this', 'that', 'it', 'they', 'he', 'she', 'what', 'which', 'who', 'how', 'about', 'think', 'really', 'very', 'just', 'also'])
  const clauses = text.split(/[,;.!?]|(?:\band\b|\bbut\b|\bwhile\b|\balthough\b|\bbecause\b|\bhowever\b)/i).map(c => c.trim()).filter(c => c.length > 3)
  const points: string[] = []
  for (const clause of clauses) {
    const meaningful = clause.split(/\s+/).filter(w => w.length > 2 && !stops.has(w.toLowerCase().replace(/[^a-z']/g, '')))
    if (meaningful.length >= 2) points.push(meaningful.slice(0, 5).join(' ').toLowerCase())
  }
  return points.slice(0, 5)
}

const ADVANCED_ACADEMIC_TEMPLATES = {
  counterargue: [
    "I would advance a counter-thesis: the claim that {point} is predicated upon a theoretical framework that fails to account for the dialectical complexity inherent in {topic}. An alternative formulation would yield fundamentally different conclusions.",
    "One must consider the possibility that {point} represents a paradigm-bound interpretation. Were we to approach {topic} from a different vantage point, the very premises would require radical reconfiguration.",
    "I would respectfully submit that the argument concerning {point} exhibits a form of circular reasoning. A more productive approach to {topic} might begin by interrogating the assumptions themselves.",
  ],
  elaborate: [
    "Your observation that {point} invites a deeper examination of the epistemological foundations of {topic}. What we encounter here is a fundamental tension between competing paradigms that has animated scholarly discourse for decades.",
    "To extend your analysis of {point}: the implications for {topic} are far-reaching. This line of reasoning challenges several deeply embedded assumptions about the relationship between structure and agency.",
    "The point you raise about {point} constitutes a paradigm-level observation within {topic}. It calls into question the very categories through which we have traditionally apprehended these phenomena.",
  ],
  question: [
    "Your analysis of {point} provokes a fundamental epistemological question: upon what evidentiary basis can claims within {topic} be adjudicated, given the inherently contested nature of the underlying constructs?",
    "How might this position regarding {point} be reconciled with the well-documented heterogeneity within {topic}, particularly across divergent socio-cultural contexts?",
    "Your thesis regarding {point} raises a methodological question. To what extent can conventional frameworks within {topic} adequately capture the phenomena you describe?",
  ],
  agree: [
    "Your argument regarding {topic} is well-substantiated. The thesis that {point} finds considerable support in the existing body of scholarship.",
    "I concur with your analysis. The proposition that {point} is consonant with prevailing theoretical frameworks in {topic}, demonstrating a sophisticated grasp of the underlying dynamics.",
  ],
}

class MockChatAgent {
  private topic = 'general'
  private turnCount = 0
  private userTopics: string[] = []
  private usedResponses = new Set<string>()
  private argumentPoints: string[] = []
  private register: 'casual' | 'formal' | 'academic' = 'casual'
  private userLevel: 'basic' | 'intermediate' | 'advanced' = 'basic'

  private pickUnused(arr: string[]): string {
    const unused = arr.filter(r => !this.usedResponses.has(r))
    const selected = unused.length > 0 ? pick(unused) : pick(arr)
    this.usedResponses.add(selected)
    return selected
  }

  respond(userText: string): { text: string; correction?: string; suggestion?: string } {
    const lower = userText.toLowerCase().trim()
    this.turnCount++

    // Update context
    this.register = detectRegister(userText)
    this.userLevel = detectComplexity(userText)
    const newPoints = extractKeyPoints(userText)
    this.argumentPoints.push(...newPoints)
    if (this.argumentPoints.length > 15) this.argumentPoints = this.argumentPoints.slice(-10)

    const grammarIssue = detectGrammarIssue(userText)
    let correction: string | undefined
    let suggestion: string | undefined
    if (grammarIssue) {
      correction = grammarIssue.correction
      suggestion = grammarIssue.tip
    }

    if (this.turnCount === 1 || /^(hi|hello|hey|good morning|good afternoon|good evening|how are you)/i.test(lower)) {
      if (this.turnCount === 1) {
        return { text: pick(GREETING_RESPONSES), correction, suggestion }
      }
    }

    // For advanced/intermediate users with substantial input, use context-tracking responses
    const wordCount = userText.split(/\s+/).length
    if (this.userLevel === 'advanced' || this.register === 'academic' || this.register === 'formal' || (this.userLevel === 'intermediate' && wordCount > 15)) {
      const topic = detectTopic(userText)
      if (topic !== 'general') this.topic = topic
      const topicDisplay = this.topic === 'general' ? 'this matter' : this.topic
      const recentPoint = this.argumentPoints.length > 0 ? this.argumentPoints[this.argumentPoints.length - 1] : 'what you have described'

      const functions: ('counterargue' | 'elaborate' | 'question' | 'agree')[] = ['counterargue', 'question', 'elaborate', 'agree']
      const fn = functions[this.turnCount % functions.length]
      let response = this.pickUnused(ADVANCED_ACADEMIC_TEMPLATES[fn])
      response = response.replace(/\{topic\}/g, topicDisplay)
      response = response.replace(/\{point\}/g, recentPoint)

      // Cross-turn reference
      if (this.argumentPoints.length >= 3 && this.turnCount % 3 === 0) {
        const earlier = this.argumentPoints[Math.floor(Math.random() * (this.argumentPoints.length - 1))]
        response += ` Moreover, this connects to your earlier observation about ${earlier}, which strengthens the overall line of reasoning.`
      }

      return { text: response, correction, suggestion }
    }

    // Basic/intermediate fallback (original logic)
    for (const fp of FOLLOW_UP_PATTERNS) {
      if (fp.triggers.some(t => lower.includes(t)) && lower.split(/\s+/).length <= 8) {
        return { text: this.pickUnused(fp.responses), correction, suggestion }
      }
    }

    const topic = detectTopic(userText)
    if (topic !== 'general') {
      this.topic = topic
      if (!this.userTopics.includes(topic)) this.userTopics.push(topic)
    }

    const topicResponses = TOPIC_RESPONSES[this.topic] || TOPIC_RESPONSES.general
    let response = this.pickUnused(topicResponses)

    if (this.turnCount % 4 === 0) {
      response += '\n\n' + this.pickUnused(CONVERSATION_STARTERS)
    }

    return { text: response, correction, suggestion }
  }
}

// ---------------------------------------------------------------------------
// C2-Level User Utterances for simulation
// ---------------------------------------------------------------------------

const C2_USER_MESSAGES = [
  "I've been mulling over the rather contentious notion that the proliferation of AI-driven language tools might inadvertently undermine the very cognitive processes that underpin genuine linguistic acquisition. What's your take on that?",
  "That's a fair point, though I'd argue that the crux of the matter lies not so much in the tools themselves as in the pedagogical frameworks within which they're deployed. After all, a scalpel in the hands of an untrained person is merely a hazard, wouldn't you say?",
  "Precisely. Moreover, there's a somewhat overlooked dimension here — the notion of 'desirable difficulty' in learning theory. Paradoxically, the very friction that learners find frustrating is what catalyzes deeper encoding. By smoothing out every wrinkle, we may be doing them a disservice.",
  "Well, to play devil's advocate for a moment, one could contend that accessibility and equity ought to trump pedagogical purism. Not everyone has the luxury of enrolling in immersive programs. For many, an AI tutor might be the only viable interlocutor they have access to.",
  "Had the educational establishment been more proactive in addressing the digital divide, perhaps we wouldn't find ourselves in this predicament. But then again, isn't necessity the mother of invention? These tools arose precisely because existing institutions were failing to meet demand.",
  "Speaking of institutional failures, I've been reading Chomsky's later work on the political economy of knowledge dissemination, and it strikes me that the commodification of language education mirrors broader neoliberal trends. The gatekeeping of proficiency certifications is a case in point.",
  "I take your point, and I wouldn't want to paint with too broad a brush. There are undoubtedly conscientious educators doing remarkable work within these constraints. My contention is more systemic — it's the incentive structures that are misaligned, not the individuals per se.",
  "Absolutely. And this brings us full circle to the AI question. If we can harness these technologies to democratize access without diluting rigour, we'd essentially be threading a very fine needle. The question is whether current implementations are sophisticated enough to do that.",
  "You know, what I find particularly instructive about this conversation is how it exemplifies the kind of dialectical exchange that simply cannot be replicated by pattern-matching algorithms. The ability to negotiate meaning in real time, to read between the lines — that's quintessentially human.",
  "Indeed. I suppose the upshot is that AI can serve as a complement rather than a substitute — a scaffolding mechanism that, ideally, renders itself obsolete as the learner's competence burgeons. That said, I remain cautiously sceptical about whether market forces will allow such an altruistic outcome to materialise.",
]

// ---------------------------------------------------------------------------
// CEFR Evaluation Prompt
// ---------------------------------------------------------------------------

function cefrEvaluationPrompt(): string {
  return `You are an expert CEFR examiner evaluating a conversation for C2-level English proficiency.

Analyze the AGENT's responses (not the user's) against these CEFR C2 Speaking criteria:

1. Vocabulary Range (0-10): Does the agent use C2-level vocabulary? Idiomatic expressions, collocations, academic/literary register?
2. Vocabulary Accuracy (0-10): Are word choices precise and contextually appropriate?
3. Grammatical Complexity (0-10): Does the agent use complex syntactic structures? Subjunctive, inversion, cleft sentences, mixed conditionals?
4. Response Naturalness (0-10): Do responses feel natural, not formulaic? Is there personality and spontaneity?
5. Topic Flexibility (0-10): Can the agent follow topic shifts, handle abstract discussion, engage with nuance?
6. Nuance Understanding (0-10): Does the agent recognise hedging, irony, implied meaning, rhetorical questions?

Respond in EXACTLY this JSON format (no markdown fences):
{
  "vocabularyRange": <0-10>,
  "vocabularyAccuracy": <0-10>,
  "grammaticalComplexity": <0-10>,
  "responseNaturalness": <0-10>,
  "topicFlexibility": <0-10>,
  "nuanceUnderstanding": <0-10>,
  "estimatedLevel": "<A1|A2|B1|B2|C1|C2>",
  "summary": "<2-3 sentence overall assessment>",
  "limitations": ["<specific limitation 1>", "<specific limitation 2>", "..."]
}

Be strict. C2 means near-native mastery. Score honestly.`
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTurns(turns: TurnResult[]): string {
  return turns.map(t => {
    let s = `[Turn ${t.turn}]\nUser: ${t.userMessage}\nAgent: ${t.agentResponse}`
    if (t.correction) s += `\n  [Correction: ${t.correction}]`
    if (t.suggestion) s += `\n  [Suggestion: ${t.suggestion}]`
    return s
  }).join('\n\n')
}

function printResult(result: TestResult) {
  console.log('\n' + '='.repeat(72))
  console.log(`  ${result.testName}`)
  console.log('='.repeat(72))

  for (const t of result.turns) {
    console.log(`\n--- Turn ${t.turn} ---`)
    console.log(`User: ${t.userMessage.slice(0, 120)}${t.userMessage.length > 120 ? '...' : ''}`)
    console.log(`Agent: ${t.agentResponse.slice(0, 200)}${t.agentResponse.length > 200 ? '...' : ''}`)
    if (t.correction) console.log(`  Correction: ${t.correction}`)
    if (t.suggestion) console.log(`  Suggestion: ${t.suggestion}`)
  }

  console.log('\n--- CEFR Evaluation ---')
  const e = result.evaluation
  console.log(`  Vocabulary Range:       ${e.vocabularyRange}/10`)
  console.log(`  Vocabulary Accuracy:    ${e.vocabularyAccuracy}/10`)
  console.log(`  Grammatical Complexity: ${e.grammaticalComplexity}/10`)
  console.log(`  Response Naturalness:   ${e.responseNaturalness}/10`)
  console.log(`  Topic Flexibility:      ${e.topicFlexibility}/10`)
  console.log(`  Nuance Understanding:   ${e.nuanceUnderstanding}/10`)
  const avg = (e.vocabularyRange + e.vocabularyAccuracy + e.grammaticalComplexity +
               e.responseNaturalness + e.topicFlexibility + e.nuanceUnderstanding) / 6
  console.log(`  Average:                ${avg.toFixed(1)}/10`)
  console.log(`  Estimated CEFR Level:   ${result.estimatedLevel}`)
  console.log(`\nSummary: ${result.summary}`)

  if (result.limitations.length > 0) {
    console.log('\nLimitations:')
    for (const lim of result.limitations) {
      console.log(`  - ${lim}`)
    }
  }
}

function parseJSON<T>(text: string): T {
  let cleaned = text.trim()
  if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7)
  else if (cleaned.startsWith('```')) cleaned = cleaned.slice(3)
  if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3)
  cleaned = cleaned.trim()
  try {
    return JSON.parse(cleaned)
  } catch (e) {
    // Debug: show the problematic content
    console.error('\n[DEBUG] JSON parse error. Raw response (first 500 chars):')
    console.error(cleaned)
    console.error('[END OF RAW RESPONSE]')
    throw e
  }
}

// ---------------------------------------------------------------------------
// Test 1: Mock Agent (Offline) Limitation Evaluation
// ---------------------------------------------------------------------------

async function runTest1(client: GeminiClient | null): Promise<TestResult> {
  console.log('\n[Test 1] Running Mock Agent (Offline) evaluation...')

  const agent = new MockChatAgent()
  const turns: TurnResult[] = []

  for (let i = 0; i < C2_USER_MESSAGES.length; i++) {
    const userMsg = C2_USER_MESSAGES[i]
    const result = agent.respond(userMsg)
    turns.push({
      turn: i + 1,
      userMessage: userMsg,
      agentResponse: result.text,
      correction: result.correction,
      suggestion: result.suggestion,
    })
  }

  // If we have Gemini API, get AI evaluation
  if (client) {
    const conversationText = formatTurns(turns)
    const responseText = await client.generate(
      cefrEvaluationPrompt(),
      `Evaluate the AGENT's responses in this conversation:\n\n${conversationText}`,
      2048
    )
    const eval_ = parseJSON<CEFRCriteria & { estimatedLevel: CEFRLevel; summary: string; limitations: string[] }>(responseText)

    return {
      testName: 'Test 1: Mock Agent (Offline) — C2 Limitation Evaluation',
      turns,
      evaluation: {
        vocabularyRange: eval_.vocabularyRange,
        vocabularyAccuracy: eval_.vocabularyAccuracy,
        grammaticalComplexity: eval_.grammaticalComplexity,
        responseNaturalness: eval_.responseNaturalness,
        topicFlexibility: eval_.topicFlexibility,
        nuanceUnderstanding: eval_.nuanceUnderstanding,
      },
      estimatedLevel: eval_.estimatedLevel,
      summary: eval_.summary,
      limitations: eval_.limitations,
    }
  }

  // Manual offline evaluation (hardcoded known limitations)
  return {
    testName: 'Test 1: Mock Agent (Offline) — C2 Limitation Evaluation',
    turns,
    evaluation: {
      vocabularyRange: 2,
      vocabularyAccuracy: 3,
      grammaticalComplexity: 1,
      responseNaturalness: 2,
      topicFlexibility: 1,
      nuanceUnderstanding: 0,
    },
    estimatedLevel: 'A2',
    summary: 'The mock agent uses fixed template responses that cannot engage with C2-level discourse. It ignores the content of the user\'s message, fails to track arguments, and responds with generic questions unrelated to the sophisticated topics raised.',
    limitations: [
      'No content understanding — responses are keyword-matched, not semantically driven',
      'Cannot engage with abstract or philosophical topics',
      'Grammar detection limited to 15 basic patterns (A1-B1 errors only)',
      'No ability to use complex vocabulary, idioms, or nuanced expressions',
      'Cannot follow multi-turn argumentation or build on prior exchanges',
      'Topic detection is keyword-based; misses abstract discussions entirely',
      'No register awareness — same casual tone regardless of context',
      'Cannot recognise hedging, irony, rhetorical questions, or implied meaning',
    ],
  }
}

// ---------------------------------------------------------------------------
// Test 2: AI Agent (Gemini) C2 Dialogue Simulation
// ---------------------------------------------------------------------------

async function runTest2(client: GeminiClient): Promise<TestResult> {
  console.log('\n[Test 2] Running AI Agent (Gemini) dialogue simulation...')

  // Use the actual system prompt from the app (C2 + debate + academic)
  const systemPrompt = conversationPrompt('C2', 'debate', 'academic')
  console.log('  System prompt length:', systemPrompt.length, 'chars')

  const turns: TurnResult[] = []
  const history: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = []

  for (let i = 0; i < C2_USER_MESSAGES.length; i++) {
    const userMsg = C2_USER_MESSAGES[i]

    const agentText = await client.chat(systemPrompt, history, userMsg, 1024)

    // Update history
    history.push({ role: 'user', parts: [{ text: userMsg }] })
    history.push({ role: 'model', parts: [{ text: agentText }] })

    // Parse corrections and vocab suggestions (same logic as the app)
    let clean = agentText
    let correction: string | undefined
    let suggestion: string | undefined

    const corrMatch = clean.match(/\[CORRECTION:\s*"([^"]+)"\s*->\s*"([^"]+)"\s*\|\s*([^\]]+)\]/)
    if (corrMatch) {
      correction = corrMatch[2]
      suggestion = corrMatch[3].trim()
      clean = clean.replace(corrMatch[0], '').trim()
    }

    const vocabMatch = clean.match(/\[VOCAB:\s*"([^"]+)"\s*->\s*"([^"]+)"\s*\(([^)]+)\)\]/)
    if (vocabMatch) {
      const vocabNote = `Vocabulary: "${vocabMatch[1]}" -> try "${vocabMatch[2]}" (${vocabMatch[3]})`
      suggestion = suggestion ? suggestion + '\n' + vocabNote : vocabNote
      clean = clean.replace(vocabMatch[0], '').trim()
    }

    turns.push({
      turn: i + 1,
      userMessage: userMsg,
      agentResponse: clean,
      correction,
      suggestion,
    })

    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  // Evaluate the AI agent's performance
  console.log('  Evaluating AI agent responses...')
  const conversationText = formatTurns(turns)
  const evalText = await client.generate(
    cefrEvaluationPrompt(),
    `Evaluate the AGENT's responses in this conversation:\n\n${conversationText}`,
    2048
  )

  const eval_ = parseJSON<CEFRCriteria & { estimatedLevel: CEFRLevel; summary: string; limitations: string[] }>(evalText)

  return {
    testName: 'Test 2: AI Agent (Gemini) — C2 Dialogue Simulation',
    turns,
    evaluation: {
      vocabularyRange: eval_.vocabularyRange,
      vocabularyAccuracy: eval_.vocabularyAccuracy,
      grammaticalComplexity: eval_.grammaticalComplexity,
      responseNaturalness: eval_.responseNaturalness,
      topicFlexibility: eval_.topicFlexibility,
      nuanceUnderstanding: eval_.nuanceUnderstanding,
    },
    estimatedLevel: eval_.estimatedLevel,
    summary: eval_.summary,
    limitations: eval_.limitations,
  }
}

// ---------------------------------------------------------------------------
// Test 3: Essay Evaluation C2 Judgement Test
// ---------------------------------------------------------------------------

async function runTest3(client: GeminiClient): Promise<TestResult> {
  console.log('\n[Test 3] Running Essay Evaluation C2 judgement test...')

  const c2Essay = `The debate between nativist and constructivist accounts of language acquisition remains one of the most intellectually fertile controversies in linguistics. Nativism, most prominently championed by Noam Chomsky, posits the existence of an innate Language Acquisition Device — a domain-specific cognitive module that furnishes children with a Universal Grammar, thereby constraining the hypothesis space they must navigate when acquiring their mother tongue. The poverty of the stimulus argument constitutes the linchpin of this position: children demonstrably acquire syntactic rules for which the input they receive is radically underdetermined, suggesting that some grammatical knowledge must be hardwired.

Constructivism, by contrast, appeals to domain-general learning mechanisms — statistical pattern extraction, analogical reasoning, and pragmatic inference — to account for the trajectory of language development. Usage-based theorists such as Michael Tomasello have marshalled extensive longitudinal evidence demonstrating that children's early utterances are item-based rather than rule-governed, gradually abstracting syntactic schemas from accumulated exemplars through processes of entrenchment and pre-emption.

The empirical evidence is, characteristically, equivocal. Cross-linguistic studies of creole genesis lend some credence to nativist claims, insofar as children exposed to pidgin input reliably impose grammatical regularities that transcend the input. Conversely, connectionist models have demonstrated that many ostensibly rule-governed phenomena — such as the English past tense — can be acquired through pattern association without recourse to explicit rules, undermining the argument that symbolic computation is a prerequisite for language learning.

A comprehensive account arguably requires a reconciliation of these paradigms. The emergentist framework proposed by Elizabeth Bates and Brian MacWhinney, among others, suggests that language arises from the interaction of multiple constraints — neurobiological, cognitive, and socio-communicative — none of which is individually sufficient. This interactionist stance acknowledges the biological preparedness that nativists emphasise whilst recognising the constitutive role of linguistic experience that constructivists foreground.

In the final analysis, the very dichotomy between nature and nurture may be a false one. Epigenetic research increasingly reveals that environmental inputs do not merely trigger innate programmes but actively shape neural architecture, blurring the ontological boundary between "innate" and "acquired." A truly comprehensive theory of language acquisition will need to transcend the nativist-constructivist divide and embrace the fundamentally dynamic, probabilistic, and embodied character of human cognition.`

  // Use the exact essay review prompt from the app
  const systemPrompt = `You are an expert English writing evaluator using CEFR criteria.

The learner submitted a academic essay.
Prompt: "Compare and contrast nativist and constructivist theories of language acquisition. Evaluate the empirical evidence supporting each perspective, identify their respective limitations, and argue which provides a more comprehensive account of how humans acquire language."
Target CEFR level: C2

Respond in EXACTLY this JSON format (no markdown fences):
{
  "overallScore": <0-100>,
  "cefrLevel": "<estimated level>",
  "categories": {
    "grammar": {"score": <0-100>, "errors": [{"original": "...", "corrected": "...", "explanation": "...", "severity": "minor|significant|critical"}], "summary": "..."},
    "vocabulary": {"score": <0-100>, "range": "...", "suggestions": ["word -> better_word"], "summary": "..."},
    "coherence": {"score": <0-100>, "summary": "...", "missingTransitions": ["however", "furthermore"]},
    "structure": {"score": <0-100>, "summary": "...", "suggestions": ["..."]},
    "register": {"score": <0-100>, "consistency": "...", "summary": "..."},
    "taskAchievement": {"score": <0-100>, "summary": "..."}
  },
  "rewriteSuggestion": "<model rewrite of one paragraph>",
  "strengths": ["...", "..."],
  "areasToImprove": ["...", "..."]
}

Be specific and reference exact phrases. Score fairly according to CEFR C2 expectations.`

  const responseText = await client.generate(systemPrompt, c2Essay, 3000)
  const feedback = parseJSON<{
    overallScore: number
    cefrLevel: CEFRLevel
    categories: Record<string, { score: number; summary: string }>
    strengths: string[]
    areasToImprove: string[]
  }>(responseText)

  const correctlyIdentified = feedback.cefrLevel === 'C2'
  const categoryScores = Object.entries(feedback.categories).map(
    ([name, cat]) => `${name}: ${cat.score}/100`
  )

  const limitations: string[] = []
  if (!correctlyIdentified) {
    limitations.push(`Misidentified as ${feedback.cefrLevel} instead of C2`)
  }
  if (feedback.overallScore < 80) {
    limitations.push(`Overall score ${feedback.overallScore}/100 seems low for C2 writing`)
  }
  limitations.push(...(feedback.areasToImprove || []))

  return {
    testName: 'Test 3: Essay Evaluation — C2 Judgement Test (Gemini)',
    turns: [{
      turn: 1,
      userMessage: `[C2 Academic Essay — ${c2Essay.split(/\s+/).length} words]`,
      agentResponse: [
        `Detected CEFR Level: ${feedback.cefrLevel}`,
        `Overall Score: ${feedback.overallScore}/100`,
        `Category Scores: ${categoryScores.join(', ')}`,
        `Strengths: ${(feedback.strengths || []).join('; ')}`,
        `Correctly identified as C2: ${correctlyIdentified ? 'YES' : 'NO'}`,
      ].join('\n'),
    }],
    evaluation: {
      vocabularyRange: correctlyIdentified ? 9 : 5,
      vocabularyAccuracy: Math.round(feedback.overallScore / 10),
      grammaticalComplexity: Math.round((feedback.categories.grammar?.score || 0) / 10),
      responseNaturalness: Math.round((feedback.categories.coherence?.score || 0) / 10),
      topicFlexibility: Math.round((feedback.categories.taskAchievement?.score || 0) / 10),
      nuanceUnderstanding: correctlyIdentified ? 9 : 4,
    },
    estimatedLevel: feedback.cefrLevel,
    summary: correctlyIdentified
      ? `Essay correctly identified as C2. Overall score: ${feedback.overallScore}/100. The essay review prompt and Gemini model can reliably assess C2-level academic writing.`
      : `Essay misidentified as ${feedback.cefrLevel}. The evaluation system may need calibration for C2 detection. Overall score: ${feedback.overallScore}/100.`,
    limitations,
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2)
  const specificTest = args.includes('--test') ? parseInt(args[args.indexOf('--test') + 1]) : null

  const apiKey = process.env.GEMINI_API_KEY
  const hasAPI = !!apiKey

  console.log('╔════════════════════════════════════════════════════════════════════════╗')
  console.log('║     C2-Level Evaluation: Agent-to-Agent Conversation Testing         ║')
  console.log('║     Engine: Gemini API (gemini-2.5-flash-lite)                       ║')
  console.log('╚════════════════════════════════════════════════════════════════════════╝')
  console.log(`API Key: ${hasAPI ? 'configured (GEMINI_API_KEY)' : 'not set (Test 1 offline only)'}`)
  console.log(`Tests to run: ${specificTest ? `Test ${specificTest}` : 'all available'}`)

  let client: GeminiClient | null = null
  if (hasAPI) {
    client = new GeminiClient(apiKey!)
  }

  const results: TestResult[] = []

  // Test 1 — always runs (works offline, but uses Gemini for evaluation if available)
  if (!specificTest || specificTest === 1) {
    results.push(await runTest1(client))
  }

  // Test 2 — requires Gemini API
  if ((!specificTest || specificTest === 2) && client) {
    results.push(await runTest2(client))
  } else if (specificTest === 2 && !client) {
    console.log('\n[Test 2] SKIPPED — requires GEMINI_API_KEY environment variable')
  }

  // Test 3 — requires Gemini API
  if ((!specificTest || specificTest === 3) && client) {
    results.push(await runTest3(client))
  } else if (specificTest === 3 && !client) {
    console.log('\n[Test 3] SKIPPED — requires GEMINI_API_KEY environment variable')
  }

  // Print all results
  for (const r of results) {
    printResult(r)
  }

  // Comparative summary
  if (results.length > 1) {
    console.log('\n' + '='.repeat(72))
    console.log('  Comparative Summary')
    console.log('='.repeat(72))
    console.log('\n  Agent Type               | Level | Avg Score | Key Limitation')
    console.log('  ' + '-'.repeat(68))
    for (const r of results) {
      const e = r.evaluation
      const avg = (e.vocabularyRange + e.vocabularyAccuracy + e.grammaticalComplexity +
                   e.responseNaturalness + e.topicFlexibility + e.nuanceUnderstanding) / 6
      const limitation = r.limitations[0] || 'None identified'
      const name = r.testName.split('—')[0].replace('Test ', 'T').trim()
      console.log(`  ${name.padEnd(27)}| ${r.estimatedLevel.padEnd(6)}| ${avg.toFixed(1).padStart(5)}/10  | ${limitation.slice(0, 35)}`)
    }
  }

  // Recommendations
  console.log('\n' + '='.repeat(72))
  console.log('  Recommendations')
  console.log('='.repeat(72))

  const hasOffline = results.find(r => r.testName.includes('Mock'))
  const hasAI = results.find(r => r.testName.includes('AI Agent'))
  const hasEssay = results.find(r => r.testName.includes('Essay'))

  if (hasOffline) {
    const avg = Object.values(hasOffline.evaluation).reduce((a, b) => a + b, 0) / 6
    if (avg < 4) {
      console.log('\n  [Mock Agent] The offline fallback is fundamentally inadequate for C2')
      console.log('  learners. Consider:')
      console.log('    1. Adding C1/C2-specific response templates with academic register')
      console.log('    2. Implementing semantic similarity matching instead of keyword detection')
      console.log('    3. Adding argument-tracking to maintain multi-turn coherence')
      console.log('    4. Expanding grammar patterns to include C1/C2 error types')
    }
  }

  if (hasAI) {
    const avg = Object.values(hasAI.evaluation).reduce((a, b) => a + b, 0) / 6
    if (avg >= 7) {
      console.log('\n  [AI Agent] The Gemini-powered agent can sustain C2-level discourse.')
      console.log('  Current system prompt is effective. Minor improvements:')
      console.log('    1. Consider longer response allowance for C2 (3-5 sentences)')
      console.log('    2. Add explicit instruction for meta-cognitive feedback')
      console.log('    3. Include discipline-specific vocabulary activation')
    } else {
      console.log('\n  [AI Agent] The AI agent reaches partial C2 capability. Consider:')
      console.log('    1. Enriching the system prompt with C2-specific criteria')
      console.log('    2. Allowing longer, more developed responses for C2 conversations')
      console.log('    3. Adding explicit instruction for engagement with rhetorical devices')
    }
  }

  if (hasEssay) {
    if (hasEssay.estimatedLevel === 'C2') {
      console.log('\n  [Essay Evaluation] C2 detection is working correctly.')
    } else {
      console.log(`\n  [Essay Evaluation] C2 detection failed (got ${hasEssay.estimatedLevel}).`)
      console.log('  Consider calibrating the essay review prompt or score thresholds.')
    }
  }

  console.log('\n' + '='.repeat(72))
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
