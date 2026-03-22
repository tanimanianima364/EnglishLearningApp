export interface ListeningQuestion {
  id: string
  type: 'inference' | 'main_idea' | 'detail' | 'attitude' | 'implication'
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface ListeningPassage {
  id: string
  title: string
  cefrLevel: 'B1' | 'B2' | 'C1' | 'C2'
  type: 'monologue' | 'dialogue' | 'lecture' | 'debate'
  transcript: string
  audioUrl?: string // Pre-generated high-quality audio (Google Cloud Neural TTS)
  questions: ListeningQuestion[]
  keyVocabulary: { word: string; definition: string }[]
}

export const listeningPassages: ListeningPassage[] = [
  // ============================================================
  // B1 PASSAGES (3)
  // ============================================================

  // 1. B1 — Monologue: "My Trip to Barcelona"
  {
    id: 'b1-travel',
    title: 'My Trip to Barcelona',
    cefrLevel: 'B1',
    type: 'monologue',
    transcript: `So last summer I went to Barcelona for a week, and it was really amazing. I'd never been to Spain before, so I was a bit nervous, but everyone was so friendly. The first thing I did was visit the Sagrada Familia — you know, the big church that Gaudí designed. It's still not finished, which is kind of crazy when you think about it. They started building it in 1882! Anyway, the inside was beautiful, with all these colourful windows. After that, I walked down Las Ramblas, which is this long street full of shops, restaurants, and street performers. I tried some tapas at a little place near the market — the patatas bravas were my favourite. The weather was perfect the whole time, around thirty degrees every day. I also spent a couple of afternoons at the beach, just relaxing. Honestly, I didn't want to come home. I'm already planning to go back next year, maybe in spring when it's not so crowded.`,
    questions: [
      {
        id: 'b1-travel-q1',
        type: 'detail',
        question: 'What was the first tourist attraction the speaker visited?',
        options: [
          'Las Ramblas',
          'The beach',
          'The Sagrada Familia',
          'The local market'
        ],
        correctAnswer: 2,
        explanation: 'The speaker says "The first thing I did was visit the Sagrada Familia," directly stating this was the first attraction visited.'
      },
      {
        id: 'b1-travel-q2',
        type: 'detail',
        question: 'What food did the speaker enjoy most?',
        options: [
          'Paella',
          'Patatas bravas',
          'Churros',
          'Seafood tapas'
        ],
        correctAnswer: 1,
        explanation: 'The speaker explicitly states "the patatas bravas were my favourite" when describing the tapas they tried.'
      },
      {
        id: 'b1-travel-q3',
        type: 'inference',
        question: 'How did the speaker feel about the trip overall?',
        options: [
          'It was disappointing.',
          'It was too hot to enjoy.',
          'It was an extremely positive experience.',
          'It was too expensive.'
        ],
        correctAnswer: 2,
        explanation: 'The speaker uses words like "really amazing," says "I didn\'t want to come home," and is already planning a return trip — all indicating a very positive experience.'
      },
      {
        id: 'b1-travel-q4',
        type: 'inference',
        question: 'Why does the speaker want to visit Barcelona in spring next time?',
        options: [
          'Because the flights are cheaper.',
          'Because there are fewer tourists.',
          'Because the food is better in spring.',
          'Because the weather is cooler.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker says "maybe in spring when it\'s not so crowded," implying they want to avoid the large summer tourist crowds.'
      }
    ],
    keyVocabulary: [
      { word: 'nervous', definition: 'Feeling worried or slightly afraid about something.' },
      { word: 'crowded', definition: 'Full of too many people, uncomfortably busy.' },
      { word: 'street performers', definition: 'People who entertain others in public places, such as musicians or acrobats.' },
      { word: 'tapas', definition: 'Small dishes of food served as snacks or appetizers, typical of Spanish cuisine.' }
    ]
  },

  // 2. B1 — Dialogue: "Ordering at a Café"
  {
    id: 'b1-restaurant',
    title: 'Ordering at a Café',
    cefrLevel: 'B1',
    type: 'dialogue',
    transcript: `Speaker A says: Hi there, welcome! What can I get you today? Speaker B responds: Um, hi. Could I have a cappuccino, please? And, uh, do you have any cakes or pastries? Speaker A says: Sure! We've got chocolate cake, carrot cake, and blueberry muffins today. Speaker B responds: Oh, the carrot cake sounds nice. Is it homemade? Speaker A says: Yes, everything's baked fresh here every morning. Speaker B responds: Great, I'll have a slice of that, then. Actually, wait — could I get the cappuccino with oat milk instead? I'm trying to cut down on dairy. Speaker A says: No problem at all. So that's one oat milk cappuccino and a slice of carrot cake. Anything else? Speaker B responds: No, that's everything, thanks. How much is that? Speaker A says: That'll be six pounds fifty, please.`,
    questions: [
      {
        id: 'b1-restaurant-q1',
        type: 'detail',
        question: 'What does the customer finally order to drink?',
        options: [
          'A regular cappuccino',
          'A cappuccino with oat milk',
          'A latte with oat milk',
          'A black coffee'
        ],
        correctAnswer: 1,
        explanation: 'The customer initially orders a cappuccino but then changes the order, asking "could I get the cappuccino with oat milk instead?"'
      },
      {
        id: 'b1-restaurant-q2',
        type: 'inference',
        question: 'Why does the customer ask for oat milk?',
        options: [
          'Because oat milk tastes better.',
          'Because regular milk is more expensive.',
          'Because the customer is reducing dairy consumption.',
          'Because the café has run out of regular milk.'
        ],
        correctAnswer: 2,
        explanation: 'The customer says "I\'m trying to cut down on dairy," which means they are making an effort to consume less dairy products.'
      },
      {
        id: 'b1-restaurant-q3',
        type: 'detail',
        question: 'What does the server say about the baked goods?',
        options: [
          'They are delivered from a bakery.',
          'They are baked fresh every morning on site.',
          'They are frozen and reheated.',
          'They are only available on weekends.'
        ],
        correctAnswer: 1,
        explanation: 'The server says "everything\'s baked fresh here every morning," indicating the items are homemade and prepared daily at the café.'
      }
    ],
    keyVocabulary: [
      { word: 'pastries', definition: 'Sweet baked goods made from dough, such as croissants or Danish rolls.' },
      { word: 'homemade', definition: 'Made at home or on the premises, rather than bought from a factory.' },
      { word: 'cut down on', definition: 'To reduce the amount of something you consume or do.' },
      { word: 'slice', definition: 'A flat piece cut from a larger item, especially food like cake or bread.' }
    ]
  },

  // 3. B1 — Monologue: "Why I Love Photography"
  {
    id: 'b1-hobby',
    title: 'Why I Love Photography',
    cefrLevel: 'B1',
    type: 'monologue',
    transcript: `I got into photography about three years ago when my dad gave me his old camera. At first, I just took pictures of my cat and things around the house, but then I started going outside more — to parks, the city centre, places like that. What I love most about photography is that it makes you really look at things. You know, normally you walk past a building or a tree and you don't even notice it. But when you have a camera, you slow down and you start to see all these little details — the light, the shadows, the textures. I mostly do street photography now, which means taking pictures of everyday life in public places. Some of my best photos are just of ordinary people doing ordinary things, but somehow the image tells a story. I've even started an Instagram page to share my work, and it's been great getting feedback from other photographers.`,
    questions: [
      {
        id: 'b1-hobby-q1',
        type: 'detail',
        question: 'How did the speaker first get a camera?',
        options: [
          'They bought one online.',
          'They won it in a competition.',
          'Their father gave them an old camera.',
          'They borrowed one from a friend.'
        ],
        correctAnswer: 2,
        explanation: 'The speaker says "my dad gave me his old camera," clearly explaining how they received their first camera.'
      },
      {
        id: 'b1-hobby-q2',
        type: 'main_idea',
        question: 'What is the main reason the speaker enjoys photography?',
        options: [
          'It helps them make money.',
          'It forces them to observe the world more carefully.',
          'It allows them to travel to new places.',
          'It is a good way to become famous.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker says "it makes you really look at things" and describes how photography helps you "slow down" and "see all these little details," making careful observation the central appeal.'
      },
      {
        id: 'b1-hobby-q3',
        type: 'detail',
        question: 'What type of photography does the speaker mainly do now?',
        options: [
          'Wildlife photography',
          'Portrait photography',
          'Street photography',
          'Landscape photography'
        ],
        correctAnswer: 2,
        explanation: 'The speaker explicitly states "I mostly do street photography now," and defines it as taking pictures of everyday life in public places.'
      },
      {
        id: 'b1-hobby-q4',
        type: 'inference',
        question: 'What can you infer about the speaker\'s attitude towards sharing their photos?',
        options: [
          'They are very private and dislike sharing.',
          'They enjoy the community aspect of sharing their work.',
          'They only share photos with family.',
          'They think social media is a waste of time.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker has started an Instagram page and says "it\'s been great getting feedback from other photographers," suggesting they value and enjoy the community interaction around their work.'
      }
    ],
    keyVocabulary: [
      { word: 'textures', definition: 'The feel or appearance of a surface, such as rough, smooth, or grainy.' },
      { word: 'street photography', definition: 'A style of photography that captures everyday life and people in public settings.' },
      { word: 'feedback', definition: 'Comments and opinions about something you have done, given to help you improve.' },
      { word: 'ordinary', definition: 'Normal, not special or unusual in any way.' }
    ]
  },

  // ============================================================
  // B2 PASSAGES (3)
  // ============================================================

  // 4. B2 — Lecture: "Understanding Climate Change"
  {
    id: 'b2-climate',
    title: 'Understanding Climate Change',
    cefrLevel: 'B2',
    type: 'lecture',
    transcript: `Good morning, everyone. Today we're going to look at the science behind climate change and why it matters. So, as most of you probably know, the Earth's climate has always changed — there have been ice ages and warm periods throughout history. However, what's different now is the speed at which changes are happening. Since the Industrial Revolution, human activities — mainly the burning of fossil fuels like coal, oil, and natural gas — have released enormous quantities of carbon dioxide into the atmosphere. This CO2 acts like a blanket, trapping heat and gradually raising global temperatures. This is what we call the greenhouse effect. Now, the consequences of this warming are already visible. Sea levels are rising because glaciers and ice sheets are melting. We're seeing more frequent and intense extreme weather events — hurricanes, droughts, heatwaves. Ecosystems are being disrupted, with many species struggling to adapt fast enough. And it's not just an environmental issue — it affects food security, water supplies, and the economies of entire nations. The scientific consensus is clear: if we don't significantly reduce greenhouse gas emissions within the next decade, many of these effects will become irreversible. But there is still time to act, and that's what we'll explore in the rest of this course.`,
    questions: [
      {
        id: 'b2-climate-q1',
        type: 'main_idea',
        question: 'What is the main point the speaker is making?',
        options: [
          'Climate change is a natural process that has always occurred.',
          'Human activity is driving climate change at an unprecedented rate, and urgent action is needed.',
          'Scientists disagree about the causes of climate change.',
          'The greenhouse effect is beneficial for life on Earth.'
        ],
        correctAnswer: 1,
        explanation: 'While the speaker acknowledges that climate has always changed, the central argument is that human-driven change is happening unusually fast and that significant emission reductions are needed within a decade.'
      },
      {
        id: 'b2-climate-q2',
        type: 'detail',
        question: 'According to the speaker, what primarily causes the current rise in CO2 levels?',
        options: [
          'Volcanic eruptions',
          'Deforestation',
          'The burning of fossil fuels',
          'Agricultural farming'
        ],
        correctAnswer: 2,
        explanation: 'The speaker specifies "mainly the burning of fossil fuels like coal, oil, and natural gas" as the primary source of carbon dioxide emissions.'
      },
      {
        id: 'b2-climate-q3',
        type: 'detail',
        question: 'Which of the following is NOT mentioned as a consequence of global warming?',
        options: [
          'Rising sea levels',
          'More extreme weather events',
          'Increased volcanic activity',
          'Disrupted ecosystems'
        ],
        correctAnswer: 2,
        explanation: 'The speaker mentions rising sea levels, extreme weather events, and disrupted ecosystems, but volcanic activity is never mentioned as a consequence of warming.'
      },
      {
        id: 'b2-climate-q4',
        type: 'inference',
        question: 'What does the speaker imply about the current scientific debate on climate change?',
        options: [
          'There is still significant disagreement among scientists.',
          'Scientists broadly agree on the causes and urgency.',
          'Most scientists think the problem is exaggerated.',
          'Scientists are uncertain about the greenhouse effect.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker uses the phrase "the scientific consensus is clear," which implies that the vast majority of scientists are in agreement about the human causes and urgency of climate change.'
      },
      {
        id: 'b2-climate-q5',
        type: 'implication',
        question: 'What does the speaker imply by saying "there is still time to act"?',
        options: [
          'Climate change has not started yet.',
          'The problem is not very serious.',
          'The situation is urgent but not yet hopeless if action is taken soon.',
          'Governments have already solved the problem.'
        ],
        correctAnswer: 2,
        explanation: 'By following the warning about irreversibility with "there is still time to act," the speaker implies that while the situation is critical, meaningful intervention is still possible if it happens promptly.'
      }
    ],
    keyVocabulary: [
      { word: 'fossil fuels', definition: 'Natural fuels such as coal, oil, and gas, formed from the remains of ancient organisms.' },
      { word: 'greenhouse effect', definition: 'The warming of Earth caused by gases in the atmosphere trapping heat from the sun.' },
      { word: 'irreversible', definition: 'Impossible to undo or reverse once it has happened.' },
      { word: 'consensus', definition: 'A general agreement among a group of people, especially experts.' },
      { word: 'ecosystems', definition: 'Communities of living organisms and their physical environments functioning as a unit.' }
    ]
  },

  // 5. B2 — Dialogue: "A Job Interview"
  {
    id: 'b2-interview',
    title: 'A Job Interview',
    cefrLevel: 'B2',
    type: 'dialogue',
    transcript: `Speaker A says: Thanks for coming in today, Sarah. So, tell me a bit about yourself and why you're interested in this marketing position. Speaker B responds: Of course. Well, I graduated from Leeds University with a degree in Communications, and since then I've been working at a digital agency for about two years. I've been mainly handling social media campaigns and content strategy for mid-sized clients. I really enjoyed it, but I feel like I've reached a point where I want more responsibility and the chance to work on bigger projects. That's what attracted me to this role. Speaker A says: That makes sense. Can you give me an example of a campaign you're particularly proud of? Speaker B responds: Sure. Last year I led a product launch campaign for a skincare brand. We developed an influencer partnership strategy that ended up increasing their online engagement by forty percent over three months. It was a real team effort, but I was responsible for the overall direction and the analytics. Speaker A says: Impressive. Now, one thing we value here is adaptability. How do you handle situations where a project doesn't go as planned? Speaker B responds: Honestly, I think the key is staying calm and being willing to change direction quickly. In my current role, we had a campaign that wasn't performing well, and instead of pushing forward with the same approach, we paused, looked at the data, and completely reworked the messaging. It turned out to be one of our most successful campaigns in the end.`,
    questions: [
      {
        id: 'b2-interview-q1',
        type: 'detail',
        question: 'How long has Sarah been working at her current job?',
        options: [
          'About one year',
          'About two years',
          'About three years',
          'About five years'
        ],
        correctAnswer: 1,
        explanation: 'Sarah says "I\'ve been working at a digital agency for about two years," directly stating the length of her employment.'
      },
      {
        id: 'b2-interview-q2',
        type: 'inference',
        question: 'Why does Sarah want to leave her current position?',
        options: [
          'She dislikes her colleagues.',
          'The salary is too low.',
          'She wants more challenge and career growth.',
          'The company is closing down.'
        ],
        correctAnswer: 2,
        explanation: 'Sarah says she wants "more responsibility and the chance to work on bigger projects," implying she has outgrown her current role and is seeking career advancement.'
      },
      {
        id: 'b2-interview-q3',
        type: 'detail',
        question: 'What result did Sarah\'s skincare campaign achieve?',
        options: [
          'Sales increased by forty percent.',
          'Online engagement increased by forty percent.',
          'The brand gained forty thousand followers.',
          'Website traffic doubled.'
        ],
        correctAnswer: 1,
        explanation: 'Sarah specifies that the influencer partnership strategy "ended up increasing their online engagement by forty percent over three months."'
      },
      {
        id: 'b2-interview-q4',
        type: 'inference',
        question: 'What quality does Sarah demonstrate in her final answer?',
        options: [
          'She avoids taking responsibility for failures.',
          'She is inflexible in her approach to work.',
          'She is pragmatic and data-driven when facing challenges.',
          'She prefers to work alone rather than in a team.'
        ],
        correctAnswer: 2,
        explanation: 'Sarah describes pausing, looking at data, and reworking the approach — demonstrating a practical, evidence-based response to challenges rather than rigid adherence to a failing plan.'
      }
    ],
    keyVocabulary: [
      { word: 'content strategy', definition: 'A plan for creating and distributing valuable content to attract and engage an audience.' },
      { word: 'influencer partnership', definition: 'A collaboration with social media personalities who have large followings, used to promote products.' },
      { word: 'engagement', definition: 'The level of interaction (likes, shares, comments) that users have with online content.' },
      { word: 'adaptability', definition: 'The ability to adjust to new conditions or changes in circumstances.' },
      { word: 'analytics', definition: 'The systematic analysis of data, especially statistics, to discover useful patterns.' }
    ]
  },

  // 6. B2 — Monologue: "Technology and Society"
  {
    id: 'b2-technology',
    title: 'Technology and Society',
    cefrLevel: 'B2',
    type: 'monologue',
    transcript: `There's no doubt that technology has transformed the way we live, work, and communicate. Just think about how different daily life was twenty years ago — no smartphones, no social media, no streaming services. In many ways, technology has made things easier and more convenient. We can access information instantly, stay connected with people around the world, and automate tasks that used to take hours. But it hasn't all been positive, has it? One of the biggest concerns is the impact on mental health. Studies have shown that excessive screen time and social media use can lead to anxiety, depression, and feelings of isolation — which is ironic, given that these platforms were designed to bring people together. There's also the issue of privacy. Every time we use a search engine, shop online, or even just carry our phones, we're generating data that companies collect and use, often without our full understanding. And then there's the question of jobs. Automation and artificial intelligence are already replacing certain types of work, and while new jobs are being created, not everyone has access to the training needed to fill them. So the challenge going forward isn't really whether we should use technology — that ship has sailed. The real question is how we manage it responsibly, so that the benefits are shared widely and the risks are kept in check.`,
    questions: [
      {
        id: 'b2-technology-q1',
        type: 'main_idea',
        question: 'What is the speaker\'s overall position on technology?',
        options: [
          'Technology is entirely harmful and should be avoided.',
          'Technology is beneficial but needs to be managed responsibly.',
          'Technology only benefits large corporations.',
          'Technology will eventually solve all of society\'s problems.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker acknowledges both benefits and drawbacks, concluding that "the real question is how we manage it responsibly," taking a balanced view that favours thoughtful management rather than rejection or uncritical acceptance.'
      },
      {
        id: 'b2-technology-q2',
        type: 'detail',
        question: 'What does the speaker identify as ironic about social media?',
        options: [
          'It is free to use but very profitable for companies.',
          'It was designed to connect people but can cause isolation.',
          'It was invented by young people but is mostly used by older adults.',
          'It spreads news but also misinformation.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker says it is "ironic" that social media can lead to "feelings of isolation" since "these platforms were designed to bring people together."'
      },
      {
        id: 'b2-technology-q3',
        type: 'inference',
        question: 'What does the speaker mean by "that ship has sailed"?',
        options: [
          'The technology industry is declining.',
          'We have already missed the chance to benefit from technology.',
          'It is too late to debate whether to use technology — it is already integral to life.',
          'Technology companies should invest in shipping.'
        ],
        correctAnswer: 2,
        explanation: 'The idiom "that ship has sailed" means the opportunity to choose has passed. The speaker is saying technology is already so embedded in society that rejecting it entirely is no longer a realistic option.'
      },
      {
        id: 'b2-technology-q4',
        type: 'detail',
        question: 'What concern does the speaker raise about automation?',
        options: [
          'Machines are more expensive than human workers.',
          'Automation makes products less reliable.',
          'Not everyone can access the training needed for new types of jobs.',
          'Automation has not yet affected any industries.'
        ],
        correctAnswer: 2,
        explanation: 'The speaker says "not everyone has access to the training needed to fill them," highlighting inequality in access to skills development as the key concern about automation-driven job displacement.'
      },
      {
        id: 'b2-technology-q5',
        type: 'implication',
        question: 'What does the speaker imply about data privacy?',
        options: [
          'Most people fully understand how their data is used.',
          'Data collection only happens on social media platforms.',
          'People are often unaware of the extent to which their data is collected.',
          'Companies always ask for explicit permission before collecting data.'
        ],
        correctAnswer: 2,
        explanation: 'The speaker says companies collect and use data "often without our full understanding," implying that most people do not fully realise how much personal data is being gathered and how it is being used.'
      }
    ],
    keyVocabulary: [
      { word: 'automate', definition: 'To use technology to perform a task with minimal human involvement.' },
      { word: 'isolation', definition: 'The state of being separated from others, feeling alone or disconnected.' },
      { word: 'privacy', definition: 'The right to keep personal information and activities free from public attention.' },
      { word: 'generating data', definition: 'Creating digital information through actions like browsing, shopping, or using apps.' },
      { word: 'in check', definition: 'Under control, prevented from becoming too large or problematic.' }
    ]
  },

  // ============================================================
  // C1 PASSAGES (6)
  // ============================================================

  // 7. C1 — Lecture: "Cognitive Biases in Decision Making"
  {
    id: 'c1-cognitive-bias',
    title: 'Cognitive Biases in Decision Making',
    cefrLevel: 'C1',
    type: 'lecture',
    transcript: `So today I want to talk about something that affects every single one of us, whether we're aware of it or not — cognitive biases. Now, we tend to think of ourselves as rational beings, people who weigh up evidence, consider the alternatives, and make logical decisions. But decades of research in cognitive psychology, particularly the work of Daniel Kahneman and Amos Tversky, have shown that this really isn't the case. Our brains rely on mental shortcuts — heuristics — that are efficient but frequently lead us astray. Let me give you a couple of examples. The first is confirmation bias. This is our tendency to search for, interpret, and remember information in a way that confirms what we already believe. If you think, say, that a particular political party is corrupt, you'll naturally pay more attention to news stories that support that view, while dismissing or overlooking evidence that contradicts it. It's not deliberate — it happens automatically, beneath conscious awareness. Then there's the anchoring effect. This occurs when we rely too heavily on the first piece of information we encounter. In negotiations, for instance, whoever sets the opening price has a powerful advantage, because that number — however arbitrary — becomes the reference point for the entire discussion. Even trained professionals fall victim to this; studies have shown that judges' sentencing decisions can be influenced by completely random numbers they were exposed to beforehand. Now, what's particularly troubling is that knowing about these biases doesn't necessarily protect you from them. You might think, "Well, now that I understand confirmation bias, I won't fall for it." But research suggests that metacognitive awareness alone is insufficient. We need structured decision-making processes — checklists, devil's advocates, systematic evidence review — to genuinely counteract these deeply ingrained patterns of thought.`,
    questions: [
      {
        id: 'c1-cognitive-bias-q1',
        type: 'inference',
        question: 'What does the speaker imply about human rationality?',
        options: [
          'Humans are fundamentally rational but occasionally make mistakes.',
          'Human decision-making is systematically flawed due to built-in mental shortcuts.',
          'Irrationality only affects uneducated people.',
          'Cognitive biases are a modern phenomenon caused by information overload.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker contrasts the common belief in human rationality with research showing that mental shortcuts "frequently lead us astray," implying that irrational patterns are systematic and inherent rather than occasional errors.'
      },
      {
        id: 'c1-cognitive-bias-q2',
        type: 'implication',
        question: 'What does the example about judges imply?',
        options: [
          'Judges are less competent than other professionals.',
          'Random numbers can directly determine legal sentences.',
          'Even highly trained experts are not immune to cognitive biases.',
          'The legal system should replace judges with algorithms.'
        ],
        correctAnswer: 2,
        explanation: 'By showing that "even trained professionals" like judges can be influenced by random numbers through the anchoring effect, the speaker implies that expertise and training do not prevent cognitive biases from operating.'
      },
      {
        id: 'c1-cognitive-bias-q3',
        type: 'implication',
        question: 'What does the speaker imply about self-awareness as a solution to biases?',
        options: [
          'Simply being aware of biases is enough to overcome them.',
          'Self-awareness is the most effective tool against biases.',
          'Awareness alone is inadequate; structural safeguards are necessary.',
          'People should not try to learn about biases because it gives false confidence.'
        ],
        correctAnswer: 2,
        explanation: 'The speaker explicitly says "metacognitive awareness alone is insufficient" and argues for "structured decision-making processes," implying that individual awareness must be supplemented by systematic methods.'
      },
      {
        id: 'c1-cognitive-bias-q4',
        type: 'inference',
        question: 'Why does the speaker describe confirmation bias as happening "beneath conscious awareness"?',
        options: [
          'To suggest that people deliberately ignore contradicting evidence.',
          'To emphasise that the bias operates automatically without intentional effort.',
          'To argue that unconscious people are more biased than conscious ones.',
          'To prove that biases only occur during sleep.'
        ],
        correctAnswer: 1,
        explanation: 'By saying it happens "beneath conscious awareness" and is "not deliberate," the speaker emphasises that confirmation bias is an automatic cognitive process, not a conscious choice to be dishonest or one-sided.'
      },
      {
        id: 'c1-cognitive-bias-q5',
        type: 'inference',
        question: 'What is the speaker\'s likely view on how organisations should make important decisions?',
        options: [
          'They should trust the intuition of their most experienced leaders.',
          'They should implement systematic processes that reduce the influence of individual biases.',
          'They should avoid making decisions altogether.',
          'They should hire psychologists to make decisions for them.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker recommends "checklists, devil\'s advocates, systematic evidence review" as tools to counteract biases, suggesting a preference for structured, systematic decision-making in organisations rather than reliance on individual judgment.'
      }
    ],
    keyVocabulary: [
      { word: 'heuristics', definition: 'Mental shortcuts or rules of thumb that simplify decision-making but can introduce errors.' },
      { word: 'confirmation bias', definition: 'The tendency to favour information that confirms existing beliefs while ignoring contradictory evidence.' },
      { word: 'anchoring effect', definition: 'A cognitive bias where an initial piece of information disproportionately influences subsequent judgments.' },
      { word: 'metacognitive', definition: 'Relating to awareness and understanding of one\'s own thought processes.' },
      { word: 'counteract', definition: 'To act against something in order to reduce its force or neutralise it.' },
      { word: 'ingrained', definition: 'Deeply embedded in one\'s thinking or behaviour, difficult to change.' }
    ]
  },

  // 8. C1 — Debate: "Remote Work vs Office Work"
  {
    id: 'c1-remote-work',
    title: 'Remote Work vs Office Work',
    cefrLevel: 'C1',
    type: 'debate',
    transcript: `Speaker A says: I think the pandemic fundamentally changed the conversation about remote work, and frankly, I don't see why we'd go back to the old model. Productivity data from multiple studies — Stanford, Microsoft, Harvard Business Review — consistently shows that remote workers are at least as productive as their office-based counterparts, and in many cases more so. People save hours on commuting, they have greater control over their working environment, and they report higher levels of job satisfaction. So what exactly is the argument for dragging everyone back to the office? Speaker B responds: Well, I wouldn't dismiss those studies entirely, but I think they tell an incomplete story. What the productivity metrics don't capture is the quality of collaboration and innovation. There's a reason companies like Google and Apple invested billions in physical workspaces — it's because spontaneous interaction, the kind that happens at the coffee machine or in the corridor, often leads to creative breakthroughs that simply don't happen over Zoom. Speaker A says: That's a romantic notion, but is there hard evidence for it? I mean, how many billion-dollar ideas have actually originated at a coffee machine? The reality is that most collaboration can be structured and facilitated effectively through digital tools. And let's not forget the equity dimension — remote work opens doors for people with disabilities, caregiving responsibilities, and those living outside expensive urban centres. Speaker B responds: Those are fair points, and I'm not arguing for a complete return to the office. But I do think we're underestimating the social and mentoring functions of in-person work. Junior employees, in particular, learn enormously from being physically present alongside experienced colleagues. That kind of informal knowledge transfer is very difficult to replicate remotely.`,
    questions: [
      {
        id: 'c1-remote-work-q1',
        type: 'attitude',
        question: 'What is Speaker A\'s overall attitude towards remote work?',
        options: [
          'Cautiously sceptical — they see some benefits but have major concerns.',
          'Strongly favourable — they see it as clearly superior to office work.',
          'Neutral — they believe both models have equal merit.',
          'Hostile — they think remote work is damaging to companies.'
        ],
        correctAnswer: 1,
        explanation: 'Speaker A cites multiple studies supporting remote work, questions the rationale for returning to offices, and highlights additional equity benefits — all indicating a strongly favourable stance.'
      },
      {
        id: 'c1-remote-work-q2',
        type: 'inference',
        question: 'What does Speaker A imply by calling Speaker B\'s argument a "romantic notion"?',
        options: [
          'That Speaker B is being emotionally supportive.',
          'That Speaker B\'s point is idealistic and not supported by strong evidence.',
          'That Speaker B has a personal attachment to the office.',
          'That the idea of spontaneous innovation is a beautiful concept.'
        ],
        correctAnswer: 1,
        explanation: 'By calling it a "romantic notion" and immediately asking for "hard evidence," Speaker A implies that the idea of coffee-machine innovation is an appealing but unsupported idealisation rather than a data-driven argument.'
      },
      {
        id: 'c1-remote-work-q3',
        type: 'attitude',
        question: 'How would you characterise Speaker B\'s position?',
        options: [
          'Completely opposed to any form of remote work.',
          'In favour of a fully remote model with no exceptions.',
          'Supportive of a hybrid approach that preserves in-person benefits.',
          'Indifferent to the debate and unwilling to commit to a view.'
        ],
        correctAnswer: 2,
        explanation: 'Speaker B says "I\'m not arguing for a complete return to the office" but emphasises the value of in-person mentoring and collaboration, indicating support for a middle ground that combines remote and office elements.'
      },
      {
        id: 'c1-remote-work-q4',
        type: 'inference',
        question: 'What does Speaker A imply about traditional office work and social equity?',
        options: [
          'Office work is equally accessible to everyone.',
          'Traditional office models can exclude certain groups of people.',
          'Remote work creates more inequality than office work.',
          'Equity is not relevant to workplace policy discussions.'
        ],
        correctAnswer: 1,
        explanation: 'By highlighting that remote work "opens doors for people with disabilities, caregiving responsibilities, and those living outside expensive urban centres," Speaker A implies that the traditional office model creates barriers for these groups.'
      },
      {
        id: 'c1-remote-work-q5',
        type: 'implication',
        question: 'What does Speaker B imply about the limitations of digital collaboration tools?',
        options: [
          'They are too expensive for most companies.',
          'They are technically unreliable and frequently crash.',
          'They cannot fully replicate the informal learning that happens through physical proximity.',
          'They are only useful for senior employees.'
        ],
        correctAnswer: 2,
        explanation: 'Speaker B argues that "informal knowledge transfer is very difficult to replicate remotely," implying that digital tools, while useful, fall short of reproducing the organic, unstructured learning that occurs through daily in-person interaction.'
      }
    ],
    keyVocabulary: [
      { word: 'counterparts', definition: 'People or things that have the same function or role in a different context or setting.' },
      { word: 'spontaneous interaction', definition: 'Unplanned, natural communication that occurs without scheduling or intention.' },
      { word: 'equity dimension', definition: 'The aspect of fairness and equal access to opportunities for all groups in society.' },
      { word: 'knowledge transfer', definition: 'The process of passing skills, expertise, or understanding from one person to another.' },
      { word: 'replicate', definition: 'To reproduce or copy something closely, achieving the same result.' }
    ]
  },

  // 9. C1 — Monologue: "Introduction to Research Methodology"
  {
    id: 'c1-academic-intro',
    title: 'Introduction to Research Methodology',
    cefrLevel: 'C1',
    type: 'monologue',
    transcript: `Welcome to this introductory module on research methodology. Over the course of this term, we'll be examining the principles that underpin rigorous academic inquiry, and I want to begin by addressing a question that may seem deceptively simple: what makes good research? Now, at its core, good research is systematic, transparent, and replicable. That is, it follows a clear method, it can be scrutinised by others, and in principle, another researcher should be able to follow the same steps and arrive at similar findings. But beyond these general principles, we need to understand the distinction between two broad approaches — quantitative and qualitative research. Quantitative research deals with numbers and measurable data. It's rooted in the positivist tradition, which holds that objective reality can be observed and measured. You design a hypothesis, collect numerical data, and test your hypothesis using statistical analysis. It's powerful for identifying patterns across large populations, but it has limitations — it often struggles to capture the complexity of human experience and social context. Qualitative research, on the other hand, is interpretive. It seeks to understand meaning, perspective, and lived experience through methods such as interviews, ethnography, and textual analysis. It doesn't aim for generalisability in the statistical sense; rather, it aims for depth and richness of understanding. Now, some of the most robust research combines both approaches — what we call mixed methods — recognising that neither quantitative nor qualitative methods alone can provide a complete picture. Throughout this module, you'll develop the ability to critically evaluate research designs and to choose appropriate methods for your own projects.`,
    questions: [
      {
        id: 'c1-academic-intro-q1',
        type: 'main_idea',
        question: 'What is the primary purpose of this passage?',
        options: [
          'To argue that quantitative research is superior to qualitative research.',
          'To introduce students to the foundations and key distinctions in research methodology.',
          'To persuade students to use mixed methods in all their projects.',
          'To criticise the positivist tradition in academic research.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker is introducing a course module by outlining what constitutes good research and explaining the distinction between quantitative and qualitative approaches — this is a foundational overview, not an argument for one method over another.'
      },
      {
        id: 'c1-academic-intro-q2',
        type: 'detail',
        question: 'According to the speaker, what three qualities define good research?',
        options: [
          'Original, funded, and published',
          'Systematic, transparent, and replicable',
          'Creative, innovative, and collaborative',
          'Theoretical, practical, and ethical'
        ],
        correctAnswer: 1,
        explanation: 'The speaker explicitly states that "good research is systematic, transparent, and replicable," defining each quality in the sentences that follow.'
      },
      {
        id: 'c1-academic-intro-q3',
        type: 'inference',
        question: 'What limitation of quantitative research does the speaker identify?',
        options: [
          'It is too expensive for most researchers.',
          'It cannot be replicated reliably.',
          'It may not adequately capture the nuances of human experience.',
          'It requires too much time to complete.'
        ],
        correctAnswer: 2,
        explanation: 'The speaker says quantitative research "often struggles to capture the complexity of human experience and social context," suggesting it oversimplifies the richness of human phenomena.'
      },
      {
        id: 'c1-academic-intro-q4',
        type: 'inference',
        question: 'What does the speaker imply about the relationship between quantitative and qualitative research?',
        options: [
          'They are fundamentally incompatible and should never be combined.',
          'Qualitative research is a subset of quantitative research.',
          'They are complementary approaches that address different aspects of a research question.',
          'One will eventually replace the other as methodology advances.'
        ],
        correctAnswer: 2,
        explanation: 'By stating that "neither quantitative nor qualitative methods alone can provide a complete picture" and endorsing mixed methods, the speaker implies the two approaches are complementary, each covering what the other lacks.'
      },
      {
        id: 'c1-academic-intro-q5',
        type: 'implication',
        question: 'What does the speaker imply by describing the opening question as "deceptively simple"?',
        options: [
          'The question is poorly worded and confusing.',
          'The question appears straightforward but actually involves considerable complexity.',
          'Students should not try to answer it.',
          'The question has only one correct answer.'
        ],
        correctAnswer: 1,
        explanation: 'The phrase "deceptively simple" signals that while "what makes good research?" sounds like a basic question, the answer involves multiple layers of methodological understanding, as the rest of the lecture demonstrates.'
      }
    ],
    keyVocabulary: [
      { word: 'replicable', definition: 'Able to be repeated or reproduced by another person following the same method.' },
      { word: 'positivist tradition', definition: 'A philosophical approach that holds knowledge should be based on observable, measurable facts.' },
      { word: 'ethnography', definition: 'A qualitative research method involving the in-depth study of people and cultures through immersion and observation.' },
      { word: 'generalisability', definition: 'The extent to which research findings can be applied to wider populations beyond the study sample.' },
      { word: 'mixed methods', definition: 'A research approach that combines quantitative and qualitative techniques in a single study.' }
    ]
  },

  // 10. C1 — Lecture: "The Sapir-Whorf Hypothesis"
  {
    id: 'c1-linguistic-relativity',
    title: 'The Sapir-Whorf Hypothesis',
    cefrLevel: 'C1',
    type: 'lecture',
    transcript: `Today we're going to examine one of the most debated ideas in linguistics — the Sapir-Whorf hypothesis, also known as linguistic relativity. In its strongest form, the hypothesis proposes that the language we speak determines the way we think. That is, the structure of our language doesn't merely influence cognition — it actually constrains it. Speakers of different languages would, under this view, inhabit fundamentally different cognitive worlds. Now, this strong version — sometimes called linguistic determinism — has largely been discredited. It's a fascinating idea, but the evidence simply doesn't support it. People can think about concepts even when their language lacks specific words for them. However, the weaker version of the hypothesis — that language influences thought without determining it — has received considerable empirical support in recent decades. Take colour perception, for example. Russian speakers, whose language requires a distinction between light blue and dark blue — "goluboy" and "siniy" — have been shown to distinguish between these shades faster than English speakers, who use a single term, "blue," for both. Similarly, research on spatial reasoning has found that speakers of Guugu Yimithirr, an Australian Aboriginal language that uses absolute directions — north, south, east, west — rather than relative ones like "left" and "right," maintain a remarkably precise internal compass, even indoors. These findings suggest that while language doesn't imprison thought, it does shape habitual patterns of attention and categorisation. We don't see the world neutrally; we see it through the lens of our linguistic categories. This has significant implications for cross-cultural communication, translation, and even artificial intelligence — fields where understanding the relationship between language and thought is absolutely critical.`,
    questions: [
      {
        id: 'c1-linguistic-relativity-q1',
        type: 'inference',
        question: 'What is the speaker\'s position on the strong version of the Sapir-Whorf hypothesis?',
        options: [
          'They fully support it as a valid theory.',
          'They find it intellectually interesting but consider it empirically unsupported.',
          'They reject it as both uninteresting and unscientific.',
          'They believe it has been proven correct by recent studies.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker calls linguistic determinism "a fascinating idea" but says "the evidence simply doesn\'t support it," indicating intellectual appreciation combined with scientific rejection.'
      },
      {
        id: 'c1-linguistic-relativity-q2',
        type: 'detail',
        question: 'What example does the speaker use to illustrate the weak version of the hypothesis?',
        options: [
          'Differences in mathematical ability across languages',
          'Russian speakers\' ability to distinguish shades of blue faster than English speakers',
          'The way Japanese speakers perceive emotional tone',
          'How French speakers process grammatical gender'
        ],
        correctAnswer: 1,
        explanation: 'The speaker uses the example of Russian colour terminology — the distinction between "goluboy" (light blue) and "siniy" (dark blue) — to show that language can influence perceptual speed.'
      },
      {
        id: 'c1-linguistic-relativity-q3',
        type: 'implication',
        question: 'What does the speaker imply about how we perceive the world?',
        options: [
          'Perception is entirely determined by biological factors.',
          'Everyone perceives the world in exactly the same way.',
          'Our perception is filtered through the categories our language provides.',
          'Language has no connection to perception whatsoever.'
        ],
        correctAnswer: 2,
        explanation: 'The speaker says "we see it through the lens of our linguistic categories," implying that the language we speak shapes the way we habitually perceive and categorise the world.'
      },
      {
        id: 'c1-linguistic-relativity-q4',
        type: 'inference',
        question: 'What does the Guugu Yimithirr example demonstrate?',
        options: [
          'That some languages are more primitive than others.',
          'That spatial language systems can shape cognitive abilities like orientation.',
          'That Aboriginal people have a genetic advantage in navigation.',
          'That absolute direction systems are superior to relative ones.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker uses this example to show that speakers of a language with absolute spatial terms develop "a remarkably precise internal compass," suggesting the linguistic system shapes cognitive spatial abilities.'
      },
      {
        id: 'c1-linguistic-relativity-q5',
        type: 'implication',
        question: 'Why does the speaker mention AI as an area affected by linguistic relativity?',
        options: [
          'Because AI systems need to be programmed in multiple languages.',
          'Because understanding how language shapes thought is essential for building AI that processes language accurately across cultures.',
          'Because AI will eventually replace human translators.',
          'Because AI has already solved the problem of linguistic relativity.'
        ],
        correctAnswer: 1,
        explanation: 'By including AI alongside cross-cultural communication and translation, the speaker implies that AI systems working with language must account for the way different languages encode and shape meaning — a core challenge of linguistic relativity.'
      }
    ],
    keyVocabulary: [
      { word: 'linguistic relativity', definition: 'The theory that the structure of a language affects the way its speakers perceive and think about the world.' },
      { word: 'linguistic determinism', definition: 'The strong claim that language determines thought, making certain ideas unthinkable without the corresponding linguistic structures.' },
      { word: 'cognition', definition: 'The mental processes involved in gaining knowledge and understanding, including thinking, reasoning, and remembering.' },
      { word: 'empirical', definition: 'Based on observation or experience rather than theory or pure logic.' },
      { word: 'categorisation', definition: 'The process of grouping things into classes or types based on shared characteristics.' }
    ]
  },

  // 11. C1 — Dialogue: "A Business Negotiation"
  {
    id: 'c1-negotiation',
    title: 'A Business Negotiation',
    cefrLevel: 'C1',
    type: 'dialogue',
    transcript: `Speaker A says: Thank you for making the trip, David. I think there's a real opportunity here for both of our companies, but I want to be upfront — we've had some concerns about the timeline you've proposed. Speaker B responds: I appreciate the honesty, Catherine. And I understand the concern. But I'd push back a little on the idea that our timeline is unrealistic. We've delivered comparable projects within similar timeframes for other clients, and we've already done significant groundwork on this one. Speaker A says: Fair enough, and I don't doubt your team's capability. But this isn't a standard implementation, is it? The integration with our legacy systems adds at least two months of complexity that I don't think your proposal fully accounts for. Speaker B responds: You raise a valid point. We did factor in integration work, but I'll concede that we may have underestimated the scope of your legacy infrastructure. What if we built in a contingency buffer — say, an additional six weeks — without adjusting the overall budget? Speaker A says: That's a more realistic picture. But I'd also want to see milestone-based deliverables, so we're not in a position where we only discover problems at the end. Speaker B responds: Absolutely. We can break the project into four phases with clear milestones and review points. And if any phase falls behind by more than two weeks, we'll flag it immediately and propose corrective action. Speaker A says: Good. I think we're getting somewhere. Let's get the revised proposal in writing by Friday, and I'll take it to the board next week.`,
    questions: [
      {
        id: 'c1-negotiation-q1',
        type: 'inference',
        question: 'What is Catherine\'s primary concern about the proposal?',
        options: [
          'The cost is too high.',
          'David\'s company lacks experience.',
          'The timeline does not adequately account for integration complexity.',
          'The project should be cancelled entirely.'
        ],
        correctAnswer: 2,
        explanation: 'Catherine says "the integration with our legacy systems adds at least two months of complexity that I don\'t think your proposal fully accounts for," identifying timeline underestimation related to integration as her main concern.'
      },
      {
        id: 'c1-negotiation-q2',
        type: 'attitude',
        question: 'How would you describe the tone of this negotiation?',
        options: [
          'Hostile and confrontational',
          'Professional, direct, and mutually respectful',
          'Casual and informal',
          'One-sided, with one speaker dominating'
        ],
        correctAnswer: 1,
        explanation: 'Both speakers acknowledge each other\'s points ("I appreciate the honesty," "You raise a valid point," "Fair enough"), push back respectfully, and work towards compromise — hallmarks of professional, mutually respectful negotiation.'
      },
      {
        id: 'c1-negotiation-q3',
        type: 'inference',
        question: 'What does David concede during the negotiation?',
        options: [
          'That his company is not capable of the project.',
          'That the budget needs to be increased significantly.',
          'That the original timeline may have underestimated the integration complexity.',
          'That Catherine\'s company should find a different vendor.'
        ],
        correctAnswer: 2,
        explanation: 'David says "I\'ll concede that we may have underestimated the scope of your legacy infrastructure," acknowledging that the original timeline was insufficient for the integration work required.'
      },
      {
        id: 'c1-negotiation-q4',
        type: 'implication',
        question: 'Why does Catherine insist on milestone-based deliverables?',
        options: [
          'To make the project take longer.',
          'To have grounds for cancelling the contract.',
          'To enable early detection of problems rather than discovering them at the end.',
          'To reduce the number of people working on the project.'
        ],
        correctAnswer: 2,
        explanation: 'Catherine says she wants milestones "so we\'re not in a position where we only discover problems at the end," implying that milestone-based tracking allows for ongoing monitoring and early intervention.'
      },
      {
        id: 'c1-negotiation-q5',
        type: 'inference',
        question: 'What can we infer about the likely outcome of this negotiation?',
        options: [
          'The deal will almost certainly fall through.',
          'Both parties are close to reaching an agreement.',
          'Catherine plans to reject the proposal at the board meeting.',
          'David will withdraw his company from the project.'
        ],
        correctAnswer: 1,
        explanation: 'Catherine says "I think we\'re getting somewhere" and asks for a revised proposal to take to the board, while David agrees to all requested adjustments — strong signals that both parties are moving towards a deal.'
      }
    ],
    keyVocabulary: [
      { word: 'push back', definition: 'To resist or express disagreement with a suggestion, proposal, or demand.' },
      { word: 'legacy systems', definition: 'Older computer systems or software that are still in use, often difficult to integrate with newer technology.' },
      { word: 'contingency buffer', definition: 'Extra time or resources built into a plan to account for unexpected delays or problems.' },
      { word: 'milestone-based deliverables', definition: 'Project outputs tied to specific stages or checkpoints, enabling progress tracking.' },
      { word: 'corrective action', definition: 'Steps taken to fix a problem or bring a process back on track.' }
    ]
  },

  // 12. C1 — Monologue: "Analyzing Environmental Policy"
  {
    id: 'c1-environment',
    title: 'Analyzing Environmental Policy',
    cefrLevel: 'C1',
    type: 'monologue',
    transcript: `When we analyse environmental policy, we need to move beyond the question of whether a particular measure is good for the environment in the abstract. The more pertinent question is: good for whom, under what conditions, and at whose expense? Take carbon pricing, for example — one of the most widely advocated tools for reducing greenhouse gas emissions. The economic logic is straightforward: if you make pollution expensive, companies will find ways to pollute less. And in principle, this works. Emissions trading schemes in the European Union have contributed to measurable reductions in carbon output from the industrial sector. However, the distributional effects are considerably more complex. Carbon pricing can disproportionately burden lower-income households, who spend a larger proportion of their income on energy and transport. Unless revenues from carbon taxes are recycled through rebates, social programmes, or targeted investment, the policy risks deepening existing inequalities. Then there's the question of implementation across borders. A country that imposes strict carbon pricing may simply drive emissions-intensive industries to relocate to jurisdictions with weaker regulations — a phenomenon known as carbon leakage. This doesn't reduce global emissions; it merely shifts them geographically while simultaneously undermining the domestic economy. And we shouldn't overlook the political dimension. Environmental policies don't exist in a vacuum — they're shaped by lobbying, electoral pressures, and institutional inertia. The gap between what the science demands and what is politically feasible remains one of the central challenges of our time. Effective environmental policy, then, requires not just ecological understanding but economic analysis, social sensitivity, and political realism.`,
    questions: [
      {
        id: 'c1-environment-q1',
        type: 'main_idea',
        question: 'What is the speaker\'s central argument?',
        options: [
          'Carbon pricing is the best solution to climate change.',
          'Environmental policy must be evaluated not just ecologically but also in terms of economic, social, and political dimensions.',
          'Environmental regulations always harm the economy.',
          'Governments should abandon carbon pricing entirely.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker argues that evaluating policy requires asking "good for whom, under what conditions, and at whose expense" and concludes that it needs "ecological understanding, economic analysis, social sensitivity, and political realism" — a multi-dimensional evaluation framework.'
      },
      {
        id: 'c1-environment-q2',
        type: 'inference',
        question: 'What does the speaker imply about the EU emissions trading scheme?',
        options: [
          'It has been a complete failure.',
          'It has achieved some success but is not a comprehensive solution.',
          'It has solved Europe\'s carbon emissions problem.',
          'It should be adopted by all countries without modification.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker acknowledges "measurable reductions" but immediately pivots to discuss limitations — distributional effects, carbon leakage, and political constraints — implying partial success rather than a complete or adequate solution.'
      },
      {
        id: 'c1-environment-q3',
        type: 'implication',
        question: 'What does the speaker imply about carbon leakage?',
        options: [
          'It is a minor technical issue easily resolved.',
          'It undermines the effectiveness of unilateral carbon pricing by redistributing emissions rather than reducing them.',
          'It only affects developing countries.',
          'It has already been solved by international agreements.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker says carbon leakage "doesn\'t reduce global emissions; it merely shifts them geographically," implying that unilateral carbon pricing can be self-defeating if it simply pushes pollution to other countries.'
      },
      {
        id: 'c1-environment-q4',
        type: 'inference',
        question: 'What does the speaker mean by "institutional inertia"?',
        options: [
          'Institutions are physically unable to move.',
          'Political institutions tend to resist change, making reform slow and difficult.',
          'Governments always make the right environmental decisions.',
          'Bureaucratic systems are inherently efficient.'
        ],
        correctAnswer: 1,
        explanation: 'In the context of political obstacles to environmental policy, "institutional inertia" refers to the tendency of established political systems and organisations to resist change and maintain existing practices.'
      },
      {
        id: 'c1-environment-q5',
        type: 'implication',
        question: 'What does the speaker imply about the relationship between science and policy?',
        options: [
          'Scientific recommendations are always directly translated into policy.',
          'Politicians fully understand the science of climate change.',
          'There is a significant gap between scientific evidence and political action.',
          'Science plays no role in shaping environmental policy.'
        ],
        correctAnswer: 2,
        explanation: 'The speaker describes "the gap between what the science demands and what is politically feasible" as a "central challenge," implying a persistent disconnect between scientific evidence and the policies that governments are willing or able to implement.'
      }
    ],
    keyVocabulary: [
      { word: 'carbon pricing', definition: 'A policy tool that puts a financial cost on carbon dioxide emissions to incentivise reduction.' },
      { word: 'distributional effects', definition: 'How the costs and benefits of a policy are spread across different groups in society.' },
      { word: 'carbon leakage', definition: 'The relocation of emissions-producing industries to countries with less strict environmental regulations.' },
      { word: 'institutional inertia', definition: 'The tendency of organisations or political systems to resist change and maintain existing practices.' },
      { word: 'lobbying', definition: 'The act of attempting to influence political decisions through organised advocacy by interest groups.' }
    ]
  },

  // ============================================================
  // C2 PASSAGES (6)
  // ============================================================

  // 13. C2 — Lecture: "Paradigm Shifts in Science"
  {
    id: 'c2-paradigm-shifts',
    title: 'Paradigm Shifts in Science',
    cefrLevel: 'C2',
    type: 'lecture',
    transcript: `I'd like us to reflect today on what is arguably one of the most influential — and most misunderstood — concepts in the philosophy of science: Thomas Kuhn's theory of paradigm shifts. Now, Kuhn's 1962 work, "The Structure of Scientific Revolutions," fundamentally challenged the prevailing view that science progresses through a steady, linear accumulation of knowledge — what we might call the "brick-by-brick" model, in which each generation of scientists builds upon the discoveries of the last in a continuous, rational march towards truth. Kuhn's argument was quite different, and considerably more unsettling. He proposed that science operates predominantly within what he termed "normal science" — periods during which researchers work within an established paradigm, a framework of shared assumptions, methods, and standards that defines what counts as a legitimate problem and what constitutes an acceptable solution. During normal science, anomalies — findings that don't fit the paradigm — are typically not treated as refutations of the framework but rather as puzzles to be solved within it, or else quietly set aside. It is only when anomalies accumulate to the point where they can no longer be accommodated that a crisis emerges, and the scientific community becomes receptive to a fundamentally different way of understanding the phenomena in question. This is the paradigm shift — the move from one conceptual framework to another that is, in Kuhn's rather controversial formulation, incommensurable with the first. That is to say, the new paradigm doesn't simply correct the old one; it redefines the very terms, questions, and standards by which science is conducted. Consider the transition from Newtonian mechanics to Einsteinian relativity. It wasn't merely that Einstein offered better answers to Newton's questions; he was, in a meaningful sense, asking different questions altogether. Now, Kuhn's critics — and there are many — have argued that this picture overstates the discontinuity of scientific change and underestimates the role of rational deliberation in paradigm transitions. Karl Popper, for instance, insisted that science progresses through a continuous process of conjecture and refutation, and that Kuhn's account dangerously relativises scientific truth. Whether you find Kuhn's framework compelling or troubling, what it undeniably accomplished was to foreground the social, institutional, and psychological dimensions of scientific practice — dimensions that the idealised, purely rational account of science had largely ignored.`,
    questions: [
      {
        id: 'c2-paradigm-shifts-q1',
        type: 'inference',
        question: 'What is the speaker\'s implied assessment of Kuhn\'s contribution?',
        options: [
          'It was entirely correct and should be accepted without reservation.',
          'It was deeply flawed and has been rightfully abandoned.',
          'It was a valuable disruption that exposed neglected dimensions of scientific practice, despite legitimate criticisms.',
          'It was merely a restatement of Popper\'s earlier ideas.'
        ],
        correctAnswer: 2,
        explanation: 'The speaker describes Kuhn\'s theory as "influential," acknowledges critics fairly, but concludes by praising what it "undeniably accomplished" — foregrounding social, institutional, and psychological dimensions. This suggests the speaker views it as valuable despite its imperfections.'
      },
      {
        id: 'c2-paradigm-shifts-q2',
        type: 'implication',
        question: 'What does the speaker imply by describing Kuhn\'s argument as "considerably more unsettling"?',
        options: [
          'Kuhn\'s ideas caused physical discomfort among scientists.',
          'Kuhn\'s account challenges comforting assumptions about the rationality and objectivity of scientific progress.',
          'Kuhn intended to provoke controversy for personal gain.',
          'The scientific community was emotionally fragile at the time.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker contrasts the "comfortable" linear progress model with Kuhn\'s view, calling it "unsettling" because it suggests science is not a purely rational, cumulative process — a conclusion that challenges deep-seated beliefs about the objectivity of science.'
      },
      {
        id: 'c2-paradigm-shifts-q3',
        type: 'inference',
        question: 'What does "incommensurable" mean in the context of Kuhn\'s theory?',
        options: [
          'Two paradigms are mathematically equivalent.',
          'Two paradigms cannot be directly compared because they operate with different fundamental concepts and standards.',
          'One paradigm is always superior to the other.',
          'Paradigms can be easily translated into each other\'s terms.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker defines incommensurability by saying "the new paradigm doesn\'t simply correct the old one; it redefines the very terms, questions, and standards," meaning the two frameworks lack a shared basis for direct comparison.'
      },
      {
        id: 'c2-paradigm-shifts-q4',
        type: 'implication',
        question: 'What does the Newton-Einstein example illustrate?',
        options: [
          'That Einstein was more intelligent than Newton.',
          'That paradigm shifts involve not just new answers but entirely new questions and frameworks.',
          'That physics is the only field where paradigm shifts occur.',
          'That Newtonian mechanics was entirely wrong.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker says Einstein "was, in a meaningful sense, asking different questions altogether," using this example to illustrate Kuhn\'s point that paradigm shifts involve fundamental conceptual reconceptualisation rather than incremental correction.'
      },
      {
        id: 'c2-paradigm-shifts-q5',
        type: 'inference',
        question: 'What does Popper\'s criticism of Kuhn imply about their differing views of scientific truth?',
        options: [
          'Both agree that scientific truth is socially constructed.',
          'Popper views scientific truth as objective and progressively discoverable, while Kuhn\'s account suggests it is paradigm-dependent.',
          'Popper believes science never makes progress.',
          'They have identical views expressed in different terminology.'
        ],
        correctAnswer: 1,
        explanation: 'Popper\'s charge that Kuhn "dangerously relativises scientific truth" reveals a fundamental disagreement: Popper believes in objective truth approached through conjecture and refutation, while Kuhn\'s incommensurability suggests truth claims are framework-dependent.'
      }
    ],
    keyVocabulary: [
      { word: 'paradigm', definition: 'A dominant framework of theories, methods, and assumptions shared by a scientific community at a given time.' },
      { word: 'anomalies', definition: 'Observations or results that deviate from what is expected within the current theoretical framework.' },
      { word: 'incommensurable', definition: 'Unable to be compared using a common standard because the fundamental terms and concepts differ.' },
      { word: 'conjecture and refutation', definition: 'Popper\'s model of scientific progress in which hypotheses are proposed and then tested with the aim of disproving them.' },
      { word: 'relativise', definition: 'To treat as dependent on context or perspective rather than as absolute or universal.' },
      { word: 'foreground', definition: 'To bring to the front of attention; to make a central focus of discussion.' }
    ]
  },

  // 14. C2 — Debate: "AI Ethics and Human Autonomy"
  {
    id: 'c2-ai-ethics',
    title: 'AI Ethics and Human Autonomy',
    cefrLevel: 'C2',
    type: 'debate',
    transcript: `Speaker A says: I think we need to be extremely cautious about the deployment of AI in healthcare decision-making. There's a temptation to frame this purely as a technical question — can the algorithm outperform human doctors? — but that framing obscures the deeper ethical issue, which is one of autonomy. When a patient's treatment plan is determined, or even substantially shaped, by an opaque algorithmic process, we are effectively transferring moral agency from human beings to systems that cannot be held accountable in any meaningful sense. And I would argue that this represents a fundamental erosion of human dignity, regardless of whether the clinical outcomes happen to be statistically superior. Speaker B responds: I take the point about accountability, and it's a serious one. But I think you're constructing something of a false dichotomy. Nobody is suggesting that we hand over complete decision-making authority to machines. The most promising applications of AI in medicine are augmentative — they assist clinicians by processing vast quantities of data, identifying patterns that would be imperceptible to the human eye, and flagging potential diagnoses that might otherwise be missed. The physician retains ultimate authority. And frankly, if we're going to talk about autonomy, shouldn't we consider the patient's autonomy? If an AI system can detect a malignancy eighteen months earlier than conventional screening, withholding that tool on philosophical grounds seems, to me, to be a far greater violation of autonomy than deploying it. Speaker A says: That's a compelling argument, but it rests on an idealised model of implementation. In practice, the physician's "ultimate authority" is progressively undermined as institutional incentives, liability pressures, and sheer information asymmetry push clinicians towards algorithmic recommendations. The tool becomes the de facto decision-maker, and the human becomes a rubber stamp. We've seen this dynamic play out in other domains — algorithmic sentencing in criminal justice, for example — and the consequences have been deeply troubling. Speaker B responds: I won't dispute that implementation matters enormously, and the criminal justice parallel is well taken. But the answer isn't to reject the technology wholesale — it's to regulate it rigorously, to mandate transparency in algorithmic processes, and to preserve genuine human oversight. The potential benefits are simply too significant to forgo.`,
    questions: [
      {
        id: 'c2-ai-ethics-q1',
        type: 'inference',
        question: 'What is Speaker A\'s fundamental concern about AI in healthcare?',
        options: [
          'That AI systems are too expensive for widespread deployment.',
          'That transferring decision-making to opaque algorithms undermines human moral agency and accountability.',
          'That AI cannot process medical data accurately.',
          'That doctors will lose their jobs to automation.'
        ],
        correctAnswer: 1,
        explanation: 'Speaker A\'s core argument centres on the "erosion of human dignity" when moral agency is transferred to systems that "cannot be held accountable" — the concern is ethical and philosophical, about autonomy and accountability, not technical or economic.'
      },
      {
        id: 'c2-ai-ethics-q2',
        type: 'implication',
        question: 'What does Speaker B imply by mentioning the early detection of malignancy?',
        options: [
          'That AI is more important than human doctors.',
          'That refusing to use life-saving technology on philosophical grounds could itself be an ethical violation.',
          'That all cancers can be cured if detected early.',
          'That patients should make their own medical decisions without doctors.'
        ],
        correctAnswer: 1,
        explanation: 'Speaker B argues that "withholding that tool on philosophical grounds seems to be a far greater violation of autonomy," implying that the ethical cost of not using beneficial AI — measured in lives and suffering — may outweigh the philosophical concerns about its use.'
      },
      {
        id: 'c2-ai-ethics-q3',
        type: 'inference',
        question: 'What does Speaker A mean by describing the physician as a "rubber stamp"?',
        options: [
          'That doctors will use physical stamps on documents.',
          'That in practice, physicians may formally approve AI decisions without exercising genuine independent judgment.',
          'That physicians will become unnecessary.',
          'That AI systems will forge doctors\' signatures.'
        ],
        correctAnswer: 1,
        explanation: 'The metaphor "rubber stamp" means automatically approving something without real scrutiny. Speaker A argues that institutional pressures and information asymmetry will gradually reduce the physician\'s role from genuine decision-maker to someone who merely endorses algorithmic outputs.'
      },
      {
        id: 'c2-ai-ethics-q4',
        type: 'attitude',
        question: 'How does Speaker B respond to the criminal justice analogy?',
        options: [
          'They reject it as entirely irrelevant.',
          'They accept the parallel as valid but argue it supports regulation rather than rejection of the technology.',
          'They argue that criminal justice AI has been an unqualified success.',
          'They ignore it completely and change the subject.'
        ],
        correctAnswer: 1,
        explanation: 'Speaker B says "the criminal justice parallel is well taken" (accepting its validity) but argues "the answer isn\'t to reject the technology wholesale — it\'s to regulate it rigorously," turning the example into an argument for better governance rather than abandonment.'
      },
      {
        id: 'c2-ai-ethics-q5',
        type: 'implication',
        question: 'What unstated assumption underlies Speaker A\'s argument throughout the debate?',
        options: [
          'That AI technology will never improve beyond its current state.',
          'That statistical superiority in outcomes does not automatically confer ethical legitimacy.',
          'That all doctors are more competent than any AI system.',
          'That patients do not care about the quality of their medical treatment.'
        ],
        correctAnswer: 1,
        explanation: 'Speaker A says the erosion of autonomy matters "regardless of whether the clinical outcomes happen to be statistically superior," revealing the foundational assumption that better outcomes alone do not justify a process — ethical legitimacy requires more than efficacy.'
      }
    ],
    keyVocabulary: [
      { word: 'opaque', definition: 'Not transparent; difficult to understand or see through, especially in reference to decision-making processes.' },
      { word: 'moral agency', definition: 'The capacity to make ethical judgments and be held responsible for one\'s actions.' },
      { word: 'augmentative', definition: 'Serving to enhance or supplement human capabilities rather than replace them.' },
      { word: 'information asymmetry', definition: 'A situation where one party has significantly more or better information than another.' },
      { word: 'de facto', definition: 'In practice, whether or not officially recognised; existing in reality rather than by formal designation.' },
      { word: 'wholesale', definition: 'In its entirety, completely and without discrimination or selectivity.' }
    ]
  },

  // 15. C2 — Monologue: "Free Will and Determinism"
  {
    id: 'c2-free-will',
    title: 'Free Will and Determinism',
    cefrLevel: 'C2',
    type: 'monologue',
    transcript: `The question of whether human beings possess genuine free will is, I think it's fair to say, one of the most enduring and intractable problems in philosophy. And I want to suggest today that the way we typically frame the debate — as a binary opposition between free will and determinism — may itself be part of the problem. Let me explain what I mean. The determinist position, at least in its classical formulation, holds that every event, including every human decision, is the inevitable consequence of prior causes governed by natural laws. If we were to know the complete state of the universe at any given moment — every particle, every force — we could, in principle, predict everything that follows, including what you'll have for dinner tonight. Now, on the face of it, this seems to leave no room for genuine choice. If my decision to raise my hand right now was determined by a causal chain stretching back to the Big Bang, in what meaningful sense did I "choose" to do it? However — and this is where the argument becomes considerably more nuanced — many contemporary philosophers would argue that this framing rests on a confusion between two different senses of "could have done otherwise." The compatibilist position, which I find broadly persuasive though not without difficulties, maintains that free will is not the absence of causation but rather the capacity to act in accordance with one's own desires, values, and deliberative processes, free from external compulsion. On this view, a person acts freely when their action flows from their own reasoning, even if that reasoning was itself shaped by prior causes. Were one to accept this framework, the apparent conflict between freedom and determinism would dissolve — not because determinism is false, but because freedom, properly understood, was never really about escaping the causal order in the first place. It was about a particular relationship between the self and its actions. Of course, this compatibilist solution has been challenged on multiple fronts. Hard determinists argue that it amounts to a redefinition of freedom that evacuates the concept of its intuitive meaning. And libertarians — in the metaphysical, not political, sense — insist that genuine agency requires a kind of causal origination that compatibilism cannot provide. I don't pretend to have resolved the debate here, but I do think that the framing matters enormously, and that much philosophical confusion arises from the failure to specify precisely what we mean when we use the word "free."`,
    questions: [
      {
        id: 'c2-free-will-q1',
        type: 'inference',
        question: 'What is the speaker\'s own philosophical position?',
        options: [
          'They are a hard determinist who rejects free will entirely.',
          'They are a metaphysical libertarian who insists on uncaused agency.',
          'They lean towards compatibilism while acknowledging its limitations.',
          'They believe the question of free will is irrelevant to philosophy.'
        ],
        correctAnswer: 2,
        explanation: 'The speaker describes the compatibilist position as one they find "broadly persuasive though not without difficulties," and their argument focuses on demonstrating how compatibilism resolves the apparent conflict — indicating a qualified endorsement.'
      },
      {
        id: 'c2-free-will-q2',
        type: 'implication',
        question: 'What does the speaker imply about the traditional framing of the free will debate?',
        options: [
          'It is perfectly adequate and needs no revision.',
          'It creates a false binary that obscures more nuanced positions.',
          'It was invented by determinists to win the argument.',
          'It is only relevant to religious discussions.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker says "the way we typically frame the debate — as a binary opposition — may itself be part of the problem," implying that the either/or framing prevents people from seeing positions like compatibilism that transcend the dichotomy.'
      },
      {
        id: 'c2-free-will-q3',
        type: 'inference',
        question: 'What does the phrase "evacuates the concept of its intuitive meaning" suggest about the hard determinist critique?',
        options: [
          'That compatibilism makes freedom physically impossible.',
          'That compatibilism redefines freedom so radically that the new definition no longer captures what people ordinarily mean by the word.',
          'That hard determinists support compatibilism in principle.',
          'That the concept of freedom has no meaning at all.'
        ],
        correctAnswer: 1,
        explanation: 'To "evacuate a concept of its intuitive meaning" is to drain it of the content that people naturally associate with the word. The critique is that compatibilist freedom is so different from everyday notions of choice that calling it "freedom" is misleading.'
      },
      {
        id: 'c2-free-will-q4',
        type: 'implication',
        question: 'Why does the speaker specify "metaphysical, not political" when using the word "libertarians"?',
        options: [
          'Because the speaker wants to discuss political philosophy.',
          'To prevent confusion between the philosophical position on free will and the political ideology that shares the same name.',
          'Because political libertarians reject the concept of free will.',
          'Because there is no real distinction between the two uses.'
        ],
        correctAnswer: 1,
        explanation: 'The clarification prevents listeners from confusing metaphysical libertarianism (the view that free will requires genuine causal origination) with political libertarianism (a political philosophy emphasising individual liberty and limited government), which are entirely separate concepts that happen to share a label.'
      },
      {
        id: 'c2-free-will-q5',
        type: 'inference',
        question: 'What does the speaker suggest is the root cause of much philosophical confusion about free will?',
        options: [
          'That philosophers are not intelligent enough to solve the problem.',
          'That neuroscience has not advanced sufficiently.',
          'That participants in the debate often fail to define precisely what they mean by "free."',
          'That the concept of determinism is too difficult for most people to understand.'
        ],
        correctAnswer: 2,
        explanation: 'The speaker concludes that "much philosophical confusion arises from the failure to specify precisely what we mean when we use the word \'free,\'" suggesting that definitional ambiguity, not the inherent difficulty of the problem, is the primary source of confusion.'
      }
    ],
    keyVocabulary: [
      { word: 'intractable', definition: 'Extremely difficult to deal with, resolve, or manage; stubbornly resistant to solution.' },
      { word: 'compatibilism', definition: 'The philosophical position that free will and determinism are not mutually exclusive and can coexist.' },
      { word: 'deliberative processes', definition: 'Thought processes involving careful consideration, weighing of reasons, and reflective decision-making.' },
      { word: 'causal origination', definition: 'The idea that a free agent can initiate a new causal chain that is not fully determined by prior events.' },
      { word: 'compulsion', definition: 'An irresistible external force or pressure that makes someone act against their will.' },
      { word: 'evacuate (a concept)', definition: 'To drain or empty a concept of its substantive content or meaning.' }
    ]
  },

  // 16. C2 — Lecture: "Language Policy and Cultural Identity"
  {
    id: 'c2-language-policy',
    title: 'Language Policy and Cultural Identity',
    cefrLevel: 'C2',
    type: 'lecture',
    transcript: `The relationship between language policy and cultural identity is, I would submit, one of the most politically charged and intellectually complex issues in contemporary sociolinguistics. And at the heart of this complexity lies a tension — one might even call it a paradox — between the pragmatic benefits of linguistic uniformity and the cultural costs of linguistic homogenisation. Let us consider, for a moment, the global ascendancy of English. There is no denying that English functions as the world's de facto lingua franca — the language of international diplomacy, scientific publication, global commerce, and digital communication. For individuals, proficiency in English opens doors to educational opportunities, professional advancement, and participation in global discourse. These are tangible, measurable benefits, and any honest analysis must acknowledge them. However, this pragmatic case for English conceals a set of assumptions that deserve interrogation. The spread of English has not occurred in a political vacuum. It is inextricable from the histories of British colonialism and American economic hegemony — histories in which the imposition of English was frequently accompanied by the active suppression of indigenous languages. Robert Phillipson's concept of "linguistic imperialism" — the idea that the dominance of English is maintained through structural and ideological mechanisms that systematically disadvantage other languages — remains, despite its critics, a powerful analytical framework. Now, one might object that the contemporary spread of English is voluntary and demand-driven rather than coerced. And there is some truth to this. But voluntariness, in this context, is a fraught concept. When a language becomes the prerequisite for economic survival, the "choice" to learn it is hardly free in any robust sense. Moreover, the displacement of indigenous and minority languages carries consequences that extend far beyond communication. Languages encode unique systems of knowledge, cultural memory, and ways of understanding the world. When a language dies — and roughly one language disappears every two weeks — we lose not merely a set of vocabulary and grammar but an irreplaceable epistemological perspective. The challenge for policymakers, then, is to navigate between the undeniable utility of a shared global language and the imperative to protect linguistic diversity as a form of cultural heritage and cognitive richness.`,
    questions: [
      {
        id: 'c2-language-policy-q1',
        type: 'inference',
        question: 'What is the speaker\'s implied attitude towards the global spread of English?',
        options: [
          'Entirely positive — English unites the world.',
          'Entirely negative — English is a tool of oppression.',
          'Ambivalent — they recognise both pragmatic benefits and serious cultural costs.',
          'Indifferent — they see it as a neutral linguistic phenomenon.'
        ],
        correctAnswer: 2,
        explanation: 'The speaker acknowledges "tangible, measurable benefits" while extensively discussing the colonial history, power dynamics, and cultural losses associated with English dominance — demonstrating a carefully balanced ambivalence rather than a one-sided view.'
      },
      {
        id: 'c2-language-policy-q2',
        type: 'implication',
        question: 'What does the speaker imply about the concept of "voluntary" adoption of English?',
        options: [
          'It is always genuinely free and unconstrained.',
          'It is often coerced by direct political force.',
          'It is complicated by economic pressures that make the "choice" less free than it appears.',
          'It only applies to developed countries.'
        ],
        correctAnswer: 2,
        explanation: 'The speaker calls voluntariness "a fraught concept" in this context and argues that when English becomes "the prerequisite for economic survival, the \'choice\' to learn it is hardly free in any robust sense" — implying that structural economic pressures constrain genuine voluntary choice.'
      },
      {
        id: 'c2-language-policy-q3',
        type: 'implication',
        question: 'What unstated value judgment underlies the speaker\'s discussion of language death?',
        options: [
          'That some languages are inherently more valuable than others.',
          'That linguistic diversity is inherently valuable and its loss constitutes a form of irreparable cultural harm.',
          'That language death is a natural and acceptable process.',
          'That only widely spoken languages deserve preservation.'
        ],
        correctAnswer: 1,
        explanation: 'By describing lost languages as containing "irreplaceable epistemological perspectives" and framing linguistic diversity as "cultural heritage and cognitive richness," the speaker implicitly holds that each language has unique, non-substitutable value and that its loss is a genuine harm.'
      },
      {
        id: 'c2-language-policy-q4',
        type: 'inference',
        question: 'Why does the speaker mention Phillipson\'s concept of "linguistic imperialism"?',
        options: [
          'To dismiss it as an outdated and irrelevant theory.',
          'To use it as an analytical lens for understanding the power structures behind English dominance.',
          'To argue that all English speakers are imperialists.',
          'To suggest that Phillipson invented the concept of imperialism.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker calls linguistic imperialism "a powerful analytical framework" that describes how "structural and ideological mechanisms systematically disadvantage other languages," using it to reveal the power dynamics underlying the spread of English.'
      },
      {
        id: 'c2-language-policy-q5',
        type: 'inference',
        question: 'What does the speaker mean by calling language death a loss of "an irreplaceable epistemological perspective"?',
        options: [
          'That losing a language means losing access to its dictionary.',
          'That each language encodes a unique way of knowing and understanding the world that cannot be fully captured by other languages.',
          'That all languages describe the world in exactly the same way.',
          'That epistemology is only possible in English.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker argues that "languages encode unique systems of knowledge, cultural memory, and ways of understanding the world," and describes the loss as "irreplaceable" — meaning each language offers a distinctive cognitive and cultural lens that is lost forever when the language dies.'
      }
    ],
    keyVocabulary: [
      { word: 'lingua franca', definition: 'A common language adopted for communication between speakers of different native languages.' },
      { word: 'linguistic imperialism', definition: 'The dominance of one language over others, maintained through structural and ideological power.' },
      { word: 'hegemony', definition: 'Dominance or leadership, especially by one state or social group over others.' },
      { word: 'epistemological', definition: 'Relating to the theory of knowledge — how we know what we know.' },
      { word: 'homogenisation', definition: 'The process of making things uniform or alike, reducing diversity.' },
      { word: 'fraught', definition: 'Full of problems, complications, or tension; loaded with difficulty.' }
    ]
  },

  // 17. C2 — Dialogue: "Academic Seminar Q&A"
  {
    id: 'c2-seminar-qa',
    title: 'Academic Seminar Q&A',
    cefrLevel: 'C2',
    type: 'dialogue',
    transcript: `Speaker A says: Thank you for that presentation, Professor Chen. I found your argument about the limitations of randomised controlled trials in social science research quite thought-provoking. But I wonder — and perhaps I'm not fully grasping the nuance of your position — whether your critique doesn't risk throwing out the baby with the bathwater, so to speak. Surely the methodological rigour that RCTs provide, however imperfect, is preferable to the alternatives? Speaker B responds: That's a perfectly reasonable concern, and I wouldn't want to be misunderstood as arguing against rigour per se. My contention is rather more specific than that. What I'm suggesting is that the epistemic authority we grant to RCTs in social science is, in important respects, unwarranted — not because the method itself is flawed, but because the conditions under which it produces reliable knowledge in clinical medicine simply do not obtain in most social contexts. You can control for confounding variables in a drug trial in ways that are fundamentally impossible when you're studying, say, the effects of educational policy on long-term social mobility. Speaker A says: I take that point. But couldn't one argue that even an imperfect experimental design yields more reliable causal inferences than observational studies, which are subject to all manner of selection bias and confounding? Speaker B responds: One could, and many do. But I think that argument relies on a somewhat misleading comparison. It assumes that the choice is between a flawed experiment and an equally flawed observational study, when in practice, sophisticated quasi-experimental designs — regression discontinuity, difference-in-differences, instrumental variables — can, under the right conditions, provide causal evidence that is, I would argue, more ecologically valid than an RCT conducted in artificially constrained circumstances. The real question isn't which method is inherently superior; it's which method best suits the specific research question and context. Speaker A says: I suppose what troubles me, though, is that this position could be used — perhaps not by you, but by others — to justify methodologically weaker research under the guise of contextual sensitivity. How do we guard against that? Speaker B responds: That's an astute observation, and frankly, it's a concern I share. The answer, I think, lies in transparency and in the quality of the argumentation. If a researcher chooses a quasi-experimental approach over an RCT, they should be required to provide an explicit, defensible justification for that choice — not merely assert that the context demanded it.`,
    questions: [
      {
        id: 'c2-seminar-qa-q1',
        type: 'attitude',
        question: 'How would you characterise Speaker A\'s attitude throughout the exchange?',
        options: [
          'Dismissive and hostile towards Professor Chen\'s views.',
          'Respectfully challenging — raising counterarguments while signalling genuine intellectual engagement.',
          'Entirely agreeable — accepting every point without question.',
          'Confused and unable to follow the argument.'
        ],
        correctAnswer: 1,
        explanation: 'Speaker A uses hedging ("I wonder," "perhaps I\'m not fully grasping"), acknowledges the value of the presentation ("quite thought-provoking"), but consistently raises substantive counterpoints — indicating respectful, engaged intellectual challenge rather than hostility or agreement.'
      },
      {
        id: 'c2-seminar-qa-q2',
        type: 'inference',
        question: 'What does Professor Chen argue is the core problem with RCTs in social science?',
        options: [
          'That RCTs are too expensive to conduct in social science.',
          'That the controlled conditions necessary for valid RCTs cannot be adequately achieved in complex social contexts.',
          'That RCTs have never produced any useful findings.',
          'That social scientists lack the training to conduct RCTs properly.'
        ],
        correctAnswer: 1,
        explanation: 'Professor Chen argues that "the conditions under which it produces reliable knowledge in clinical medicine simply do not obtain in most social contexts," meaning the essential preconditions for valid RCTs — controlled environments, isolated variables — are unachievable in social research.'
      },
      {
        id: 'c2-seminar-qa-q3',
        type: 'implication',
        question: 'What does Speaker A imply by the phrase "throwing out the baby with the bathwater"?',
        options: [
          'That Professor Chen\'s ideas involve physical waste.',
          'That in rejecting the flaws of RCTs, Professor Chen might also be discarding their genuine methodological value.',
          'That RCTs should be abandoned completely.',
          'That qualitative research is more valuable than quantitative research.'
        ],
        correctAnswer: 1,
        explanation: 'The idiom means discarding something valuable along with something undesirable. Speaker A worries that critiquing RCTs might lead to abandoning the real methodological benefits they provide, not just their flaws.'
      },
      {
        id: 'c2-seminar-qa-q4',
        type: 'inference',
        question: 'What does Professor Chen mean by "ecologically valid"?',
        options: [
          'Related to environmental science and ecology.',
          'Applicable to and representative of real-world conditions, as opposed to artificially controlled settings.',
          'Validated by ecological organisations.',
          'Only useful for studying natural environments.'
        ],
        correctAnswer: 1,
        explanation: 'Professor Chen contrasts ecological validity with "artificially constrained circumstances," using the term to mean that research findings accurately reflect and are applicable to real-world social conditions rather than controlled laboratory settings.'
      },
      {
        id: 'c2-seminar-qa-q5',
        type: 'attitude',
        question: 'How does Professor Chen respond to Speaker A\'s concern about methodological laxity?',
        options: [
          'They dismiss it as irrelevant and hostile.',
          'They acknowledge it as a legitimate shared concern and propose transparency as a safeguard.',
          'They argue that methodological standards are unimportant.',
          'They refuse to engage with the question.'
        ],
        correctAnswer: 1,
        explanation: 'Professor Chen calls the concern "an astute observation" and says "it\'s a concern I share," then proposes that researchers must provide "an explicit, defensible justification" for their methodological choices — showing they take the worry seriously and have a principled response.'
      }
    ],
    keyVocabulary: [
      { word: 'randomised controlled trial (RCT)', definition: 'An experimental study in which participants are randomly assigned to groups to test the effect of an intervention.' },
      { word: 'epistemic authority', definition: 'The credibility or trustworthiness attributed to a source of knowledge or a method of inquiry.' },
      { word: 'confounding variables', definition: 'Factors other than the one being studied that could influence the outcome, potentially distorting results.' },
      { word: 'quasi-experimental', definition: 'A research design that resembles an experiment but lacks full random assignment, using alternative strategies for causal inference.' },
      { word: 'ecologically valid', definition: 'The extent to which research findings reflect real-world conditions and can be generalised to natural settings.' },
      { word: 'hedging', definition: 'Using cautious, tentative language to soften claims or leave room for alternative interpretations.' }
    ]
  },

  // 18. C2 — Monologue: "Metaphor and Irony in Literature"
  {
    id: 'c2-literary-criticism',
    title: 'Metaphor and Irony in Literature',
    cefrLevel: 'C2',
    type: 'monologue',
    transcript: `I want to talk today about two of the most fundamental — and, I would argue, most philosophically interesting — devices in literary language: metaphor and irony. And I want to suggest that these are not merely decorative features of literary style, not rhetorical embellishments that could be stripped away to reveal a "plain meaning" underneath. Rather, they are constitutive of meaning itself — they create understandings that cannot be paraphrased away without significant loss. Let's begin with metaphor. When Shakespeare writes "All the world's a stage, and all the men and women merely players," he is not making a comparison that could be more accurately expressed as a literal statement. The metaphor doesn't simply say that life resembles a theatrical performance in certain respects; it restructures our entire understanding of human existence — the entrances and exits, the roles we play, the audience we perform for, the scripts we follow or improvise upon. This is what George Lakoff and Mark Johnson meant when they argued that metaphor is not a property of language but of thought. We don't just speak in metaphors; we think in them. Our conceptual system is fundamentally metaphorical — time is money, argument is war, understanding is seeing. These aren't poetic flourishes; they are the cognitive infrastructure through which we make sense of abstract experience. Irony, meanwhile, operates through a different but equally powerful mechanism. At its most basic, irony says one thing while meaning another — but this formulation, though not incorrect, is woefully inadequate. What makes irony so potent is the relationship it establishes between the said and the unsaid, and the interpretive work it demands of the reader or listener. When Jane Austen opens "Pride and Prejudice" with "It is a truth universally acknowledged, that a single man in possession of a good fortune must be in want of a wife," the surface meaning is clear, but the ironic force lies in everything the sentence doesn't say — the social machinery, the economic desperation, the absurdity of treating a contingent social convention as a universal truth. Irony, then, doesn't merely reverse meaning; it layers it, creating a palimpsest in which the literal and the implied coexist in productive tension. It invites the reader into a complicity of understanding, a shared recognition that what is stated and what is meant are not — and were never intended to be — the same thing.`,
    questions: [
      {
        id: 'c2-literary-criticism-q1',
        type: 'inference',
        question: 'What is the speaker\'s central thesis about metaphor and irony?',
        options: [
          'They are superficial literary ornaments that can be replaced by plain language.',
          'They are essential meaning-making devices that create understandings impossible to express literally.',
          'They are obstacles to clear communication and should be avoided.',
          'They are only found in classical literature and have no modern relevance.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker explicitly argues that metaphor and irony "are constitutive of meaning itself" and "create understandings that cannot be paraphrased away without significant loss," positioning them not as decoration but as fundamental to how meaning works.'
      },
      {
        id: 'c2-literary-criticism-q2',
        type: 'implication',
        question: 'What does the speaker imply by citing Lakoff and Johnson\'s work?',
        options: [
          'That metaphor is purely a linguistic phenomenon with no cognitive significance.',
          'That our entire conceptual system is structured by metaphorical thinking, not just our literary language.',
          'That scientists should avoid using metaphors.',
          'That Lakoff and Johnson were Shakespeare scholars.'
        ],
        correctAnswer: 1,
        explanation: 'By referencing their argument that "metaphor is not a property of language but of thought" and listing examples like "time is money" and "argument is war," the speaker implies that metaphor pervades all human cognition, not just artistic expression.'
      },
      {
        id: 'c2-literary-criticism-q3',
        type: 'inference',
        question: 'What does the speaker mean by calling the basic definition of irony "woefully inadequate"?',
        options: [
          'That the definition is grammatically incorrect.',
          'That defining irony as "saying one thing and meaning another" fails to capture its layered complexity and the interpretive engagement it demands.',
          'That irony cannot be defined at all.',
          'That literary critics have never attempted to define irony.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker says the formulation is "not incorrect" but "woefully inadequate" because it misses the relationship between "the said and the unsaid" and the "interpretive work" irony demands — indicating that the standard definition captures only the most superficial aspect of a much more complex phenomenon.'
      },
      {
        id: 'c2-literary-criticism-q4',
        type: 'implication',
        question: 'What does the speaker imply about the reader\'s role in interpreting irony?',
        options: [
          'The reader is a passive recipient of the author\'s intended meaning.',
          'The reader must actively participate in constructing meaning by navigating the gap between what is said and what is meant.',
          'The reader\'s interpretation is irrelevant to the meaning of the text.',
          'Irony only works if the reader fails to understand it.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker describes irony as demanding "interpretive work" and inviting "a complicity of understanding" — implying that the reader is an active co-creator of ironic meaning, not a passive receiver, and that irony functions precisely through this collaborative interpretive process.'
      },
      {
        id: 'c2-literary-criticism-q5',
        type: 'inference',
        question: 'What does the speaker mean by describing ironic meaning as a "palimpsest"?',
        options: [
          'That ironic texts are very old and difficult to read.',
          'That ironic meaning involves multiple layers coexisting simultaneously, like text written over earlier, partially visible text.',
          'That irony erases all previous meaning completely.',
          'That ironic texts must be read backwards.'
        ],
        correctAnswer: 1,
        explanation: 'A palimpsest is a manuscript where earlier writing has been partially erased but remains visible beneath new text. The speaker uses this metaphor to describe how irony layers the literal and implied meanings so that both remain present simultaneously in "productive tension."'
      }
    ],
    keyVocabulary: [
      { word: 'constitutive', definition: 'Forming an essential part of something; helping to make it what it is rather than being added to it.' },
      { word: 'paraphrased', definition: 'Restated in different words, typically to simplify or clarify meaning.' },
      { word: 'cognitive infrastructure', definition: 'The fundamental mental frameworks and structures through which we process and organise thought.' },
      { word: 'palimpsest', definition: 'A surface (originally a manuscript) on which earlier writing is still partially visible beneath later text; used metaphorically for layered meaning.' },
      { word: 'complicity', definition: 'Involvement or partnership, here used positively to describe the reader\'s shared participation in constructing meaning.' },
      { word: 'contingent', definition: 'Dependent on circumstances; not necessary or inevitable, but occurring due to particular conditions.' }
    ]
  },

  // ============================================================
  // B1 PASSAGES (3 new — 19–21)
  // ============================================================

  // 19. B1 — Monologue: "Today's Weather Forecast"
  {
    id: 'b1-weather',
    title: 'Today\'s Weather Forecast',
    cefrLevel: 'B1',
    type: 'monologue',
    transcript: `Good morning, everyone. Here's your weather forecast for today, Tuesday the fifteenth of March. We're starting the day with some light cloud cover across the south, but don't worry — that should clear up by lunchtime, and we're expecting plenty of sunshine this afternoon with temperatures reaching around sixteen degrees. Now, if you're in the north, it's a slightly different story. There's a band of rain moving in from the west, and it'll arrive around midday. So if you're heading out, definitely take an umbrella. The wind will pick up later in the afternoon, especially along the coast, with gusts of up to forty miles per hour. Looking ahead to tomorrow, we should see drier conditions everywhere, though it will stay quite cool overnight, dropping to about four degrees.`,
    questions: [
      {
        id: 'b1-weather-q1',
        type: 'detail',
        question: 'What will the weather be like in the south this afternoon?',
        options: [
          'Rainy and cold',
          'Sunny with temperatures around sixteen degrees',
          'Cloudy with strong winds',
          'Snowy and freezing'
        ],
        correctAnswer: 1,
        explanation: 'The forecaster says the cloud will "clear up by lunchtime" in the south and they\'re "expecting plenty of sunshine this afternoon with temperatures reaching around sixteen degrees."'
      },
      {
        id: 'b1-weather-q2',
        type: 'detail',
        question: 'What advice does the forecaster give to people in the north?',
        options: [
          'Stay at home all day',
          'Take an umbrella',
          'Wear sunscreen',
          'Drive slowly'
        ],
        correctAnswer: 1,
        explanation: 'The forecaster says "if you\'re heading out, definitely take an umbrella" because rain is moving in from the west to the north.'
      },
      {
        id: 'b1-weather-q3',
        type: 'inference',
        question: 'What can we infer about tomorrow\'s weather compared to today?',
        options: [
          'It will be wetter than today.',
          'It will be drier but colder overnight.',
          'It will be exactly the same.',
          'There will be a heatwave.'
        ],
        correctAnswer: 1,
        explanation: 'The forecaster says tomorrow will have "drier conditions everywhere" but "it will stay quite cool overnight, dropping to about four degrees," suggesting less rain but colder nights.'
      }
    ],
    keyVocabulary: [
      { word: 'cloud cover', definition: 'The amount of sky that is hidden by clouds at a given time.' },
      { word: 'clear up', definition: 'When the weather improves and clouds or rain go away.' },
      { word: 'gusts', definition: 'Sudden, short bursts of strong wind.' },
      { word: 'band of rain', definition: 'A long, narrow area of rainfall moving across a region.' }
    ]
  },

  // 20. B1 — Dialogue: "Asking for Directions"
  {
    id: 'b1-directions',
    title: 'Asking for Directions',
    cefrLevel: 'B1',
    type: 'dialogue',
    transcript: `Speaker A says: Excuse me, sorry to bother you. Do you know how to get to the Central Library from here? Speaker B responds: The Central Library? Yeah, sure. So, you need to go straight down this road for about two blocks. Then you'll see a big roundabout — take the second exit off that. Speaker A says: OK, straight ahead, then second exit at the roundabout. Got it. Speaker B responds: Right. After that, keep walking for maybe three minutes and you'll pass a supermarket on your left. The library is just past the supermarket, on the same side of the road. It's a large red-brick building — you really can't miss it. Speaker A says: Brilliant, thank you so much. Is it open today, do you know? Speaker B responds: I think so. I believe it's open every day except Sundays. But you might want to check online just in case the hours have changed recently. Speaker A says: Great, I'll do that. Thanks again for your help!`,
    questions: [
      {
        id: 'b1-directions-q1',
        type: 'detail',
        question: 'Which exit should the person take at the roundabout?',
        options: [
          'The first exit',
          'The second exit',
          'The third exit',
          'The fourth exit'
        ],
        correctAnswer: 1,
        explanation: 'Speaker B clearly says "take the second exit off that" when describing the roundabout.'
      },
      {
        id: 'b1-directions-q2',
        type: 'detail',
        question: 'What landmark is near the library?',
        options: [
          'A park',
          'A supermarket',
          'A school',
          'A petrol station'
        ],
        correctAnswer: 1,
        explanation: 'Speaker B says "you\'ll pass a supermarket on your left. The library is just past the supermarket."'
      },
      {
        id: 'b1-directions-q3',
        type: 'inference',
        question: 'How confident is Speaker B about the library\'s opening hours?',
        options: [
          'Completely certain — they work there.',
          'Fairly sure but not completely certain.',
          'They have no idea at all.',
          'They know it is definitely closed today.'
        ],
        correctAnswer: 1,
        explanation: 'Speaker B uses hedging language like "I think so" and "I believe," and suggests checking online "just in case," indicating they are fairly confident but not entirely sure.'
      }
    ],
    keyVocabulary: [
      { word: 'roundabout', definition: 'A circular junction where traffic moves in one direction around a central island.' },
      { word: 'blocks', definition: 'Sections of a street between two cross streets, used as a unit of distance.' },
      { word: 'just in case', definition: 'As a precaution; in the event that something might happen.' },
      { word: 'red-brick', definition: 'Made from bricks that are reddish-brown in colour, typical of older buildings.' }
    ]
  },

  // 21. B1 — Dialogue: "Shopping for Gifts"
  {
    id: 'b1-shopping',
    title: 'Shopping for Gifts',
    cefrLevel: 'B1',
    type: 'dialogue',
    transcript: `Speaker A says: Hey, I need your help. My sister's birthday is next week and I have absolutely no idea what to get her. Speaker B responds: OK, well, what kind of things is she into? Does she have any hobbies? Speaker A says: She loves cooking, actually. She's always trying new recipes from different countries. Speaker B responds: Oh, that's easy then! What about a nice cookbook? There's a great one by that Japanese chef — you know, the one who was on TV. Speaker A says: Hmm, that's a good idea, but I think she already has it. What about kitchen stuff? Like a fancy knife set or something? Speaker B responds: That could work, but good knives are quite expensive. How much do you want to spend? Speaker A says: I was thinking around thirty or forty pounds, maybe. Speaker B responds: In that case, what about a cooking class? There's a place in town that does Italian and Thai cooking workshops. They're about thirty-five pounds for a two-hour session, and she'd get to learn something new. Speaker A says: Oh, I love that idea! She'd really enjoy that. Let me look it up. Thanks so much! Speaker B responds: No problem. I'm sure she'll love it whatever you choose.`,
    questions: [
      {
        id: 'b1-shopping-q1',
        type: 'detail',
        question: 'What is the sister\'s main hobby?',
        options: [
          'Reading',
          'Painting',
          'Cooking',
          'Gardening'
        ],
        correctAnswer: 2,
        explanation: 'Speaker A says "She loves cooking, actually. She\'s always trying new recipes from different countries."'
      },
      {
        id: 'b1-shopping-q2',
        type: 'detail',
        question: 'Why does Speaker A reject the cookbook idea?',
        options: [
          'It\'s too expensive.',
          'The sister doesn\'t like reading.',
          'The sister probably already has it.',
          'Cookbooks are boring gifts.'
        ],
        correctAnswer: 2,
        explanation: 'Speaker A says "that\'s a good idea, but I think she already has it," suggesting the sister owns the cookbook already.'
      },
      {
        id: 'b1-shopping-q3',
        type: 'detail',
        question: 'How much does the cooking class cost?',
        options: [
          'Twenty pounds',
          'Thirty-five pounds',
          'Forty-five pounds',
          'Fifty pounds'
        ],
        correctAnswer: 1,
        explanation: 'Speaker B says the workshops are "about thirty-five pounds for a two-hour session."'
      },
      {
        id: 'b1-shopping-q4',
        type: 'inference',
        question: 'Why does Speaker A prefer the cooking class over the knife set?',
        options: [
          'Because the knife set is dangerous.',
          'Because the cooking class fits the budget and offers a unique experience.',
          'Because Speaker B told them the knife set is bad quality.',
          'Because the sister already has knives.'
        ],
        correctAnswer: 1,
        explanation: 'Speaker B mentions that good knives are "quite expensive," and the cooking class at thirty-five pounds fits Speaker A\'s budget of thirty to forty pounds. Speaker A also says "she\'d really enjoy that," suggesting the experience appeals more.'
      }
    ],
    keyVocabulary: [
      { word: 'be into', definition: 'To be interested in or enthusiastic about something.' },
      { word: 'fancy', definition: 'High quality, elaborate, or expensive.' },
      { word: 'workshop', definition: 'A short course or session where people learn a practical skill.' },
      { word: 'look it up', definition: 'To search for information, especially online or in a book.' }
    ]
  },

  // ============================================================
  // B2 PASSAGES (3 new — 22–24)
  // ============================================================

  // 22. B2 — Monologue: "Ocean Conservation Documentary"
  {
    id: 'b2-documentary',
    title: 'Ocean Conservation Documentary',
    cefrLevel: 'B2',
    type: 'monologue',
    transcript: `The ocean covers more than seventy percent of our planet, yet we have explored less than five percent of it. What we do know, however, is deeply troubling. Over the past fifty years, marine ecosystems have been under relentless pressure from human activity. Industrial fishing has depleted fish stocks to dangerously low levels in many parts of the world, and it's estimated that by 2050, there could be more plastic in the ocean than fish by weight. Coral reefs, which support roughly a quarter of all marine species, are bleaching and dying at an unprecedented rate due to rising sea temperatures. But it's not all bad news. Conservation efforts are beginning to make a difference. Marine protected areas, where fishing and development are restricted, have shown remarkable results. In places like the Great Barrier Reef and the Galápagos Islands, fish populations have started to recover when given the chance. Scientists are also developing innovative ways to tackle plastic pollution, from ocean cleanup systems to biodegradable packaging alternatives. What's clear is that the technology and knowledge exist to reverse much of the damage — but only if governments, businesses, and individuals are willing to act with urgency. The question is no longer whether we can save our oceans, but whether we will choose to.`,
    questions: [
      {
        id: 'b2-documentary-q1',
        type: 'detail',
        question: 'How much of the ocean has been explored according to the speaker?',
        options: [
          'More than fifty percent',
          'About twenty percent',
          'Less than five percent',
          'Nearly all of it'
        ],
        correctAnswer: 2,
        explanation: 'The speaker states that "we have explored less than five percent of it," referring to the ocean.'
      },
      {
        id: 'b2-documentary-q2',
        type: 'detail',
        question: 'What proportion of marine species do coral reefs support?',
        options: [
          'About ten percent',
          'Roughly a quarter',
          'More than half',
          'Nearly all'
        ],
        correctAnswer: 1,
        explanation: 'The speaker says coral reefs "support roughly a quarter of all marine species."'
      },
      {
        id: 'b2-documentary-q3',
        type: 'inference',
        question: 'What does the speaker suggest is the main barrier to ocean conservation?',
        options: [
          'A lack of scientific knowledge',
          'Insufficient technology',
          'A lack of political and collective willpower',
          'The ocean is too large to protect'
        ],
        correctAnswer: 2,
        explanation: 'The speaker says "the technology and knowledge exist" but emphasises the need for governments, businesses, and individuals to "act with urgency," implying the problem is willpower, not capability.'
      },
      {
        id: 'b2-documentary-q4',
        type: 'main_idea',
        question: 'What is the speaker\'s overall message?',
        options: [
          'The oceans are beyond saving.',
          'Science alone can solve ocean problems.',
          'We have the means to protect the oceans but must decide to act.',
          'Marine protected areas are the only solution.'
        ],
        correctAnswer: 2,
        explanation: 'The speaker concludes by saying "the question is no longer whether we can save our oceans, but whether we will choose to," framing the issue as one of choice rather than capability.'
      },
      {
        id: 'b2-documentary-q5',
        type: 'attitude',
        question: 'How would you describe the speaker\'s overall tone?',
        options: [
          'Completely pessimistic',
          'Cautiously hopeful',
          'Indifferent',
          'Angry and accusatory'
        ],
        correctAnswer: 1,
        explanation: 'The speaker presents alarming facts but also highlights positive developments, saying "it\'s not all bad news" and noting areas of recovery. The overall tone balances concern with hope, making it cautiously optimistic.'
      }
    ],
    keyVocabulary: [
      { word: 'depleted', definition: 'Reduced in quantity or strength to a very low level.' },
      { word: 'unprecedented', definition: 'Never having happened or existed before; without previous example.' },
      { word: 'bleaching', definition: 'The process by which coral loses its colour and vital algae due to stress, often from warm water.' },
      { word: 'biodegradable', definition: 'Capable of being broken down naturally by bacteria or other living organisms.' },
      { word: 'marine protected areas', definition: 'Regions of the sea where human activity is restricted to conserve ecosystems.' }
    ]
  },

  // 23. B2 — Dialogue: "Career Counseling Session"
  {
    id: 'b2-counseling',
    title: 'Career Counseling Session',
    cefrLevel: 'B2',
    type: 'dialogue',
    transcript: `Speaker A says: So, thanks for coming in today. I've had a look at your CV and your questionnaire responses. It seems like you're at a bit of a crossroads professionally. Would you say that's fair? Speaker B responds: Yeah, that's pretty accurate. I've been working in marketing for about six years now, and honestly, I just don't feel passionate about it any more. I keep thinking there must be something else out there that would suit me better. Speaker A says: That's completely understandable, and actually very common at this stage of someone's career. Tell me, when you think about the parts of your job you do enjoy, what comes to mind? Speaker B responds: Well, I really like the creative side — coming up with campaign ideas, designing visuals. And I love working directly with clients, understanding what they need. It's the admin and the endless meetings that drain me. Speaker A says: Interesting. So you enjoy creative problem-solving and building relationships, but the bureaucratic side is what's causing frustration. Have you considered fields like UX design or brand consultancy? They tend to combine creativity with client interaction, and there's usually less administrative overhead. Speaker B responds: Actually, I've looked into UX design a bit. I even did an online course last year. But I wasn't sure whether I could make the switch without going back to university. Speaker A says: Not necessarily. Many employers in that field value portfolios and practical experience over formal qualifications. What I'd suggest is building a strong portfolio, maybe taking on some freelance projects to develop your skills. We can map out a transition plan together if you'd like.`,
    questions: [
      {
        id: 'b2-counseling-q1',
        type: 'detail',
        question: 'How long has Speaker B been working in marketing?',
        options: [
          'About three years',
          'About six years',
          'About ten years',
          'Less than a year'
        ],
        correctAnswer: 1,
        explanation: 'Speaker B says "I\'ve been working in marketing for about six years now."'
      },
      {
        id: 'b2-counseling-q2',
        type: 'inference',
        question: 'What does the counselor suggest is important for breaking into UX design?',
        options: [
          'A university degree is essential.',
          'Having a strong portfolio and practical experience matters more than formal qualifications.',
          'You must complete at least three years of study.',
          'Only large companies hire UX designers.'
        ],
        correctAnswer: 1,
        explanation: 'Speaker A says "many employers in that field value portfolios and practical experience over formal qualifications," suggesting a portfolio-based approach is more important than university.'
      },
      {
        id: 'b2-counseling-q3',
        type: 'attitude',
        question: 'How does the counselor respond to Speaker B\'s career dissatisfaction?',
        options: [
          'With criticism and scepticism',
          'With understanding and practical guidance',
          'With indifference',
          'By discouraging any change'
        ],
        correctAnswer: 1,
        explanation: 'The counselor says it\'s "completely understandable, and actually very common," and then provides constructive suggestions, showing an empathetic and practical approach.'
      },
      {
        id: 'b2-counseling-q4',
        type: 'main_idea',
        question: 'What is the main outcome of the conversation?',
        options: [
          'Speaker B decides to quit immediately.',
          'Speaker B agrees to explore UX design through portfolio building and freelance work.',
          'The counselor discourages Speaker B from leaving marketing.',
          'Speaker B decides to go back to university.'
        ],
        correctAnswer: 1,
        explanation: 'The counselor suggests building a portfolio and taking on freelance projects, and offers to create a transition plan — Speaker B was already interested in UX design, and this gives a practical next step.'
      }
    ],
    keyVocabulary: [
      { word: 'crossroads', definition: 'A point at which a crucial decision must be made, especially about one\'s future direction.' },
      { word: 'drain', definition: 'To exhaust someone\'s energy, motivation, or resources.' },
      { word: 'administrative overhead', definition: 'The extra time and effort spent on organisational or bureaucratic tasks rather than core work.' },
      { word: 'portfolio', definition: 'A collection of work samples used to demonstrate skills and experience to potential employers.' },
      { word: 'transition plan', definition: 'A structured strategy for moving from one career or role to another.' }
    ]
  },

  // 24. B2 — Monologue: "My Cultural Exchange Experience"
  {
    id: 'b2-cultural',
    title: 'My Cultural Exchange Experience',
    cefrLevel: 'B2',
    type: 'monologue',
    transcript: `Last year I spent six months in South Korea on a cultural exchange programme, and it completely changed the way I see the world. Before I went, I'll be honest, I didn't know much about Korean culture beyond K-pop and Korean dramas. I had this very surface-level understanding, and I think that's true for a lot of people. But once I was actually living there, everything shifted. I stayed with a host family in Daejeon, which is a city about two hours south of Seoul. They were incredibly welcoming, and they really went out of their way to make me feel at home. One of the things that struck me most was the importance of respect in everyday interactions. In Korean culture, the way you speak to someone changes depending on their age and social position. There are different levels of formality built right into the language, and getting it wrong can cause real offence. At first, I made a lot of mistakes, but people were generally patient and forgiving. I also noticed how central food is to Korean social life. Meals are shared experiences — you don't just eat, you connect. My host mother would spend hours preparing dishes, and we'd all sit together at a low table, sharing everything. I found myself slowing down and actually being present during meals, which is something I rarely did back home. The programme also included language classes and volunteer work at a local school, which helped me build friendships with Korean students my age. By the end of my stay, I felt like I'd gained not just language skills but a whole new perspective on community, communication, and what it means to belong somewhere.`,
    questions: [
      {
        id: 'b2-cultural-q1',
        type: 'detail',
        question: 'Where did the speaker stay during the exchange?',
        options: [
          'Seoul',
          'Busan',
          'Daejeon',
          'Incheon'
        ],
        correctAnswer: 2,
        explanation: 'The speaker says "I stayed with a host family in Daejeon, which is a city about two hours south of Seoul."'
      },
      {
        id: 'b2-cultural-q2',
        type: 'inference',
        question: 'What does the speaker imply about their initial understanding of Korean culture?',
        options: [
          'It was thorough and well-informed.',
          'It was shallow and based mainly on popular media.',
          'They had no knowledge at all.',
          'They had studied Korean history extensively.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker admits they "didn\'t know much beyond K-pop and Korean dramas" and had a "very surface-level understanding," implying their knowledge was limited to popular culture.'
      },
      {
        id: 'b2-cultural-q3',
        type: 'main_idea',
        question: 'What is the speaker\'s main message about the experience?',
        options: [
          'Korean food is the best in the world.',
          'Living abroad teaches you more about a culture than studying it from a distance.',
          'Learning Korean is extremely difficult.',
          'Host families are always better than hotels.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker repeatedly contrasts their pre-trip assumptions with what they learned by actually living in Korea, emphasising that immersion "completely changed the way I see the world" — the core message is that lived experience transforms understanding.'
      },
      {
        id: 'b2-cultural-q4',
        type: 'attitude',
        question: 'How does the speaker feel about the Korean approach to mealtimes?',
        options: [
          'Indifferent — it was just food.',
          'Uncomfortable — they preferred eating alone.',
          'Appreciative — it taught them to slow down and connect.',
          'Critical — it took too much time.'
        ],
        correctAnswer: 2,
        explanation: 'The speaker describes meals as "shared experiences" and says they "found myself slowing down and actually being present," suggesting genuine appreciation for this communal approach.'
      },
      {
        id: 'b2-cultural-q5',
        type: 'inference',
        question: 'What does the speaker suggest they gained most from the experience?',
        options: [
          'Fluency in Korean',
          'A deeper understanding of community and belonging',
          'A desire to become a teacher',
          'Expertise in Korean cooking'
        ],
        correctAnswer: 1,
        explanation: 'The speaker concludes by saying they gained "not just language skills but a whole new perspective on community, communication, and what it means to belong somewhere," placing the emphasis on personal and cultural growth.'
      }
    ],
    keyVocabulary: [
      { word: 'surface-level', definition: 'Lacking depth; based only on what is immediately visible or obvious.' },
      { word: 'go out of their way', definition: 'To make a special effort to do something, beyond what is expected.' },
      { word: 'formality', definition: 'The level of politeness and ceremony required in speech or behaviour.' },
      { word: 'communal', definition: 'Shared by or involving all members of a group or community.' },
      { word: 'perspective', definition: 'A particular way of thinking about or understanding something.' }
    ]
  },

  // ============================================================
  // C1 PASSAGES (6 new — 25–30)
  // ============================================================

  // 25. C1 — Monologue: "The Power of Vulnerability" (TED-style)
  {
    id: 'c1-ted-talk',
    title: 'The Power of Vulnerability',
    cefrLevel: 'C1',
    type: 'monologue',
    transcript: `I want to talk to you today about something that most of us spend our entire lives trying to avoid — and that is vulnerability. Now, when I say "vulnerability," I don't mean weakness. I know that's often the association, but I want to challenge that. Vulnerability is actually about courage. It's about showing up when you can't control the outcome. And here's the thing — it's the birthplace of innovation, creativity, and change. Let me explain what I mean. About ten years ago, I was doing research on human connection. I was interviewing hundreds of people, asking them about their experiences of love, belonging, and empathy. And what I found was that the people who had the strongest sense of connection — who truly felt they belonged — all had one thing in common: they were willing to be vulnerable. They didn't try to numb difficult emotions or pretend everything was fine. They leaned into discomfort. They said "I love you" first. They invested in relationships that might not work out. They did things without any guarantee of success. And what struck me was how different this was from the way most of us are socialised. We're taught from a very young age to protect ourselves — to be strong, to be certain, to have all the answers. But that kind of armour, while it keeps us safe from pain, also keeps us from genuine connection. You cannot selectively numb emotion. When you numb the hard feelings — shame, fear, disappointment — you also numb joy, gratitude, and happiness. So here's what I'm proposing: that we start thinking about vulnerability not as something to be avoided, but as something to be practised. That we let ourselves be truly seen, even when it's terrifying. Because in the end, the willingness to be imperfect, to be exposed, to be authentic — that's what makes us human. And that's what makes real connection possible.`,
    questions: [
      {
        id: 'c1-ted-talk-q1',
        type: 'main_idea',
        question: 'What is the speaker\'s central argument?',
        options: [
          'Vulnerability is a weakness that should be managed carefully.',
          'Vulnerability is a form of courage that enables genuine human connection.',
          'People should avoid showing emotions in professional settings.',
          'Strong people never feel vulnerable.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker explicitly redefines vulnerability as courage and argues it is essential for authentic connection, innovation, and emotional wholeness.'
      },
      {
        id: 'c1-ted-talk-q2',
        type: 'inference',
        question: 'What does the speaker mean by "you cannot selectively numb emotion"?',
        options: [
          'It is impossible to control any emotions.',
          'Suppressing negative emotions also diminishes the ability to feel positive ones.',
          'Emotions are not real.',
          'Only positive emotions should be expressed.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker argues that numbing "the hard feelings — shame, fear, disappointment" also numbs "joy, gratitude, and happiness," meaning emotional suppression affects all emotions, not just the negative ones.'
      },
      {
        id: 'c1-ted-talk-q3',
        type: 'detail',
        question: 'What did the speaker\'s research reveal about people with a strong sense of connection?',
        options: [
          'They were wealthy and successful.',
          'They had many social media followers.',
          'They were willing to be vulnerable.',
          'They avoided all difficult relationships.'
        ],
        correctAnswer: 2,
        explanation: 'The speaker says those with the strongest sense of connection "all had one thing in common: they were willing to be vulnerable."'
      },
      {
        id: 'c1-ted-talk-q4',
        type: 'attitude',
        question: 'How does the speaker view society\'s approach to emotional protection?',
        options: [
          'As entirely healthy and necessary.',
          'As understandable but ultimately counterproductive.',
          'As the only reasonable approach.',
          'As irrelevant to the discussion.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker acknowledges we are "taught to protect ourselves" and that "armour keeps us safe from pain," but argues it also "keeps us from genuine connection," framing it as well-intentioned but ultimately harmful.'
      },
      {
        id: 'c1-ted-talk-q5',
        type: 'implication',
        question: 'What does the speaker imply about the relationship between vulnerability and innovation?',
        options: [
          'Innovation has nothing to do with vulnerability.',
          'Only vulnerable people fail at innovation.',
          'Innovation requires the willingness to risk failure and uncertainty — which is vulnerability.',
          'Innovation is purely a technical process.'
        ],
        correctAnswer: 2,
        explanation: 'The speaker calls vulnerability "the birthplace of innovation, creativity, and change," implying that the willingness to act without guaranteed outcomes — a form of vulnerability — is essential for creative breakthroughs.'
      }
    ],
    keyVocabulary: [
      { word: 'vulnerability', definition: 'The state of being exposed to the possibility of emotional harm or uncertainty.' },
      { word: 'numb', definition: 'To deliberately suppress or block one\'s ability to feel emotions.' },
      { word: 'lean into', definition: 'To embrace or move towards something difficult rather than avoid it.' },
      { word: 'armour', definition: 'Metaphorically, the emotional defences people build to protect themselves from pain.' },
      { word: 'authentic', definition: 'Genuine, real, and true to one\'s own personality or character.' }
    ]
  },

  // 26. C1 — Debate: "Panel Discussion on Education Reform"
  {
    id: 'c1-panel',
    title: 'Panel Discussion on Education Reform',
    cefrLevel: 'C1',
    type: 'debate',
    transcript: `Speaker A says: Thank you all for joining today's panel on education reform. I'd like to start with a somewhat provocative question: is our current education system fundamentally broken, or does it just need updating? Let me turn first to Professor Hayward. Speaker B responds: Well, I think "broken" is perhaps too strong, but I'd certainly say it's outdated. The system we have was designed in the nineteenth century for an industrial economy. It prioritised standardisation, compliance, and rote learning — qualities that made sense when the goal was to produce factory workers. But the world has changed dramatically, and education hasn't kept pace. We need a system that develops critical thinking, collaboration, and adaptability. Speaker A says: Interesting. Dr Okonkwo, would you agree? Speaker C responds: To some extent, yes, but I'd push back on the idea that we should throw out everything traditional. There's solid evidence that direct instruction — teacher-led, structured lessons — is highly effective, particularly for disadvantaged students. The progressive education movement has done some wonderful things, but it's also produced a generation of teachers who are uncomfortable with the idea of being the expert in the room. I think the pendulum has swung too far in some places. Speaker B responds: I take your point, and I'm not suggesting we eliminate structure entirely. But I think there's a middle ground. Finland, for example, has reformed its education system to emphasise student agency and interdisciplinary learning, while still maintaining high academic standards. Their students consistently outperform most other countries, and their teachers are among the most respected professionals in society. Speaker C responds: Finland is often cited, and for good reason, but we should be cautious about direct comparisons. Finland is a small, relatively homogeneous country with very different social and economic conditions. What works there won't necessarily translate to larger, more diverse nations. Speaker A says: That's a fair point. So the question becomes: how do we identify which reforms are genuinely scalable and which are context-dependent? That seems to be where the real challenge lies.`,
    questions: [
      {
        id: 'c1-panel-q1',
        type: 'main_idea',
        question: 'What is the central topic of the panel discussion?',
        options: [
          'Whether schools should use more technology',
          'Whether the current education system needs fundamental reform or targeted updates',
          'How to train better teachers',
          'Why Finland has the best schools'
        ],
        correctAnswer: 1,
        explanation: 'The moderator frames the discussion around whether the education system is "fundamentally broken" or "just needs updating," and the panellists debate the nature and extent of reform needed.'
      },
      {
        id: 'c1-panel-q2',
        type: 'attitude',
        question: 'What is Dr Okonkwo\'s position on progressive education?',
        options: [
          'Entirely supportive — it should replace all traditional methods.',
          'Largely positive but with reservations about going too far.',
          'Completely opposed — traditional methods are always better.',
          'Indifferent — the approach doesn\'t matter.'
        ],
        correctAnswer: 1,
        explanation: 'Dr Okonkwo acknowledges that the progressive movement "has done some wonderful things" but warns "the pendulum has swung too far," suggesting a broadly positive but cautious position.'
      },
      {
        id: 'c1-panel-q3',
        type: 'inference',
        question: 'Why does Dr Okonkwo caution against using Finland as a model?',
        options: [
          'Because Finnish students perform poorly.',
          'Because Finland\'s unique conditions may not apply to larger, more diverse countries.',
          'Because Finland doesn\'t have schools.',
          'Because Finnish education is completely traditional.'
        ],
        correctAnswer: 1,
        explanation: 'Dr Okonkwo notes Finland is "a small, relatively homogeneous country" and says "what works there won\'t necessarily translate to larger, more diverse nations," warning against treating it as a universal template.'
      },
      {
        id: 'c1-panel-q4',
        type: 'implication',
        question: 'What does Professor Hayward imply about the purpose of the current education system?',
        options: [
          'It was always designed to develop creative thinking.',
          'It was originally designed to serve industrial needs, not modern ones.',
          'It has always been perfectly suited to every era.',
          'It was designed by students for students.'
        ],
        correctAnswer: 1,
        explanation: 'Professor Hayward says the system "was designed in the nineteenth century for an industrial economy" and "prioritised standardisation, compliance, and rote learning," implying its original goals no longer match contemporary needs.'
      },
      {
        id: 'c1-panel-q5',
        type: 'inference',
        question: 'What question does the moderator identify as the fundamental challenge?',
        options: [
          'How to increase teacher salaries.',
          'How to determine which reforms work universally versus those that are context-specific.',
          'Whether students prefer traditional or progressive methods.',
          'How to build more schools.'
        ],
        correctAnswer: 1,
        explanation: 'The moderator concludes by asking "how do we identify which reforms are genuinely scalable and which are context-dependent," framing this as "where the real challenge lies."'
      }
    ],
    keyVocabulary: [
      { word: 'rote learning', definition: 'Memorising information through repetition without necessarily understanding its meaning.' },
      { word: 'direct instruction', definition: 'A structured, teacher-centred approach to teaching that follows a clear, systematic method.' },
      { word: 'pendulum has swung too far', definition: 'An idiom meaning a trend or change has gone to an extreme, past the point of balance.' },
      { word: 'student agency', definition: 'The capacity of students to take an active role in their own learning through choice and self-direction.' },
      { word: 'scalable', definition: 'Able to be expanded or applied on a larger scale without losing effectiveness.' }
    ]
  },

  // 27. C1 — Monologue: "Breaking Down CRISPR Gene Editing"
  {
    id: 'c1-science-news',
    title: 'Breaking Down CRISPR Gene Editing',
    cefrLevel: 'C1',
    type: 'monologue',
    transcript: `Good evening. Tonight we're going to break down one of the most revolutionary scientific developments of the twenty-first century: CRISPR gene editing. Now, CRISPR — which stands for Clustered Regularly Interspaced Short Palindromic Repeats — sounds incredibly complicated, but the basic concept is surprisingly intuitive. Think of it like a molecular pair of scissors that can cut DNA at a very precise location. Scientists can use this tool to remove, replace, or modify specific genes within an organism's genetic code. The technology was originally discovered in bacteria, which use a similar mechanism as a kind of immune system to defend against viruses. Researchers Jennifer Doudna and Emmanuelle Charpentier recognised its potential and adapted it for use in other organisms, earning them the Nobel Prize in Chemistry in 2020. So, what can CRISPR actually do? The applications are extraordinary. In medicine, it's being used to develop treatments for genetic diseases like sickle cell anaemia, certain cancers, and muscular dystrophy. Early clinical trials have shown genuinely promising results, with some patients experiencing significant improvements. In agriculture, CRISPR is being applied to create crops that are more resistant to disease, drought, and pests — without the controversial methods used in traditional genetic modification. But — and this is where it gets complicated — the technology also raises profound ethical questions. If we can edit the genes of unborn children, should we? Where do we draw the line between treating disease and enhancing human traits? In 2018, a Chinese scientist named He Jiankui used CRISPR to edit the genes of twin embryos, claiming to make them resistant to HIV. The scientific community was largely horrified — not because the technology failed, but because it was applied without proper oversight, informed consent, or consideration of long-term consequences. The incident highlighted a critical gap between what is technologically possible and what is ethically responsible. As CRISPR technology continues to advance, the conversation about how to regulate it becomes increasingly urgent.`,
    questions: [
      {
        id: 'c1-science-news-q1',
        type: 'detail',
        question: 'Where was the CRISPR mechanism originally discovered?',
        options: [
          'In human cells',
          'In bacteria',
          'In plant DNA',
          'In a laboratory simulation'
        ],
        correctAnswer: 1,
        explanation: 'The speaker says "the technology was originally discovered in bacteria, which use a similar mechanism as a kind of immune system."'
      },
      {
        id: 'c1-science-news-q2',
        type: 'inference',
        question: 'Why was the scientific community "largely horrified" by He Jiankui\'s experiment?',
        options: [
          'Because the technology didn\'t work.',
          'Because it was done without proper ethical oversight or informed consent.',
          'Because HIV is not a serious disease.',
          'Because CRISPR is illegal everywhere.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker explicitly says the reaction was "not because the technology failed, but because it was applied without proper oversight, informed consent, or consideration of long-term consequences."'
      },
      {
        id: 'c1-science-news-q3',
        type: 'main_idea',
        question: 'What is the speaker\'s overall message about CRISPR?',
        options: [
          'CRISPR should be banned immediately.',
          'CRISPR is a powerful tool with immense potential, but its use must be guided by ethical principles.',
          'CRISPR is only useful in agriculture.',
          'The Nobel Prize was given prematurely.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker highlights both the extraordinary applications and the ethical concerns, concluding that "the conversation about how to regulate it becomes increasingly urgent," showing a balanced view that emphasises responsible use.'
      },
      {
        id: 'c1-science-news-q4',
        type: 'implication',
        question: 'What does the speaker imply by mentioning the "gap between what is technologically possible and what is ethically responsible"?',
        options: [
          'Technology always develops faster than the ethical frameworks needed to govern it.',
          'Ethics are unimportant in science.',
          'Technology should be slowed down.',
          'Ethical frameworks are already complete and sufficient.'
        ],
        correctAnswer: 0,
        explanation: 'By calling it a "critical gap," the speaker implies that technology — specifically CRISPR — has advanced faster than the ethical guidelines and regulatory systems needed to ensure it is used responsibly.'
      },
      {
        id: 'c1-science-news-q5',
        type: 'attitude',
        question: 'How does the speaker appear to view CRISPR\'s use in agriculture?',
        options: [
          'Negatively — it is dangerous.',
          'Positively — it avoids the controversial methods of traditional genetic modification.',
          'Indifferently — it is not important.',
          'Sarcastically — they don\'t believe it works.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker describes agricultural CRISPR as creating crops that are more resistant "without the controversial methods used in traditional genetic modification," implying approval of this application.'
      }
    ],
    keyVocabulary: [
      { word: 'intuitive', definition: 'Easy to understand or grasp without the need for conscious reasoning.' },
      { word: 'clinical trials', definition: 'Controlled experiments conducted with human participants to test the safety and effectiveness of medical treatments.' },
      { word: 'oversight', definition: 'Supervision, monitoring, and regulation of an activity to ensure it is conducted properly.' },
      { word: 'informed consent', definition: 'Agreement to a procedure or action based on full understanding of the risks and implications.' },
      { word: 'regulatory', definition: 'Relating to rules or laws designed to control or govern an activity or industry.' }
    ]
  },

  // 28. C1 — Lecture: "Constructivism in the Classroom"
  {
    id: 'c1-education-methods',
    title: 'Constructivism in the Classroom',
    cefrLevel: 'C1',
    type: 'lecture',
    transcript: `Today I want to explore constructivism as a learning theory and consider what it actually looks like when applied in the classroom. Constructivism, at its core, is the idea that learners don't passively receive knowledge — they actively construct it. This might sound like common sense now, but it was quite radical when Jean Piaget and Lev Vygotsky were developing these ideas in the twentieth century. Piaget emphasised the individual nature of knowledge construction: children make sense of the world by building mental models, or "schemas," and constantly revising them as they encounter new information. Vygotsky, on the other hand, stressed the social dimension. He argued that learning is fundamentally a collaborative process — that we construct knowledge through interaction with others, particularly those who are more knowledgeable. His concept of the "Zone of Proximal Development" describes the space between what a learner can do independently and what they can achieve with guidance. Now, when we translate constructivism into classroom practice, several principles emerge. First, the teacher's role shifts from being a transmitter of information to being a facilitator of learning. Instead of standing at the front and lecturing, the constructivist teacher designs experiences that allow students to explore, question, and discover. Second, assessment changes. Rather than testing rote recall, constructivist assessment tends to focus on portfolios, projects, and demonstrations of understanding. Third, and this is crucial, the classroom environment itself must support risk-taking and inquiry. Students need to feel safe to make mistakes, because errors are viewed not as failures but as essential steps in the learning process. Critics of constructivism argue that it can be difficult to implement consistently, that it sometimes lacks the structure some learners need, and that it's hard to measure outcomes in standardised ways. These are legitimate concerns. However, the evidence suggests that when done well, constructivist approaches produce deeper understanding, better retention, and more transferable skills than traditional instruction alone.`,
    questions: [
      {
        id: 'c1-education-methods-q1',
        type: 'detail',
        question: 'What is Vygotsky\'s "Zone of Proximal Development"?',
        options: [
          'The distance a student travels to school.',
          'The gap between what a learner can do alone and what they can achieve with help.',
          'A grading system for student performance.',
          'A method for grouping students by ability.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker defines it as "the space between what a learner can do independently and what they can achieve with guidance."'
      },
      {
        id: 'c1-education-methods-q2',
        type: 'main_idea',
        question: 'What is the fundamental principle of constructivism?',
        options: [
          'Students learn best through memorisation.',
          'Learners actively build their own knowledge rather than passively receiving it.',
          'Teachers should never interact with students.',
          'All learning happens individually, never in groups.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker states that constructivism is "the idea that learners don\'t passively receive knowledge — they actively construct it."'
      },
      {
        id: 'c1-education-methods-q3',
        type: 'inference',
        question: 'How does the speaker view the criticisms of constructivism?',
        options: [
          'As entirely wrong and misguided.',
          'As legitimate concerns that don\'t invalidate the approach when implemented well.',
          'As proof that constructivism should be abandoned.',
          'As irrelevant to the discussion.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker acknowledges the criticisms as "legitimate concerns" but counters with evidence that constructivist approaches "produce deeper understanding" when "done well," showing a balanced assessment.'
      },
      {
        id: 'c1-education-methods-q4',
        type: 'implication',
        question: 'What does the shift from "transmitter" to "facilitator" imply about the teacher\'s role?',
        options: [
          'Teachers become less important.',
          'Teachers must guide and design learning experiences rather than simply deliver content.',
          'Teachers no longer need subject knowledge.',
          'Teachers should let students teach themselves without any support.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker says the teacher "designs experiences that allow students to explore, question, and discover," implying an active role in scaffolding learning rather than just delivering information.'
      },
      {
        id: 'c1-education-methods-q5',
        type: 'attitude',
        question: 'What is the speaker\'s overall position on constructivism?',
        options: [
          'Entirely negative.',
          'Supportive, while acknowledging its limitations.',
          'Neutral and uncommitted.',
          'Dismissive and sarcastic.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker presents constructivism positively, noting the evidence for "deeper understanding" and "better retention," while fairly acknowledging criticisms — indicating a supportive but honest stance.'
      }
    ],
    keyVocabulary: [
      { word: 'schemas', definition: 'Mental frameworks or models that help organise and interpret information.' },
      { word: 'facilitator', definition: 'A person who helps a process happen, guiding rather than directing.' },
      { word: 'rote recall', definition: 'The ability to repeat memorised information without necessarily understanding it.' },
      { word: 'scaffolding', definition: 'Temporary support provided to learners to help them achieve tasks they cannot yet do independently.' },
      { word: 'transferable skills', definition: 'Abilities that can be applied in a variety of different contexts and situations.' }
    ]
  },

  // 29. C1 — Debate: "Immigration Policy and National Identity"
  {
    id: 'c1-immigration',
    title: 'Immigration Policy and National Identity',
    cefrLevel: 'C1',
    type: 'debate',
    transcript: `Speaker A says: The question before us today is whether immigration policy should be primarily shaped by economic considerations or by concerns about national identity and social cohesion. Professor Reyes, would you like to open? Speaker B responds: Gladly. I think it's a false dichotomy to separate economics from identity, but if forced to prioritise, I'd argue that economic evidence should be the primary driver of immigration policy. The data consistently shows that immigration is a net positive for host economies. Immigrants fill labour shortages, contribute to tax revenues, start businesses, and bring skills that domestic populations often lack. Countries with ageing populations, like Japan and much of Europe, need immigration simply to sustain their pension systems and public services. Speaker C responds: I don't dispute the economic data, but I think focusing exclusively on economics misses something important. When immigration happens too quickly, without adequate integration infrastructure, it can create genuine social tensions. And those tensions aren't simply about prejudice — though of course prejudice exists. They're about the pace of change. Communities that feel their character is changing rapidly, without their input, often feel alienated and disempowered. That creates fertile ground for populist movements. Speaker B responds: I take that point, and I agree that integration matters enormously. But I'd argue that the solution is better integration policy — language programmes, community engagement, anti-discrimination legislation — not reduced immigration. Restricting immigration to preserve some idealised notion of national identity is both impractical and, frankly, historically illiterate. National identities have always been in flux. Speaker C responds: Fair enough, but you're conflating the acknowledgement of cultural change with an idealised or static view of identity. I'm not advocating for closed borders. I'm saying that sustainable immigration requires the host society to have the capacity — in housing, healthcare, education — to absorb newcomers. Without that capacity, even well-intentioned policies can backfire. Speaker A says: It sounds like there's more agreement here than disagreement. Both of you seem to advocate for evidence-based immigration policy combined with robust integration support.`,
    questions: [
      {
        id: 'c1-immigration-q1',
        type: 'main_idea',
        question: 'What is the central question of the debate?',
        options: [
          'Whether all immigration should be stopped.',
          'Whether immigration policy should prioritise economics or national identity concerns.',
          'Whether immigrants should learn the local language.',
          'How to build more housing.'
        ],
        correctAnswer: 1,
        explanation: 'The moderator frames the debate around "whether immigration policy should be primarily shaped by economic considerations or by concerns about national identity and social cohesion."'
      },
      {
        id: 'c1-immigration-q2',
        type: 'attitude',
        question: 'What is Speaker C\'s position on immigration?',
        options: [
          'Completely against all immigration.',
          'Supportive of immigration but concerned about the pace of change and integration capacity.',
          'Indifferent to the issue.',
          'In favour of unrestricted open borders.'
        ],
        correctAnswer: 1,
        explanation: 'Speaker C explicitly says "I\'m not advocating for closed borders" but argues that "sustainable immigration requires the host society to have the capacity to absorb newcomers," showing conditional support.'
      },
      {
        id: 'c1-immigration-q3',
        type: 'inference',
        question: 'Why does Speaker B call the restriction of immigration "historically illiterate"?',
        options: [
          'Because immigrants are uneducated.',
          'Because national identities have never been fixed — they have always changed over time.',
          'Because history books don\'t discuss immigration.',
          'Because no one studies history any more.'
        ],
        correctAnswer: 1,
        explanation: 'Speaker B says "national identities have always been in flux," implying that anyone who argues for preserving a fixed national identity is ignoring the historical reality that cultures continually evolve.'
      },
      {
        id: 'c1-immigration-q4',
        type: 'implication',
        question: 'What does Speaker C imply about populist movements?',
        options: [
          'They are always justified.',
          'They tend to emerge when communities feel the pace of change outstrips their input and capacity.',
          'They have nothing to do with immigration.',
          'They are the best form of governance.'
        ],
        correctAnswer: 1,
        explanation: 'Speaker C says communities that "feel their character is changing rapidly, without their input, often feel alienated" and that this "creates fertile ground for populist movements," implying a causal link between unmanaged change and populism.'
      },
      {
        id: 'c1-immigration-q5',
        type: 'inference',
        question: 'What does the moderator conclude about the two speakers\' positions?',
        options: [
          'They fundamentally disagree on everything.',
          'They share more common ground than their initial positions suggested.',
          'Neither made a compelling argument.',
          'Only one of them is correct.'
        ],
        correctAnswer: 1,
        explanation: 'The moderator says "there\'s more agreement here than disagreement" and notes both speakers "advocate for evidence-based immigration policy combined with robust integration support."'
      }
    ],
    keyVocabulary: [
      { word: 'false dichotomy', definition: 'A logical fallacy that presents only two options when more exist.' },
      { word: 'social cohesion', definition: 'The bonds and sense of unity that hold a community or society together.' },
      { word: 'integration', definition: 'The process of incorporating newcomers into the social, economic, and cultural life of a community.' },
      { word: 'populist movements', definition: 'Political movements that claim to represent the interests of ordinary people against an elite establishment.' },
      { word: 'conflating', definition: 'Combining or confusing two separate ideas or concepts as if they were the same thing.' }
    ]
  },

  // 30. C1 — Monologue: "The Surveillance Economy"
  {
    id: 'c1-tech-ethics',
    title: 'The Surveillance Economy',
    cefrLevel: 'C1',
    type: 'monologue',
    transcript: `I want to talk today about something that affects every single one of us, whether we realise it or not — the surveillance economy. Now, most people understand that companies like Google, Facebook, and Amazon collect data about their users. But what's less well understood is the sheer scale and sophistication of this data collection, and more importantly, the way it's being used. The business model is straightforward: these companies offer free services — search engines, social media, email — and in exchange, they harvest your data. Every click, every search query, every message, every purchase is logged, analysed, and used to build detailed profiles that predict your behaviour. These profiles are then sold to advertisers who use them to target you with remarkable precision. But here's where it gets more troubling. The data isn't just used for advertising. It's used to shape behaviour. Recommendation algorithms on platforms like YouTube and TikTok are designed to maximise engagement — to keep you scrolling, watching, clicking. And the most effective way to do that, research shows, is to surface content that provokes strong emotional reactions: outrage, fear, anxiety. The consequence is that these platforms are not neutral mirrors of reality — they are actively shaping how we perceive the world, often in ways that amplify polarisation and misinformation. There's also the question of consent. When you accept a terms-of-service agreement, you're technically giving your consent. But how many of us actually read those documents? They're deliberately written to be long, complex, and impenetrable. Meaningful consent requires genuine understanding, and the current system doesn't provide that. Some countries, particularly in Europe with the GDPR, have taken steps to give users more control over their data. But critics argue these regulations don't go far enough. As long as the fundamental business model — free services in exchange for personal data — remains unchanged, our digital lives will continue to be commodified. The question we need to ask ourselves is: what kind of digital society do we actually want to live in?`,
    questions: [
      {
        id: 'c1-tech-ethics-q1',
        type: 'main_idea',
        question: 'What is the speaker\'s central concern about the surveillance economy?',
        options: [
          'That technology is advancing too quickly.',
          'That personal data is being harvested, commodified, and used to shape behaviour without meaningful consent.',
          'That social media is boring.',
          'That advertising should be eliminated entirely.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker argues that data collection goes beyond advertising to behaviour manipulation, and that current consent mechanisms are inadequate — making the core issue one of exploitation without genuine understanding.'
      },
      {
        id: 'c1-tech-ethics-q2',
        type: 'inference',
        question: 'What does the speaker imply about terms-of-service agreements?',
        options: [
          'They provide adequate protection for users.',
          'They are intentionally designed to prevent genuine understanding, making consent largely meaningless.',
          'No one should ever agree to them.',
          'They are always fair and balanced.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker says these documents are "deliberately written to be long, complex, and impenetrable" and that "meaningful consent requires genuine understanding," implying the current system renders consent a formality rather than a real choice.'
      },
      {
        id: 'c1-tech-ethics-q3',
        type: 'detail',
        question: 'According to the speaker, what do recommendation algorithms prioritise?',
        options: [
          'Educational content',
          'User privacy',
          'Maximum engagement, often through emotionally provocative content',
          'Government-approved information'
        ],
        correctAnswer: 2,
        explanation: 'The speaker says algorithms "are designed to maximise engagement" and do so by surfacing "content that provokes strong emotional reactions: outrage, fear, anxiety."'
      },
      {
        id: 'c1-tech-ethics-q4',
        type: 'attitude',
        question: 'How does the speaker view the GDPR and similar regulations?',
        options: [
          'As a complete solution to the problem.',
          'As a step in the right direction but insufficient to address the fundamental business model.',
          'As harmful and unnecessary.',
          'As irrelevant to the discussion.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker says some countries "have taken steps" with GDPR, but notes "critics argue these regulations don\'t go far enough" because the fundamental business model remains unchanged.'
      },
      {
        id: 'c1-tech-ethics-q5',
        type: 'implication',
        question: 'What does the speaker mean by saying platforms are "not neutral mirrors of reality"?',
        options: [
          'Platforms accurately reflect the real world.',
          'Platforms actively shape perception by algorithmically selecting and amplifying certain content.',
          'Platforms don\'t show any content.',
          'Mirrors are used in platform design.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker contrasts "neutral mirrors" with the reality that platforms "are actively shaping how we perceive the world" through algorithmic content selection, meaning they create a distorted rather than objective view.'
      }
    ],
    keyVocabulary: [
      { word: 'surveillance economy', definition: 'An economic system built on the collection, analysis, and monetisation of personal data.' },
      { word: 'commodified', definition: 'Turned into a product or commodity that can be bought and sold.' },
      { word: 'polarisation', definition: 'The division of opinion or a group into two sharply opposing camps.' },
      { word: 'impenetrable', definition: 'Impossible to understand or get through; extremely dense or complex.' },
      { word: 'algorithmic', definition: 'Relating to a set of rules or processes followed by a computer to perform a task.' },
      { word: 'GDPR', definition: 'General Data Protection Regulation — a European Union law governing the collection and use of personal data.' }
    ]
  },

  // ============================================================
  // C2 PASSAGES (6 new — 31–36)
  // ============================================================

  // 31. C2 — Monologue: "The Doctrine of Precedent in Common Law"
  {
    id: 'c2-legal',
    title: 'The Doctrine of Precedent in Common Law',
    cefrLevel: 'C2',
    type: 'monologue',
    transcript: `I want to examine today what is arguably the most distinctive feature of common law systems: the doctrine of precedent, or stare decisis — a Latin phrase meaning, roughly, "to stand by things decided." At its most fundamental level, this doctrine holds that courts should follow the principles established by earlier judicial decisions when adjudicating cases with materially similar facts. The rationale, on the face of it, is straightforward: legal consistency promotes predictability, and predictability, in turn, enables citizens and institutions to order their affairs with reasonable confidence in how the law will be applied. Without such consistency, one might argue, the rule of law itself would be undermined, inasmuch as individuals could not reliably anticipate the legal consequences of their actions. However, the doctrine is considerably more nuanced than this initial formulation suggests. A critical distinction must be drawn between binding precedent and persuasive authority. Binding precedent — that is, decisions of higher courts within the same jurisdiction — must be followed by lower courts, even where the lower court judge considers the earlier decision to have been wrongly reasoned. Persuasive authority, by contrast, which might include decisions from courts in other jurisdictions, obiter dicta, or academic commentary, may be considered but need not be followed. This hierarchical structure raises a question that has preoccupied legal theorists for generations: to what extent does the doctrine of precedent constrain judicial creativity? On one view, strict adherence to precedent ensures that the law develops incrementally and transparently, with each decision building logically upon the last. On another, it risks ossifying the law, rendering it incapable of responding to changing social circumstances. It is worth noting that mechanisms exist for departing from precedent — the practice of distinguishing cases, whereby a court identifies material differences between the instant case and the precedent, is perhaps the most common. Furthermore, appellate courts, and in particular courts of final appeal such as the UK Supreme Court, may explicitly overrule earlier decisions where they are satisfied that the prior reasoning was fundamentally flawed, though they exercise this power sparingly. The tension between stability and adaptability, between fidelity to established principle and responsiveness to evolving societal norms, lies at the very heart of common law jurisprudence, and it is a tension that, one might suggest, is not merely unresolvable but productively so — for it is precisely this ongoing negotiation that gives the common law its characteristic flexibility and resilience.`,
    questions: [
      {
        id: 'c2-legal-q1',
        type: 'inference',
        question: 'What does the speaker imply by describing the tension between stability and adaptability as "productively" unresolvable?',
        options: [
          'That the legal system is fatally flawed and cannot function.',
          'That the ongoing negotiation between these competing values is what gives common law its strength and flexibility.',
          'That all legal tensions should be resolved immediately.',
          'That stability is always more important than adaptability.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker says the tension "is not merely unresolvable but productively so" because "it is precisely this ongoing negotiation that gives the common law its characteristic flexibility and resilience," implying that the lack of resolution is itself a source of vitality.'
      },
      {
        id: 'c2-legal-q2',
        type: 'implication',
        question: 'What does the speaker imply about the relationship between predictability and the rule of law?',
        options: [
          'Predictability is irrelevant to the legal system.',
          'Predictability is a precondition for the rule of law, because citizens must be able to anticipate legal consequences to act accordingly.',
          'The rule of law requires complete unpredictability.',
          'Only lawyers need to understand legal predictability.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker argues that "legal consistency promotes predictability" and that without it "the rule of law itself would be undermined, inasmuch as individuals could not reliably anticipate the legal consequences of their actions."'
      },
      {
        id: 'c2-legal-q3',
        type: 'detail',
        question: 'What is the practice of "distinguishing cases"?',
        options: [
          'Ranking cases by importance.',
          'Identifying material differences between the current case and a precedent to justify a different outcome.',
          'Translating legal documents into plain language.',
          'Combining two cases into one hearing.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker defines distinguishing as when "a court identifies material differences between the instant case and the precedent," which allows departure from the earlier ruling.'
      },
      {
        id: 'c2-legal-q4',
        type: 'attitude',
        question: 'How does the speaker view strict adherence to precedent?',
        options: [
          'As entirely positive with no drawbacks.',
          'As valuable for consistency but potentially problematic if it prevents legal adaptation.',
          'As completely unnecessary.',
          'As something only lower courts should practise.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker presents strict adherence as ensuring law "develops incrementally and transparently" but warns it "risks ossifying the law, rendering it incapable of responding to changing social circumstances" — a balanced assessment acknowledging both value and risk.'
      },
      {
        id: 'c2-legal-q5',
        type: 'inference',
        question: 'Why does the speaker say courts of final appeal exercise overruling power "sparingly"?',
        options: [
          'Because they lack the authority to overrule.',
          'Because overruling too frequently would undermine the very predictability and stability the doctrine is designed to protect.',
          'Because there are no cases worth overruling.',
          'Because lower courts always make correct decisions.'
        ],
        correctAnswer: 1,
        explanation: 'The sparing use of overruling power is consistent with the speaker\'s argument that stability and predictability are core functions of precedent — excessive overruling would contradict the doctrine\'s fundamental purpose.'
      }
    ],
    keyVocabulary: [
      { word: 'stare decisis', definition: 'The legal principle of following precedent; Latin for "to stand by things decided."' },
      { word: 'adjudicating', definition: 'Making a formal judgement or decision about a legal case or dispute.' },
      { word: 'obiter dicta', definition: 'Remarks in a judicial opinion that are not essential to the decision and do not create binding precedent.' },
      { word: 'ossifying', definition: 'Becoming rigid, inflexible, or resistant to change.' },
      { word: 'jurisprudence', definition: 'The theory and philosophy of law; the study of legal principles and their application.' },
      { word: 'distinguishing', definition: 'The legal practice of identifying relevant differences between cases to justify departing from an earlier decision.' }
    ]
  },

  // 32. C2 — Debate: "Monetary Policy and Income Inequality"
  {
    id: 'c2-economics',
    title: 'Monetary Policy and Income Inequality',
    cefrLevel: 'C2',
    type: 'debate',
    transcript: `Speaker A says: The proposition before us this evening is that central banks, through their monetary policy decisions — particularly quantitative easing and sustained low interest rates — have been a significant, albeit often underacknowledged, driver of income inequality in advanced economies. Professor Nakamura, would you care to open? Speaker B responds: Thank you. I would argue that the evidence on this point is, at this stage, quite compelling. When central banks engage in quantitative easing — that is, the large-scale purchase of government bonds and other financial assets — the primary mechanism through which this operates is by inflating asset prices. Share prices rise, property values increase, and bond yields compress. Now, the benefits of asset price inflation accrue disproportionately to those who already own assets — which is to say, predominantly wealthier households. A household that owns a diversified investment portfolio or multiple properties benefits enormously from these policies. A household that rents and has negligible savings does not. Speaker C responds: I don't dispute that asset price inflation has distributional consequences, but I think it's essential to consider the counterfactual. What would have happened without quantitative easing? In 2008, and again during the pandemic, the global economy faced the very real prospect of a deflationary spiral — cascading bankruptcies, mass unemployment, a complete seizure of credit markets. The distributional effects of that scenario would have been catastrophic for precisely the low-income households you're concerned about. So while quantitative easing may have exacerbated wealth inequality, it arguably prevented a far worse outcome for the most vulnerable. Speaker B responds: That's a fair point, and I wouldn't suggest that inaction was a viable alternative. However, I think the critique is less about the initial emergency intervention and more about the sustained reliance on these extraordinary measures well beyond the crisis period. If quantitative easing were truly temporary, as was initially promised, the distributional effects might have been manageable. But when it persists for over a decade, it fundamentally reshapes the economic landscape in ways that entrench existing inequalities. Speaker C responds: I concede that the prolonged nature of these policies is problematic, but the responsibility lies not solely with central banks. Fiscal authorities — governments — failed to enact the structural reforms and redistributive taxation that would have addressed inequality directly. Central banks were, in many respects, left to compensate for political inaction, using the only tools available to them. Speaker A says: So it would seem that both of you agree the outcome has been inequitable, but you differ on where to apportion responsibility — the central bank or the fiscal authorities.`,
    questions: [
      {
        id: 'c2-economics-q1',
        type: 'inference',
        question: 'What does Speaker B imply about the "temporary" nature of quantitative easing?',
        options: [
          'That it was always intended to be permanent.',
          'That what was presented as a short-term emergency measure became a long-term structural feature, deepening inequality.',
          'That it ended exactly when promised.',
          'That temporary policies never have lasting effects.'
        ],
        correctAnswer: 1,
        explanation: 'Speaker B says QE was "initially promised" to be temporary but "persists for over a decade," implying that its prolongation — contrary to stated intentions — transformed it from an emergency tool into a structural force that entrenches inequality.'
      },
      {
        id: 'c2-economics-q2',
        type: 'implication',
        question: 'What does Speaker C imply about the role of governments?',
        options: [
          'That governments acted decisively and effectively.',
          'That governments failed to use fiscal policy to address inequality, forcing central banks to act alone with inadequate tools.',
          'That governments had no role in economic policy.',
          'That fiscal policy is always superior to monetary policy.'
        ],
        correctAnswer: 1,
        explanation: 'Speaker C argues that "fiscal authorities failed to enact structural reforms and redistributive taxation" and that central banks were "left to compensate for political inaction," clearly implying that government failures shifted an unfair burden onto monetary authorities.'
      },
      {
        id: 'c2-economics-q3',
        type: 'attitude',
        question: 'How does Speaker C view quantitative easing overall?',
        options: [
          'As an unqualified success.',
          'As a necessary evil — flawed in its distributional effects but preferable to the alternative of economic collapse.',
          'As a complete failure.',
          'As irrelevant to inequality.'
        ],
        correctAnswer: 1,
        explanation: 'Speaker C acknowledges that QE "may have exacerbated wealth inequality" but argues it "prevented a far worse outcome for the most vulnerable," framing it as imperfect but necessary.'
      },
      {
        id: 'c2-economics-q4',
        type: 'inference',
        question: 'Why does Speaker B emphasise asset ownership in the argument?',
        options: [
          'Because asset ownership is irrelevant to the discussion.',
          'Because QE primarily benefits asset holders, and asset ownership is concentrated among wealthier households, making QE inherently regressive.',
          'Because everyone owns equal assets.',
          'Because assets always decrease in value.'
        ],
        correctAnswer: 1,
        explanation: 'Speaker B argues that QE inflates asset prices and "the benefits of asset price inflation accrue disproportionately to those who already own assets — which is to say, predominantly wealthier households," making asset concentration central to the inequality argument.'
      },
      {
        id: 'c2-economics-q5',
        type: 'main_idea',
        question: 'On what point do both speakers agree?',
        options: [
          'That quantitative easing should be abolished.',
          'That the outcome of monetary policy has been inequitable, regardless of which institution bears primary responsibility.',
          'That central banks are entirely to blame.',
          'That income inequality is not a real problem.'
        ],
        correctAnswer: 1,
        explanation: 'The moderator summarises that "both of you agree the outcome has been inequitable" while differing on responsibility — confirming their shared acknowledgement that the policies produced unequal results.'
      }
    ],
    keyVocabulary: [
      { word: 'quantitative easing', definition: 'A monetary policy in which a central bank purchases government bonds or other financial assets to inject money into the economy.' },
      { word: 'counterfactual', definition: 'A hypothetical scenario considering what would have happened if events had occurred differently.' },
      { word: 'deflationary spiral', definition: 'A dangerous economic cycle in which falling prices lead to reduced spending, lower production, job losses, and further price declines.' },
      { word: 'distributional consequences', definition: 'The effects of a policy on how wealth, income, or resources are spread across different groups in society.' },
      { word: 'redistributive taxation', definition: 'Tax policies designed to transfer wealth from higher-income groups to lower-income groups.' },
      { word: 'apportion responsibility', definition: 'To assign or distribute blame or credit among different parties.' }
    ]
  },

  // 33. C2 — Lecture: "Autonomy and Consent in Clinical Trials"
  {
    id: 'c2-medical-ethics',
    title: 'Autonomy and Consent in Clinical Trials',
    cefrLevel: 'C2',
    type: 'lecture',
    transcript: `Today's lecture concerns what I would argue is the single most consequential ethical principle in modern biomedical research: the principle of informed consent, and its relationship to patient autonomy. Now, the historical context here is indispensable. The modern framework for research ethics emerged, in large part, as a response to egregious violations of human dignity in the twentieth century — most notoriously the experiments conducted by Nazi physicians, which led directly to the Nuremberg Code of 1947, and subsequently the Declaration of Helsinki and the Belmont Report. These foundational documents established that no human being should be subjected to medical experimentation without their voluntary, informed, and comprehending consent. The philosophical underpinning of this requirement is the Kantian principle that persons must be treated as ends in themselves, never merely as means — that is to say, a research subject is not an instrument for the advancement of knowledge but a moral agent whose dignity and autonomy must be respected. In practice, however, the application of informed consent is considerably more fraught than the principle might suggest. Consider the question of therapeutic misconception — a well-documented phenomenon in which clinical trial participants, despite having signed consent forms and received detailed explanations, nonetheless believe that the experimental treatment is being administered primarily for their personal benefit, rather than for the generation of scientific data. Research suggests that this misconception is remarkably persistent, even among well-educated participants. This raises a deeply uncomfortable question: if a significant proportion of research subjects fundamentally misunderstand the nature of their participation, can their consent be said to be genuinely informed? Furthermore, there is the vexed issue of consent in contexts of structural vulnerability — trials conducted in low-income countries, for example, where participants may have limited access to alternative medical care and may therefore feel, whether explicitly or implicitly, that participation is their only viable option. In such circumstances, consent, while technically voluntary, may be compromised by what some ethicists have termed "situational coercion." It would be imprudent to suggest that these challenges invalidate the enterprise of clinical research; they do not. What they demand, however, is a far more sophisticated and contextually sensitive approach to consent — one that moves beyond the mere procedural requirement of a signed document towards an ongoing, dialogical process in which the participant's understanding is continually assessed and supported throughout the duration of the trial.`,
    questions: [
      {
        id: 'c2-medical-ethics-q1',
        type: 'inference',
        question: 'What does the speaker imply about the current standard practice of informed consent?',
        options: [
          'That it is perfectly adequate in all circumstances.',
          'That it often functions as a procedural formality rather than ensuring genuine understanding.',
          'That it should be eliminated entirely.',
          'That only doctors need to understand consent.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker argues for moving "beyond the mere procedural requirement of a signed document towards an ongoing, dialogical process," implying that current practice too often treats consent as a formality rather than a substantive commitment to understanding.'
      },
      {
        id: 'c2-medical-ethics-q2',
        type: 'implication',
        question: 'What does the concept of "therapeutic misconception" imply about the gap between information and understanding?',
        options: [
          'That providing information is always sufficient for understanding.',
          'That even when information is provided, participants may process it through the lens of personal hope rather than objective comprehension.',
          'That participants never read consent forms.',
          'That misconception is always deliberate.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker notes that participants sign forms and receive explanations yet "nonetheless believe that the experimental treatment is being administered primarily for their personal benefit," showing that information provision alone does not guarantee comprehension, especially when personal stakes are high.'
      },
      {
        id: 'c2-medical-ethics-q3',
        type: 'attitude',
        question: 'What is the speaker\'s position on clinical research as a whole?',
        options: [
          'That it should be stopped due to ethical problems.',
          'That it is essential but requires more ethically sophisticated consent practices.',
          'That ethics are irrelevant to research.',
          'That only wealthy countries should conduct trials.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker explicitly says "it would be imprudent to suggest that these challenges invalidate the enterprise of clinical research" but insists on "a far more sophisticated and contextually sensitive approach to consent."'
      },
      {
        id: 'c2-medical-ethics-q4',
        type: 'inference',
        question: 'Why does the speaker describe consent in low-income countries as potentially compromised?',
        options: [
          'Because participants in low-income countries are less intelligent.',
          'Because limited access to alternative care may create implicit pressure to participate, undermining the voluntariness of consent.',
          'Because consent forms are not translated.',
          'Because researchers in those countries are unethical.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker says participants "may have limited access to alternative medical care" and may feel "participation is their only viable option," creating what ethicists call "situational coercion" — consent is technically voluntary but practically constrained.'
      },
      {
        id: 'c2-medical-ethics-q5',
        type: 'main_idea',
        question: 'What transformation does the speaker advocate for in the consent process?',
        options: [
          'Eliminating consent forms entirely.',
          'Moving from a one-time procedural act to an ongoing dialogue that continually assesses participant understanding.',
          'Requiring participants to pass a written exam.',
          'Allowing doctors to consent on behalf of patients.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker calls for "an ongoing, dialogical process in which the participant\'s understanding is continually assessed and supported throughout the duration of the trial," replacing the static act of signing a form with a continuous engagement.'
      }
    ],
    keyVocabulary: [
      { word: 'therapeutic misconception', definition: 'The mistaken belief by trial participants that the experimental intervention is designed primarily for their personal therapeutic benefit.' },
      { word: 'situational coercion', definition: 'Pressure arising from circumstances rather than direct threats, which may compromise the voluntariness of a decision.' },
      { word: 'autonomy', definition: 'The right and capacity of an individual to make informed, uncoerced decisions about their own life and body.' },
      { word: 'dialogical', definition: 'Based on or characterised by ongoing dialogue and mutual exchange rather than one-way communication.' },
      { word: 'Kantian', definition: 'Relating to the philosophy of Immanuel Kant, particularly his ethical principle that persons must be treated as ends, not means.' },
      { word: 'egregious', definition: 'Outstandingly bad; shockingly severe or flagrant.' }
    ]
  },

  // 34. C2 — Monologue: "Presenting a Research Paper on Collective Memory"
  {
    id: 'c2-academic-paper',
    title: 'Presenting a Research Paper on Collective Memory',
    cefrLevel: 'C2',
    type: 'monologue',
    transcript: `Thank you for the opportunity to present our recent findings on what we have termed "the architecture of collective memory." Our research, conducted over a three-year period across four national contexts — Germany, Japan, South Africa, and the United States — sought to investigate how societies construct, maintain, contest, and revise shared narratives about traumatic historical events. The theoretical framework draws principally on the work of Maurice Halbwachs, who argued, quite persuasively I think, that memory is not merely an individual cognitive function but a fundamentally social phenomenon — that what we remember, and how we remember it, is shaped by the groups to which we belong and the institutional structures through which memory is transmitted. Our methodology combined discourse analysis of official commemorative texts — museum exhibits, school curricula, state-sponsored memorials — with in-depth qualitative interviews with three generations within each national context. What emerged from this comparative analysis were several patterns that, while not universally applicable, proved remarkably consistent across contexts. First, we observed what we have called "narrative stratification" — the phenomenon whereby official or state-sanctioned accounts of historical events coexist in tension with subaltern or counter-narratives that challenge, complicate, or directly contradict the dominant version. In Germany, for instance, the official narrative of Vergangenheitsbewältigung — the confrontation with the Nazi past — exists alongside persistent, if marginalised, discourses of victimhood and moral exhaustion. Second, we found that generational transmission of collective memory is neither automatic nor stable. Each generation does not simply inherit the memories of the previous one; rather, it selectively appropriates, reinterprets, and sometimes actively repudiates elements of the inherited narrative. Third, and perhaps most significantly, our data suggest that the most resilient collective memories — those that retain their salience across generations — are not those that present a fixed, monolithic account, but rather those that incorporate space for contestation and reinterpretation. It is, paradoxically, the capacity for internal disagreement that appears to sustain a society's engagement with its past. We would suggest, tentatively, that the implications of these findings extend beyond the academic study of memory to questions of transitional justice, reconciliation policy, and the design of educational curricula in post-conflict societies.`,
    questions: [
      {
        id: 'c2-academic-paper-q1',
        type: 'inference',
        question: 'What does the speaker imply about the most enduring forms of collective memory?',
        options: [
          'They are fixed, unchanging narratives imposed by the state.',
          'They are those that allow room for disagreement and reinterpretation, making them adaptable across generations.',
          'They are only found in Western societies.',
          'They are always accurate historical accounts.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker states that the most resilient memories "are not those that present a fixed, monolithic account, but rather those that incorporate space for contestation and reinterpretation," implying adaptability sustains collective memory.'
      },
      {
        id: 'c2-academic-paper-q2',
        type: 'implication',
        question: 'What does the concept of "narrative stratification" imply about official historical accounts?',
        options: [
          'That they are always accurate and complete.',
          'That they coexist with alternative narratives that may challenge or complicate the dominant version.',
          'That only one narrative can exist at any time.',
          'That stratification refers to geological processes.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker defines narrative stratification as the coexistence of "official or state-sanctioned accounts" with "subaltern or counter-narratives that challenge, complicate, or directly contradict the dominant version."'
      },
      {
        id: 'c2-academic-paper-q3',
        type: 'attitude',
        question: 'How confident is the speaker in the universal applicability of their findings?',
        options: [
          'Completely certain — the findings apply everywhere.',
          'Cautious — the patterns are consistent but acknowledged as not universally applicable.',
          'Not at all confident — the findings are purely speculative.',
          'Dismissive — the speaker considers the research unimportant.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker uses hedging language — "while not universally applicable," "proved remarkably consistent," and "we would suggest, tentatively" — demonstrating academic caution and epistemic humility.'
      },
      {
        id: 'c2-academic-paper-q4',
        type: 'inference',
        question: 'What does the speaker imply about generational memory transmission?',
        options: [
          'That each generation faithfully reproduces the memories of the previous one.',
          'That memory transmission is an active, selective process involving reinterpretation and sometimes rejection.',
          'That only the oldest generation has valid memories.',
          'That memory cannot be transmitted between generations.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker says each generation "selectively appropriates, reinterprets, and sometimes actively repudiates elements of the inherited narrative," framing transmission as transformative rather than reproductive.'
      },
      {
        id: 'c2-academic-paper-q5',
        type: 'main_idea',
        question: 'What is the research paper\'s central argument?',
        options: [
          'That collective memory is a fixed, stable phenomenon.',
          'That collective memory is a socially constructed, dynamic process shaped by institutional structures, generational negotiation, and the productive tension between dominant and counter-narratives.',
          'That only individual memory matters.',
          'That all societies remember the past in the same way.'
        ],
        correctAnswer: 1,
        explanation: 'The paper argues memory is social (drawing on Halbwachs), involves "narrative stratification" and generational reinterpretation, and is sustained by "the capacity for internal disagreement" — all pointing to a dynamic, constructed understanding.'
      }
    ],
    keyVocabulary: [
      { word: 'collective memory', definition: 'The shared pool of memories, knowledge, and narratives held by a group or society about its past.' },
      { word: 'subaltern', definition: 'Of lower status; in cultural studies, referring to marginalised groups whose perspectives are excluded from dominant narratives.' },
      { word: 'narrative stratification', definition: 'The layering of multiple, often competing, accounts of historical events within a society.' },
      { word: 'repudiates', definition: 'Rejects or refuses to accept something, especially with vigour or authority.' },
      { word: 'salience', definition: 'The quality of being particularly noticeable, important, or relevant.' },
      { word: 'Vergangenheitsbewältigung', definition: 'A German term meaning the process of coming to terms with the past, particularly the Nazi era.' }
    ]
  },

  // 35. C2 — Dialogue: "Multilateral Climate Negotiations"
  {
    id: 'c2-diplomacy',
    title: 'Multilateral Climate Negotiations',
    cefrLevel: 'C2',
    type: 'dialogue',
    transcript: `Speaker A says: Ambassador Chen, if I might, I'd like to return to the question of differentiated responsibilities. The position of our delegation is that the Paris Agreement's principle of common but differentiated responsibilities must remain the cornerstone of any enhanced commitment framework. Historically industrialised nations bear a disproportionate share of cumulative emissions, and it would be both inequitable and, frankly, diplomatically untenable to impose identical reduction targets on economies at vastly different stages of development. Speaker B responds: Minister Okafor, I appreciate the force of the historical argument, and I should say that my government does not dispute the principle of differentiation per se. However, I would respectfully submit that the landscape has shifted materially since the framework convention was adopted in 1992. Several nations that were classified as developing at that time are now among the world's largest emitters in absolute terms. If we are to have any realistic prospect of limiting warming to one and a half degrees, the ambition gap cannot be bridged by developed-country action alone. Speaker A says: That may well be so, and I am certainly not suggesting that emerging economies should be exempt from enhanced ambition. What I am suggesting, however, is that the mechanisms through which that ambition is operationalised must account for capacity differentials. Climate finance, technology transfer, and capacity-building support are not ancillary to the negotiation — they are preconditions for it. Without credible financial commitments from developed nations, it is unreasonable to expect developing countries to redirect resources from poverty alleviation and infrastructure development towards emissions reduction at the pace being demanded. Speaker B responds: I take that point entirely, and I would note that my delegation has proposed a substantially enhanced loss and damage facility, precisely to address the concern you raise. But I would also venture to suggest that framing this purely as a North-South transfer risks overlooking the significant co-benefits of green transition — industrial competitiveness, energy security, public health improvements — that accrue to all economies, regardless of development status. Speaker A says: Those co-benefits are not in dispute. What is in dispute is who bears the transition costs, and whether the international community has the political will to mobilise the requisite financing. I would propose that we task the technical working group with modelling several differentiated contribution pathways, so that our next session can proceed on the basis of concrete options rather than abstract principles.`,
    questions: [
      {
        id: 'c2-diplomacy-q1',
        type: 'inference',
        question: 'What does Speaker A imply about the relationship between climate finance and emissions targets?',
        options: [
          'That climate finance is irrelevant to the negotiations.',
          'That developing countries cannot reasonably be expected to meet ambitious targets without adequate financial and technological support from developed nations.',
          'That developing countries should fund their own transitions entirely.',
          'That financial commitments are less important than political declarations.'
        ],
        correctAnswer: 1,
        explanation: 'Speaker A says climate finance and technology transfer "are not ancillary to the negotiation — they are preconditions for it" and that without them, it is "unreasonable to expect developing countries to redirect resources" — clearly linking financial support to the feasibility of ambition.'
      },
      {
        id: 'c2-diplomacy-q2',
        type: 'implication',
        question: 'What does Speaker B imply by noting that some formerly "developing" nations are now major emitters?',
        options: [
          'That the 1992 classifications are no longer fully adequate for allocating responsibility.',
          'That all countries are equally developed.',
          'That emissions data is unreliable.',
          'That the Paris Agreement should be abandoned.'
        ],
        correctAnswer: 0,
        explanation: 'Speaker B points out that "several nations classified as developing at that time are now among the world\'s largest emitters," implying that the original categories have been overtaken by reality and need recalibration.'
      },
      {
        id: 'c2-diplomacy-q3',
        type: 'attitude',
        question: 'How would you characterise the diplomatic tone of the exchange?',
        options: [
          'Hostile and confrontational.',
          'Respectful and substantive, with carefully hedged disagreement.',
          'Casual and informal.',
          'One speaker dominates while the other is silent.'
        ],
        correctAnswer: 1,
        explanation: 'Both speakers use diplomatic language — "if I might," "I would respectfully submit," "I take that point entirely" — while clearly articulating different positions, demonstrating a formal, respectful negotiation style.'
      },
      {
        id: 'c2-diplomacy-q4',
        type: 'inference',
        question: 'Why does Speaker A propose tasking a technical working group?',
        options: [
          'To delay the negotiations indefinitely.',
          'To shift the discussion from abstract principles to concrete, modelled options that can inform practical decisions.',
          'Because they have run out of arguments.',
          'To avoid making any commitments.'
        ],
        correctAnswer: 1,
        explanation: 'Speaker A suggests modelling "differentiated contribution pathways" so that the next session "can proceed on the basis of concrete options rather than abstract principles," indicating a desire to move from theoretical debate to actionable proposals.'
      },
      {
        id: 'c2-diplomacy-q5',
        type: 'main_idea',
        question: 'What is the central tension in the negotiation?',
        options: [
          'Whether climate change is real.',
          'How to fairly distribute the costs and responsibilities of climate action between developed and developing nations.',
          'Whether the Paris Agreement should be scrapped.',
          'Which country has the best renewable energy technology.'
        ],
        correctAnswer: 1,
        explanation: 'The entire exchange revolves around "differentiated responsibilities" — who should bear what share of emissions reduction and transition costs, given historical responsibility, current capacity, and equity considerations.'
      }
    ],
    keyVocabulary: [
      { word: 'differentiated responsibilities', definition: 'The principle that countries should contribute to global goals according to their varying capacities and historical contributions to the problem.' },
      { word: 'cumulative emissions', definition: 'The total amount of greenhouse gases a country has emitted over its entire industrial history.' },
      { word: 'operationalised', definition: 'Put into practical effect; implemented through specific mechanisms and actions.' },
      { word: 'loss and damage facility', definition: 'A funding mechanism to help vulnerable countries cope with the impacts of climate change that go beyond what they can adapt to.' },
      { word: 'co-benefits', definition: 'Additional positive outcomes that arise alongside the primary objective of a policy or action.' }
    ]
  },

  // 36. C2 — Lecture: "Cultural Relativism and Universal Human Rights"
  {
    id: 'c2-anthropology',
    title: 'Cultural Relativism and Universal Human Rights',
    cefrLevel: 'C2',
    type: 'lecture',
    transcript: `What I would like to explore with you today is one of the most enduring and genuinely vexing debates in the social sciences and in international law: the tension between cultural relativism and the universality of human rights. Now, cultural relativism, as a methodological principle in anthropology, emerged in the early twentieth century — largely through the work of Franz Boas and his students — as a corrective to the ethnocentric evolutionism that had characterised much of nineteenth-century social thought. The core insight was both simple and revolutionary: that cultural practices and beliefs should be understood and evaluated within their own context, rather than being measured against the standards of Western civilisation, which had been uncritically assumed to represent the apex of human development. This principle has been enormously productive, and I want to be very clear that its contribution to dismantling racist and colonialist frameworks of understanding cannot be overstated. However — and this is where the intellectual terrain becomes treacherous — when cultural relativism is extended from a methodological principle to a normative one, when it is used not merely to understand cultural practices but to shield them from any form of external moral evaluation, it encounters a profound difficulty. If all moral judgements are culture-bound, and if no cross-cultural moral standard can be coherently articulated, then on what basis can we condemn practices that cause demonstrable suffering — female genital cutting, honour killings, the persecution of religious or sexual minorities? This is precisely the challenge that the Universal Declaration of Human Rights, adopted in 1948, was designed to address. The Declaration asserts that certain rights — to life, to liberty, to freedom from torture — are inherent to all human beings by virtue of their humanity, irrespective of cultural context. Critics from the relativist camp have argued, not without justification, that the Declaration reflects a particular — Western, liberal, individualist — conception of the person that is not universally shared. Collectivist societies, they contend, may prioritise communal harmony over individual autonomy, and imposing a rights framework premised on the latter onto the former constitutes a form of cultural imperialism. There is intellectual force in this critique, and it should not be dismissed cavalierly. Nevertheless, I would argue — and here I should acknowledge that I am stepping beyond the purely descriptive into the normative — that the practical consequences of thoroughgoing relativism are morally intolerable. A position that cannot distinguish between cultural practices that enrich human flourishing and those that inflict systematic harm upon vulnerable individuals has, I think, reached its limit. The task, then, is not to choose between universalism and relativism but to develop what the philosopher Seyla Benhabib has called "democratic iterations" — processes of cross-cultural dialogue through which universal principles are interpreted, contested, and reinterpreted in ways that respect both human dignity and cultural specificity.`,
    questions: [
      {
        id: 'c2-anthropology-q1',
        type: 'inference',
        question: 'What does the speaker imply about the limits of cultural relativism?',
        options: [
          'That it has no value whatsoever.',
          'That while it is essential as a methodological tool for understanding cultures, it becomes morally untenable when used to prevent any ethical evaluation of harmful practices.',
          'That it is the only valid approach to understanding culture.',
          'That it only applies to Western societies.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker praises relativism\'s "enormously productive" contributions to dismantling racist frameworks but argues that when extended to a normative principle, "the practical consequences of thoroughgoing relativism are morally intolerable," establishing a clear boundary between methodological and normative use.'
      },
      {
        id: 'c2-anthropology-q2',
        type: 'implication',
        question: 'What does the speaker mean by saying cultural relativism was "a corrective to ethnocentric evolutionism"?',
        options: [
          'That it replaced one form of bias with another.',
          'That it challenged the assumption that Western civilisation represented the highest stage of human development, against which all others should be measured.',
          'That it was a minor academic adjustment.',
          'That evolutionism and relativism are identical.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker explains that relativism emerged to counter the view that Western standards "had been uncritically assumed to represent the apex of human development," meaning it corrected the bias of judging all cultures by Western norms.'
      },
      {
        id: 'c2-anthropology-q3',
        type: 'attitude',
        question: 'How does the speaker view the relativist critique of the Universal Declaration?',
        options: [
          'As completely without merit.',
          'As having intellectual force that deserves serious engagement, even though the speaker ultimately disagrees with its conclusions.',
          'As the definitive argument against human rights.',
          'As irrelevant to modern debate.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker says "there is intellectual force in this critique" and "it should not be dismissed cavalierly," demonstrating genuine respect for the argument even while proceeding to disagree with its normative implications.'
      },
      {
        id: 'c2-anthropology-q4',
        type: 'inference',
        question: 'What solution does the speaker propose to the universalism-relativism tension?',
        options: [
          'Choosing universalism and rejecting relativism entirely.',
          'Choosing relativism and rejecting universalism entirely.',
          'Developing processes of cross-cultural dialogue that allow universal principles to be reinterpreted in culturally specific ways.',
          'Ignoring the tension and hoping it resolves itself.'
        ],
        correctAnswer: 2,
        explanation: 'The speaker advocates for Benhabib\'s "democratic iterations" — "processes of cross-cultural dialogue through which universal principles are interpreted, contested, and reinterpreted in ways that respect both human dignity and cultural specificity," proposing a synthesis rather than a binary choice.'
      },
      {
        id: 'c2-anthropology-q5',
        type: 'attitude',
        question: 'How transparent is the speaker about their own normative position?',
        options: [
          'They hide their views completely.',
          'They are remarkably transparent, explicitly acknowledging when they move from description to normative argument.',
          'They present their opinions as objective facts.',
          'They refuse to take any position.'
        ],
        correctAnswer: 1,
        explanation: 'The speaker says "I should acknowledge that I am stepping beyond the purely descriptive into the normative," demonstrating unusual transparency about the shift from scholarly analysis to personal moral conviction.'
      }
    ],
    keyVocabulary: [
      { word: 'cultural relativism', definition: 'The principle that beliefs and practices should be understood and evaluated within their own cultural context rather than by external standards.' },
      { word: 'ethnocentric evolutionism', definition: 'The discredited view that cultures develop along a single path from "primitive" to "civilised," with Western society at the pinnacle.' },
      { word: 'normative', definition: 'Relating to or prescribing standards, values, or rules about what ought to be, as opposed to what is.' },
      { word: 'democratic iterations', definition: 'Seyla Benhabib\'s concept of ongoing cross-cultural dialogues through which universal norms are reinterpreted and legitimised in diverse contexts.' },
      { word: 'cultural imperialism', definition: 'The imposition of one culture\'s values, practices, or systems upon another, often through economic or political power.' },
      { word: 'cavalierly', definition: 'In a dismissive, offhand manner; without proper consideration or respect.' }
    ]
  }
]
