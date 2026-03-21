export interface SentenceOrderExercise {
  id: string
  type: 'sentence_order'
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2'
  hint?: string
  words: string[]
  correctOrder: string[]
}

export interface GapFillExercise {
  id: string
  type: 'gap_fill'
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2'
  sentence: string
  options: string[]
  correctAnswer: string
  explanation: string
}

export type WritingExerciseItem = SentenceOrderExercise | GapFillExercise

export const writingExercises: WritingExerciseItem[] = [
  // ── Sentence Order: A1 (5) ──────────────────────────────────────────
  {
    id: 'so-a1-01',
    type: 'sentence_order',
    cefrLevel: 'A1',
    hint: 'Express a preference',
    words: ['chocolate', 'I', 'like'],
    correctOrder: ['I', 'like', 'chocolate']
  },
  {
    id: 'so-a1-02',
    type: 'sentence_order',
    cefrLevel: 'A1',
    hint: 'Describe a person',
    words: ['teacher', 'is', 'She', 'a'],
    correctOrder: ['She', 'is', 'a', 'teacher']
  },
  {
    id: 'so-a1-03',
    type: 'sentence_order',
    cefrLevel: 'A1',
    hint: 'Daily routine',
    words: ['day', 'go', 'They', 'every', 'school', 'to'],
    correctOrder: ['They', 'go', 'to', 'school', 'every', 'day']
  },
  {
    id: 'so-a1-04',
    type: 'sentence_order',
    cefrLevel: 'A1',
    hint: 'Tell about an animal',
    words: ['a', 'have', 'We', 'cat'],
    correctOrder: ['We', 'have', 'a', 'cat']
  },
  {
    id: 'so-a1-05',
    type: 'sentence_order',
    cefrLevel: 'A1',
    hint: 'Location',
    words: ['park', 'in', 'He', 'is', 'the'],
    correctOrder: ['He', 'is', 'in', 'the', 'park']
  },

  // ── Sentence Order: A2 (5) ──────────────────────────────────────────
  {
    id: 'so-a2-01',
    type: 'sentence_order',
    cefrLevel: 'A2',
    hint: 'Morning habit',
    words: ['morning', 'usually', 'coffee', 'He', 'drinks', 'in', 'the'],
    correctOrder: ['He', 'usually', 'drinks', 'coffee', 'in', 'the', 'morning']
  },
  {
    id: 'so-a2-02',
    type: 'sentence_order',
    cefrLevel: 'A2',
    hint: 'Describe a hobby',
    words: ['plays', 'She', 'after', 'school', 'the', 'piano', 'always'],
    correctOrder: ['She', 'always', 'plays', 'the', 'piano', 'after', 'school']
  },
  {
    id: 'so-a2-03',
    type: 'sentence_order',
    cefrLevel: 'A2',
    hint: 'Describe appearance',
    words: ['beautiful', 'very', 'garden', 'is', 'The', 'in', 'spring'],
    correctOrder: ['The', 'garden', 'is', 'very', 'beautiful', 'in', 'spring']
  },
  {
    id: 'so-a2-04',
    type: 'sentence_order',
    cefrLevel: 'A2',
    hint: 'Weekend plan',
    words: ['to', 'the', 'We', 'went', 'yesterday', 'beach'],
    correctOrder: ['We', 'went', 'to', 'the', 'beach', 'yesterday']
  },
  {
    id: 'so-a2-05',
    type: 'sentence_order',
    cefrLevel: 'A2',
    hint: 'Describe a meal',
    words: ['dinner', 'My', 'delicious', 'cooks', 'every', 'mother', 'night'],
    correctOrder: ['My', 'mother', 'cooks', 'delicious', 'dinner', 'every', 'night']
  },

  // ── Sentence Order: B1 (5) ──────────────────────────────────────────
  {
    id: 'so-b1-01',
    type: 'sentence_order',
    cefrLevel: 'B1',
    hint: 'Contrast clause',
    words: ['was', 'decided', 'Although', 'raining,', 'we', 'it', 'go', 'to', 'outside'],
    correctOrder: ['Although', 'it', 'was', 'raining,', 'we', 'decided', 'to', 'go', 'outside']
  },
  {
    id: 'so-b1-02',
    type: 'sentence_order',
    cefrLevel: 'B1',
    hint: 'Reason clause',
    words: ['he', 'Because', 'hard,', 'studied', 'the', 'passed', 'he', 'exam'],
    correctOrder: ['Because', 'he', 'studied', 'hard,', 'he', 'passed', 'the', 'exam']
  },
  {
    id: 'so-b1-03',
    type: 'sentence_order',
    cefrLevel: 'B1',
    hint: 'Reported speech',
    words: ['said', 'that', 'She', 'would', 'she', 'come', 'the', 'to', 'party'],
    correctOrder: ['She', 'said', 'that', 'she', 'would', 'come', 'to', 'the', 'party']
  },
  {
    id: 'so-b1-04',
    type: 'sentence_order',
    cefrLevel: 'B1',
    hint: 'Time clause',
    words: ['the', 'arrives,', 'When', 'bus', 'please', 'tell', 'me'],
    correctOrder: ['When', 'the', 'bus', 'arrives,', 'please', 'tell', 'me']
  },
  {
    id: 'so-b1-05',
    type: 'sentence_order',
    cefrLevel: 'B1',
    hint: 'Present perfect with experience',
    words: ['have', 'I', 'to', 'been', 'never', 'Australia', 'but', 'visit', 'to', 'I', 'want'],
    correctOrder: ['I', 'have', 'never', 'been', 'to', 'Australia', 'but', 'I', 'want', 'to', 'visit']
  },

  // ── Sentence Order: B2 (5) ──────────────────────────────────────────
  {
    id: 'so-b2-01',
    type: 'sentence_order',
    cefrLevel: 'B2',
    hint: 'Passive with relative clause',
    words: ['report', 'that', 'submitted', 'was', 'The', 'yesterday', 'has', 'been', 'already', 'reviewed'],
    correctOrder: ['The', 'report', 'that', 'was', 'submitted', 'yesterday', 'has', 'already', 'been', 'reviewed']
  },
  {
    id: 'so-b2-02',
    type: 'sentence_order',
    cefrLevel: 'B2',
    hint: 'Third conditional',
    words: ['had', 'If', 'earlier,', 'left', 'she', 'not', 'would', 'have', 'missed', 'she', 'the', 'train'],
    correctOrder: ['If', 'she', 'had', 'left', 'earlier,', 'she', 'would', 'not', 'have', 'missed', 'the', 'train']
  },
  {
    id: 'so-b2-03',
    type: 'sentence_order',
    cefrLevel: 'B2',
    hint: 'Inversion for emphasis',
    words: ['had', 'such', 'Never', 'I', 'a', 'performance', 'seen', 'before', 'brilliant'],
    correctOrder: ['Never', 'had', 'I', 'seen', 'such', 'a', 'brilliant', 'performance', 'before']
  },
  {
    id: 'so-b2-04',
    type: 'sentence_order',
    cefrLevel: 'B2',
    hint: 'Complex noun phrase',
    words: ['the', 'proposed', 'by', 'committee', 'the', 'changes', 'were', 'unanimously', 'approved'],
    correctOrder: ['the', 'changes', 'proposed', 'by', 'the', 'committee', 'were', 'unanimously', 'approved']
  },
  {
    id: 'so-b2-05',
    type: 'sentence_order',
    cefrLevel: 'B2',
    hint: 'Wish + past perfect',
    words: ['wish', 'had', 'I', 'I', 'opportunity', 'taken', 'the', 'it', 'when', 'was', 'available'],
    correctOrder: ['I', 'wish', 'I', 'had', 'taken', 'the', 'opportunity', 'when', 'it', 'was', 'available']
  },

  // ── Gap Fill: A1 (5) ────────────────────────────────────────────────
  {
    id: 'gf-a1-01',
    type: 'gap_fill',
    cefrLevel: 'A1',
    sentence: 'She ___ a student.',
    options: ['is', 'am', 'are'],
    correctAnswer: 'is',
    explanation: '"She" is third person singular, so we use "is".'
  },
  {
    id: 'gf-a1-02',
    type: 'gap_fill',
    cefrLevel: 'A1',
    sentence: 'I ___ from Japan.',
    options: ['am', 'is', 'are'],
    correctAnswer: 'am',
    explanation: '"I" always takes "am" with the verb "to be".'
  },
  {
    id: 'gf-a1-03',
    type: 'gap_fill',
    cefrLevel: 'A1',
    sentence: '___ is my book.',
    options: ['This', 'These', 'Those'],
    correctAnswer: 'This',
    explanation: '"Book" is singular and close by, so we use "This".'
  },
  {
    id: 'gf-a1-04',
    type: 'gap_fill',
    cefrLevel: 'A1',
    sentence: 'They ___ happy today.',
    options: ['are', 'is', 'am'],
    correctAnswer: 'are',
    explanation: '"They" is plural, so we use "are".'
  },
  {
    id: 'gf-a1-05',
    type: 'gap_fill',
    cefrLevel: 'A1',
    sentence: 'We have ___ apple.',
    options: ['an', 'a', 'the'],
    correctAnswer: 'an',
    explanation: '"Apple" starts with a vowel sound, so we use "an".'
  },

  // ── Gap Fill: A2 (5) ────────────────────────────────────────────────
  {
    id: 'gf-a2-01',
    type: 'gap_fill',
    cefrLevel: 'A2',
    sentence: 'He went ___ the store yesterday.',
    options: ['to', 'at', 'in'],
    correctAnswer: 'to',
    explanation: '"Go to" indicates movement toward a destination.'
  },
  {
    id: 'gf-a2-02',
    type: 'gap_fill',
    cefrLevel: 'A2',
    sentence: 'She ___ tennis every Saturday.',
    options: ['plays', 'played', 'playing'],
    correctAnswer: 'plays',
    explanation: '"Every Saturday" indicates a habitual action, so we use present simple. "She" requires the -s ending.'
  },
  {
    id: 'gf-a2-03',
    type: 'gap_fill',
    cefrLevel: 'A2',
    sentence: 'I ___ my homework last night.',
    options: ['did', 'do', 'does'],
    correctAnswer: 'did',
    explanation: '"Last night" tells us the action is in the past, so we use "did".'
  },
  {
    id: 'gf-a2-04',
    type: 'gap_fill',
    cefrLevel: 'A2',
    sentence: 'The cat is sitting ___ the table.',
    options: ['on', 'at', 'to'],
    correctAnswer: 'on',
    explanation: '"On" is used when something is resting on a surface.'
  },
  {
    id: 'gf-a2-05',
    type: 'gap_fill',
    cefrLevel: 'A2',
    sentence: 'There ___ many people at the concert.',
    options: ['were', 'was', 'is'],
    correctAnswer: 'were',
    explanation: '"People" is plural and the context is past tense, so we use "were".'
  },

  // ── Gap Fill: B1 (5) ────────────────────────────────────────────────
  {
    id: 'gf-b1-01',
    type: 'gap_fill',
    cefrLevel: 'B1',
    sentence: 'If I ___ rich, I would travel the world.',
    options: ['were', 'was', 'am'],
    correctAnswer: 'were',
    explanation: 'In second conditional (hypothetical situations), we use "were" for all subjects, including "I".'
  },
  {
    id: 'gf-b1-02',
    type: 'gap_fill',
    cefrLevel: 'B1',
    sentence: 'She has ___ in London for five years.',
    options: ['lived', 'living', 'live'],
    correctAnswer: 'lived',
    explanation: 'Present perfect ("has" + past participle) is used for actions that started in the past and continue to the present.'
  },
  {
    id: 'gf-b1-03',
    type: 'gap_fill',
    cefrLevel: 'B1',
    sentence: 'I ___ already finished my homework when he called.',
    options: ['had', 'have', 'has'],
    correctAnswer: 'had',
    explanation: 'Past perfect ("had" + past participle) describes an action completed before another past action.'
  },
  {
    id: 'gf-b1-04',
    type: 'gap_fill',
    cefrLevel: 'B1',
    sentence: 'You should ___ harder if you want to pass the exam.',
    options: ['study', 'studied', 'studying'],
    correctAnswer: 'study',
    explanation: 'After modal verbs like "should", we use the base form of the verb (infinitive without "to").'
  },
  {
    id: 'gf-b1-05',
    type: 'gap_fill',
    cefrLevel: 'B1',
    sentence: 'The movie was ___ interesting than the book.',
    options: ['more', 'most', 'much'],
    correctAnswer: 'more',
    explanation: 'We use "more" + adjective for comparatives with multi-syllable adjectives like "interesting".'
  },

  // ── Gap Fill: B2 (5) ────────────────────────────────────────────────
  {
    id: 'gf-b2-01',
    type: 'gap_fill',
    cefrLevel: 'B2',
    sentence: 'Had she ___ earlier, she wouldn\'t have missed the train.',
    options: ['left', 'leave', 'leaving'],
    correctAnswer: 'left',
    explanation: 'This is an inverted third conditional. "Had" + subject + past participle replaces "If she had left...".'
  },
  {
    id: 'gf-b2-02',
    type: 'gap_fill',
    cefrLevel: 'B2',
    sentence: 'The project is expected ___ by the end of the month.',
    options: ['to be completed', 'completing', 'to complete'],
    correctAnswer: 'to be completed',
    explanation: '"Is expected" requires a passive infinitive ("to be completed") because the project receives the action.'
  },
  {
    id: 'gf-b2-03',
    type: 'gap_fill',
    cefrLevel: 'B2',
    sentence: 'Not until she read the letter ___ she understand the situation.',
    options: ['did', 'does', 'was'],
    correctAnswer: 'did',
    explanation: 'Negative adverb fronting ("Not until...") triggers subject-auxiliary inversion. Past tense requires "did".'
  },
  {
    id: 'gf-b2-04',
    type: 'gap_fill',
    cefrLevel: 'B2',
    sentence: 'The manager insisted that the report ___ submitted by Friday.',
    options: ['be', 'is', 'was'],
    correctAnswer: 'be',
    explanation: 'After verbs of demand/insistence, the subjunctive mood uses the bare infinitive "be" regardless of subject.'
  },
  {
    id: 'gf-b2-05',
    type: 'gap_fill',
    cefrLevel: 'B2',
    sentence: 'She spoke as if she ___ the answer all along.',
    options: ['had known', 'has known', 'knows'],
    correctAnswer: 'had known',
    explanation: '"As if" + past perfect indicates an unreal or hypothetical past situation.'
  }
]
