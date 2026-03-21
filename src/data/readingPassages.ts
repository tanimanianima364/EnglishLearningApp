export interface ReadingQuestion {
  id: string
  type: 'multiple_choice' | 'true_false'
  question: string
  options: string[]
  correctAnswer: number
}

export interface ReadingPassage {
  id: string
  title: string
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
  topic: string
  text: string
  wordDefinitions: Record<string, string>
  questions: ReadingQuestion[]
}

export const readingPassages: ReadingPassage[] = [
  // ─── A1 Passages (50-80 words) ────────────────────────────────────────────

  {
    id: 'a1-self-introduction',
    title: 'About Me',
    cefrLevel: 'A1',
    topic: 'Daily Life',
    text: 'My name is Yuki. I am twenty years old. I live in Tokyo with my family. I have one brother and one sister. My brother is older than me. I am a university student. I study English every day because I want to speak with people from other countries. I like reading books and listening to music. My favorite color is blue.',
    wordDefinitions: {
      'university': 'a place where people study after high school',
      'student': 'a person who is learning at a school or university',
      'study': 'to spend time learning about a subject',
      'favorite': 'the one you like the most',
      'countries': 'areas of land with their own governments, like Japan or France',
      'older': 'having lived for more years'
    },
    questions: [
      {
        id: 'a1-si-q1',
        type: 'multiple_choice',
        question: 'Where does Yuki live?',
        options: ['Osaka', 'Tokyo', 'Kyoto', 'London'],
        correctAnswer: 1
      },
      {
        id: 'a1-si-q2',
        type: 'multiple_choice',
        question: 'Why does Yuki study English?',
        options: [
          'Because her teacher says so',
          'Because she wants to travel',
          'Because she wants to speak with people from other countries',
          'Because she likes tests'
        ],
        correctAnswer: 2
      },
      {
        id: 'a1-si-q3',
        type: 'true_false',
        question: 'Yuki has two brothers.',
        options: ['True', 'False'],
        correctAnswer: 1
      }
    ]
  },

  {
    id: 'a1-daily-routine',
    title: 'My Day',
    cefrLevel: 'A1',
    topic: 'Daily Life',
    text: 'I wake up at seven o\'clock every morning. First, I brush my teeth and wash my face. Then I eat breakfast. I usually eat toast and drink orange juice. I go to school by bus. School starts at nine o\'clock. After school, I do my homework. In the evening, I watch TV with my family. I go to bed at ten o\'clock.',
    wordDefinitions: {
      'wake up': 'to stop sleeping and open your eyes',
      'brush': 'to clean something using a brush',
      'usually': 'most of the time; what you do almost every day',
      'toast': 'bread that has been heated until it is brown',
      'homework': 'schoolwork that you do at home',
      'evening': 'the part of the day between afternoon and night'
    },
    questions: [
      {
        id: 'a1-dr-q1',
        type: 'multiple_choice',
        question: 'What time does the person wake up?',
        options: ['Six o\'clock', 'Seven o\'clock', 'Eight o\'clock', 'Nine o\'clock'],
        correctAnswer: 1
      },
      {
        id: 'a1-dr-q2',
        type: 'multiple_choice',
        question: 'How does the person go to school?',
        options: ['By train', 'By car', 'By bus', 'On foot'],
        correctAnswer: 2
      },
      {
        id: 'a1-dr-q3',
        type: 'multiple_choice',
        question: 'What does the person do in the evening?',
        options: [
          'Reads books',
          'Plays games',
          'Watches TV with family',
          'Goes shopping'
        ],
        correctAnswer: 2
      }
    ]
  },

  {
    id: 'a1-my-house',
    title: 'My House',
    cefrLevel: 'A1',
    topic: 'Daily Life',
    text: 'I live in a small house near the park. My house has four rooms. There is a kitchen, a living room, and two bedrooms. The kitchen is my favorite room because I like cooking. There is a big window in the living room. I can see trees and flowers from the window. We have a small garden with beautiful roses.',
    wordDefinitions: {
      'kitchen': 'the room where you cook food',
      'living room': 'a room in a house for sitting and relaxing',
      'bedrooms': 'rooms where you sleep',
      'window': 'an opening in the wall with glass that lets light in',
      'garden': 'an area of land near a house where flowers and plants grow',
      'beautiful': 'very nice to look at; pretty'
    },
    questions: [
      {
        id: 'a1-mh-q1',
        type: 'multiple_choice',
        question: 'How many rooms does the house have?',
        options: ['Two', 'Three', 'Four', 'Five'],
        correctAnswer: 2
      },
      {
        id: 'a1-mh-q2',
        type: 'multiple_choice',
        question: 'Why is the kitchen the person\'s favorite room?',
        options: [
          'Because it is big',
          'Because they like cooking',
          'Because it has a window',
          'Because it is new'
        ],
        correctAnswer: 1
      },
      {
        id: 'a1-mh-q3',
        type: 'true_false',
        question: 'The house is near a school.',
        options: ['True', 'False'],
        correctAnswer: 1
      }
    ]
  },

  // ─── A2 Passages (80-120 words) ───────────────────────────────────────────

  {
    id: 'a2-weekend-plans',
    title: 'Weekend Plans',
    cefrLevel: 'A2',
    topic: 'Daily Life',
    text: 'This weekend, I am going to visit my grandparents in the countryside. They live on a small farm about two hours from the city. My grandmother always cooks delicious meals for us. She makes the best apple pie I have ever tasted. My grandfather likes to show me his vegetable garden. He grows tomatoes, carrots, and potatoes. On Saturday afternoon, we will probably go for a walk near the river. If the weather is nice, we might have a picnic. I always feel relaxed when I visit them.',
    wordDefinitions: {
      'countryside': 'land outside cities and towns, with farms and nature',
      'delicious': 'tasting very good',
      'probably': 'something that is likely to happen',
      'weather': 'the temperature and conditions outside (rain, sun, wind)',
      'picnic': 'a meal eaten outside, often in a park or field',
      'relaxed': 'feeling calm and not worried',
      'vegetable': 'a plant grown for food, such as tomatoes or carrots'
    },
    questions: [
      {
        id: 'a2-wp-q1',
        type: 'multiple_choice',
        question: 'Where do the grandparents live?',
        options: [
          'In the city center',
          'Near the beach',
          'In the countryside on a farm',
          'In another country'
        ],
        correctAnswer: 2
      },
      {
        id: 'a2-wp-q2',
        type: 'multiple_choice',
        question: 'What does the grandmother do well?',
        options: [
          'She paints pictures',
          'She cooks delicious meals',
          'She plays the piano',
          'She grows flowers'
        ],
        correctAnswer: 1
      },
      {
        id: 'a2-wp-q3',
        type: 'multiple_choice',
        question: 'What might they do on Saturday?',
        options: [
          'Go swimming',
          'Visit a museum',
          'Have a picnic near the river',
          'Watch a movie'
        ],
        correctAnswer: 2
      },
      {
        id: 'a2-wp-q4',
        type: 'true_false',
        question: 'The grandfather grows flowers in his garden.',
        options: ['True', 'False'],
        correctAnswer: 1
      }
    ]
  },

  {
    id: 'a2-trip-to-store',
    title: 'A Trip to the Store',
    cefrLevel: 'A2',
    topic: 'Daily Life',
    text: 'Yesterday, I went to the supermarket to buy groceries. I needed milk, eggs, bread, and some fruit. When I arrived, the store was very crowded because it was Saturday. I found everything on my list except strawberries. They were sold out. A shop assistant told me that fresh strawberries would arrive on Monday. I decided to buy blueberries instead. At the checkout, I realized I had forgotten my shopping bag, so I had to buy a paper bag. The total cost was fifteen dollars.',
    wordDefinitions: {
      'groceries': 'food and household items you buy at a store',
      'crowded': 'full of many people',
      'sold out': 'all items have been bought; none are left',
      'assistant': 'a person whose job is to help others',
      'checkout': 'the place in a store where you pay for items',
      'realized': 'suddenly understood or noticed something',
      'instead': 'in place of something else'
    },
    questions: [
      {
        id: 'a2-ts-q1',
        type: 'multiple_choice',
        question: 'Why was the store crowded?',
        options: [
          'Because there was a sale',
          'Because it was Saturday',
          'Because it was a holiday',
          'Because a new store opened'
        ],
        correctAnswer: 1
      },
      {
        id: 'a2-ts-q2',
        type: 'multiple_choice',
        question: 'What could the person NOT find?',
        options: ['Milk', 'Eggs', 'Strawberries', 'Bread'],
        correctAnswer: 2
      },
      {
        id: 'a2-ts-q3',
        type: 'multiple_choice',
        question: 'What did the person buy instead of strawberries?',
        options: ['Apples', 'Oranges', 'Blueberries', 'Bananas'],
        correctAnswer: 2
      },
      {
        id: 'a2-ts-q4',
        type: 'multiple_choice',
        question: 'Why did the person buy a paper bag?',
        options: [
          'The paper bag was free',
          'They forgot their shopping bag',
          'They had too many items',
          'The store only had paper bags'
        ],
        correctAnswer: 1
      }
    ]
  },

  {
    id: 'a2-favorite-food',
    title: 'My Favorite Food',
    cefrLevel: 'A2',
    topic: 'Culture',
    text: 'My favorite food is sushi. I first tried sushi when I was eight years old. My parents took me to a small Japanese restaurant near our house. At first, I was nervous about eating raw fish, but my mother encouraged me to try it. The first piece I ate was salmon sushi, and I loved it immediately. Now I eat sushi at least once a week. I have also learned to make simple sushi rolls at home. My friends always enjoy them when they come to visit.',
    wordDefinitions: {
      'favorite': 'the one you like the most',
      'restaurant': 'a place where you pay to sit and eat meals',
      'nervous': 'feeling worried or slightly afraid about something',
      'encouraged': 'gave someone confidence or support to do something',
      'raw': 'not cooked',
      'immediately': 'right now; without waiting',
      'simple': 'easy; not difficult or complicated'
    },
    questions: [
      {
        id: 'a2-ff-q1',
        type: 'multiple_choice',
        question: 'How old was the person when they first tried sushi?',
        options: ['Six', 'Seven', 'Eight', 'Nine'],
        correctAnswer: 2
      },
      {
        id: 'a2-ff-q2',
        type: 'multiple_choice',
        question: 'Why was the person nervous at first?',
        options: [
          'The restaurant was too expensive',
          'They did not like fish',
          'They were worried about eating raw fish',
          'The restaurant was very crowded'
        ],
        correctAnswer: 2
      },
      {
        id: 'a2-ff-q3',
        type: 'multiple_choice',
        question: 'What can you infer about the person now?',
        options: [
          'They do not eat sushi anymore',
          'They have become good at making sushi at home',
          'They only eat sushi at restaurants',
          'They prefer cooked fish'
        ],
        correctAnswer: 1
      }
    ]
  },

  // ─── B1 Passages (150-250 words) ──────────────────────────────────────────

  {
    id: 'b1-technology-education',
    title: 'Technology in Education',
    cefrLevel: 'B1',
    topic: 'Science',
    text: 'Over the past decade, technology has transformed the way students learn. Many schools now provide tablets or laptops to their students instead of traditional textbooks. This shift has brought both advantages and challenges.\n\nOne major benefit is accessibility. Students can access thousands of educational resources online, including videos, interactive exercises, and digital libraries. This is especially helpful for students in rural areas who may not have access to large physical libraries. Additionally, technology allows teachers to track student progress more efficiently and personalize lessons to meet individual needs.\n\nHowever, there are also concerns. Some researchers argue that too much screen time can affect concentration and reduce the ability to think deeply. There is also the issue of the digital divide \u2014 not all families can afford internet access or devices at home, which creates inequality among students.\n\nDespite these challenges, most educators agree that technology, when used thoughtfully, can enhance the learning experience. The key is finding the right balance between digital tools and traditional teaching methods. Schools that successfully combine both approaches tend to produce students who are better prepared for the modern world.',
    wordDefinitions: {
      'transformed': 'changed completely in form or character',
      'accessibility': 'the quality of being easy to reach, use, or obtain',
      'interactive': 'allowing two-way communication or responses between user and system',
      'efficiently': 'in a way that achieves maximum results with minimum effort',
      'concentration': 'the ability to focus your attention on one thing',
      'inequality': 'a situation where things are not equal or fair',
      'enhance': 'to improve or make something better',
      'approaches': 'ways of dealing with a situation or problem'
    },
    questions: [
      {
        id: 'b1-te-q1',
        type: 'multiple_choice',
        question: 'What is the main idea of this passage?',
        options: [
          'Technology should replace all teachers',
          'Technology in education has both benefits and challenges',
          'Students should not use computers at school',
          'Traditional textbooks are better than tablets'
        ],
        correctAnswer: 1
      },
      {
        id: 'b1-te-q2',
        type: 'multiple_choice',
        question: 'What does "digital divide" refer to in the passage?',
        options: [
          'A type of computer program',
          'A method of teaching online',
          'The gap between those who have technology access and those who do not',
          'A new kind of textbook'
        ],
        correctAnswer: 2
      },
      {
        id: 'b1-te-q3',
        type: 'multiple_choice',
        question: 'According to the passage, what is the key to using technology in education?',
        options: [
          'Giving every student a laptop',
          'Removing all textbooks from schools',
          'Finding the right balance between digital tools and traditional methods',
          'Limiting internet access for students'
        ],
        correctAnswer: 2
      },
      {
        id: 'b1-te-q4',
        type: 'multiple_choice',
        question: 'Who benefits especially from online educational resources?',
        options: [
          'Teachers in large cities',
          'Students in rural areas',
          'University professors',
          'Parents who work from home'
        ],
        correctAnswer: 1
      }
    ]
  },

  {
    id: 'b1-climate-change',
    title: 'Understanding Climate Change',
    cefrLevel: 'B1',
    topic: 'Science',
    text: 'Climate change is one of the most important issues facing our planet today. The Earth\'s average temperature has been rising gradually over the past century, mainly due to human activities such as burning fossil fuels and cutting down forests.\n\nWhen we burn coal, oil, or gas for energy, we release carbon dioxide and other greenhouse gases into the atmosphere. These gases trap heat from the sun, causing the planet to warm up. This process is known as the greenhouse effect. While a natural greenhouse effect is necessary to keep Earth warm enough to support life, the additional gases produced by humans are making it too strong.\n\nThe consequences of climate change are already visible. Sea levels are rising, glaciers are melting, and extreme weather events such as hurricanes and droughts are becoming more frequent. Many animal species are also struggling to adapt to these rapid changes.\n\nGovernments and organizations around the world are working to address this problem. Some solutions include switching to renewable energy sources like solar and wind power, planting more trees, and reducing waste. Individuals can also help by using public transportation, saving energy at home, and supporting environmentally friendly companies.',
    wordDefinitions: {
      'gradually': 'slowly and steadily, over a period of time',
      'fossil fuels': 'natural fuels like coal, oil, and gas formed from ancient plants and animals',
      'atmosphere': 'the layer of gases surrounding the Earth',
      'greenhouse effect': 'the trapping of heat in the atmosphere by certain gases',
      'consequences': 'the results or effects of an action or situation',
      'glaciers': 'large masses of ice that move slowly over land',
      'renewable': 'able to be used again without running out, like solar or wind energy',
      'adapt': 'to change in order to deal with a new situation'
    },
    questions: [
      {
        id: 'b1-cc-q1',
        type: 'multiple_choice',
        question: 'What is the main cause of climate change mentioned in the passage?',
        options: [
          'Natural changes in the sun',
          'Human activities like burning fossil fuels',
          'Volcanic eruptions',
          'Changes in ocean currents'
        ],
        correctAnswer: 1
      },
      {
        id: 'b1-cc-q2',
        type: 'multiple_choice',
        question: 'What does the word "consequences" most likely mean in this passage?',
        options: [
          'Reasons',
          'Results or effects',
          'Plans',
          'Solutions'
        ],
        correctAnswer: 1
      },
      {
        id: 'b1-cc-q3',
        type: 'true_false',
        question: 'The natural greenhouse effect is harmful to life on Earth.',
        options: ['True', 'False'],
        correctAnswer: 1
      },
      {
        id: 'b1-cc-q4',
        type: 'multiple_choice',
        question: 'Which is NOT mentioned as a solution to climate change?',
        options: [
          'Using solar and wind power',
          'Planting more trees',
          'Building more highways',
          'Reducing waste'
        ],
        correctAnswer: 2
      }
    ]
  },

  {
    id: 'b1-cultural-festivals',
    title: 'Cultural Festivals Around the World',
    cefrLevel: 'B1',
    topic: 'Culture',
    text: 'Every culture has its own special festivals and celebrations that bring people together. These events are important because they help preserve traditions and give people a sense of belonging.\n\nIn Japan, one of the most popular festivals is Obon, a Buddhist event held in August. During Obon, people honor the spirits of their ancestors by visiting graves, lighting lanterns, and performing traditional dances called Bon Odori. Many Japanese people return to their hometowns during this period to be with their families.\n\nIn Brazil, Carnival is a massive celebration that takes place before the Christian season of Lent. It is famous for its colorful parades, samba dancing, and elaborate costumes. Millions of people from all over the world travel to Rio de Janeiro to experience this spectacular event.\n\nMeanwhile, in India, Diwali is celebrated as the festival of lights. People decorate their homes with oil lamps and candles, exchange gifts, and enjoy fireworks. The festival represents the victory of light over darkness and good over evil.\n\nThese festivals, though different in their origins and customs, all share a common purpose: they celebrate community, tradition, and the joy of being together.',
    wordDefinitions: {
      'preserve': 'to keep something in its original state; to protect from change',
      'ancestors': 'family members who lived a long time ago',
      'lanterns': 'lights enclosed in a case, often made of paper or glass',
      'elaborate': 'detailed and carefully designed; complex',
      'spectacular': 'very impressive and exciting to look at',
      'represents': 'stands for; is a symbol of',
      'origins': 'the beginning or source of something',
      'customs': 'traditional ways of behaving in a particular society'
    },
    questions: [
      {
        id: 'b1-cf-q1',
        type: 'multiple_choice',
        question: 'What is the main purpose of cultural festivals according to the passage?',
        options: [
          'To attract tourists',
          'To celebrate community and tradition',
          'To make money',
          'To compete with other countries'
        ],
        correctAnswer: 1
      },
      {
        id: 'b1-cf-q2',
        type: 'multiple_choice',
        question: 'What do people do during Obon in Japan?',
        options: [
          'Watch parades with samba dancing',
          'Decorate their homes with oil lamps',
          'Honor the spirits of their ancestors',
          'Exchange gifts and enjoy fireworks'
        ],
        correctAnswer: 2
      },
      {
        id: 'b1-cf-q3',
        type: 'multiple_choice',
        question: 'What does Diwali represent?',
        options: [
          'The start of a new year',
          'The victory of light over darkness',
          'The end of winter',
          'The beginning of harvest season'
        ],
        correctAnswer: 1
      },
      {
        id: 'b1-cf-q4',
        type: 'multiple_choice',
        question: 'What can you infer about Carnival in Brazil?',
        options: [
          'It is a quiet, family-only event',
          'It happens during the summer',
          'It is an internationally famous event that draws visitors worldwide',
          'It is only celebrated in Rio de Janeiro'
        ],
        correctAnswer: 2
      }
    ]
  },

  // ─── B2 Passages (250-400 words) ──────────────────────────────────────────

  {
    id: 'b2-social-media',
    title: 'The Impact of Social Media on Society',
    cefrLevel: 'B2',
    topic: 'Science',
    text: 'Social media has become an integral part of modern life, with billions of people around the world using platforms like Instagram, X, and TikTok on a daily basis. While these tools have revolutionized the way we communicate and share information, their impact on society is a subject of ongoing debate.\n\nProponents of social media argue that it has democratized information sharing. Anyone with an internet connection can now publish their thoughts, share news, and connect with like-minded individuals across the globe. Social media has also played a crucial role in social movements, enabling activists to organize protests and raise awareness about important issues more effectively than ever before.\n\nOn the other hand, critics point to several negative consequences. Studies have shown a correlation between heavy social media use and increased rates of anxiety, depression, and loneliness, particularly among young people. The constant comparison with carefully curated online personas can lead to feelings of inadequacy and low self-esteem. Furthermore, the spread of misinformation has become a serious problem, as false stories can go viral within minutes.\n\nAnother significant concern is the impact on privacy. Social media companies collect vast amounts of personal data, which is used to target users with advertisements. Many users are unaware of how much information they are sharing or how it is being used.\n\nPerhaps the most nuanced perspective is that social media itself is neither good nor bad \u2014 it is a tool whose effects depend on how it is used. Experts recommend setting time limits, being critical of the content you consume, and maintaining real-world relationships alongside digital ones. As technology continues to evolve, developing healthy digital habits will become increasingly important for individuals and society as a whole.',
    wordDefinitions: {
      'integral': 'essential; necessary as a part of a whole',
      'revolutionized': 'completely changed the way something is done',
      'democratized': 'made something available to all people, not just a select few',
      'correlation': 'a connection or relationship between two things',
      'curated': 'carefully selected and organized',
      'inadequacy': 'the feeling of not being good enough',
      'misinformation': 'false or inaccurate information',
      'nuanced': 'characterized by subtle differences or distinctions'
    },
    questions: [
      {
        id: 'b2-sm-q1',
        type: 'multiple_choice',
        question: 'What is the author\'s overall position on social media?',
        options: [
          'Social media is entirely beneficial',
          'Social media is entirely harmful',
          'Social media is a tool whose effects depend on how it is used',
          'Social media should be banned'
        ],
        correctAnswer: 2
      },
      {
        id: 'b2-sm-q2',
        type: 'multiple_choice',
        question: 'According to the passage, how has social media helped social movements?',
        options: [
          'By providing financial support to activists',
          'By enabling activists to organize and raise awareness more effectively',
          'By replacing traditional media outlets',
          'By reducing government control'
        ],
        correctAnswer: 1
      },
      {
        id: 'b2-sm-q3',
        type: 'multiple_choice',
        question: 'What does the word "curated" mean in the context of this passage?',
        options: [
          'Randomly generated',
          'Carefully selected and organized',
          'Quickly uploaded',
          'Automatically created'
        ],
        correctAnswer: 1
      },
      {
        id: 'b2-sm-q4',
        type: 'multiple_choice',
        question: 'What privacy concern is raised in the passage?',
        options: [
          'Hackers stealing passwords',
          'Social media companies collecting personal data for targeted advertising',
          'Governments monitoring social media accounts',
          'Users sharing too many photos'
        ],
        correctAnswer: 1
      },
      {
        id: 'b2-sm-q5',
        type: 'multiple_choice',
        question: 'What can be inferred about the relationship between social media use and mental health?',
        options: [
          'Social media always causes depression',
          'There is no link between social media and mental health',
          'Excessive use may contribute to anxiety and depression, especially in young people',
          'Only adults are affected by social media'
        ],
        correctAnswer: 2
      }
    ]
  },

  {
    id: 'b2-remote-work',
    title: 'The Benefits and Challenges of Remote Work',
    cefrLevel: 'B2',
    topic: 'Daily Life',
    text: 'The global shift toward remote work, accelerated by the pandemic, has fundamentally changed how many people approach their professional lives. What was once considered a rare privilege has now become a standard option in numerous industries, prompting both employers and employees to reassess their expectations.\n\nOne of the most frequently cited advantages of remote work is flexibility. Employees can often set their own schedules, eliminate long commutes, and achieve a better work-life balance. For many, this has led to increased productivity and job satisfaction. Studies indicate that remote workers tend to work longer hours and report feeling more focused without the distractions of a traditional office environment.\n\nRemote work has also expanded opportunities for people who previously faced barriers to employment. Individuals with disabilities, caregivers, and those living in regions with limited job prospects can now access positions that were once geographically restricted. Companies, in turn, benefit from a larger and more diverse talent pool.\n\nHowever, the transition to remote work has not been without difficulties. Many employees report feelings of isolation and difficulty maintaining clear boundaries between work and personal time. The absence of face-to-face interaction can weaken team cohesion and make collaboration more challenging. Newer employees, in particular, may struggle to build professional relationships and learn organizational culture without an in-person environment.\n\nManagerial challenges also exist. Supervising remote teams requires different skills, and some organizations have struggled with trust issues, resorting to excessive monitoring software that can damage employee morale.\n\nAs the workplace continues to evolve, hybrid models that combine remote and in-office work are emerging as a popular compromise. These arrangements aim to preserve the benefits of flexibility while addressing the social and collaborative needs that physical workplaces fulfill.',
    wordDefinitions: {
      'accelerated': 'made to happen faster or sooner',
      'reassess': 'to think about something again in order to make a new judgment',
      'commutes': 'regular journeys between home and work',
      'productivity': 'the rate at which work is completed effectively',
      'cohesion': 'the state of working together as a united group',
      'isolation': 'the state of being alone or separated from others',
      'hybrid': 'combining two different elements; a mixture',
      'compromise': 'an agreement where each side gives up something'
    },
    questions: [
      {
        id: 'b2-rw-q1',
        type: 'multiple_choice',
        question: 'What is the main idea of this passage?',
        options: [
          'Remote work is always better than office work',
          'Remote work has clear benefits but also presents significant challenges',
          'Companies should stop remote work immediately',
          'The pandemic destroyed the traditional workplace'
        ],
        correctAnswer: 1
      },
      {
        id: 'b2-rw-q2',
        type: 'multiple_choice',
        question: 'How has remote work helped increase diversity in companies?',
        options: [
          'By requiring diversity training',
          'By allowing people in different locations and situations to access jobs',
          'By offering higher salaries to minorities',
          'By removing all job requirements'
        ],
        correctAnswer: 1
      },
      {
        id: 'b2-rw-q3',
        type: 'multiple_choice',
        question: 'What does the word "cohesion" mean in this passage?',
        options: [
          'Competition between team members',
          'The state of working together as a united group',
          'A type of management style',
          'The speed at which work is completed'
        ],
        correctAnswer: 1
      },
      {
        id: 'b2-rw-q4',
        type: 'multiple_choice',
        question: 'What problem do newer employees face in remote settings?',
        options: [
          'They earn lower salaries',
          'They cannot use technology effectively',
          'They struggle to build relationships and learn company culture',
          'They work too many hours'
        ],
        correctAnswer: 2
      },
      {
        id: 'b2-rw-q5',
        type: 'multiple_choice',
        question: 'What solution does the passage suggest for balancing remote work benefits and challenges?',
        options: [
          'Eliminating remote work entirely',
          'Hiring only experienced workers',
          'Using excessive monitoring software',
          'Adopting hybrid models combining remote and in-office work'
        ],
        correctAnswer: 3
      }
    ]
  },

  {
    id: 'b2-language-learning',
    title: 'Effective Methods for Language Learning',
    cefrLevel: 'B2',
    topic: 'Culture',
    text: 'Learning a new language is one of the most rewarding yet challenging endeavors a person can undertake. With countless methods and resources available, choosing the most effective approach can be overwhelming. Research in linguistics and cognitive science has provided valuable insights into what truly works.\n\nOne of the most well-supported approaches is immersion. When learners are surrounded by the target language in authentic contexts \u2014 whether through living abroad, consuming native media, or practicing with native speakers \u2014 they tend to acquire language skills more naturally and retain them longer. The brain processes language more effectively when it is encountered in meaningful situations rather than in isolated vocabulary lists.\n\nSpaced repetition is another highly effective technique. This method involves reviewing material at gradually increasing intervals, which has been shown to significantly improve long-term memory retention. Many popular language apps have incorporated this principle into their design.\n\nHowever, experts emphasize that no single method works for everyone. The best results often come from combining multiple approaches: structured grammar study for building a foundation, conversation practice for developing fluency, reading for expanding vocabulary, and listening for improving comprehension. Active production of the language \u2014 speaking and writing \u2014 is particularly important, as passive knowledge alone does not lead to proficiency.\n\nMotivation and consistency are perhaps the most critical factors of all. Research consistently shows that learners who practice regularly, even for short periods, make more progress than those who study intensively but irregularly. Setting clear goals, tracking progress, and connecting with a community of fellow learners can help maintain motivation over the long term.\n\nUltimately, the most effective language learning method is the one that the learner will actually use consistently.',
    wordDefinitions: {
      'endeavors': 'serious efforts or attempts to achieve something',
      'immersion': 'the experience of being completely surrounded by something',
      'authentic': 'real and genuine; not artificial',
      'retain': 'to keep or continue to have something, especially in memory',
      'intervals': 'periods of time between events',
      'proficiency': 'a high level of skill or ability',
      'consistency': 'the quality of always acting in the same way; regularity',
      'intensively': 'in a very concentrated or thorough way'
    },
    questions: [
      {
        id: 'b2-ll-q1',
        type: 'multiple_choice',
        question: 'According to the passage, what is the most effective single approach to language learning?',
        options: [
          'Memorizing vocabulary lists',
          'There is no single best method; combining approaches works best',
          'Only using language apps',
          'Taking grammar tests'
        ],
        correctAnswer: 1
      },
      {
        id: 'b2-ll-q2',
        type: 'multiple_choice',
        question: 'What does "spaced repetition" involve?',
        options: [
          'Studying the same material every day',
          'Reviewing material at gradually increasing time intervals',
          'Repeating sentences as fast as possible',
          'Reading the same book multiple times'
        ],
        correctAnswer: 1
      },
      {
        id: 'b2-ll-q3',
        type: 'multiple_choice',
        question: 'Why is immersion effective according to the passage?',
        options: [
          'It forces people to memorize grammar rules',
          'It is the cheapest method available',
          'The brain processes language better in meaningful, authentic contexts',
          'It replaces the need for any other study method'
        ],
        correctAnswer: 2
      },
      {
        id: 'b2-ll-q4',
        type: 'multiple_choice',
        question: 'What does the passage imply about passive knowledge of a language?',
        options: [
          'It is sufficient for communication',
          'It is more important than active production',
          'It alone does not lead to proficiency',
          'It is impossible to achieve'
        ],
        correctAnswer: 2
      },
      {
        id: 'b2-ll-q5',
        type: 'multiple_choice',
        question: 'What is the author\'s conclusion about the best language learning method?',
        options: [
          'Immersion is always the best',
          'Technology-based methods are superior',
          'The best method is the one a learner will use consistently',
          'Grammar study is the foundation of all learning'
        ],
        correctAnswer: 2
      }
    ]
  }
]
