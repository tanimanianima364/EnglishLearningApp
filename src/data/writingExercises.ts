export interface SentenceOrderExercise {
  id: string
  type: 'sentence_order'
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  hint?: string
  words: string[]
  correctOrder: string[]
}

export interface GapFillExercise {
  id: string
  type: 'gap_fill'
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  sentence: string
  options: string[]
  correctAnswer: string
  explanation: string
}

export interface ParagraphOrderExercise {
  id: string
  type: 'paragraph_order'
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  hint: string
  paragraphs: string[]  // shuffled paragraphs
  correctOrder: number[]  // correct indices
}

export interface KeywordTransformExercise {
  id: string
  type: 'keyword_transform'
  cefrLevel: 'C1' | 'C2'
  instruction: string
  originalSentence: string
  keyword: string
  correctAnswer: string
  explanation: string
}

export type WritingExerciseItem = SentenceOrderExercise | GapFillExercise | ParagraphOrderExercise | KeywordTransformExercise

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
  },

  // ── Sentence Order: C1 (5) ──────────────────────────────────────────
  {
    id: 'c1-so-1',
    type: 'sentence_order',
    cefrLevel: 'C1',
    hint: 'Complex subordinate clause',
    words: ['the', 'government', 'announced', 'that', 'it', 'would', 'be', 'implementing', 'sweeping', 'reforms,', 'despite', 'opposition', 'from', 'several', 'parties'],
    correctOrder: ['the', 'government', 'announced', 'that', 'it', 'would', 'be', 'implementing', 'sweeping', 'reforms,', 'despite', 'opposition', 'from', 'several', 'parties']
  },
  {
    id: 'c1-so-2',
    type: 'sentence_order',
    cefrLevel: 'C1',
    hint: 'Relative clause positioning',
    words: ['candidate,', 'whose', 'The', 'qualifications', 'were', 'outstanding,', 'was', 'offered', 'the', 'position', 'immediately'],
    correctOrder: ['The', 'candidate,', 'whose', 'qualifications', 'were', 'outstanding,', 'was', 'offered', 'the', 'position', 'immediately']
  },
  {
    id: 'c1-so-3',
    type: 'sentence_order',
    cefrLevel: 'C1',
    hint: 'Participial phrase placement',
    words: ['Having', 'completed', 'the', 'analysis,', 'the', 'researchers', 'proceeded', 'to', 'publish', 'their', 'findings'],
    correctOrder: ['Having', 'completed', 'the', 'analysis,', 'the', 'researchers', 'proceeded', 'to', 'publish', 'their', 'findings']
  },
  {
    id: 'c1-so-4',
    type: 'sentence_order',
    cefrLevel: 'C1',
    hint: 'Advanced connector usage',
    words: ['Notwithstanding', 'the', 'financial', 'constraints,', 'the', 'board', 'resolved', 'to', 'proceed', 'with', 'the', 'expansion'],
    correctOrder: ['Notwithstanding', 'the', 'financial', 'constraints,', 'the', 'board', 'resolved', 'to', 'proceed', 'with', 'the', 'expansion']
  },
  {
    id: 'c1-so-5',
    type: 'sentence_order',
    cefrLevel: 'C1',
    hint: 'Complex subordination with result clause',
    words: ['so', 'rapidly', 'changed', 'The', 'situation', 'that', 'no', 'one', 'could', 'have', 'predicted', 'the', 'outcome'],
    correctOrder: ['The', 'situation', 'changed', 'so', 'rapidly', 'that', 'no', 'one', 'could', 'have', 'predicted', 'the', 'outcome']
  },

  // ── Gap Fill: C1 (5) ──────────────────────────────────────────────
  {
    id: 'c1-gf-1',
    type: 'gap_fill',
    cefrLevel: 'C1',
    sentence: 'If she ___ the job last year, she would be living in Paris now.',
    options: ['had taken', 'took', 'would take'],
    correctAnswer: 'had taken',
    explanation: 'This is a mixed conditional combining a past condition (third conditional "if" clause) with a present result (second conditional main clause).'
  },
  {
    id: 'c1-gf-2',
    type: 'gap_fill',
    cefrLevel: 'C1',
    sentence: 'Rarely ___ such a compelling argument in an academic paper.',
    options: ['does one encounter', 'one encounters', 'encountering one'],
    correctAnswer: 'does one encounter',
    explanation: 'Negative/restrictive adverbs like "Rarely" at the start of a sentence trigger subject-auxiliary inversion.'
  },
  {
    id: 'c1-gf-3',
    type: 'gap_fill',
    cefrLevel: 'C1',
    sentence: 'The new policy is believed ___ by a majority of the staff.',
    options: ['to be supported', 'to support', 'supporting'],
    correctAnswer: 'to be supported',
    explanation: 'After passive reporting verbs ("is believed"), a passive infinitive ("to be supported") is needed when the subject receives the action.'
  },
  {
    id: 'c1-gf-4',
    type: 'gap_fill',
    cefrLevel: 'C1',
    sentence: 'She had her entire thesis ___ by a professional editor before submission.',
    options: ['reviewed', 'reviewing', 'to review'],
    correctAnswer: 'reviewed',
    explanation: 'The causative "have" structure uses "have + object + past participle" when someone else performs the action on your behalf.'
  },
  {
    id: 'c1-gf-5',
    type: 'gap_fill',
    cefrLevel: 'C1',
    sentence: 'It ___ the lack of funding that ultimately derailed the project.',
    options: ['was', 'had', 'has'],
    correctAnswer: 'was',
    explanation: 'This is a cleft sentence ("It was... that...") used to emphasise "the lack of funding" as the key factor.'
  },

  // ── Sentence Order: C2 (5) ──────────────────────────────────────────
  {
    id: 'c2-so-1',
    type: 'sentence_order',
    cefrLevel: 'C2',
    hint: 'Subjunctive mood ordering',
    words: ['it', 'essential', 'that', 'every', 'delegate', 'be', 'present', 'It', 'is', 'at', 'the', 'opening', 'ceremony'],
    correctOrder: ['It', 'is', 'essential', 'that', 'every', 'delegate', 'be', 'present', 'at', 'the', 'opening', 'ceremony']
  },
  {
    id: 'c2-so-2',
    type: 'sentence_order',
    cefrLevel: 'C2',
    hint: 'Nominalization pattern',
    words: ['The', 'proliferation', 'of', 'misinformation', 'poses', 'a', 'significant', 'threat', 'to', 'democratic', 'institutions'],
    correctOrder: ['The', 'proliferation', 'of', 'misinformation', 'poses', 'a', 'significant', 'threat', 'to', 'democratic', 'institutions']
  },
  {
    id: 'c2-so-3',
    type: 'sentence_order',
    cefrLevel: 'C2',
    hint: 'Fronting and topicalization',
    words: ['Of', 'particular', 'concern', 'is', 'the', 'disproportionate', 'impact', 'on', 'vulnerable', 'communities'],
    correctOrder: ['Of', 'particular', 'concern', 'is', 'the', 'disproportionate', 'impact', 'on', 'vulnerable', 'communities']
  },
  {
    id: 'c2-so-4',
    type: 'sentence_order',
    cefrLevel: 'C2',
    hint: 'Concessive clause ordering',
    words: ['be', 'the', 'evidence,', 'compelling', 'Much', 'as', 'may', 'the', 'conclusion', 'remains', 'contentious'],
    correctOrder: ['Much', 'as', 'the', 'evidence', 'may', 'be', 'compelling,', 'the', 'conclusion', 'remains', 'contentious']
  },
  {
    id: 'c2-so-5',
    type: 'sentence_order',
    cefrLevel: 'C2',
    hint: 'Ellipsis in formal register',
    words: ['The', 'first', 'experiment', 'succeeded', 'the', 'second', 'and', 'did', 'not'],
    correctOrder: ['The', 'first', 'experiment', 'succeeded', 'and', 'the', 'second', 'did', 'not']
  },

  // ── Gap Fill: C2 (5) ──────────────────────────────────────────────
  {
    id: 'c2-gf-1',
    type: 'gap_fill',
    cefrLevel: 'C2',
    sentence: 'The committee demanded that the director ___ a formal apology.',
    options: ['issue', 'issues', 'issued'],
    correctAnswer: 'issue',
    explanation: 'After verbs of demand ("demanded that"), the subjunctive mood requires the bare infinitive "issue" regardless of the subject.'
  },
  {
    id: 'c2-gf-2',
    type: 'gap_fill',
    cefrLevel: 'C2',
    sentence: 'The findings ___ to suggest a correlation, though further research is warranted.',
    options: ['would appear', 'appear', 'appeared'],
    correctAnswer: 'would appear',
    explanation: '"Would appear" is an advanced hedging device used in academic writing to present conclusions tentatively and cautiously.'
  },
  {
    id: 'c2-gf-3',
    type: 'gap_fill',
    cefrLevel: 'C2',
    sentence: 'The ___ of bilateral trade agreements has reshaped the global economy.',
    options: ['liberalisation', 'liberalise', 'liberalising'],
    correctAnswer: 'liberalisation',
    explanation: 'Nominalization converts a verb ("liberalise") into its noun form ("liberalisation") for a more formal, academic register.'
  },
  {
    id: 'c2-gf-4',
    type: 'gap_fill',
    cefrLevel: 'C2',
    sentence: 'So profound was the silence that one could ___ have heard a pin drop.',
    options: ['well', 'easily', 'quite'],
    correctAnswer: 'well',
    explanation: 'In literary register, "could well have" is an idiomatic construction expressing strong possibility, fitting the elevated tone of the inverted sentence.'
  },
  {
    id: 'c2-gf-5',
    type: 'gap_fill',
    cefrLevel: 'C2',
    sentence: 'The policy has merit; ___, its implementation raises serious ethical concerns.',
    options: ['that said', 'moreover', 'likewise'],
    correctAnswer: 'that said',
    explanation: '"That said" is a concessive discourse marker used to introduce a contrasting point that qualifies a previous statement, appropriate in formal and semi-formal writing.'
  },

  // ── Paragraph Order: C1 (3) ──────────────────────────────────────────

  {
    id: 'po-c1-01',
    type: 'paragraph_order',
    cefrLevel: 'C1',
    hint: 'Academic argument structure: thesis, evidence, counterargument, rebuttal, conclusion',
    paragraphs: [
      'Critics of universal basic income contend that such programmes create dependency and disincentivise productive employment. They point to concerns about fiscal sustainability and argue that targeted welfare provisions are more efficient than blanket transfers.',
      'The concept of universal basic income has gained considerable traction in recent policy debates as a potential remedy for rising inequality and the displacement of workers through automation. Proponents argue that a guaranteed minimum income would provide a safety net that empowers individuals to pursue education, entrepreneurship, and caregiving without the existential anxiety of destitution.',
      'However, these objections are not borne out by the available empirical evidence. Pilot programmes in Finland, Kenya, and Stockton, California have consistently demonstrated that recipients do not reduce their labour participation significantly; instead, they invest in skills development, health, and community engagement.',
      'In light of the evidence, the case for universal basic income rests not on utopian idealism but on pragmatic assessment. While implementation details — funding mechanisms, payment levels, and integration with existing social services — require careful calibration, the principle of guaranteeing a baseline of economic security deserves serious political consideration.',
      'Several randomised controlled trials have provided rigorous data on the behavioural effects of unconditional cash transfers. The GiveDirectly programme in rural Kenya, for instance, tracked over twenty thousand recipients over twelve years, finding sustained improvements in consumption, assets, and psychological wellbeing with no measurable increase in expenditure on alcohol or tobacco.'
    ],
    correctOrder: [1, 4, 0, 2, 3]
  },
  {
    id: 'po-c1-02',
    type: 'paragraph_order',
    cefrLevel: 'C1',
    hint: 'Cause-and-effect essay: phenomenon, primary cause, secondary cause, effects, implications',
    paragraphs: [
      'A secondary but equally significant driver is the intensification of agricultural practices. The widespread use of neonicotinoid pesticides has been shown to impair bee navigation, foraging efficiency, and reproductive capacity, even at sub-lethal doses. Monoculture farming reduces the diversity of floral resources available to pollinators, creating nutritional deficits that weaken colony resilience.',
      'The decline of pollinator populations across the industrialised world represents one of the most ecologically consequential trends of the early twenty-first century. Honeybee colonies in the United States have declined by approximately forty percent since 2006, while wild bee species in Europe face extinction rates that are accelerating year on year.',
      'The consequences of pollinator decline extend far beyond the apiary. Approximately seventy-five percent of the world\'s food crops depend to some degree on animal pollination. A sustained reduction in pollinator services would compromise global food security, increase agricultural costs, and destabilise ecosystems that rely on plant reproduction for their structural integrity.',
      'These findings demand an integrated policy response that addresses the root causes of pollinator decline simultaneously. Restricting the use of systemic pesticides, incentivising diversified farming systems, protecting and restoring natural habitats, and investing in research on pollinator health are all necessary components of a strategy adequate to the scale of the crisis.',
      'The primary cause of this decline is habitat loss driven by urbanisation and land-use change. As natural meadows, hedgerows, and wildflower corridors are converted to residential and commercial development, pollinators lose the nesting sites and foraging grounds essential to their survival.'
    ],
    correctOrder: [1, 4, 0, 2, 3]
  },
  {
    id: 'po-c1-03',
    type: 'paragraph_order',
    cefrLevel: 'C1',
    hint: 'Compare-contrast essay: introduction, first subject, second subject, key differences, synthesis',
    paragraphs: [
      'In conclusion, the choice between renewable and nuclear energy is not binary but context-dependent. An optimal decarbonisation strategy will likely integrate both technologies, leveraging the rapid scalability of renewables while utilising nuclear power to provide the baseload stability that intermittent sources cannot yet guarantee.',
      'Renewable energy sources, particularly solar and wind, have experienced dramatic cost reductions over the past decade. The levelised cost of solar photovoltaic electricity has fallen by approximately ninety percent since 2010, making it competitive with or cheaper than fossil fuels in many markets. However, the intermittency of these sources poses significant challenges for grid reliability, requiring substantial investment in energy storage and transmission infrastructure.',
      'The critical differences between the two approaches concern scalability, public acceptance, and waste management. Renewables can be deployed incrementally and enjoy broad public support, but they require vast land areas and produce electronic waste. Nuclear power is spatially compact and produces minimal greenhouse emissions during operation, but it generates radioactive waste requiring secure storage for millennia and faces persistent public opposition rooted in the legacy of Chernobyl and Fukushima.',
      'Nuclear energy, by contrast, offers a continuous and highly concentrated source of low-carbon electricity. A single nuclear plant can generate the equivalent output of thousands of wind turbines while occupying a fraction of the land area. Nevertheless, the sector faces formidable barriers: construction costs and timelines routinely exceed projections, regulatory frameworks are complex, and the unresolved question of long-term radioactive waste disposal remains a significant liability.',
      'The transition from fossil fuels to low-carbon energy systems is widely recognised as one of the defining challenges of the twenty-first century. Two principal alternatives — renewable energy and nuclear power — dominate the discourse, each presenting distinct advantages and limitations that merit careful comparative analysis.'
    ],
    correctOrder: [4, 1, 3, 2, 0]
  },

  // ── Paragraph Order: C2 (3) ──────────────────────────────────────────

  {
    id: 'po-c2-01',
    type: 'paragraph_order',
    cefrLevel: 'C2',
    hint: 'Philosophical argument: premise, historical context, dialectical development, objection and response, synthesis',
    paragraphs: [
      'The most formidable objection to moral realism is the argument from disagreement: if objective moral facts exist, why do cultures, traditions, and individuals diverge so profoundly in their moral judgments? The moral realist\'s response is that disagreement is not evidence of the absence of truth but of the difficulty of apprehending it — just as persistent disagreement among scientists about quantum gravity does not entail that there are no facts about the fundamental structure of spacetime.',
      'The question of whether moral claims possess objective truth-value — whether statements such as "torture is wrong" describe features of reality independent of human attitudes — has animated philosophical debate since antiquity. Plato\'s theory of the Forms posited an immutable moral order apprehensible through reason, while the Sophists countered that justice and virtue are merely conventions that vary with custom and power.',
      'What emerges from this dialectical exchange is not a definitive resolution but a more sophisticated articulation of the problem. Moral inquiry, like scientific inquiry, proceeds under conditions of fallibility and contestation. The recognition that our moral judgments may be shaped by contingent cultural and psychological factors need not collapse into nihilism; it can instead motivate the ongoing critical examination of our moral commitments and the institutional arrangements through which they are enacted.',
      'The Enlightenment revived these debates in characteristically modern terms. Kant\'s deontological framework sought to ground morality in the categorical imperative — a principle derivable from pure practical reason alone, independent of empirical contingencies. Hume, by contrast, argued that moral judgments are expressions of sentiment rather than reason, that "ought" cannot be derived from "is," and that the foundations of morality lie in human psychology rather than in the structure of reality.',
      'The twentieth century witnessed a proliferation of meta-ethical positions that complicate this binary. Error theorists such as J.L. Mackie argued that moral statements, while purporting to describe objective facts, are systematically false — there are no moral properties in the world for them to correspond to. Constructivists, following Rawls and Scanlon, proposed a middle path: moral truths are not discovered in nature but constructed through procedures of rational agreement under idealised conditions of fairness.'
    ],
    correctOrder: [1, 3, 4, 0, 2]
  },
  {
    id: 'po-c2-02',
    type: 'paragraph_order',
    cefrLevel: 'C2',
    hint: 'Policy analysis: problem statement, stakeholder analysis, policy options, evaluation of trade-offs, recommendation',
    paragraphs: [
      'A third option — a hybrid regulatory model combining binding minimum standards with voluntary industry codes — merits serious consideration. Under such a framework, governments would establish enforceable baseline requirements for transparency, accountability, and non-discrimination, while permitting industry-led innovation in compliance mechanisms. This approach balances the need for democratic oversight with the practical recognition that regulatory frameworks must be sufficiently flexible to accommodate rapid technological change.',
      'The stakeholders in this debate hold divergent and often irreconcilable interests. Technology companies argue that overly prescriptive regulation stifles innovation and impedes the development of beneficial applications. Civil liberties organisations contend that voluntary industry self-regulation has consistently failed to prevent discriminatory outcomes, surveillance overreach, and the erosion of individual autonomy. Governments face the dual challenge of promoting economic competitiveness while fulfilling their obligation to protect fundamental rights.',
      'The governance of artificial intelligence systems presents one of the most consequential regulatory challenges of the contemporary era. As algorithmic decision-making penetrates domains of profound social significance — criminal sentencing, credit allocation, hiring, healthcare triage, and autonomous weaponry — the absence of comprehensive regulatory frameworks raises urgent questions about accountability, transparency, and the protection of fundamental rights.',
      'Two principal regulatory approaches have emerged in the policy discourse. The European Union\'s AI Act represents the most ambitious attempt at comprehensive legislation, establishing a risk-based classification system that imposes graduated obligations on developers and deployers of AI systems. The United States, by contrast, has largely favoured a sector-specific and market-driven approach, relying on existing regulatory agencies and voluntary industry commitments rather than enacting overarching legislation.',
      'Ultimately, the governance of artificial intelligence cannot be resolved through technical or legal instruments alone. It demands a sustained democratic deliberation about the values that should govern the design, deployment, and oversight of systems that increasingly shape the conditions of human life. The legitimacy of any regulatory framework will depend not only on its efficacy but on the breadth and inclusivity of the process through which it is developed.'
    ],
    correctOrder: [2, 1, 3, 0, 4]
  },
  {
    id: 'po-c2-03',
    type: 'paragraph_order',
    cefrLevel: 'C2',
    hint: 'Literary analysis: thesis about the work, close reading of form, thematic analysis, contextual interpretation, evaluative conclusion',
    paragraphs: [
      'Read in the context of its historical moment — the aftermath of the First World War, the collapse of imperial certainties, and the fragmenting of shared cultural narratives — "The Waste Land" emerges as a document of civilisational crisis. Eliot\'s method of mythical juxtaposition, drawing on the vegetation myths analysed by Frazer and Weston, transforms personal despair into an archetypal narrative of cultural death and the uncertain possibility of renewal.',
      'T.S. Eliot\'s "The Waste Land" remains, a century after its publication, one of the most formally audacious and interpretively inexhaustible poems in the English language. Its radical fragmentation of voice, perspective, and cultural reference enacts, at the level of poetic form, the disintegration of coherent meaning that constitutes its central thematic preoccupation.',
      'Thematically, the poem anatomises a world drained of spiritual significance. The recurrent imagery of drought, sterility, and failed communication — "I can connect / Nothing with nothing" — constructs a landscape in which the sources of meaning that once sustained Western civilisation have been exhausted. Yet this desolation is not presented as final; the poem\'s closing movement, with its fragments of Sanskrit benediction and its conditional "Shantih shantih shantih," gestures toward a regeneration that remains tantalizingly out of reach.',
      'The poem\'s formal properties resist conventional analysis. Its five sections shift abruptly between registers, languages, and historical periods, incorporating allusions to Dante, Shakespeare, Wagner, the Upanishads, and popular music hall songs within a single textual surface. This polyphonic method is not ornamental but structural: the juxtaposition of heterogeneous materials without connective tissue forces the reader into an active interpretive role, assembling coherence from fragments rather than receiving it passively.',
      'What "The Waste Land" ultimately achieves is a paradoxical triumph of form over the dissolution it describes. The very poem that announces the impossibility of coherent meaning is itself a magnificently coherent artistic structure — an artefact whose formal mastery testifies to the resilience of the creative imagination even amid cultural ruin. It is this tension between thematic despair and formal accomplishment that ensures the poem\'s enduring capacity to provoke, disturb, and illuminate.'
    ],
    correctOrder: [1, 3, 2, 0, 4]
  },
  // C2 Keyword Transformation exercises — rewrite using a specific word/structure
  { id: 'kt-c2-01', type: 'keyword_transform', cefrLevel: 'C2', instruction: 'Rewrite the sentence using the word given so that it has the same meaning.', originalSentence: 'He was completely unaware of the danger he was in.', keyword: 'NO', correctAnswer: 'Under no circumstances was he aware of the danger he was in.', explanation: 'The keyword "NO" triggers negative fronting with subject-auxiliary inversion: "Under no circumstances + was he..."' },
  { id: 'kt-c2-02', type: 'keyword_transform', cefrLevel: 'C2', instruction: 'Rewrite the sentence using the word given so that it has the same meaning.', originalSentence: 'The committee decided to postpone the decision because they had not examined all the evidence.', keyword: 'UNTIL', correctAnswer: 'Not until all the evidence had been examined did the committee decide.', explanation: '"Not until" fronting requires inversion of the main clause: "Not until X did Y..."' },
  { id: 'kt-c2-03', type: 'keyword_transform', cefrLevel: 'C2', instruction: 'Rewrite the sentence using the word given so that it has the same meaning.', originalSentence: 'The fact that the policy failed was what surprised everyone.', keyword: 'IT', correctAnswer: 'It was the failure of the policy that surprised everyone.', explanation: 'It-cleft construction: "It was X that Y." Also note the nominalization: "the policy failed" → "the failure of the policy."' },
  { id: 'kt-c2-04', type: 'keyword_transform', cefrLevel: 'C2', instruction: 'Rewrite the sentence using the word given so that it has the same meaning.', originalSentence: 'If the government had invested more in education, we would not be facing this crisis now.', keyword: 'HAD', correctAnswer: 'Had the government invested more in education, we would not be facing this crisis now.', explanation: 'Conditional inversion: "If + subject + had" becomes "Had + subject" with the "if" dropped.' },
  { id: 'kt-c2-05', type: 'keyword_transform', cefrLevel: 'C2', instruction: 'Rewrite the sentence using the word given so that it has the same meaning.', originalSentence: 'People generally believe that the economy will recover next year.', keyword: 'BELIEVED', correctAnswer: 'The economy is generally believed to recover next year.', explanation: 'Passive with reporting verb: "People believe X" → "X is believed to..."' },
  { id: 'kt-c2-06', type: 'keyword_transform', cefrLevel: 'C2', instruction: 'Rewrite the sentence using the word given so that it has the same meaning.', originalSentence: 'I really want to understand why they made that decision.', keyword: 'WHAT', correctAnswer: 'What I really want to understand is why they made that decision.', explanation: 'Wh-cleft (pseudo-cleft) construction: "What I X is Y" focuses the verb phrase as the topic.' },
  { id: 'kt-c2-07', type: 'keyword_transform', cefrLevel: 'C2', instruction: 'Rewrite the sentence using the word given so that it has the same meaning.', originalSentence: 'Although she appreciated the offer, she felt she could not accept it.', keyword: 'MUCH', correctAnswer: 'Much as she appreciated the offer, she felt she could not accept it.', explanation: '"Much as" is a concessive structure meaning "although very much." It maintains a formal, literary register.' },
  { id: 'kt-c2-08', type: 'keyword_transform', cefrLevel: 'C2', instruction: 'Rewrite the sentence using the word given so that it has the same meaning.', originalSentence: 'The researchers have suggested that the drug should be withdrawn immediately.', keyword: 'WITHDRAWAL', correctAnswer: 'The researchers have suggested the immediate withdrawal of the drug.', explanation: 'Nominalization: "the drug should be withdrawn immediately" → "the immediate withdrawal of the drug." This creates a more formal, academic register.' },
  { id: 'kt-c2-09', type: 'keyword_transform', cefrLevel: 'C2', instruction: 'Rewrite the sentence using the word given so that it has the same meaning.', originalSentence: 'The board insisted that the CEO should resign.', keyword: 'RESIGN', correctAnswer: 'The board insisted that the CEO resign.', explanation: 'Mandative subjunctive after "insist": "insist that X + bare infinitive" (no "should"). The subjunctive form is identical to the base form.' },
  { id: 'kt-c2-10', type: 'keyword_transform', cefrLevel: 'C2', instruction: 'Rewrite the sentence using the word given so that it has the same meaning.', originalSentence: 'She had hardly finished speaking when the audience began to applaud.', keyword: 'SOONER', correctAnswer: 'No sooner had she finished speaking than the audience began to applaud.', explanation: '"No sooner...than" with inversion: "No sooner + had + subject + past participle + than..."' },
  // C1 Keyword Transformation exercises
  { id: 'kt-c1-01', type: 'keyword_transform', cefrLevel: 'C1', instruction: 'Rewrite the sentence using the word given so that it has the same meaning.', originalSentence: 'If I were you, I would not accept that offer.', keyword: 'ADVISE', correctAnswer: 'I would advise you not to accept that offer.', explanation: 'Transforming a conditional recommendation into a direct advisory statement using "advise + object + (not) to + infinitive."' },
  { id: 'kt-c1-02', type: 'keyword_transform', cefrLevel: 'C1', instruction: 'Rewrite the sentence using the word given so that it has the same meaning.', originalSentence: 'They say that the minister knew about the scandal.', keyword: 'SAID', correctAnswer: 'The minister is said to have known about the scandal.', explanation: 'Passive with reporting verb and perfect infinitive: "They say X did Y" → "X is said to have done Y."' },
  { id: 'kt-c1-03', type: 'keyword_transform', cefrLevel: 'C1', instruction: 'Rewrite the sentence using the word given so that it has the same meaning.', originalSentence: 'The project failed because they did not plan adequately.', keyword: 'LACK', correctAnswer: 'The project failed due to a lack of adequate planning.', explanation: 'Nominalization with "lack": the verb phrase "did not plan adequately" becomes the noun phrase "a lack of adequate planning."' },
  { id: 'kt-c1-04', type: 'keyword_transform', cefrLevel: 'C1', instruction: 'Rewrite the sentence using the word given so that it has the same meaning.', originalSentence: 'I had never seen such a beautiful sunset before.', keyword: 'NEVER', correctAnswer: 'Never before had I seen such a beautiful sunset.', explanation: 'Negative fronting with inversion: placing "Never before" at the start triggers auxiliary inversion.' },
  { id: 'kt-c1-05', type: 'keyword_transform', cefrLevel: 'C1', instruction: 'Rewrite the sentence using the word given so that it has the same meaning.', originalSentence: 'Although the evidence was strong, the jury could not reach a verdict.', keyword: 'DESPITE', correctAnswer: 'Despite the strength of the evidence, the jury could not reach a verdict.', explanation: '"Despite" requires a noun phrase: "Although the evidence was strong" → "Despite the strength of the evidence" (nominalization).' },
]
