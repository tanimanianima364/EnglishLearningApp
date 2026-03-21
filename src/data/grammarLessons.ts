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
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2'
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
]
