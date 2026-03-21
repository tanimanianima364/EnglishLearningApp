import { useState, useCallback, useRef } from 'react'

export interface ChatMessage {
  id: string
  sender: 'user' | 'agent'
  text: string
  timestamp: Date
  correction?: string
  suggestion?: string
}

export type AgentPersonality = 'friendly' | 'teacher' | 'interviewer' | 'debate'

interface ConversationContext {
  topic: string
  turnCount: number
  userTopics: string[]
  lastUserSentence: string
  personality: AgentPersonality
}

// Grammar error detection patterns
const GRAMMAR_CHECKS: { pattern: RegExp; correction: string; tip: string }[] = [
  { pattern: /\bi am go\b/i, correction: 'I am going', tip: 'Use "going" (present continuous) after "am".' },
  { pattern: /\bhe don't\b/i, correction: 'he doesn\'t', tip: 'Third person singular uses "doesn\'t", not "don\'t".' },
  { pattern: /\bshe don't\b/i, correction: 'she doesn\'t', tip: 'Third person singular uses "doesn\'t".' },
  { pattern: /\bit don't\b/i, correction: 'it doesn\'t', tip: 'Third person singular uses "doesn\'t".' },
  { pattern: /\bi am agree\b/i, correction: 'I agree', tip: '"Agree" is not used with "am". Say "I agree".' },
  { pattern: /\bmore better\b/i, correction: 'better', tip: '"Better" is already comparative. Don\'t add "more".' },
  { pattern: /\bmore worse\b/i, correction: 'worse', tip: '"Worse" is already comparative.' },
  { pattern: /\bcan able to\b/i, correction: 'can / am able to', tip: 'Use either "can" or "am able to", not both.' },
  { pattern: /\bdoes .+ has\b/i, correction: 'does ... have', tip: 'After "does", use the base form "have", not "has".' },
  { pattern: /\bi have went\b/i, correction: 'I have gone / I went', tip: 'Use "gone" with "have" (present perfect) or "went" (past simple).' },
  { pattern: /\byesterday i have\b/i, correction: 'Yesterday I ...ed', tip: 'With "yesterday", use past simple, not present perfect.' },
  { pattern: /\bsince \d+ years\b/i, correction: 'for ... years', tip: 'Use "for" with durations, "since" with specific points in time.' },
  { pattern: /\bi am not have\b/i, correction: 'I don\'t have', tip: 'Use "don\'t have" for negation, not "am not have".' },
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

// Topic detection
function detectTopic(text: string): string {
  const lower = text.toLowerCase()
  const topics: [string, string[]][] = [
    ['family', ['family', 'mother', 'father', 'sister', 'brother', 'parent', 'child', 'kid', 'wife', 'husband']],
    ['work', ['work', 'job', 'office', 'boss', 'colleague', 'career', 'company', 'meeting', 'project']],
    ['travel', ['travel', 'trip', 'vacation', 'flight', 'hotel', 'country', 'abroad', 'tourist', 'beach']],
    ['food', ['food', 'eat', 'cook', 'restaurant', 'lunch', 'dinner', 'breakfast', 'recipe', 'meal', 'delicious']],
    ['hobby', ['hobby', 'game', 'sport', 'music', 'movie', 'book', 'read', 'play', 'guitar', 'piano', 'soccer', 'tennis']],
    ['study', ['study', 'learn', 'school', 'university', 'class', 'exam', 'english', 'language', 'student', 'teacher']],
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

// Response generators by topic
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

// Greeting responses
const GREETING_RESPONSES = [
  "Hi there! Great to see you. I'm your English conversation partner. What would you like to talk about today? We could discuss your hobbies, work, travel, or anything you're interested in!",
  "Hello! Welcome to our English chat. Feel free to talk about anything — your day, your interests, or even ask me questions. I'm here to help you practice!",
  "Hey! Nice to meet you. I'd love to have a conversation with you in English. What's on your mind today?",
]

// Follow-up patterns
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
    triggers: ['i don\'t know', 'i\'m not sure', 'maybe', 'hard to say', 'difficult question'],
    responses: [
      "That's okay! It can be a tricky question. Let me rephrase it — what's the first thing that comes to your mind?",
      "No pressure! Take your time. Sometimes it helps to think of a specific example.",
      "That's a perfectly fine answer! Let's try a different question.",
    ]
  },
  {
    triggers: ['no', 'not really', 'nope', 'never', 'i don\'t think'],
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

// Question prompts to keep conversation going
const CONVERSATION_STARTERS = [
  "By the way, I'm curious — what do you do for fun in your free time?",
  "Let me ask you something — if you could travel anywhere tomorrow, where would you go?",
  "Here's an interesting question — what's the best movie or book you've enjoyed recently?",
  "I have a question for you — what skill would you like to learn if time and money weren't an issue?",
  "Let me change the topic a bit — what's something that made you happy recently?",
  "Here's something fun to think about — if you could have dinner with anyone, living or dead, who would it be?",
]

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export const useChatAgent = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const contextRef = useRef<ConversationContext>({
    topic: 'general',
    turnCount: 0,
    userTopics: [],
    lastUserSentence: '',
    personality: 'friendly'
  })
  const messageIdRef = useRef(0)
  const usedResponsesRef = useRef<Set<string>>(new Set())

  const genId = () => `chat-${++messageIdRef.current}-${Date.now()}`

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'en-US'
    u.rate = 0.85
    u.onstart = () => setIsSpeaking(true)
    u.onend = () => setIsSpeaking(false)
    u.onerror = () => setIsSpeaking(false)
    window.speechSynthesis.speak(u)
  }, [])

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  const pickUnused = (arr: string[]): string => {
    const unused = arr.filter(r => !usedResponsesRef.current.has(r))
    const selected = unused.length > 0 ? pick(unused) : pick(arr)
    usedResponsesRef.current.add(selected)
    if (usedResponsesRef.current.size > 50) {
      const entries = [...usedResponsesRef.current]
      usedResponsesRef.current = new Set(entries.slice(-30))
    }
    return selected
  }

  const generateResponse = useCallback((userText: string): { text: string; correction?: string; suggestion?: string } => {
    const ctx = contextRef.current
    const lower = userText.toLowerCase().trim()
    ctx.turnCount++
    ctx.lastUserSentence = userText

    // Detect grammar issues
    const grammarIssue = detectGrammarIssue(userText)
    let correction: string | undefined
    let suggestion: string | undefined
    if (grammarIssue) {
      correction = grammarIssue.correction
      suggestion = grammarIssue.tip
    }

    // Check for greetings
    if (ctx.turnCount === 1 || /^(hi|hello|hey|good morning|good afternoon|good evening|how are you)/i.test(lower)) {
      if (ctx.turnCount === 1) {
        return { text: pick(GREETING_RESPONSES), correction, suggestion }
      }
    }

    // Check follow-up patterns
    for (const fp of FOLLOW_UP_PATTERNS) {
      if (fp.triggers.some(t => lower.includes(t)) && lower.split(/\s+/).length <= 8) {
        return { text: pickUnused(fp.responses), correction, suggestion }
      }
    }

    // Detect topic
    const topic = detectTopic(userText)
    if (topic !== 'general') {
      ctx.topic = topic
      if (!ctx.userTopics.includes(topic)) ctx.userTopics.push(topic)
    }

    // Build response
    let response: string

    // Main topic response
    const topicResponses = TOPIC_RESPONSES[ctx.topic] || TOPIC_RESPONSES.general
    response = pickUnused(topicResponses)

    // Every 4 turns, add a conversation starter to keep things going
    if (ctx.turnCount % 4 === 0) {
      // Pick a starter about a topic user hasn't discussed yet
      response += '\n\n' + pickUnused(CONVERSATION_STARTERS)
    }

    return { text: response, correction, suggestion }
  }, [])

  const startChat = useCallback((personality: AgentPersonality = 'friendly') => {
    contextRef.current = {
      topic: 'general',
      turnCount: 0,
      userTopics: [],
      lastUserSentence: '',
      personality
    }
    messageIdRef.current = 0
    usedResponsesRef.current = new Set()

    const greetings: Record<AgentPersonality, string> = {
      friendly: "Hi there! I'm your English conversation buddy. Let's chat! You can talk about anything — your day, hobbies, travel, work, or whatever is on your mind. I'll help you practice natural English. So, how are you doing today?",
      teacher: "Hello! I'm your English teacher for this session. We'll practice conversation and I'll give you feedback on your grammar and expression. Don't worry about making mistakes — that's how we learn! What would you like to talk about?",
      interviewer: "Good morning! Thank you for coming in today. I'll be conducting a casual interview-style conversation with you. This is a great way to practice formal English. Shall we begin? First, tell me a little about yourself.",
      debate: "Welcome to our English debate session! I'll present some thought-provoking topics and we can discuss different perspectives. This is great practice for expressing and defending your opinions in English. Ready? Here's our first topic: Do you think technology makes us more connected or more isolated?"
    }

    const msg: ChatMessage = {
      id: genId(),
      sender: 'agent',
      text: greetings[personality],
      timestamp: new Date()
    }
    setMessages([msg])
  }, [])

  const sendMessage = useCallback((text: string, autoSpeak: boolean = false) => {
    if (!text.trim()) return

    const userMsg: ChatMessage = {
      id: genId(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    const delay = 600 + Math.random() * 1000
    setTimeout(() => {
      setIsTyping(false)
      const result = generateResponse(text)

      const agentMsg: ChatMessage = {
        id: genId(),
        sender: 'agent',
        text: result.text,
        timestamp: new Date(),
        correction: result.correction,
        suggestion: result.suggestion
      }
      setMessages(prev => [...prev, agentMsg])

      if (autoSpeak) speak(result.text)
    }, delay)
  }, [generateResponse, speak])

  const resetChat = useCallback(() => {
    setMessages([])
    contextRef.current = { topic: 'general', turnCount: 0, userTopics: [], lastUserSentence: '', personality: 'friendly' }
    stopSpeaking()
  }, [stopSpeaking])

  return {
    messages,
    isTyping,
    isSpeaking,
    startChat,
    sendMessage,
    resetChat,
    speak,
    stopSpeaking
  }
}
