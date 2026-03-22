import { useState, useCallback, useRef } from 'react'
import { isAIAvailable, streamClaude, callClaudeJSON } from '../services/aiService'
import { conversationPrompt, grammarAnalysisPrompt } from '../services/aiPrompts'
import { CEFRLevel, RegisterMode } from '../types/ai'

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
  argumentPoints: string[]
  register: 'casual' | 'formal' | 'academic'
  userLevel: 'basic' | 'intermediate' | 'advanced'
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

// Register detection — identifies vocabulary level of user input
function detectRegister(text: string): 'casual' | 'formal' | 'academic' {
  const lower = text.toLowerCase()

  const academicWords = [
    'epistemological', 'paradigm', 'fundamental', 'ontological', 'heuristic',
    'phenomenological', 'dialectic', 'axiomatic', 'empirical', 'inherent',
    'juxtaposition', 'dichotomy', 'synthesis', 'antithesis', 'pedagogical',
    'hermeneutic', 'syllogism', 'determinism', 'reductionism', 'positivism',
    'presupposition', 'cognition', 'praxis', 'normative', 'epistemology',
    'ontology', 'taxonomy', 'methodology', 'hypothesis', 'theoretical',
    'discourse', 'hegemony', 'postulate', 'extrapolate', 'interpolate',
    'correlate', 'manifests', 'predicated', 'constitutes', 'underpinning',
    'delineate', 'elucidate', 'ameliorate', 'exacerbate', 'corroborate',
    'substantiate', 'propensity', 'concomitant', 'multifaceted', 'nuanced',
    'implications', 'ramifications', 'perpetuate', 'proliferate', 'paradigmatic',
    'societal', 'systemic', 'structural', 'inequity', 'stratification',
  ]

  const formalConnectors = [
    'moreover', 'nevertheless', 'notwithstanding', 'furthermore', 'consequently',
    'henceforth', 'thereby', 'whereby', 'whereas', 'albeit', 'insofar',
    'inasmuch', 'nonetheless', 'conversely', 'accordingly', 'subsequently',
    'hence', 'thus', 'therefore', 'indeed', 'notably', 'specifically',
    'in contrast', 'on the contrary', 'by extension', 'in light of',
    'with respect to', 'in the context of', 'it follows that',
    'one might argue', 'it is worth noting', 'that said', 'having said that',
  ]

  const academicCount = academicWords.filter(w => lower.includes(w)).length
  if (academicCount >= 2) return 'academic'
  if (academicCount === 1) {
    // One academic word plus a formal connector is academic
    if (formalConnectors.some(c => lower.includes(c))) return 'academic'
  }

  const formalCount = formalConnectors.filter(c => lower.includes(c)).length
  if (formalCount >= 1) return 'formal'

  return 'casual'
}

// Complexity detection — estimates sentence-level sophistication
function detectComplexity(text: string): 'basic' | 'intermediate' | 'advanced' {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  if (sentences.length === 0) return 'basic'

  const totalWords = text.split(/\s+/).filter(w => w.length > 0).length
  const avgSentenceLength = totalWords / sentences.length

  if (avgSentenceLength > 20) return 'advanced'

  // Detect subordinate clauses: comma followed by conjunction
  const subordinatePatterns = [
    /,\s*(which|who|whom|whose|that|where|when|while|although|though|because|since|unless|if|whereas|whereby)\b/i,
    /\b(however|nevertheless|furthermore|moreover|consequently|therefore|thus|hence)\b/i,
    /\b(not only\b.*\bbut also)\b/i,
    /\b(whether\b.*\bor)\b/i,
    /\b(the more\b.*\bthe more)\b/i,
    /\b(had\s+\w+\s+\w+ed|had\s+\w+\s+been)\b/i, // past perfect constructions
    /\b(were\s+\w+\s+to)\b/i, // subjunctive
  ]

  const hasSubordinateClauses = subordinatePatterns.some(p => p.test(text))
  if (hasSubordinateClauses || avgSentenceLength > 14) return 'intermediate'

  return 'basic'
}

// Extract key points — pulls substantive noun phrases and topic words from user input
function extractKeyPoints(text: string): string[] {
  const points: string[] = []

  // Remove filler/common words to isolate substantive content
  const stopWords = new Set([
    'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'it', 'they',
    'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'shall', 'can', 'must', 'need', 'dare',
    'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as',
    'into', 'through', 'during', 'before', 'after', 'above', 'below',
    'and', 'but', 'or', 'nor', 'not', 'so', 'yet', 'both', 'either',
    'neither', 'each', 'every', 'all', 'any', 'few', 'more', 'most',
    'other', 'some', 'such', 'no', 'only', 'own', 'same', 'than',
    'too', 'very', 'just', 'also', 'now', 'here', 'there', 'then',
    'if', 'when', 'where', 'how', 'what', 'which', 'who', 'whom',
    'this', 'that', 'these', 'those', 'am', 'about', 'up', 'out',
    'think', 'believe', 'feel', 'know', 'say', 'tell', 'get', 'make',
    'go', 'come', 'see', 'look', 'like', 'want', 'give', 'take',
    'really', 'quite', 'much', 'many', 'well', 'still', 'even',
    'don\'t', 'doesn\'t', 'didn\'t', 'won\'t', 'wouldn\'t', 'couldn\'t',
    'shouldn\'t', 'isn\'t', 'aren\'t', 'wasn\'t', 'weren\'t',
  ])

  // Extract clauses (split on conjunctions and punctuation)
  const clauses = text.split(/[,;.!?]|(?:\band\b|\bbut\b|\bor\b|\bwhile\b|\balthough\b|\bbecause\b|\bsince\b|\bhowever\b)/i)
    .map(c => c.trim())
    .filter(c => c.length > 3)

  for (const clause of clauses) {
    const words = clause.split(/\s+/).filter(w => w.length > 2)
    const meaningful = words.filter(w => !stopWords.has(w.toLowerCase().replace(/[^a-z']/g, '')))
    if (meaningful.length >= 2) {
      points.push(meaningful.slice(0, 5).join(' ').toLowerCase())
    }
  }

  // Also extract "that X" constructions — these usually contain arguments
  const thatClauses = text.match(/\bthat\s+([^,.!?]+)/gi)
  if (thatClauses) {
    for (const clause of thatClauses) {
      const content = clause.replace(/^that\s+/i, '').trim()
      if (content.split(/\s+/).length >= 3) {
        points.push(content.toLowerCase())
      }
    }
  }

  return points.slice(0, 5) // Keep top 5 points to avoid unbounded growth
}

// Topic detection — expanded with abstract/academic topics
function detectTopic(text: string): string {
  const lower = text.toLowerCase()
  const topics: [string, string[]][] = [
    // Abstract / academic topics (check first since they may overlap with concrete topics)
    ['philosophy', ['philosophy', 'philosophical', 'ethics', 'ethical', 'moral', 'morality', 'consciousness', 'existence', 'existential', 'metaphysics', 'epistemology', 'ontology', 'meaning of life', 'free will', 'determinism', 'justice', 'virtue', 'truth', 'reality', 'perception', 'dialectic', 'phenomenology', 'nihilism', 'absurdism', 'stoicism', 'utilitarianism', 'deontological', 'categorical imperative']],
    ['science', ['science', 'scientific', 'research', 'experiment', 'hypothesis', 'theory', 'physics', 'biology', 'chemistry', 'evolution', 'quantum', 'neuroscience', 'genetics', 'climate change', 'ecosystem', 'biodiversity', 'particle', 'molecule', 'atom', 'genome', 'entropy', 'relativity', 'empirical', 'methodology', 'peer review']],
    ['politics', ['politics', 'political', 'government', 'democracy', 'democratic', 'election', 'policy', 'legislation', 'parliament', 'congress', 'ideology', 'liberal', 'conservative', 'socialism', 'capitalism', 'authoritarianism', 'sovereignty', 'constitution', 'civil rights', 'geopolitics', 'diplomacy', 'governance', 'populism', 'referendum', 'bureaucracy', 'lobbying', 'welfare state']],
    ['education', ['education', 'educational', 'pedagogy', 'curriculum', 'assessment', 'literacy', 'academia', 'academic', 'scholarship', 'dissertation', 'critical thinking', 'learning outcomes', 'standardized testing', 'vocational', 'higher education', 'primary education', 'secondary education', 'montessori', 'constructivism', 'scaffolding', 'differentiation', 'inclusive education']],
    ['linguistics', ['linguistics', 'linguistic', 'syntax', 'semantics', 'pragmatics', 'phonology', 'morphology', 'bilingual', 'multilingual', 'language acquisition', 'mother tongue', 'second language', 'translation', 'interpretation', 'sociolinguistics', 'psycholinguistics', 'creole', 'pidgin', 'dialect', 'register', 'code-switching', 'discourse analysis', 'corpus', 'etymology', 'lexicon']],
    // Concrete topics (original)
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

// C1/C2 Advanced Response Templates
// Organized by register → function → sentence stems with {topic} and {point} placeholders
const ADVANCED_TEMPLATES: Record<
  'casual' | 'formal' | 'academic',
  Record<'agree' | 'disagree' | 'elaborate' | 'question' | 'counterargue', string[]>
> = {
  casual: {
    agree: [
      "You make a fair point about {topic}. I think there's definitely something to the idea that {point}.",
      "I'm inclined to agree with you on {topic}. The way you put it — {point} — resonates with how I see things too.",
      "That tracks. Your take on {topic}, especially the bit about {point}, is well-considered.",
      "Honestly, I hadn't thought about {topic} that way before, but now that you mention {point}, it clicks. That's a solid observation.",
      "Yeah, I'm on board with that. The connection you're drawing between {topic} and {point} makes a lot of sense when you think about the bigger picture.",
      "Can't argue with that one. Your reasoning about {point} holds up really well, and it adds a fresh layer to how I think about {topic}.",
    ],
    disagree: [
      "I see where you're coming from on {topic}, but I'm not entirely sold on the idea that {point}. What if it's actually more layered than that?",
      "Interesting take on {topic}. Though I'd gently push back on {point} — there might be a different angle worth exploring here.",
      "I hear you, but something about {point} doesn't quite sit right with me. Have you considered the flip side?",
      "That's a bold take on {topic}, but I wonder if {point} holds up when you look at real-world examples. Sometimes things play out differently than we'd expect.",
      "I get the logic behind {point}, but my gut says there's a piece of the {topic} puzzle we're missing. What if the cause and effect are reversed?",
      "Not sure I'd go that far. The idea that {point} sounds neat in theory, but {topic} tends to be messier in practice than we give it credit for.",
    ],
    elaborate: [
      "That's a thought-provoking angle on {topic}. Building on your point about {point}, it seems like there's a broader pattern at play here — one where individual choices intersect with larger systemic forces.",
      "You're touching on something important with {point}. What strikes me is how this connects to the wider conversation around {topic}, particularly the tension between theory and practice.",
      "There's a lot to unpack there. Your observation about {point} actually ties into a fascinating dimension of {topic} that often goes unexamined.",
      "What's interesting about {point} is how it ripples outward. When you zoom out on {topic}, you start seeing echoes of the same pattern in completely different domains.",
      "You've hit on something that I think goes deeper than it first appears. The way {point} plays out in {topic} mirrors a tension that shows up across all sorts of human systems.",
      "That's worth sitting with for a moment. Your take on {point} actually opens up a whole line of thinking about {topic} that most people gloss over.",
    ],
    question: [
      "That raises an interesting question — when you say {point}, are you drawing a distinction between the practical and the theoretical aspects of {topic}?",
      "I'm curious about something. You mentioned {point} — do you think that holds true across different cultural contexts, or is it more specific to certain settings?",
      "Following up on your point about {point}: where would you draw the line? At what point does {topic} shift from being beneficial to potentially problematic?",
      "Here's what I want to know — if {point} is true, what does that mean for the people most directly affected by {topic}? Do they see it the same way?",
      "That's got me thinking. You brought up {point}, but how do you square that with the fact that {topic} looks so different depending on who you ask?",
      "Genuinely curious — when you talk about {point}, are you speaking from personal experience with {topic}, or is this more of an observation from the outside looking in?",
    ],
    counterargue: [
      "I'd push back slightly on the notion that {point}. Consider instead that {topic} might operate on principles that are fundamentally different from what you're suggesting.",
      "That's one way to look at it, but there's a compelling counter-argument: what if {point} is actually a symptom rather than a cause? The root of the issue in {topic} might lie elsewhere entirely.",
      "Playing devil's advocate here — your stance on {point} assumes a certain framework. But if we shift the lens on {topic}, the picture changes considerably.",
      "Here's the thing though — what if {point} is only part of the story? There's a strong case to be made that the real driver behind {topic} is something we haven't even touched on yet.",
      "I respect the argument, but flip it around for a second. If {point} were actually the opposite, wouldn't {topic} still work the same way? That tells me something else is going on.",
      "Okay, but let me throw a wrench in that. Your take on {point} works if we accept certain assumptions about {topic} — but those assumptions aren't as rock-solid as they seem.",
    ],
  },
  formal: {
    agree: [
      "Indeed, your analysis of {topic} is well-founded. The observation that {point} aligns with several established perspectives on this matter.",
      "I find myself in agreement with your position on {topic}. Your reasoning regarding {point} is both coherent and persuasive.",
      "That is a measured and thoughtful assessment of {topic}. The point you raise about {point} merits serious consideration.",
      "Your reasoning demonstrates a commendable grasp of {topic}. The manner in which you have articulated {point} lends considerable weight to the overall argument.",
      "I would echo your sentiments on {topic}. The connection you draw regarding {point} is both apt and well-supported by the available evidence.",
      "That is a particularly incisive observation about {topic}. Your framing of {point} captures a dimension of the issue that is frequently underappreciated in mainstream discourse.",
    ],
    disagree: [
      "While I appreciate the reasoning behind your position on {topic}, I would respectfully contend that {point} overlooks certain critical factors.",
      "Your argument regarding {topic} is thought-provoking. However, the claim that {point} warrants closer scrutiny, as there are notable counterexamples.",
      "I understand the logic of your position, though I believe the assertion that {point} may benefit from a more nuanced examination of {topic}.",
      "With respect, I find the claim that {point} somewhat reductive when applied to the full breadth of {topic}. There are salient considerations that this framing does not adequately address.",
      "I recognise the merit of your argument, yet I remain unconvinced that {point} accounts for the considerable variation we observe within {topic}. The reality may be more multifaceted.",
      "Your position on {topic} is thoughtfully constructed. That said, the proposition that {point} appears to rest on premises that are themselves open to substantial debate.",
    ],
    elaborate: [
      "Your observation about {point} opens up a significant line of inquiry within {topic}. It is worth considering how this perspective interacts with the broader institutional and cultural frameworks that shape our understanding.",
      "Building upon your analysis of {point}, one might note that {topic} encompasses a range of competing considerations that are not easily reconciled. The tension you identify speaks to a deeper structural challenge.",
      "That is a pertinent observation. The relationship between {point} and the wider discourse on {topic} reveals the extent to which these issues are intertwined with questions of power, access, and legitimacy.",
      "Your analysis of {point} invites a more expansive consideration of {topic}. When we situate this within its historical and institutional context, we begin to appreciate the full complexity of the forces at work.",
      "There is a productive line of reasoning that follows from {point}. It suggests that the conventional approach to {topic} may be insufficient, and that a more integrated framework is required to capture the dynamics you describe.",
      "The significance of {point} extends well beyond the immediate discussion of {topic}. It points toward a set of interconnected challenges that demand attention at both the policy and the institutional level.",
    ],
    question: [
      "Your observation about {point} raises an important question about the scope of our discussion. To what extent can individual agency within {topic} truly operate independently of structural constraints?",
      "I would be interested to hear you develop the point about {point} further. Specifically, how might this perspective account for the well-documented variation within {topic}?",
      "That is a nuanced position. One question it prompts: if we accept that {point} is the case, what practical implications follow for how we approach {topic} going forward?",
      "May I press you on a related matter? Given your assertion about {point}, how would you respond to the objection that {topic} is shaped primarily by factors outside any individual's control?",
      "Your position regarding {point} is compelling, yet it raises a further question: to what extent does the current evidence base within {topic} support such a conclusion, and where do the gaps in our understanding lie?",
      "I wonder how you might extend this line of reasoning. If {point} is indeed central to {topic}, what mechanisms would you propose for translating this insight into actionable outcomes?",
    ],
    counterargue: [
      "With due respect, the position that {point} rests on an assumption that may not withstand rigorous examination. An alternative reading of {topic} would suggest a quite different conclusion.",
      "I would offer a counterpoint: while {point} has intuitive appeal, the evidence from {topic} research points in a more ambiguous direction. The relationship may be less straightforward than it appears.",
      "One might argue the opposite — that {point} actually undermines the very position it seeks to support. When we examine {topic} through a wider lens, the contradictions become difficult to ignore.",
      "Permit me to offer an alternative perspective. The assertion that {point} presupposes a framework that may not be universally applicable. In certain contexts, {topic} yields conclusions that are diametrically opposed.",
      "I would venture that the inverse of {point} is at least equally defensible. The evidence within {topic} admits of multiple interpretations, and the one you have advanced, while plausible, is by no means the only reading.",
      "There is a substantive objection to be raised here. The reasoning behind {point} proceeds from a set of conditions that may not obtain in practice, and when we test it against the realities of {topic}, the argument encounters significant difficulties.",
    ],
  },
  academic: {
    agree: [
      "Your argument regarding {topic} is well-substantiated. The thesis that {point} finds considerable support in the existing body of scholarship, particularly within the constructivist tradition.",
      "I concur with your analysis. The proposition that {point} is consonant with the prevailing theoretical frameworks in {topic}, and your reasoning demonstrates a sophisticated grasp of the underlying dynamics.",
      "That is a cogent and well-articulated position on {topic}. Your identification of {point} as a central concern reflects an understanding of the systemic complexities at play.",
      "Your epistemological grounding in {topic} is commendable. The way you have situated {point} within the broader scholarly discourse demonstrates a dialectical sensitivity that elevates the analysis beyond mere assertion.",
      "I find your formulation of {point} to be paradigmatically sound. It resonates with the hermeneutic tradition in {topic} and offers a generative framework for further inquiry into the constitutive mechanisms at work.",
      "The analytical rigour with which you have addressed {point} is noteworthy. Your position aligns with the teleological perspectives that have proven most durable within the scholarship on {topic}.",
    ],
    disagree: [
      "While the argument that {point} possesses a certain internal coherence, I would suggest it insufficiently accounts for the multi-layered nature of {topic}. The reductionist tendency here may obscure more than it illuminates.",
      "I must respectfully take issue with the claim that {point}. The scholarship on {topic} reveals a considerably more contested landscape than your framing suggests, with significant epistemological disagreements remaining unresolved.",
      "Your position on {topic} is intellectually stimulating, yet the assertion that {point} appears to conflate correlation with causation. A more rigorous analysis might yield substantially different conclusions.",
      "The claim that {point} is epistemologically precarious insofar as it presupposes a nomothetic framework ill-suited to the idiographic complexity of {topic}. A more phenomenological approach would likely destabilise this conclusion.",
      "I would contend that the proposition regarding {point} reflects an insufficiently dialectical engagement with {topic}. The synthesis you offer elides the very antinomies that render this domain of inquiry so resistant to totalising accounts.",
      "While your argument about {point} is elegantly constructed, it operates within a paradigmatic enclosure that forecloses consideration of subaltern perspectives on {topic}. A more heterodox reading would substantially complicate your thesis.",
    ],
    elaborate: [
      "Your observation that {point} invites a deeper examination of the epistemological foundations of {topic}. What we encounter here is not merely a surface-level disagreement but a fundamental tension between competing paradigms — one that has animated scholarly discourse for decades.",
      "To extend your analysis of {point}: the implications for {topic} are far-reaching and potentially transformative. This line of reasoning, if pursued to its logical conclusion, challenges several deeply embedded assumptions about the relationship between structure and agency.",
      "The point you raise about {point} constitutes what might be termed a paradigm-level observation within {topic}. It calls into question the very categories through which we have traditionally apprehended these phenomena, suggesting the need for a more dialectical approach.",
      "What you articulate regarding {point} opens an axiological dimension within {topic} that has been insufficiently theorised. The normative implications are considerable and extend into questions of praxis that the field has historically been reluctant to confront.",
      "Your treatment of {point} gestures toward a genealogical reappraisal of {topic} — one that would trace the discursive formations and epistemic ruptures through which our current understanding has been constituted.",
      "The hermeneutic depth of your observation about {point} warrants elaboration. Within the broader architectonic of {topic}, this insight serves as a fulcrum around which several otherwise disparate theoretical commitments may be brought into productive tension.",
    ],
    question: [
      "Your analysis of {point} provokes a fundamental epistemological question: upon what evidentiary basis can claims within {topic} be adjudicated, given the inherently contested nature of the underlying constructs?",
      "I am compelled to probe further into the implications of {point}. How might this position be reconciled with the well-documented heterogeneity within {topic}, particularly across divergent socio-cultural and institutional contexts?",
      "Your thesis regarding {point} raises a methodological question of some consequence. To what extent can the frameworks conventionally employed within {topic} adequately capture the phenomena you describe, or does this necessitate an altogether different analytical apparatus?",
      "I am drawn to interrogate the ontological presuppositions underpinning {point}. What metaphysical commitments does this position entail, and how do they interact with the prevailing paradigmatic assumptions within {topic}?",
      "Your formulation of {point} raises a question of considerable heuristic value: does the explanatory purchase of this framework within {topic} extend beyond the conditions of its initial articulation, or is it circumscribed by a particular historical conjuncture?",
      "One might ask whether the analytical categories deployed in your discussion of {point} are themselves constitutive of the phenomena they purport to describe. To what extent does the taxonomy we impose on {topic} predetermine the conclusions we reach?",
    ],
    counterargue: [
      "I would advance a counter-thesis: the claim that {point} is predicated upon a theoretical framework that, while internally consistent, fails to account for the dialectical complexity inherent in {topic}. An alternative formulation, grounded in a more materialist analysis, would yield fundamentally different conclusions.",
      "One must consider the possibility that {point} represents what Kuhn might characterise as a paradigm-bound interpretation. Were we to approach {topic} from a post-structuralist vantage point, the very premises upon which this argument rests would require radical reconfiguration.",
      "I would respectfully submit that the argument concerning {point} exhibits a form of circular reasoning. The conclusion is already embedded within the premises, which forecloses the kind of open-ended inquiry that {topic} demands. A more productive approach might begin by interrogating the assumptions themselves.",
      "The proposition that {point} is vulnerable to a deconstructionist critique: it relies upon binary oppositions that, upon closer examination, prove to be mutually constitutive rather than genuinely opposed. A more productive engagement with {topic} would begin by dismantling these false dichotomies.",
      "I would suggest that {point} instantiates a form of epistemological closure that is antithetical to the kind of inquiry {topic} requires. Drawing on Foucault's notion of discursive formation, one might argue that the categories you employ are themselves artefacts of the very power structures you seek to analyse.",
      "From a critical realist perspective, the claim regarding {point} conflates the transitive and intransitive dimensions of knowledge about {topic}. The stratified ontology that underpins this domain necessitates a more laminated analysis than your current framework permits.",
    ],
  },
}

// Discourse markers by register — used to stitch together responses naturally
const DISCOURSE_MARKERS: Record<'casual' | 'formal' | 'academic', string[]> = {
  casual: [
    'That said, ', 'On the other hand, ', 'Interestingly enough, ',
    'Come to think of it, ', 'What I find particularly striking is that ',
    'To put it another way, ', 'The thing is, ',
    'Now here\'s the kicker — ', 'When you really think about it, ',
    'Along those lines, ', 'On a related note, ',
    'Circling back to what you said, ',
  ],
  formal: [
    'Indeed, ', 'That said, ', 'It is worth noting that ',
    'One might observe that ', 'Upon reflection, ',
    'In a similar vein, ', 'It bears mentioning that ',
    'By the same token, ', 'In this regard, ',
    'With this in mind, ', 'To that end, ',
    'As a corollary, ', 'In keeping with this observation, ',
    'Of particular relevance here is the fact that ',
  ],
  academic: [
    'Moreover, ', 'Furthermore, ', 'Consequently, ',
    'It is imperative to recognise that ', 'One cannot overlook the fact that ',
    'From a theoretical standpoint, ', 'In the broader context, ',
    'Notwithstanding the above, ', 'This notwithstanding, ',
    'It is precisely this tension that ', 'Viewed through this lens, ',
    'From an epistemological vantage point, ', 'In dialectical terms, ',
    'At the level of praxis, ', 'Qua analytical framework, ',
    'Situated within the broader discursive terrain, ',
  ],
}

// Advanced follow-up questions that build on user's specific points
const ADVANCED_FOLLOW_UPS: Record<'casual' | 'formal' | 'academic', string[]> = {
  casual: [
    "What do you think shaped that particular view? Was there a specific experience that led you there?",
    "If someone challenged you on that, how would you defend your position?",
    "How does that perspective apply in practice? Can you think of a concrete example?",
    "Do you think most people would agree with you, or is this more of an unconventional take?",
    "Has your thinking on this changed over the years, or have you always seen it this way?",
    "If you could convince one person of this, who would it be and why?",
    "What's the strongest argument against your own position? Does it give you any pause?",
    "How would you explain this to someone who has no background in the subject at all?",
  ],
  formal: [
    "How might this perspective evolve if we account for the historical context?",
    "Could you elaborate on how this position might be reconciled with opposing viewpoints?",
    "What evidence or experiences have been most influential in shaping this view?",
    "How would you respond to critics who might argue the contrary position?",
    "In what ways might this analysis need to be revised as new data becomes available?",
    "To what extent does this view depend on specific cultural or institutional conditions?",
    "What would you identify as the most significant limitation of this line of reasoning?",
    "How might stakeholders with competing interests respond to the implications of your argument?",
  ],
  academic: [
    "What theoretical framework do you find most useful for analysing this question, and what are its limitations?",
    "How might this position be critiqued from a post-structuralist or deconstructionist perspective?",
    "To what extent is this argument culturally contingent, and how might it manifest differently across diverse epistemological traditions?",
    "Could you situate this observation within the broader scholarly debate? Where does it align, and where does it diverge?",
    "What are the axiological implications of this position, and how do they bear upon questions of normative legitimacy?",
    "How would a genealogical analysis of this concept alter our understanding of its contemporary significance?",
    "In what sense does this argument presuppose a particular ontological commitment, and what follows if that commitment is contested?",
    "To what extent can the explanatory framework you propose be operationalised across divergent methodological paradigms?",
  ],
}

// Generate an advanced response using context tracking
function generateAdvancedResponse(
  userText: string,
  ctx: ConversationContext,
  pickUnusedFn: (arr: string[]) => string
): string {
  const register = ctx.register
  const templates = ADVANCED_TEMPLATES[register]
  const personality = ctx.personality

  // Determine response function based on personality and turn dynamics
  let responseFunction: 'agree' | 'disagree' | 'elaborate' | 'question' | 'counterargue'

  if (personality === 'debate') {
    // Debate personality: alternate between counterargue and question, with occasional agreement
    const debateFunctions: ('counterargue' | 'question' | 'disagree')[] = ['counterargue', 'question', 'disagree']
    if (ctx.turnCount % 5 === 0) {
      // Occasionally concede a point to keep it realistic
      responseFunction = 'agree'
    } else {
      responseFunction = debateFunctions[ctx.turnCount % debateFunctions.length]
    }
  } else if (personality === 'teacher') {
    // Teacher: elaborate and question to push the student
    const teacherFunctions: ('elaborate' | 'question' | 'agree')[] = ['elaborate', 'question', 'agree']
    responseFunction = teacherFunctions[ctx.turnCount % teacherFunctions.length]
  } else if (personality === 'interviewer') {
    // Interviewer: mostly questions, some elaboration
    const interviewerFunctions: ('question' | 'elaborate' | 'question')[] = ['question', 'elaborate', 'question']
    responseFunction = interviewerFunctions[ctx.turnCount % interviewerFunctions.length]
  } else {
    // Friendly: mix it up naturally
    const friendlyFunctions: ('agree' | 'elaborate' | 'question' | 'disagree')[] = ['agree', 'elaborate', 'question', 'disagree']
    responseFunction = friendlyFunctions[ctx.turnCount % friendlyFunctions.length]
  }

  // Select a template and fill in placeholders
  const templatePool = templates[responseFunction]
  let response = pickUnusedFn(templatePool)

  // Fill {topic} placeholder
  const topicDisplay = ctx.topic === 'general' ? 'this matter' : ctx.topic
  response = response.replace(/\{topic\}/g, topicDisplay)

  // Fill {point} placeholder with the most recent argument point, or a paraphrase of user text
  const recentPoint = ctx.argumentPoints.length > 0
    ? ctx.argumentPoints[ctx.argumentPoints.length - 1]
    : extractKeyPoints(userText)[0] || 'what you have described'
  response = response.replace(/\{point\}/g, recentPoint)

  // Reference earlier arguments if available (cross-turn context building)
  if (ctx.argumentPoints.length >= 2 && ctx.turnCount % 3 === 0) {
    const earlierPoint = ctx.argumentPoints[Math.floor(Math.random() * (ctx.argumentPoints.length - 1))]
    const marker = pickUnusedFn(DISCOURSE_MARKERS[register])
    response += ` ${marker}this connects to your earlier observation about ${earlierPoint}, which I think strengthens the overall line of reasoning.`
  }

  // Add a follow-up question every other turn
  if (ctx.turnCount % 2 === 0) {
    response += '\n\n' + pickUnusedFn(ADVANCED_FOLLOW_UPS[register])
  }

  return response
}

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
    personality: 'friendly',
    argumentPoints: [],
    register: 'casual',
    userLevel: 'basic'
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

    // Update context: detect register, complexity, and extract argument points
    ctx.register = detectRegister(userText)
    ctx.userLevel = detectComplexity(userText)

    const newPoints = extractKeyPoints(userText)
    for (const point of newPoints) {
      if (!ctx.argumentPoints.includes(point)) {
        ctx.argumentPoints.push(point)
      }
    }
    // Keep argument history bounded
    if (ctx.argumentPoints.length > 15) {
      ctx.argumentPoints = ctx.argumentPoints.slice(-10)
    }

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

    // Check follow-up patterns — only for short/simple responses (basic/intermediate)
    if (ctx.userLevel !== 'advanced') {
      for (const fp of FOLLOW_UP_PATTERNS) {
        if (fp.triggers.some(t => lower.includes(t)) && lower.split(/\s+/).length <= 8) {
          return { text: pickUnused(fp.responses), correction, suggestion }
        }
      }
    }

    // Detect topic
    const topic = detectTopic(userText)
    if (topic !== 'general') {
      ctx.topic = topic
      if (!ctx.userTopics.includes(topic)) ctx.userTopics.push(topic)
    }

    // Branch: advanced users get context-tracking C1/C2 responses
    if (ctx.userLevel === 'advanced') {
      const response = generateAdvancedResponse(userText, ctx, pickUnused)
      return { text: response, correction, suggestion }
    }

    // Basic / intermediate path — existing logic preserved as fallback
    let response: string

    // Main topic response
    const topicResponses = TOPIC_RESPONSES[ctx.topic] || TOPIC_RESPONSES.general
    response = pickUnused(topicResponses)

    // Every 4 turns, add a conversation starter to keep things going
    if (ctx.turnCount % 4 === 0) {
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
      personality,
      argumentPoints: [],
      register: 'casual',
      userLevel: 'basic'
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

  const parseAIResponse = (text: string): { clean: string; correction?: string; suggestion?: string } => {
    let clean = text
    let correction: string | undefined
    let suggestion: string | undefined

    // Parse [CORRECTION: "original" -> "corrected" | explanation]
    const corrMatch = clean.match(/\[CORRECTION:\s*"([^"]+)"\s*->\s*"([^"]+)"\s*\|\s*([^\]]+)\]/)
    if (corrMatch) {
      correction = corrMatch[2]
      suggestion = corrMatch[3].trim()
      clean = clean.replace(corrMatch[0], '').trim()
    }

    // Parse [VOCAB: "word" -> "synonym" (definition)]
    const vocabMatch = clean.match(/\[VOCAB:\s*"([^"]+)"\s*->\s*"([^"]+)"\s*\(([^)]+)\)\]/)
    if (vocabMatch) {
      if (!suggestion) suggestion = `Vocabulary: "${vocabMatch[1]}" → try "${vocabMatch[2]}" (${vocabMatch[3]})`
      else suggestion += `\nVocabulary: "${vocabMatch[1]}" → try "${vocabMatch[2]}" (${vocabMatch[3]})`
      clean = clean.replace(vocabMatch[0], '').trim()
    }

    return { clean, correction, suggestion }
  }

  const sendMessage = useCallback(async (text: string, autoSpeak: boolean = false, registerMode: RegisterMode = 'casual', targetLevel: CEFRLevel = 'B2') => {
    if (!text.trim()) return

    const userMsg: ChatMessage = {
      id: genId(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    // Try AI first
    if (isAIAvailable()) {
      try {
        const ctx = contextRef.current
        const history = messages.filter(m => m.sender === 'user' || m.sender === 'agent')
          .slice(-10)
          .map(m => ({ role: (m.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant', content: m.text }))
        history.push({ role: 'user', content: text.trim() })

        const systemPrompt = conversationPrompt(targetLevel, ctx.personality, registerMode)
        const agentMsgId = genId()

        // Add placeholder message
        setMessages(prev => [...prev, { id: agentMsgId, sender: 'agent', text: '', timestamp: new Date() }])

        const fullText = await streamClaude(systemPrompt, history, (streamedText) => {
          setMessages(prev => prev.map(m => m.id === agentMsgId ? { ...m, text: streamedText } : m))
        })

        setIsTyping(false)
        const parsed = parseAIResponse(fullText)

        // For C1/C2 learners, run additional grammar analysis on user's message
        let enhancedSuggestion = parsed.suggestion
        if ((targetLevel === 'C1' || targetLevel === 'C2') && isAIAvailable()) {
          try {
            const grammarResult = await callClaudeJSON<{
              overallLevel: string
              advancedStructuresUsed: string[]
              suggestedStructures: string[]
            }>(
              grammarAnalysisPrompt(),
              [{ role: 'user', content: text.trim() }],
              { maxTokens: 1024 }
            )
            const parts: string[] = []
            if (grammarResult.advancedStructuresUsed?.length > 0) {
              parts.push(`Advanced structures used: ${grammarResult.advancedStructuresUsed.join(', ')}`)
            }
            if (grammarResult.suggestedStructures?.length > 0) {
              parts.push(`Try using: ${grammarResult.suggestedStructures.slice(0, 3).join(', ')}`)
            }
            if (grammarResult.overallLevel) {
              parts.push(`Grammar level: ${grammarResult.overallLevel}`)
            }
            if (parts.length > 0) {
              enhancedSuggestion = enhancedSuggestion
                ? enhancedSuggestion + '\n' + parts.join('\n')
                : parts.join('\n')
            }
          } catch {
            // Grammar analysis is optional — don't break the conversation
          }
        }

        setMessages(prev => prev.map(m => m.id === agentMsgId
          ? { ...m, text: parsed.clean, correction: parsed.correction, suggestion: enhancedSuggestion }
          : m
        ))

        ctx.turnCount++
        if (autoSpeak) speak(parsed.clean)
        return
      } catch (error) {
        console.warn('AI unavailable, falling back to mock:', error)
        // Remove placeholder if it was added
        setMessages(prev => prev.filter(m => m.text !== ''))
      }
    }

    // Fallback to mock
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
  }, [generateResponse, speak, messages])

  const resetChat = useCallback(() => {
    setMessages([])
    contextRef.current = { topic: 'general', turnCount: 0, userTopics: [], lastUserSentence: '', personality: 'friendly', argumentPoints: [], register: 'casual', userLevel: 'basic' }
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
