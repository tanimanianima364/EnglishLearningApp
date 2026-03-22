export interface GrammarExerciseItem {
  id: string
  type: 'multiple_choice' | 'error_correction' | 'fill_blank'
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
}

export interface GrammarLesson {
  id: string
  title: string
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  category: string
  explanation: string
  examples: string[]
  exercises: GrammarExerciseItem[]
}

export const grammarLessons: GrammarLesson[] = [
  // ===== A1 =====
  {
    id: 'a1-be',
    title: 'Verb "to be"',
    cefrLevel: 'A1',
    category: 'Tenses',
    explanation: 'The verb "to be" changes form depending on the subject: I am, you are, he/she/it is, we are, they are.',
    examples: ['I am a student.', 'She is happy.', 'They are from Japan.'],
    exercises: [
      { id: 'a1-be-1', type: 'fill_blank', question: 'She ___ a doctor.', options: ['am', 'is', 'are'], correctAnswer: 'is', explanation: '"She" is third person singular, so we use "is".' },
      { id: 'a1-be-2', type: 'fill_blank', question: 'We ___ students.', options: ['am', 'is', 'are'], correctAnswer: 'are', explanation: '"We" is first person plural, so we use "are".' },
      { id: 'a1-be-3', type: 'fill_blank', question: 'I ___ happy today.', options: ['am', 'is', 'are'], correctAnswer: 'am', explanation: '"I" always takes "am".' },
      { id: 'a1-be-4', type: 'error_correction', question: 'He are a teacher.', correctAnswer: 'He is a teacher.', explanation: '"He" is third person singular, so it takes "is", not "are".' },
      { id: 'a1-be-5', type: 'multiple_choice', question: 'Which sentence is correct?', options: ['They is friends.', 'They am friends.', 'They are friends.', 'They be friends.'], correctAnswer: 'They are friends.', explanation: '"They" is third person plural and takes "are".' },
    ]
  },
  {
    id: 'a1-articles',
    title: 'Articles: a, an, the',
    cefrLevel: 'A1',
    category: 'Articles',
    explanation: 'Use "a" before consonant sounds, "an" before vowel sounds. Use "the" when talking about something specific or already mentioned.',
    examples: ['I have a cat.', 'She is an engineer.', 'The book on the table is mine.'],
    exercises: [
      { id: 'a1-art-1', type: 'fill_blank', question: 'She is ___ honest person.', options: ['a', 'an', 'the'], correctAnswer: 'an', explanation: '"Honest" starts with a vowel sound (the "h" is silent), so we use "an".' },
      { id: 'a1-art-2', type: 'fill_blank', question: 'I bought ___ new car yesterday.', options: ['a', 'an', 'the'], correctAnswer: 'a', explanation: 'This is the first mention of the car (non-specific), and "new" starts with a consonant sound.' },
      { id: 'a1-art-3', type: 'fill_blank', question: '___ sun rises in the east.', options: ['A', 'An', 'The'], correctAnswer: 'The', explanation: 'There is only one sun, so we use "the" for unique things.' },
      { id: 'a1-art-4', type: 'error_correction', question: 'I need a umbrella.', correctAnswer: 'I need an umbrella.', explanation: '"Umbrella" starts with a vowel sound, so we use "an".' },
      { id: 'a1-art-5', type: 'multiple_choice', question: 'Choose the correct sentence:', options: ['He is a engineer.', 'He is an engineer.', 'He is the engineer.', 'He is engineer.'], correctAnswer: 'He is an engineer.', explanation: '"Engineer" starts with a vowel sound, so "an" is correct. No "the" because it\'s general, not specific.' },
    ]
  },
  {
    id: 'a1-pronouns',
    title: 'Personal Pronouns',
    cefrLevel: 'A1',
    category: 'Pronouns',
    explanation: 'Subject pronouns (I, you, he, she, it, we, they) are used as the subject. Object pronouns (me, you, him, her, it, us, them) are used after verbs and prepositions.',
    examples: ['He likes her.', 'She gave it to me.', 'We told them the news.'],
    exercises: [
      { id: 'a1-pro-1', type: 'fill_blank', question: 'Please give ___ the book.', options: ['I', 'me', 'my'], correctAnswer: 'me', explanation: 'After a verb (give), use the object pronoun "me".' },
      { id: 'a1-pro-2', type: 'fill_blank', question: '___ is my best friend.', options: ['Her', 'She', 'Hers'], correctAnswer: 'She', explanation: 'The subject of the sentence needs a subject pronoun: "She".' },
      { id: 'a1-pro-3', type: 'fill_blank', question: 'I saw ___ at the park.', options: ['they', 'them', 'their'], correctAnswer: 'them', explanation: 'After a verb (saw), use the object pronoun "them".' },
      { id: 'a1-pro-4', type: 'error_correction', question: 'Me like chocolate.', correctAnswer: 'I like chocolate.', explanation: 'The subject must be "I", not "me". "Me" is an object pronoun.' },
      { id: 'a1-pro-5', type: 'multiple_choice', question: 'Which is correct?', options: ['Him went home.', 'He went home.', 'His went home.'], correctAnswer: 'He went home.', explanation: '"He" is the subject pronoun. "Him" is the object pronoun.' },
    ]
  },
  {
    id: 'a1-present-simple',
    title: 'Present Simple',
    cefrLevel: 'A1',
    category: 'Tenses',
    explanation: 'Use present simple for habits, routines, and general truths. Add -s/-es to the verb for he/she/it. Use "do/does" for negatives and questions.',
    examples: ['I work every day.', 'She likes coffee.', 'They don\'t eat meat.'],
    exercises: [
      { id: 'a1-ps-1', type: 'fill_blank', question: 'He ___ to school by bus.', options: ['go', 'goes', 'going'], correctAnswer: 'goes', explanation: 'Third person singular (he) requires -es: "goes".' },
      { id: 'a1-ps-2', type: 'fill_blank', question: 'She ___ not like spicy food.', options: ['do', 'does', 'is'], correctAnswer: 'does', explanation: 'Third person singular (she) uses "does" in negative forms.' },
      { id: 'a1-ps-3', type: 'error_correction', question: 'He play tennis every weekend.', correctAnswer: 'He plays tennis every weekend.', explanation: 'Third person singular requires -s: "plays".' },
      { id: 'a1-ps-4', type: 'fill_blank', question: '___ you speak English?', options: ['Do', 'Does', 'Are'], correctAnswer: 'Do', explanation: '"You" takes "do" in questions.' },
      { id: 'a1-ps-5', type: 'multiple_choice', question: 'Which is correct?', options: ['She drink coffee.', 'She drinks coffee.', 'She drinking coffee.'], correctAnswer: 'She drinks coffee.', explanation: 'Present simple with "she" needs -s on the verb.' },
    ]
  },
  {
    id: 'a1-word-order',
    title: 'Basic Word Order (SVO)',
    cefrLevel: 'A1',
    category: 'Sentence Structure',
    explanation: 'English sentences follow Subject + Verb + Object order. Questions often start with an auxiliary verb (do, does, is, are) or a question word (what, where, when).',
    examples: ['The cat chased the mouse.', 'Do you like pizza?', 'Where is the station?'],
    exercises: [
      { id: 'a1-wo-1', type: 'multiple_choice', question: 'Which sentence has correct word order?', options: ['Like I chocolate.', 'Chocolate I like.', 'I like chocolate.', 'I chocolate like.'], correctAnswer: 'I like chocolate.', explanation: 'English uses Subject (I) + Verb (like) + Object (chocolate).' },
      { id: 'a1-wo-2', type: 'error_correction', question: 'Goes she to school every day.', correctAnswer: 'She goes to school every day.', explanation: 'In statements, the subject comes before the verb: She goes...' },
      { id: 'a1-wo-3', type: 'multiple_choice', question: 'Which question is correct?', options: ['You do like coffee?', 'Do you like coffee?', 'Like you do coffee?'], correctAnswer: 'Do you like coffee?', explanation: 'Questions start with the auxiliary verb: Do + subject + verb.' },
      { id: 'a1-wo-4', type: 'error_correction', question: 'The very is dog big.', correctAnswer: 'The dog is very big.', explanation: 'Correct order: Subject (The dog) + Verb (is) + Adverb (very) + Adjective (big).' },
      { id: 'a1-wo-5', type: 'fill_blank', question: '___ does she work?', options: ['What', 'Where', 'Who'], correctAnswer: 'Where', explanation: '"Where" asks about a place. "Where does she work?" = asking about her workplace.' },
    ]
  },

  // ===== A2 =====
  {
    id: 'a2-past-simple',
    title: 'Past Simple',
    cefrLevel: 'A2',
    category: 'Tenses',
    explanation: 'Use past simple for completed actions in the past. Regular verbs add -ed. Many common verbs are irregular (go→went, eat→ate, see→saw).',
    examples: ['I visited Paris last year.', 'She went to the store.', 'They didn\'t come to the party.'],
    exercises: [
      { id: 'a2-pt-1', type: 'fill_blank', question: 'She ___ to the cinema yesterday.', options: ['go', 'goes', 'went'], correctAnswer: 'went', explanation: '"Go" is irregular. Past simple form is "went".' },
      { id: 'a2-pt-2', type: 'fill_blank', question: 'They ___ dinner at home last night.', options: ['have', 'had', 'has'], correctAnswer: 'had', explanation: '"Have" is irregular. Past simple form is "had".' },
      { id: 'a2-pt-3', type: 'error_correction', question: 'I goed to school yesterday.', correctAnswer: 'I went to school yesterday.', explanation: '"Go" is irregular — the past form is "went", not "goed".' },
      { id: 'a2-pt-4', type: 'fill_blank', question: 'We ___ not see the movie.', options: ['do', 'did', 'was'], correctAnswer: 'did', explanation: 'Past simple negative uses "did not" (didn\'t) for all subjects.' },
      { id: 'a2-pt-5', type: 'multiple_choice', question: 'Which is correct?', options: ['He eated breakfast early.', 'He ate breakfast early.', 'He eat breakfast early.'], correctAnswer: 'He ate breakfast early.', explanation: '"Eat" is irregular. Past form is "ate".' },
      { id: 'a2-pt-6', type: 'fill_blank', question: 'I ___ a beautiful sunset last evening.', options: ['see', 'saw', 'seen'], correctAnswer: 'saw', explanation: '"See" → "saw" in the past simple.' },
    ]
  },
  {
    id: 'a2-present-continuous',
    title: 'Present Continuous',
    cefrLevel: 'A2',
    category: 'Tenses',
    explanation: 'Use present continuous (am/is/are + verb-ing) for actions happening right now, or temporary situations. Some verbs (know, like, want) are not usually used in continuous form.',
    examples: ['I am reading a book right now.', 'She is working from home this week.', 'They are waiting for the bus.'],
    exercises: [
      { id: 'a2-pc-1', type: 'fill_blank', question: 'She ___ (cook) dinner right now.', options: ['cooks', 'is cooking', 'cooked'], correctAnswer: 'is cooking', explanation: '"Right now" signals present continuous: is + verb-ing.' },
      { id: 'a2-pc-2', type: 'fill_blank', question: 'They ___ (play) football at the moment.', options: ['play', 'are playing', 'played'], correctAnswer: 'are playing', explanation: '"At the moment" signals present continuous: are + verb-ing.' },
      { id: 'a2-pc-3', type: 'error_correction', question: 'I am know the answer.', correctAnswer: 'I know the answer.', explanation: '"Know" is a stative verb and is not normally used in the continuous form.' },
      { id: 'a2-pc-4', type: 'multiple_choice', question: 'Which sentence uses present continuous correctly?', options: ['He is liking pizza.', 'He is eating pizza.', 'He is having a car.'], correctAnswer: 'He is eating pizza.', explanation: '"Eat" is an action verb and can be used in continuous form. "Like" and "have" (possession) are stative.' },
      { id: 'a2-pc-5', type: 'fill_blank', question: 'What ___ you doing?', options: ['is', 'am', 'are'], correctAnswer: 'are', explanation: '"You" takes "are" in present continuous questions.' },
    ]
  },
  {
    id: 'a2-prepositions',
    title: 'Prepositions of Time & Place',
    cefrLevel: 'A2',
    category: 'Prepositions',
    explanation: 'Time: "at" for specific times (at 3 PM), "on" for days/dates (on Monday), "in" for months/years/longer periods (in January). Place: "at" for specific points, "on" for surfaces, "in" for enclosed spaces.',
    examples: ['I wake up at 7 AM.', 'The meeting is on Friday.', 'She was born in 1990.'],
    exercises: [
      { id: 'a2-prep-1', type: 'fill_blank', question: 'The class starts ___ 9 o\'clock.', options: ['in', 'on', 'at'], correctAnswer: 'at', explanation: 'Use "at" for specific times.' },
      { id: 'a2-prep-2', type: 'fill_blank', question: 'I was born ___ March.', options: ['in', 'on', 'at'], correctAnswer: 'in', explanation: 'Use "in" for months.' },
      { id: 'a2-prep-3', type: 'fill_blank', question: 'We have a meeting ___ Monday.', options: ['in', 'on', 'at'], correctAnswer: 'on', explanation: 'Use "on" for days of the week.' },
      { id: 'a2-prep-4', type: 'fill_blank', question: 'The keys are ___ the table.', options: ['in', 'on', 'at'], correctAnswer: 'on', explanation: 'Use "on" for surfaces.' },
      { id: 'a2-prep-5', type: 'error_correction', question: 'She arrived at Monday morning.', correctAnswer: 'She arrived on Monday morning.', explanation: 'Use "on" with days: "on Monday morning".' },
    ]
  },
  {
    id: 'a2-comparatives',
    title: 'Comparatives & Superlatives',
    cefrLevel: 'A2',
    category: 'Adjectives',
    explanation: 'Short adjectives: add -er/-est (tall→taller→tallest). Long adjectives: use more/most (beautiful→more beautiful→most beautiful). Irregular: good→better→best, bad→worse→worst.',
    examples: ['She is taller than her sister.', 'This is the most beautiful park in the city.', 'His score was worse than mine.'],
    exercises: [
      { id: 'a2-comp-1', type: 'fill_blank', question: 'Tokyo is ___ than Osaka.', options: ['big', 'bigger', 'biggest'], correctAnswer: 'bigger', explanation: 'Comparative form with "than": bigger.' },
      { id: 'a2-comp-2', type: 'fill_blank', question: 'This is the ___ movie I have ever seen.', options: ['good', 'better', 'best'], correctAnswer: 'best', explanation: 'Superlative with "the": "good" → "best".' },
      { id: 'a2-comp-3', type: 'error_correction', question: 'She is more tall than me.', correctAnswer: 'She is taller than me.', explanation: '"Tall" is a short adjective, so use -er: "taller", not "more tall".' },
      { id: 'a2-comp-4', type: 'fill_blank', question: 'English is ___ difficult than I expected.', options: ['much', 'more', 'most'], correctAnswer: 'more', explanation: '"Difficult" is a long adjective, so use "more" for comparative.' },
      { id: 'a2-comp-5', type: 'multiple_choice', question: 'Which is correct?', options: ['He is the most good player.', 'He is the best player.', 'He is the goodest player.'], correctAnswer: 'He is the best player.', explanation: '"Good" has an irregular superlative: "best".' },
    ]
  },

  // ===== B1 =====
  {
    id: 'b1-present-perfect',
    title: 'Present Perfect vs Past Simple',
    cefrLevel: 'B1',
    category: 'Tenses',
    explanation: 'Present perfect (have/has + past participle) connects past to present: experiences, unfinished time, recent changes. Past simple is for completed actions at a specific past time.',
    examples: ['I have been to London. (experience, no specific time)', 'I went to London last year. (specific time)', 'She has just finished her homework. (recent)'],
    exercises: [
      { id: 'b1-pp-1', type: 'fill_blank', question: 'I ___ never been to Australia.', options: ['have', 'had', 'did'], correctAnswer: 'have', explanation: '"Never been" indicates life experience → present perfect with "have".' },
      { id: 'b1-pp-2', type: 'fill_blank', question: 'She ___ to Paris in 2019.', options: ['has gone', 'went', 'has been'], correctAnswer: 'went', explanation: '"In 2019" is a specific past time → use past simple "went".' },
      { id: 'b1-pp-3', type: 'multiple_choice', question: 'Which is correct?', options: ['I have seen that movie yesterday.', 'I saw that movie yesterday.', 'I have saw that movie yesterday.'], correctAnswer: 'I saw that movie yesterday.', explanation: '"Yesterday" is a specific past time, so use past simple. Don\'t use present perfect with specific past time markers.' },
      { id: 'b1-pp-4', type: 'error_correction', question: 'He has went to the store.', correctAnswer: 'He has gone to the store.', explanation: 'Present perfect uses the past participle: go → gone, not "went".' },
      { id: 'b1-pp-5', type: 'fill_blank', question: 'How long ___ you lived here?', options: ['did', 'have', 'are'], correctAnswer: 'have', explanation: '"How long" with a continuing situation uses present perfect.' },
      { id: 'b1-pp-6', type: 'fill_blank', question: 'They ___ already finished the project.', options: ['have', 'had', 'did'], correctAnswer: 'have', explanation: '"Already" with present perfect indicates recent completion.' },
    ]
  },
  {
    id: 'b1-conditionals',
    title: 'First & Second Conditionals',
    cefrLevel: 'B1',
    category: 'Conditionals',
    explanation: 'First conditional (If + present, will + verb): real/likely future situations. Second conditional (If + past, would + verb): imaginary/unlikely present situations.',
    examples: ['If it rains, I will take an umbrella. (likely)', 'If I won the lottery, I would buy a house. (imaginary)'],
    exercises: [
      { id: 'b1-cond-1', type: 'fill_blank', question: 'If she studies hard, she ___ pass the exam.', options: ['will', 'would', 'could'], correctAnswer: 'will', explanation: 'Real/likely situation = first conditional: will + verb.' },
      { id: 'b1-cond-2', type: 'fill_blank', question: 'If I ___ a bird, I would fly around the world.', options: ['am', 'was', 'were'], correctAnswer: 'were', explanation: 'Second conditional uses past subjunctive: "were" (for all subjects in formal English).' },
      { id: 'b1-cond-3', type: 'error_correction', question: 'If I will see him, I will tell him.', correctAnswer: 'If I see him, I will tell him.', explanation: 'In first conditional, the if-clause uses present simple, NOT "will".' },
      { id: 'b1-cond-4', type: 'multiple_choice', question: 'Which is a second conditional?', options: ['If it rains, I will stay home.', 'If I were you, I would apologize.', 'If she comes, we will start.'], correctAnswer: 'If I were you, I would apologize.', explanation: 'Second conditional: If + past (were), would + verb. Used for hypothetical situations.' },
      { id: 'b1-cond-5', type: 'fill_blank', question: 'If I had more time, I ___ learn to play the guitar.', options: ['will', 'would', 'can'], correctAnswer: 'would', explanation: 'Second conditional (imaginary): would + verb.' },
    ]
  },
  {
    id: 'b1-passive',
    title: 'Passive Voice',
    cefrLevel: 'B1',
    category: 'Voice',
    explanation: 'Passive voice: subject receives the action. Form: be + past participle. Use when the action is more important than who did it, or the doer is unknown.',
    examples: ['The letter was written by her.', 'English is spoken in many countries.', 'The cake has been eaten.'],
    exercises: [
      { id: 'b1-pass-1', type: 'fill_blank', question: 'The book ___ written by a famous author.', options: ['is', 'was', 'were'], correctAnswer: 'was', explanation: 'Past passive: was + past participle.' },
      { id: 'b1-pass-2', type: 'error_correction', question: 'The window was break by the ball.', correctAnswer: 'The window was broken by the ball.', explanation: 'Passive requires past participle: break → broken.' },
      { id: 'b1-pass-3', type: 'multiple_choice', question: 'Which is passive voice?', options: ['She painted the wall.', 'The wall was painted.', 'She is painting.'], correctAnswer: 'The wall was painted.', explanation: 'Passive: the subject (wall) receives the action. Form: was + painted.' },
      { id: 'b1-pass-4', type: 'fill_blank', question: 'Many cars ___ made in Japan.', options: ['is', 'are', 'was'], correctAnswer: 'are', explanation: 'Present passive plural: "cars" → "are" + past participle.' },
      { id: 'b1-pass-5', type: 'fill_blank', question: 'The homework must ___ completed by Friday.', options: ['be', 'been', 'being'], correctAnswer: 'be', explanation: 'After modal verbs (must, can, should): modal + be + past participle.' },
    ]
  },

  // ===== B2 =====
  {
    id: 'b2-reported-speech',
    title: 'Reported Speech',
    cefrLevel: 'B2',
    category: 'Reported Speech',
    explanation: 'When reporting what someone said, tenses shift back: present → past, past → past perfect, will → would. Pronouns and time expressions also change.',
    examples: ['"I am tired" → She said she was tired.', '"I will come" → He said he would come.', '"I bought a car" → She said she had bought a car.'],
    exercises: [
      { id: 'b2-rs-1', type: 'fill_blank', question: 'He said he ___ hungry.', options: ['is', 'was', 'will be'], correctAnswer: 'was', explanation: 'Direct "I am" → reported "he was" (present shifts to past).' },
      { id: 'b2-rs-2', type: 'fill_blank', question: 'She told me she ___ call me later.', options: ['will', 'would', 'is going to'], correctAnswer: 'would', explanation: 'Direct "will" → reported "would".' },
      { id: 'b2-rs-3', type: 'error_correction', question: 'He said that he will help me tomorrow.', correctAnswer: 'He said that he would help me the next day.', explanation: '"Will" shifts to "would" and "tomorrow" shifts to "the next day" in reported speech.' },
      { id: 'b2-rs-4', type: 'multiple_choice', question: '"I have finished my work." → She said...', options: ['she has finished her work.', 'she had finished her work.', 'she finished her work.'], correctAnswer: 'she had finished her work.', explanation: 'Present perfect "have finished" shifts to past perfect "had finished".' },
      { id: 'b2-rs-5', type: 'fill_blank', question: 'They told us they ___ already eaten.', options: ['have', 'had', 'has'], correctAnswer: 'had', explanation: '"Have already eaten" → "had already eaten" in reported speech.' },
    ]
  },
  {
    id: 'b2-relative-clauses',
    title: 'Relative Clauses',
    cefrLevel: 'B2',
    category: 'Clauses',
    explanation: 'Defining clauses (no commas) give essential info: "The man who called is my brother." Non-defining clauses (with commas) give extra info: "My brother, who lives in Tokyo, called me."',
    examples: ['The book that I bought is interesting. (defining)', 'Paris, which is the capital of France, is beautiful. (non-defining)'],
    exercises: [
      { id: 'b2-rc-1', type: 'fill_blank', question: 'The woman ___ lives next door is a doctor.', options: ['who', 'which', 'whose'], correctAnswer: 'who', explanation: '"Who" is used for people in defining relative clauses.' },
      { id: 'b2-rc-2', type: 'fill_blank', question: 'The car ___ he bought was expensive.', options: ['who', 'which', 'whose'], correctAnswer: 'which', explanation: '"Which" (or "that") is used for things.' },
      { id: 'b2-rc-3', type: 'fill_blank', question: 'The teacher ___ class I enjoy is Mrs. Smith.', options: ['who', 'which', 'whose'], correctAnswer: 'whose', explanation: '"Whose" shows possession: "whose class" = the teacher\'s class.' },
      { id: 'b2-rc-4', type: 'error_correction', question: 'London, that is the capital of England, is very old.', correctAnswer: 'London, which is the capital of England, is very old.', explanation: 'Non-defining clauses (with commas) use "which", not "that".' },
      { id: 'b2-rc-5', type: 'multiple_choice', question: 'Which uses a non-defining relative clause?', options: ['The man who called was my boss.', 'My boss, who is very kind, called me.', 'People who work hard succeed.'], correctAnswer: 'My boss, who is very kind, called me.', explanation: 'Non-defining clauses are set off by commas and add extra, non-essential information.' },
    ]
  },
  {
    id: 'b2-third-conditional',
    title: 'Third Conditional',
    cefrLevel: 'B2',
    category: 'Conditionals',
    explanation: 'Third conditional (If + past perfect, would have + past participle): imaginary past situations and their results. Used to talk about things that did NOT happen.',
    examples: ['If I had studied harder, I would have passed the exam.', 'If she had left earlier, she wouldn\'t have missed the train.'],
    exercises: [
      { id: 'b2-tc-1', type: 'fill_blank', question: 'If I had known, I ___ told you.', options: ['would', 'would have', 'will have'], correctAnswer: 'would have', explanation: 'Third conditional result clause: would have + past participle.' },
      { id: 'b2-tc-2', type: 'fill_blank', question: 'If she ___ the email, she would have replied.', options: ['saw', 'had seen', 'has seen'], correctAnswer: 'had seen', explanation: 'Third conditional if-clause: If + had + past participle.' },
      { id: 'b2-tc-3', type: 'error_correction', question: 'If I would have known, I would have helped.', correctAnswer: 'If I had known, I would have helped.', explanation: 'The if-clause uses "had + past participle", never "would have".' },
      { id: 'b2-tc-4', type: 'multiple_choice', question: 'Which is a correct third conditional?', options: ['If I studied, I would pass.', 'If I had studied, I would have passed.', 'If I study, I will pass.'], correctAnswer: 'If I had studied, I would have passed.', explanation: 'Third conditional: If + had + pp, would have + pp. About unreal past.' },
      { id: 'b2-tc-5', type: 'fill_blank', question: 'We ___ arrived on time if the train hadn\'t been delayed.', options: ['would', 'would have', 'will have'], correctAnswer: 'would have', explanation: 'Third conditional: would have + past participle for the imaginary result.' },
    ]
  },

  // ===== C1 =====
  {
    id: 'c1-mixed-conditionals',
    title: 'Mixed Conditionals',
    cefrLevel: 'C1',
    category: 'Conditionals',
    explanation: 'Mixed conditionals combine different conditional types to express how a past event affects the present, or how a permanent state affected a past outcome. Type 1: If + past perfect, would + infinitive (past cause → present result). Type 2: If + past simple, would have + past participle (present/permanent cause → past result).',
    examples: ['If I had accepted that job, I would be living in New York now. (past → present)', 'If she spoke French, she would have got the job. (permanent → past)'],
    exercises: [
      { id: 'c1-mc-1', type: 'fill_blank', question: 'If I had studied medicine, I ___ a doctor now.', options: ['would be', 'would have been', 'will be'], correctAnswer: 'would be', explanation: 'Past cause → present result: If + past perfect, would + infinitive. The past decision affects the present state.' },
      { id: 'c1-mc-2', type: 'error_correction', question: 'If she would have listened to me, she wouldn\'t be in trouble now.', correctAnswer: 'If she had listened to me, she wouldn\'t be in trouble now.', explanation: 'The if-clause uses "had + past participle", never "would have". This is a mixed conditional: past cause → present result.' },
      { id: 'c1-mc-3', type: 'multiple_choice', question: 'Which sentence correctly uses a mixed conditional?', options: ['If I had saved more money, I would have a house now.', 'If I saved more money, I would have a house now.', 'If I had saved more money, I would had a house now.'], correctAnswer: 'If I had saved more money, I would have a house now.', explanation: 'Mixed conditional (past → present): If + past perfect (had saved), would + infinitive (would have).' },
      { id: 'c1-mc-4', type: 'fill_blank', question: 'If he were more ambitious, he ___ applied for the promotion last year.', options: ['would', 'would have', 'will have'], correctAnswer: 'would have', explanation: 'Present/permanent cause → past result: If + past simple (were), would have + past participle. His permanent trait affected a past outcome.' },
      { id: 'c1-mc-5', type: 'fill_blank', question: 'If they ___ the train, they would be here by now.', options: ['didn\'t miss', 'hadn\'t missed', 'wouldn\'t miss'], correctAnswer: 'hadn\'t missed', explanation: 'Past cause → present result: If + past perfect (hadn\'t missed), would + infinitive (would be).' },
      { id: 'c1-mc-6', type: 'error_correction', question: 'If I would have invested in that company, I would be wealthy today.', correctAnswer: 'If I had invested in that company, I would be wealthy today.', explanation: 'The if-clause in a mixed conditional never takes "would have". Use past perfect: "If I had invested..." (past cause → present result).' },
      { id: 'c1-mc-7', type: 'multiple_choice', question: 'Choose the correct mixed conditional: "She doesn\'t speak Mandarin, so she ___ the contract last month."', options: ['didn\'t secure', 'wouldn\'t have secured', 'won\'t secure'], correctAnswer: 'wouldn\'t have secured', explanation: 'Present/permanent cause → past result: If she spoke Mandarin (but she doesn\'t), she would have secured the contract. The main clause uses "would have + past participle".' },
      { id: 'c1-mc-8', type: 'fill_blank', question: 'If the government ___ the infrastructure earlier, commuters wouldn\'t face such delays now.', options: ['upgraded', 'had upgraded', 'would upgrade'], correctAnswer: 'had upgraded', explanation: 'Past cause → present result: If + past perfect (had upgraded), would(n\'t) + infinitive (face). A past action would affect the current situation.' },
      { id: 'c1-mc-9', type: 'error_correction', question: 'If she was more diligent, she would have completed the thesis on time.', correctAnswer: 'If she were more diligent, she would have completed the thesis on time.', explanation: 'In mixed conditionals with a present/permanent condition, the subjunctive "were" is preferred over "was" in formal English: "If she were more diligent..."' },
      { id: 'c1-mc-10', type: 'fill_blank', question: 'If he ___ so recklessly last winter, his knee wouldn\'t still be injured.', options: ['hadn\'t skied', 'didn\'t ski', 'wouldn\'t ski'], correctAnswer: 'hadn\'t skied', explanation: 'Past cause → present result: If + past perfect (hadn\'t skied), would(n\'t) + infinitive (be). The past accident explains the current injury.' },
    ]
  },
  {
    id: 'c1-inversion',
    title: 'Inversion for Emphasis',
    cefrLevel: 'C1',
    category: 'Sentence Structure',
    explanation: 'When negative or restrictive adverbials are placed at the beginning of a sentence for emphasis, the subject and auxiliary verb are inverted (auxiliary + subject). Common triggers: Never, Rarely, Seldom, Hardly, Not only, Under no circumstances, Had I known.',
    examples: ['Never have I seen such beauty.', 'Not only did she win the race, but she also broke the record.', 'Had I known about the delay, I would have left later.'],
    exercises: [
      { id: 'c1-inv-1', type: 'fill_blank', question: 'Never ___ I experienced such hospitality.', options: ['had', 'have', 'did'], correctAnswer: 'have', explanation: '"Never have I..." uses present perfect with inversion. The auxiliary "have" comes before the subject "I".' },
      { id: 'c1-inv-2', type: 'error_correction', question: 'Not only she passed the exam, but she also got the highest score.', correctAnswer: 'Not only did she pass the exam, but she also got the highest score.', explanation: '"Not only" at the start triggers inversion: "Not only did she pass..." The auxiliary "did" must come before the subject.' },
      { id: 'c1-inv-3', type: 'multiple_choice', question: 'Which sentence uses inversion correctly?', options: ['Rarely I have seen such talent.', 'Rarely have I seen such talent.', 'Rarely I saw such talent.'], correctAnswer: 'Rarely have I seen such talent.', explanation: '"Rarely" at the start triggers inversion: auxiliary (have) + subject (I) + past participle (seen).' },
      { id: 'c1-inv-4', type: 'fill_blank', question: '___ I known about the meeting, I would have attended.', options: ['Had', 'Have', 'If'], correctAnswer: 'Had', explanation: 'Conditional inversion: "Had I known..." replaces "If I had known..." The auxiliary "Had" moves to the front.' },
      { id: 'c1-inv-5', type: 'fill_blank', question: 'Seldom ___ such a remarkable performance been witnessed.', options: ['has', 'have', 'is'], correctAnswer: 'has', explanation: '"Seldom" triggers inversion: "Seldom has..." The singular subject "performance" takes "has".' },
      { id: 'c1-inv-6', type: 'error_correction', question: 'Under no circumstances employees should leave the building during a lockdown.', correctAnswer: 'Under no circumstances should employees leave the building during a lockdown.', explanation: '"Under no circumstances" at the start triggers inversion: the auxiliary "should" must come before the subject "employees".' },
      { id: 'c1-inv-7', type: 'multiple_choice', question: 'Which sentence correctly inverts after a negative adverbial?', options: ['Nowhere else you will find such affordable housing.', 'Nowhere else will you find such affordable housing.', 'Nowhere else you find will such affordable housing.'], correctAnswer: 'Nowhere else will you find such affordable housing.', explanation: '"Nowhere else" at the start triggers inversion: auxiliary (will) + subject (you) + verb (find).' },
      { id: 'c1-inv-8', type: 'fill_blank', question: 'Only after the results were published ___ the researchers realize their error.', options: ['did', 'have', 'were'], correctAnswer: 'did', explanation: '"Only after..." at the start triggers inversion in the main clause. Past tense requires the auxiliary "did" before the subject "the researchers".' },
      { id: 'c1-inv-9', type: 'fill_blank', question: 'Little ___ they know that the project would be cancelled the following week.', options: ['did', 'had', 'were'], correctAnswer: 'did', explanation: '"Little" as a negative adverb at the start triggers inversion. "Little did they know" is an established pattern meaning "they did not know at all".' },
      { id: 'c1-inv-10', type: 'error_correction', question: 'No sooner the meeting had ended than the fire alarm sounded.', correctAnswer: 'No sooner had the meeting ended than the fire alarm sounded.', explanation: '"No sooner" triggers inversion: "No sooner had the meeting ended..." The auxiliary "had" must come before the subject. "No sooner...than" links two past events.' },
    ]
  },
  {
    id: 'c1-advanced-passive',
    title: 'Advanced Passive & Causative',
    cefrLevel: 'C1',
    category: 'Voice',
    explanation: 'Advanced passive constructions include reporting verbs in the passive (It is said that... / He is believed to...) and causative structures (have/get something done — someone else does it for you). These forms are common in formal writing and everyday speech respectively.',
    examples: ['It is believed that the company will merge. / The company is believed to be merging.', 'She had her car repaired. (causative — someone else repaired it)', 'He got his hair cut yesterday.'],
    exercises: [
      { id: 'c1-ap-1', type: 'fill_blank', question: 'It ___ reported that the president will resign.', options: ['is', 'has', 'was being'], correctAnswer: 'is', explanation: 'Passive with reporting verbs uses "It is + past participle + that": "It is reported that..."' },
      { id: 'c1-ap-2', type: 'fill_blank', question: 'The suspect is believed ___ left the country.', options: ['to have', 'to has', 'having'], correctAnswer: 'to have', explanation: 'When the reported action happened before the reporting: subject + is believed + to have + past participle.' },
      { id: 'c1-ap-3', type: 'error_correction', question: 'She had her house to paint last summer.', correctAnswer: 'She had her house painted last summer.', explanation: 'Causative "have": have + object + past participle (not "to + infinitive"). She arranged for someone to paint it.' },
      { id: 'c1-ap-4', type: 'multiple_choice', question: 'Which sentence correctly uses the causative?', options: ['I got my computer fix.', 'I got my computer fixed.', 'I got my computer to fixed.', 'I got fixed my computer.'], correctAnswer: 'I got my computer fixed.', explanation: 'Causative "get": get + object + past participle. "I got my computer fixed" means someone else fixed it for me.' },
      { id: 'c1-ap-5', type: 'fill_blank', question: 'He is thought ___ be one of the greatest scientists of all time.', options: ['to', 'that', 'as'], correctAnswer: 'to', explanation: 'Passive with reporting verbs (personal subject): subject + is thought + to + infinitive.' },
      { id: 'c1-ap-6', type: 'error_correction', question: 'The manuscript is said to written over three hundred years ago.', correctAnswer: 'The manuscript is said to have been written over three hundred years ago.', explanation: 'When the reported event occurred before the reporting, use "to have been + past participle": "is said to have been written". This combines the passive reporting structure with perfect aspect and passive voice.' },
      { id: 'c1-ap-7', type: 'multiple_choice', question: 'Which sentence correctly uses the impersonal passive with a reporting verb?', options: ['It is understanding that negotiations have stalled.', 'It is understood that negotiations have stalled.', 'It is to understand that negotiations have stalled.'], correctAnswer: 'It is understood that negotiations have stalled.', explanation: 'Impersonal passive: "It is + past participle + that..." The past participle "understood" is required, not the gerund or infinitive.' },
      { id: 'c1-ap-8', type: 'fill_blank', question: 'She got her solicitor ___ the contract before signing.', options: ['to review', 'reviewed', 'review'], correctAnswer: 'to review', explanation: 'Causative "get" with a person as object uses "to + infinitive": "got her solicitor to review". Compare with "got the contract reviewed" (object = thing → past participle).' },
      { id: 'c1-ap-9', type: 'fill_blank', question: 'The economy is widely ___ to recover by the second quarter.', options: ['expected', 'expecting', 'expect'], correctAnswer: 'expected', explanation: '"Is widely expected to" is a passive reporting construction. The adverb "widely" modifies the passive verb, and "to recover" is the infinitive complement.' },
      { id: 'c1-ap-10', type: 'error_correction', question: 'They had the entire office redecorating during the summer break.', correctAnswer: 'They had the entire office redecorated during the summer break.', explanation: 'Causative "have + object + past participle": "had the office redecorated". The past participle "redecorated" is needed because someone else performed the action on the office.' },
    ]
  },

  // ===== C2 =====
  {
    id: 'c2-subjunctive',
    title: 'Subjunctive Mood',
    cefrLevel: 'C2',
    category: 'Mood',
    explanation: 'The mandative subjunctive uses the base form of the verb after verbs of demand, suggestion, or insistence (insist that he be..., recommend that she leave...). The were-subjunctive is used in hypothetical clauses (If I were...). Formulaic subjunctives are fixed expressions (Be that as it may, If need be, God save the Queen).',
    examples: ['The board insisted that he resign immediately.', 'If I were you, I would reconsider.', 'Be that as it may, we must continue.'],
    exercises: [
      { id: 'c2-sub-1', type: 'fill_blank', question: 'The committee demanded that the report ___ submitted by Friday.', options: ['is', 'be', 'was'], correctAnswer: 'be', explanation: 'Mandative subjunctive: after verbs like "demand", "insist", "suggest", use the base form "be", not "is" or "was".' },
      { id: 'c2-sub-2', type: 'error_correction', question: 'The doctor suggested that she takes the medication twice a day.', correctAnswer: 'The doctor suggested that she take the medication twice a day.', explanation: 'After "suggest that", use the subjunctive (base form): "take", not "takes". No third-person -s in the subjunctive.' },
      { id: 'c2-sub-3', type: 'fill_blank', question: 'If need ___, we can extend the deadline.', options: ['be', 'is', 'was'], correctAnswer: 'be', explanation: '"If need be" is a formulaic subjunctive — a fixed expression meaning "if it is necessary". The base form "be" is used.' },
      { id: 'c2-sub-4', type: 'multiple_choice', question: 'Which sentence correctly uses the subjunctive?', options: ['I insist that he is present at the meeting.', 'I insist that he be present at the meeting.', 'I insist that he will be present at the meeting.'], correctAnswer: 'I insist that he be present at the meeting.', explanation: 'After "insist that", use the subjunctive base form "be". Do not use "is" or "will be".' },
      { id: 'c2-sub-5', type: 'fill_blank', question: 'It is essential that every student ___ the safety guidelines.', options: ['follows', 'follow', 'is following'], correctAnswer: 'follow', explanation: 'After "It is essential that", use the subjunctive base form "follow". No -s ending, regardless of the subject.' },
      { id: 'c2-sub-6', type: 'error_correction', question: 'The judge ordered that the defendant remains in custody pending trial.', correctAnswer: 'The judge ordered that the defendant remain in custody pending trial.', explanation: 'After "ordered that", the mandative subjunctive requires the base form "remain", not the indicative "remains". No third-person -s in the subjunctive.' },
      { id: 'c2-sub-7', type: 'multiple_choice', question: 'Which sentence uses a formulaic subjunctive correctly?', options: ['Far be it from me to criticize, but the plan has flaws.', 'Far is it from me to criticize, but the plan has flaws.', 'Far was it from me to criticize, but the plan has flaws.'], correctAnswer: 'Far be it from me to criticize, but the plan has flaws.', explanation: '"Far be it from me" is a fixed formulaic subjunctive expression meaning "I do not wish to". It always uses the base form "be", never "is" or "was".' },
      { id: 'c2-sub-8', type: 'fill_blank', question: 'The resolution proposed that each member state ___ its carbon emissions by forty percent.', options: ['reduces', 'reduce', 'reduced'], correctAnswer: 'reduce', explanation: 'After "proposed that", the subjunctive base form "reduce" is required regardless of the subject. This mandative subjunctive is standard in formal and legal English.' },
      { id: 'c2-sub-9', type: 'fill_blank', question: '___ it not for their timely intervention, the crisis would have escalated.', options: ['Were', 'Was', 'Had'], correctAnswer: 'Were', explanation: '"Were it not for" is an inverted subjunctive conditional meaning "If it were not for". The subjunctive "were" is used for hypothetical conditions, never "was" in formal register.' },
      { id: 'c2-sub-10', type: 'error_correction', question: 'It is imperative that the ambassador attends the summit in person.', correctAnswer: 'It is imperative that the ambassador attend the summit in person.', explanation: 'After "It is imperative that", the subjunctive base form "attend" is required. The indicative "attends" is grammatically incorrect in this mandative construction.' },
    ]
  },
  {
    id: 'c2-cleft-sentences',
    title: 'Cleft Sentences',
    cefrLevel: 'C2',
    category: 'Sentence Structure',
    explanation: 'Cleft sentences restructure a simple sentence to emphasize one part. It-clefts: "It was John who broke the window." Wh-clefts: "What I need is a holiday." All-clefts: "All I want is peace." These structures focus the listener\'s attention on the most important information.',
    examples: ['It was the noise that woke me up. (It-cleft)', 'What she said was completely unexpected. (Wh-cleft)', 'All we can do is wait. (All-cleft)'],
    exercises: [
      { id: 'c2-cl-1', type: 'fill_blank', question: 'It ___ Maria who solved the problem.', options: ['is', 'was', 'has'], correctAnswer: 'was', explanation: 'It-cleft: "It was + focused element + who/that + clause." The emphasis is on Maria as the person who solved it.' },
      { id: 'c2-cl-2', type: 'fill_blank', question: '___ I really need is a good night\'s sleep.', options: ['What', 'That', 'It'], correctAnswer: 'What', explanation: 'Wh-cleft: "What + clause + is/was + focused element." "What I need" introduces the topic before revealing the focus.' },
      { id: 'c2-cl-3', type: 'error_correction', question: 'All what he wants is to be left alone.', correctAnswer: 'All he wants is to be left alone.', explanation: 'All-cleft does not use "what" after "all". The correct form is "All + clause + is + focus": "All he wants is..."' },
      { id: 'c2-cl-4', type: 'multiple_choice', question: 'Which is a correct Wh-cleft of "I admire her determination"?', options: ['What I admire is her determination.', 'It is her determination what I admire.', 'Her determination is what admire I.'], correctAnswer: 'What I admire is her determination.', explanation: 'Wh-cleft: "What + subject + verb + is + focused element." This puts emphasis on "her determination".' },
      { id: 'c2-cl-5', type: 'fill_blank', question: 'The thing ___ bothers me most is the lack of communication.', options: ['that', 'what', 'which'], correctAnswer: 'that', explanation: '"The thing that..." is a variant cleft structure. "That" introduces the relative clause modifying "the thing".' },
      { id: 'c2-cl-6', type: 'error_correction', question: 'What the committee needs are a comprehensive reform package.', correctAnswer: 'What the committee needs is a comprehensive reform package.', explanation: 'In a wh-cleft, the copula "is" agrees with the singular complement "a comprehensive reform package", not with the relative clause. The verb must be "is", not "are".' },
      { id: 'c2-cl-7', type: 'fill_blank', question: 'It ___ in the nineteenth century that the foundations of modern linguistics were laid.', options: ['was', 'is', 'had been'], correctAnswer: 'was', explanation: 'It-cleft with temporal focus: "It was + time expression + that + clause." The past tense "was" matches the historical reference to the nineteenth century.' },
      { id: 'c2-cl-8', type: 'multiple_choice', question: 'Which is a correct reverse wh-cleft (or pseudo-cleft)?', options: ['A thorough investigation is what we demand.', 'What is a thorough investigation we demand.', 'A thorough investigation what we demand is.'], correctAnswer: 'A thorough investigation is what we demand.', explanation: 'A reverse wh-cleft places the focused element first: "A thorough investigation is what we demand." This foregrounds the key noun phrase for emphasis.' },
      { id: 'c2-cl-9', type: 'fill_blank', question: '___ the researchers discovered was a previously unknown species of deep-sea coral.', options: ['What', 'It', 'That'], correctAnswer: 'What', explanation: 'Wh-cleft structure: "What + subject + verb + was + focused element." "What the researchers discovered" introduces the topic before revealing the discovery.' },
      { id: 'c2-cl-10', type: 'error_correction', question: 'It was because of her negligence who the project failed.', correctAnswer: 'It was because of her negligence that the project failed.', explanation: 'In it-cleft sentences, the connector after the focused element is "that", not "who". "Who" is used only when the focused element is a person functioning as subject or object.' },
    ]
  },
  {
    id: 'c2-nominalization',
    title: 'Nominalization & Discourse',
    cefrLevel: 'C2',
    category: 'Sentence Structure',
    explanation: 'Nominalization converts verbs or adjectives into nouns, creating a more formal, academic register (destroy → destruction, fail → failure, important → importance). This technique is essential in academic writing, as it allows for denser, more impersonal prose and enables hedging (e.g., "The suggestion was made..." instead of "Someone suggested...").',
    examples: ['The government destroyed the building. → The destruction of the building was ordered by the government.', 'The experiment failed. → The failure of the experiment was unexpected.', 'We recommend implementing the policy. → Our recommendation is to implement the policy.'],
    exercises: [
      { id: 'c2-nom-1', type: 'fill_blank', question: 'The ___ of the new policy led to widespread protests. (implement)', options: ['implementation', 'implementing', 'implemented'], correctAnswer: 'implementation', explanation: 'The verb "implement" becomes the noun "implementation". Nominalization creates a more formal register suitable for academic or news writing.' },
      { id: 'c2-nom-2', type: 'error_correction', question: 'The develop of renewable energy sources is crucial for the future.', correctAnswer: 'The development of renewable energy sources is crucial for the future.', explanation: 'The correct nominalized form of "develop" is "development", not "develop". The noun form is needed after the article "the".' },
      { id: 'c2-nom-3', type: 'multiple_choice', question: 'Which sentence uses nominalization to achieve a more academic register?', options: ['Researchers discovered that the drug was effective.', 'The discovery of the drug\'s effectiveness was significant.', 'They found out the drug worked well.'], correctAnswer: 'The discovery of the drug\'s effectiveness was significant.', explanation: '"Discovery" (from "discover") and "effectiveness" (from "effective") are nominalizations that create a more formal, impersonal academic tone.' },
      { id: 'c2-nom-4', type: 'fill_blank', question: 'The ___ that the project should be cancelled was met with resistance. (suggest)', options: ['suggestion', 'suggesting', 'suggestive'], correctAnswer: 'suggestion', explanation: '"Suggest" becomes "suggestion". Using nominalization here also serves as hedging — it distances the writer from the claim by not naming who made the suggestion.' },
      { id: 'c2-nom-5', type: 'fill_blank', question: 'There has been a significant ___ in air quality over the past decade. (improve)', options: ['improvement', 'improving', 'improved'], correctAnswer: 'improvement', explanation: '"Improve" becomes "improvement". This nominalized form works as the subject complement after "a significant", fitting the formal register of reports and academic writing.' },
      { id: 'c2-nom-6', type: 'error_correction', question: 'The acquire of foreign assets by the state-owned enterprise raised regulatory concerns.', correctAnswer: 'The acquisition of foreign assets by the state-owned enterprise raised regulatory concerns.', explanation: 'The correct nominalized form of "acquire" is "acquisition", not "acquire". The noun form is required after the determiner "the" to maintain the academic register.' },
      { id: 'c2-nom-7', type: 'fill_blank', question: 'The ___ of the witnesses\' accounts cast doubt on the prosecution\'s narrative. (contradict)', options: ['contradiction', 'contradicting', 'contradicted'], correctAnswer: 'contradiction', explanation: '"Contradict" becomes "contradiction". Nominalization allows the sentence to present the discrepancy as a factual phenomenon rather than attributing agency to the witnesses.' },
      { id: 'c2-nom-8', type: 'multiple_choice', question: 'Which sentence most effectively uses nominalization for an academic register?', options: ['When they analyzed the data, they found irregularities.', 'Their analysis of the data revealed several irregularities.', 'They were analyzing the data and finding irregularities.'], correctAnswer: 'Their analysis of the data revealed several irregularities.', explanation: '"Analysis" (from "analyze") and the possessive determiner "their" create a nominal phrase that is denser and more impersonal than the verbal alternatives, which is characteristic of academic prose.' },
      { id: 'c2-nom-9', type: 'fill_blank', question: 'The ___ of diplomatic relations between the two nations occurred after decades of hostility. (normalize)', options: ['normalization', 'normalizing', 'normalized'], correctAnswer: 'normalization', explanation: '"Normalize" becomes "normalization". This nominal form serves as the subject of the sentence, compressing the entire process into a single noun phrase appropriate for formal discourse.' },
      { id: 'c2-nom-10', type: 'error_correction', question: 'The withdraw of troops from the region was completed ahead of schedule.', correctAnswer: 'The withdrawal of troops from the region was completed ahead of schedule.', explanation: 'The nominalized form of "withdraw" is "withdrawal", not "withdraw". The noun form is obligatory after the article "the" and functions as the sentence subject.' },
    ]
  },
  {
    id: 'c2-modality',
    title: 'Advanced Modality',
    cefrLevel: 'C2',
    category: 'Mood',
    explanation: 'Advanced modal constructions express fine shades of possibility, deduction, and obligation. Epistemic modality concerns the speaker\'s assessment of likelihood (He might have been being considered), while deontic modality concerns permission or obligation (You shall comply). Complex chains such as "could well have anticipated" or "would appear to have been" layer tense, aspect, and voice onto modal verbs.',
    examples: ['The proposal might have been being considered when the budget was cut.', 'She could well have anticipated the outcome.', 'He would appear to have been misinformed.'],
    exercises: [
      { id: 'c2-mod-1', type: 'fill_blank', question: 'The candidate ___ have been being interviewed when the fire alarm went off.', options: ['might', 'shall', 'ought'], correctAnswer: 'might', explanation: '"Might have been being interviewed" is a complex modal construction combining epistemic possibility (might) + perfect (have) + progressive passive (been being interviewed). It expresses speculation about an ongoing passive event in the past.' },
      { id: 'c2-mod-2', type: 'error_correction', question: 'She could well have anticipate the consequences of her actions.', correctAnswer: 'She could well have anticipated the consequences of her actions.', explanation: 'After "could have", the past participle is required: "anticipated", not the base form "anticipate". The structure is modal + have + past participle.' },
      { id: 'c2-mod-3', type: 'multiple_choice', question: 'Which sentence uses epistemic modality (expressing likelihood) rather than deontic modality (expressing obligation)?', options: ['You must submit your report by Friday.', 'She must have forgotten about the meeting.', 'Students must wear uniforms at all times.'], correctAnswer: 'She must have forgotten about the meeting.', explanation: '"Must have forgotten" is epistemic — the speaker is making a deduction about what probably happened. The other sentences use "must" deontically to express obligation or rules.' },
      { id: 'c2-mod-4', type: 'fill_blank', question: 'The results ___ appear to have been manipulated.', options: ['would', 'shall', 'might to'], correctAnswer: 'would', explanation: '"Would appear to have been" is a hedged epistemic construction. "Would" softens the assertion, making it a cautious speculation rather than a direct accusation. This layered structure is common in formal and academic English.' },
      { id: 'c2-mod-5', type: 'fill_blank', question: 'They ___ well have known about the risks before proceeding.', options: ['could', 'shall', 'would to'], correctAnswer: 'could', explanation: '"Could well have known" expresses strong epistemic possibility about the past. The adverb "well" intensifies the likelihood, suggesting it is quite plausible they knew.' },
      { id: 'c2-mod-6', type: 'error_correction', question: 'The documents should have been being shredded by now, but the office closed early.', correctAnswer: 'The documents should have been shredded by now, but the office closed early.', explanation: 'While "should have been being shredded" is theoretically possible (modal + perfect + progressive + passive), it is unnecessarily complex here. The context requires completion, not ongoing action: "should have been shredded" (modal + perfect + passive) is correct.' },
      { id: 'c2-mod-7', type: 'multiple_choice', question: 'Which sentence uses deontic modality (obligation/permission) rather than epistemic modality (likelihood)?', options: ['She can\'t have left already — her car is still here.', 'You may not use your phone during the examination.', 'He must have forgotten the appointment.'], correctAnswer: 'You may not use your phone during the examination.', explanation: '"May not" here expresses prohibition (deontic). The other sentences use modals to express deductions about what probably happened (epistemic).' },
      { id: 'c2-mod-8', type: 'fill_blank', question: 'The treaty ___ to have been signed under duress, according to several historians.', options: ['is believed', 'believes', 'believing'], correctAnswer: 'is believed', explanation: '"Is believed to have been signed" layers passive reporting ("is believed") with perfect passive infinitive ("to have been signed"). This is a hedged epistemic construction common in academic and journalistic prose.' },
      { id: 'c2-mod-9', type: 'fill_blank', question: 'The experiment ___ not have produced reliable data, given the contaminated samples.', options: ['can', 'shall', 'will'], correctAnswer: 'can', explanation: '"Cannot have produced" is an epistemic deduction about the past expressing impossibility. The speaker concludes that reliable data was logically impossible given the circumstances.' },
      { id: 'c2-mod-10', type: 'error_correction', question: 'The witness may well to have been coerced into giving false testimony.', correctAnswer: 'The witness may well have been coerced into giving false testimony.', explanation: '"May well have been coerced" is the correct construction. No "to" appears between a modal verb and "have". The structure is: modal + well + have + been + past participle.' },
    ]
  },
  {
    id: 'c2-concessive',
    title: 'Concessive Clauses',
    cefrLevel: 'C2',
    category: 'Sentence Structure',
    explanation: 'Concessive clauses acknowledge a contrasting point while maintaining the main argument. Advanced concessive structures include fronted adjective/adverb patterns ("Remarkable though it may seem..."), formulaic expressions ("Be that as it may..."), and formal connectors ("Notwithstanding the fact that..."). These structures are hallmarks of sophisticated academic and rhetorical prose.',
    examples: ['Much as I appreciate your efforts, the results are insufficient.', 'Remarkable though it may seem, the theory proved correct.', 'Be that as it may, we must press forward.', 'Notwithstanding the fact that funding was limited, the project succeeded.'],
    exercises: [
      { id: 'c2-con-1', type: 'fill_blank', question: '___ as I admire her work, I cannot overlook the methodological flaws.', options: ['Much', 'More', 'Very'], correctAnswer: 'Much', explanation: '"Much as..." is a formal concessive construction meaning "Although I greatly admire...". It inverts the normal word order for emphasis and concession.' },
      { id: 'c2-con-2', type: 'fill_blank', question: 'Remarkable ___ it may seem, the experiment yielded no significant results.', options: ['though', 'despite', 'however'], correctAnswer: 'though', explanation: 'The pattern "Adjective + though + subject + may + verb" is a formal concessive inversion: "Remarkable though it may seem" = "Although it may seem remarkable".' },
      { id: 'c2-con-3', type: 'error_correction', question: 'Be that as it might, we still need to address the core issue.', correctAnswer: 'Be that as it may, we still need to address the core issue.', explanation: '"Be that as it may" is a fixed formulaic subjunctive expression. It always uses "may", not "might". The phrase means "regardless of that" or "even so".' },
      { id: 'c2-con-4', type: 'multiple_choice', question: 'Which sentence correctly uses a formal concessive clause?', options: ['Notwithstanding the fact that he was inexperienced, he performed admirably.', 'Notwithstanding he was inexperienced, he performed admirably.', 'Notwithstanding of the fact that he was inexperienced, he performed admirably.'], correctAnswer: 'Notwithstanding the fact that he was inexperienced, he performed admirably.', explanation: '"Notwithstanding the fact that" is the correct formal concessive connector. It cannot be followed directly by a clause without "the fact that", and does not take "of" before "the fact".' },
      { id: 'c2-con-5', type: 'fill_blank', question: 'Try ___ he might, he could not solve the equation.', options: ['as', 'though', 'if'], correctAnswer: 'as', explanation: '"Try as he might" is a concessive inversion meaning "No matter how hard he tried". The pattern is "Verb + as + subject + might/may" — a literary and formal construction.' },
      { id: 'c2-con-6', type: 'error_correction', question: 'Notwithstanding of the severe weather warnings, the expedition proceeded as planned.', correctAnswer: 'Notwithstanding the severe weather warnings, the expedition proceeded as planned.', explanation: '"Notwithstanding" is a preposition that takes a direct object without "of". The correct form is "Notwithstanding the warnings" meaning "despite the warnings".' },
      { id: 'c2-con-7', type: 'multiple_choice', question: 'Which sentence uses a formal concessive structure correctly?', options: ['Compelling as the evidence may be, the verdict remains uncertain.', 'Compelling as the evidence may is, the verdict remains uncertain.', 'As compelling the evidence may be, the verdict remains uncertain.'], correctAnswer: 'Compelling as the evidence may be, the verdict remains uncertain.', explanation: 'The pattern is "Adjective + as + subject + may + be" — a fronted concessive inversion. The adjective comes first, followed by "as", then subject + modal + copula.' },
      { id: 'c2-con-8', type: 'fill_blank', question: 'Granted ___ the methodology has limitations, the findings remain statistically significant.', options: ['that', 'as', 'if'], correctAnswer: 'that', explanation: '"Granted that" is a formal concessive connector meaning "even though it is accepted that". It introduces a conceded point before the main clause reasserts the writer\'s position.' },
      { id: 'c2-con-9', type: 'fill_blank', question: 'Eloquent ___ her defence was, it failed to persuade the tribunal.', options: ['though', 'despite', 'while'], correctAnswer: 'though', explanation: 'Complement fronting with concessive "though": "Eloquent though her defence was" = "Although her defence was eloquent." The adjective is fronted for rhetorical emphasis.' },
      { id: 'c2-con-10', type: 'error_correction', question: 'Much as I would want to support the proposal, the evidence does not justify it.', correctAnswer: 'Much as I would like to support the proposal, the evidence does not justify it.', explanation: 'The idiomatic concessive pattern uses "Much as I would like to", not "want to". "Like" is the conventional verb in this fixed literary expression, conveying a more formal register.' },
    ]
  },
  {
    id: 'c2-ellipsis',
    title: 'Ellipsis and Substitution',
    cefrLevel: 'C2',
    category: 'Sentence Structure',
    explanation: 'Ellipsis is the omission of words that are understood from context, while substitution replaces a word or phrase with a pro-form. Verbal ellipsis ("I would if I could [do it]"), auxiliary-based responses ("So do I", "Neither can she"), stance markers ("I think so / I think not"), and nominal substitution ("one/ones") are key cohesive devices in advanced English.',
    examples: ['A: I enjoyed the film. B: So did I.', 'She can speak French and he can too. (verbal ellipsis)', 'I would help if I could. (ellipsis of "help")', 'A: Will it rain? B: I hope not. (substitution with "not")'],
    exercises: [
      { id: 'c2-ell-1', type: 'fill_blank', question: 'A: I have never been to Iceland. B: Neither ___ I.', options: ['have', 'do', 'am'], correctAnswer: 'have', explanation: '"Neither have I" mirrors the auxiliary "have" from the first statement. After "neither" or "nor", the auxiliary must match the original verb phrase, with inverted word order.' },
      { id: 'c2-ell-2', type: 'error_correction', question: 'A: She likes classical music. B: So like I.', correctAnswer: 'A: She likes classical music. B: So do I.', explanation: '"So do I" is the correct form. With simple present tense, the auxiliary "do" is used in the echo response, not the main verb "like". The pattern is "So + auxiliary + subject".' },
      { id: 'c2-ell-3', type: 'multiple_choice', question: 'Which response correctly uses substitution? A: Do you think the project will succeed?', options: ['I think so.', 'I think it.', 'I think yes.'], correctAnswer: 'I think so.', explanation: '"I think so" uses "so" as a substitute for the entire clause "that the project will succeed". English does not use "I think it" or "I think yes" as clause substitution.' },
      { id: 'c2-ell-4', type: 'fill_blank', question: 'I would attend the conference if I ___.', options: ['could', 'could do', 'would'], correctAnswer: 'could', explanation: 'This is verbal ellipsis: "if I could [attend the conference]." The repeated verb phrase is omitted because it is recoverable from context. Only the modal auxiliary "could" remains.' },
      { id: 'c2-ell-5', type: 'fill_blank', question: 'These results are more promising than the ___ we obtained last year.', options: ['ones', 'one', 'those'], correctAnswer: 'ones', explanation: '"Ones" is a nominal substitute replacing the plural noun "results". It avoids repetition: "the ones we obtained" = "the results we obtained". "One" would be singular; "those" is a demonstrative, not a substitution.' },
      { id: 'c2-ell-6', type: 'error_correction', question: 'A: Will the project be completed on time? B: I hope not it.', correctAnswer: 'A: Will the project be completed on time? B: I hope not.', explanation: '"I hope not" is the correct stance marker with clause substitution. "Not" substitutes for the entire negative clause "that it will not be completed on time". Adding "it" is redundant and ungrammatical.' },
      { id: 'c2-ell-7', type: 'multiple_choice', question: 'A: The minister has resigned. B: Which response uses correct verbal ellipsis?', options: ['So I have heard she has.', 'So I have heard.', 'So I have heard that.'], correctAnswer: 'So I have heard.', explanation: '"So I have heard" uses verbal ellipsis — the complement clause "that the minister has resigned" is omitted because it is recoverable from context. No pronoun or connector is needed.' },
      { id: 'c2-ell-8', type: 'fill_blank', question: 'She could have warned them, but she chose not ___.', options: ['to', 'to do', 'doing'], correctAnswer: 'to', explanation: 'Post-verbal ellipsis after "not": "chose not to [warn them]." The infinitive marker "to" is retained but the verb phrase is elided. This is standard infinitival ellipsis in English.' },
      { id: 'c2-ell-9', type: 'fill_blank', question: 'A: He doesn\'t support the amendment. B: Nor ___ I.', options: ['do', 'am', 'have'], correctAnswer: 'do', explanation: '"Nor do I" mirrors the auxiliary from the original statement. Simple present "doesn\'t support" requires "do" as the auxiliary in the echo response. "Nor" + auxiliary + subject is the inverted pattern.' },
      { id: 'c2-ell-10', type: 'error_correction', question: 'The committee approved the budget and the board also approved the budget.', correctAnswer: 'The committee approved the budget and the board did too.', explanation: 'The repetition of "approved the budget" is verbose. Substitution with "did too" replaces the repeated verb phrase, creating more cohesive and elegant prose. "Did" substitutes for "approved the budget".' },
    ]
  },
  {
    id: 'c2-fronting',
    title: 'Fronting and Topicalization',
    cefrLevel: 'C2',
    category: 'Sentence Structure',
    explanation: 'Fronting moves a sentence element to the initial position for emphasis or contrast. Object fronting ("This I cannot accept"), complement fronting ("Interesting though it was..."), and pseudo-cleft topicalization ("What matters most is...") allow speakers to control information flow and highlight key ideas. These structures are characteristic of formal, rhetorical, and literary English.',
    examples: ['This I cannot accept under any circumstances.', 'Interesting though the proposal was, it lacked feasibility.', 'What matters most is the safety of the participants.', 'Not a single word did she utter during the hearing.'],
    exercises: [
      { id: 'c2-fr-1', type: 'fill_blank', question: 'This proposal I ___ accept, no matter the pressure.', options: ['cannot', 'not', 'don\'t'], correctAnswer: 'cannot', explanation: 'Object fronting: "This proposal" (the object) is moved to the front for emphasis. The subject-verb order remains normal after the fronted object: "I cannot accept". This construction stresses the speaker\'s refusal.' },
      { id: 'c2-fr-2', type: 'error_correction', question: 'What matters most are the safety of the participants.', correctAnswer: 'What matters most is the safety of the participants.', explanation: 'In this pseudo-cleft topicalization, the verb "is" agrees with the singular complement "the safety", not with the relative clause "what matters most". The copula links the two parts of the cleft.' },
      { id: 'c2-fr-3', type: 'multiple_choice', question: 'Which sentence correctly uses fronting for emphasis?', options: ['Rarely have I seen such dedication.', 'Rarely I have seen such dedication.', 'Rarely I seen have such dedication.'], correctAnswer: 'Rarely have I seen such dedication.', explanation: 'When a negative or restrictive adverb like "rarely" is fronted, subject-auxiliary inversion is required: "Rarely have I seen..." This is a standard fronting pattern in formal English.' },
      { id: 'c2-fr-4', type: 'fill_blank', question: 'Interesting ___ the idea was, it proved impractical.', options: ['though', 'but', 'despite'], correctAnswer: 'though', explanation: 'Complement fronting with concessive meaning: "Interesting though the idea was" = "Although the idea was interesting." The adjective complement is fronted, followed by "though" + subject + verb.' },
      { id: 'c2-fr-5', type: 'fill_blank', question: 'Not a single mistake ___ he make during the entire performance.', options: ['did', 'was', 'had'], correctAnswer: 'did', explanation: 'When a negative object ("Not a single mistake") is fronted, subject-auxiliary inversion is required. "Did" is the auxiliary for simple past: "Not a single mistake did he make" = "He did not make a single mistake".' },
      { id: 'c2-fr-6', type: 'error_correction', question: 'Such the severity of the drought was that reservoirs fell to historic lows.', correctAnswer: 'Such was the severity of the drought that reservoirs fell to historic lows.', explanation: 'Fronting with "such" requires inversion: "Such was the severity..." places the copula "was" before the subject noun phrase. This construction intensifies the degree of the drought.' },
      { id: 'c2-fr-7', type: 'fill_blank', question: 'Gone ___ the days when a single income could support a family.', options: ['are', 'is', 'were'], correctAnswer: 'are', explanation: '"Gone are the days" is a fronted participial construction. The past participle "gone" is moved to the front for rhetorical effect, and the plural subject "days" requires "are".' },
      { id: 'c2-fr-8', type: 'multiple_choice', question: 'Which sentence correctly uses object fronting for emphasis?', options: ['His arrogance we can tolerate; his dishonesty we cannot.', 'We can tolerate his arrogance we; his dishonesty we cannot.', 'His arrogance tolerate we can; his dishonesty we cannot.'], correctAnswer: 'His arrogance we can tolerate; his dishonesty we cannot.', explanation: 'Object fronting moves the object before the subject but preserves normal subject-verb order: "His arrogance we can tolerate." This creates a parallel contrast with "his dishonesty we cannot."' },
      { id: 'c2-fr-9', type: 'fill_blank', question: 'Of equal importance ___ the need to ensure transparent governance structures.', options: ['is', 'are', 'has'], correctAnswer: 'is', explanation: '"Of equal importance is..." fronts the prepositional complement and inverts the subject-verb order. The singular subject "the need" requires "is". This topicalization technique is common in formal academic prose.' },
      { id: 'c2-fr-10', type: 'error_correction', question: 'Particularly striking is the disparities between urban and rural healthcare outcomes.', correctAnswer: 'Particularly striking are the disparities between urban and rural healthcare outcomes.', explanation: 'In this fronted construction, the copula must agree with the post-verbal subject "the disparities" (plural), requiring "are", not "is".' },
    ]
  },
]
