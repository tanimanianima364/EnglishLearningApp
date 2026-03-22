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
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
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
  },

  // ─── C1 Passages (400-500 words) ──────────────────────────────────────────

  {
    id: 'c1-paradox-choice',
    title: 'The Paradox of Choice in Modern Society',
    cefrLevel: 'C1',
    topic: 'Culture',
    text: 'In an era defined by unprecedented abundance, one might assume that the proliferation of options available to consumers would invariably lead to greater satisfaction. Yet research in behavioral psychology suggests precisely the opposite: when faced with an overwhelming number of alternatives, individuals frequently experience what psychologist Barry Schwartz has termed "the paradox of choice."\n\nSchwartz\'s work, building on earlier studies by Sheena Iyengar and Mark Lepper, demonstrates that while a certain degree of choice is essential for autonomy and well-being, excessive choice can paradoxically undermine both. In their now-famous jam experiment, Iyengar and Lepper found that consumers presented with twenty-four varieties of jam were significantly less likely to make a purchase than those offered only six options. The abundance of alternatives, rather than empowering the consumer, induced a state of decision paralysis.\n\nThe psychological mechanisms underlying this phenomenon are multifaceted. First, an excess of options dramatically increases the cognitive burden of evaluation. When every alternative must be weighed against dozens of others, the mental effort required to make a decision becomes exhausting. Second, greater choice amplifies the potential for regret. Having selected one option from a vast array, individuals are more prone to ruminating about the paths not taken, wondering whether a different selection might have yielded superior results.\n\nFurthermore, Schwartz distinguishes between two decision-making archetypes: "maximizers," who obsessively seek the optimal choice, and "satisficers," who settle for an option that meets their minimum criteria. His research indicates that maximizers, despite frequently making objectively better decisions, report lower levels of happiness and higher rates of depression. The relentless pursuit of the best possible outcome, it seems, comes at a considerable psychological cost.\n\nThe implications extend well beyond consumer behavior. In the domains of career selection, romantic partnerships, and educational pathways, the expansion of available options has generated a pervasive anxiety about making the "wrong" choice. Young adults in particular report feeling overwhelmed by the sheer number of possibilities before them, leading to prolonged indecision and a persistent sense of dissatisfaction even after commitments have been made.\n\nSchwartz advocates for deliberate self-limitation as a countermeasure. By voluntarily constraining the number of options one considers, by establishing clear criteria in advance, and by cultivating gratitude for the choices already made, individuals can mitigate the negative effects of excessive choice. The key insight is counterintuitive yet compelling: in a world of limitless options, learning to embrace constraints may be the truest form of freedom.',
    wordDefinitions: {
      'proliferation': 'a rapid increase in the number or amount of something',
      'invariably': 'in every case or on every occasion; always',
      'autonomy': 'the right or condition of self-governance; independence',
      'paradoxically': 'in a way that seems contradictory but may nonetheless be true',
      'multifaceted': 'having many different aspects or elements',
      'ruminating': 'thinking deeply and repeatedly about something, often with worry',
      'pervasive': 'spreading widely throughout an area or group of people',
      'counterintuitive': 'contrary to what common sense would suggest'
    },
    questions: [
      {
        id: 'c1-pc-q1',
        type: 'multiple_choice',
        question: 'What is the central paradox described in the passage?',
        options: [
          'People want more choices but cannot afford them',
          'More options should increase satisfaction but often decrease it',
          'Consumers prefer expensive products over cheap ones',
          'People claim to want freedom but actually prefer rules'
        ],
        correctAnswer: 1
      },
      {
        id: 'c1-pc-q2',
        type: 'multiple_choice',
        question: 'Why do maximizers tend to report lower happiness despite making better decisions?',
        options: [
          'They spend more money on their purchases',
          'They are unaware of available alternatives',
          'The relentless pursuit of the optimal choice creates psychological strain and regret',
          'They make decisions too quickly without proper evaluation'
        ],
        correctAnswer: 2
      },
      {
        id: 'c1-pc-q3',
        type: 'multiple_choice',
        question: 'What can be inferred about the jam experiment\'s significance?',
        options: [
          'It proved that consumers always prefer fewer products',
          'It demonstrated that too many options can inhibit action rather than facilitate it',
          'It showed that jam is a poor product category for research',
          'It confirmed that marketing strategies are ineffective'
        ],
        correctAnswer: 1
      },
      {
        id: 'c1-pc-q4',
        type: 'multiple_choice',
        question: 'What does the author suggest is the relationship between constraints and freedom?',
        options: [
          'Constraints always reduce freedom and should be avoided',
          'Freedom is only possible in the absence of any limitations',
          'Voluntarily embracing constraints can paradoxically enhance one\'s sense of freedom',
          'Constraints and freedom are entirely unrelated concepts'
        ],
        correctAnswer: 2
      },
      {
        id: 'c1-pc-q5',
        type: 'true_false',
        question: 'According to the passage, the negative effects of excessive choice are limited to consumer purchasing behavior.',
        options: ['True', 'False'],
        correctAnswer: 1
      }
    ]
  },

  {
    id: 'c1-neuroplasticity',
    title: 'Neuroplasticity and Language Learning',
    cefrLevel: 'C1',
    topic: 'Science',
    text: 'For much of the twentieth century, neuroscientists believed that the adult brain was essentially a fixed organ, its neural architecture established during childhood and largely immutable thereafter. This view has been comprehensively overturned by research into neuroplasticity — the brain\'s remarkable capacity to reorganize its structure and function in response to experience, learning, and environmental demands.\n\nNowhere is neuroplasticity more vividly demonstrated than in the acquisition of language. When an individual learns a new language, the brain undergoes measurable structural changes. Studies using magnetic resonance imaging have revealed that bilingual individuals exhibit increased grey matter density in regions associated with language processing, executive control, and memory. The left inferior parietal cortex, in particular, tends to be significantly larger in polyglots than in monolinguals, suggesting that sustained multilingual practice physically reshapes neural tissue.\n\nThe concept of a "critical period" for language acquisition has long dominated the field. Eric Lenneberg\'s influential hypothesis proposed that there exists a biologically determined window — roughly from birth to puberty — during which language acquisition occurs most naturally and effortlessly. Children exposed to multiple languages during this period typically achieve native-like proficiency with apparent ease, whereas adults often struggle with pronunciation and grammatical subtleties that young learners absorb intuitively.\n\nHowever, contemporary research has substantially nuanced this view. While it is true that certain aspects of language learning become more challenging with age, the adult brain compensates through different mechanisms. Adults bring sophisticated cognitive strategies, metalinguistic awareness, and the ability to draw analogies with previously learned languages — advantages that can, in some respects, accelerate the learning process. Furthermore, neuroimaging studies have shown that even elderly learners exhibit measurable neural adaptation when studying a new language, albeit in different brain regions than those activated in children.\n\nPerhaps most intriguingly, the cognitive benefits of language learning extend well beyond communication. Bilingualism has been associated with enhanced executive function, improved attentional control, and even a delayed onset of neurodegenerative conditions such as Alzheimer\'s disease. The mental exercise of constantly managing two or more linguistic systems appears to strengthen cognitive reserve, providing a buffer against age-related cognitive decline.\n\nThese findings carry profound implications for educational policy and lifelong learning. Rather than viewing language acquisition as a capacity that diminishes with age, educators and policymakers should recognize it as an endeavor that, while different in its neurological manifestation across the lifespan, remains both achievable and profoundly beneficial at any stage of life.',
    wordDefinitions: {
      'immutable': 'unchanging over time; unable to be changed',
      'comprehensively': 'in a way that includes or deals with all aspects; thoroughly',
      'polyglots': 'people who know and use several languages',
      'metalinguistic': 'relating to awareness and understanding of language as a system',
      'intuitively': 'in a way based on feelings or instinct rather than conscious reasoning',
      'neuroimaging': 'techniques for producing images of the brain\'s structure or activity',
      'neurodegenerative': 'relating to the progressive loss of structure or function of neurons',
      'manifestation': 'the way in which something is displayed or expressed'
    },
    questions: [
      {
        id: 'c1-np-q1',
        type: 'multiple_choice',
        question: 'How does the passage characterize the shift in understanding of the adult brain?',
        options: [
          'Scientists gradually refined a theory that was mostly correct',
          'A long-held belief about the brain\'s fixity has been fundamentally overturned',
          'The original view was only slightly modified by new evidence',
          'Neuroscientists abandoned brain research in favor of linguistic studies'
        ],
        correctAnswer: 1
      },
      {
        id: 'c1-np-q2',
        type: 'multiple_choice',
        question: 'What advantage do adult language learners have over children, according to the passage?',
        options: [
          'They have better pronunciation ability',
          'They possess cognitive strategies and metalinguistic awareness',
          'They can physically reshape neural tissue more easily',
          'They learn grammar rules intuitively'
        ],
        correctAnswer: 1
      },
      {
        id: 'c1-np-q3',
        type: 'multiple_choice',
        question: 'What does the passage imply about the critical period hypothesis?',
        options: [
          'It has been completely disproven and is no longer relevant',
          'It remains valid but is more nuanced than originally proposed',
          'It only applies to monolingual children',
          'It was never supported by scientific evidence'
        ],
        correctAnswer: 1
      },
      {
        id: 'c1-np-q4',
        type: 'multiple_choice',
        question: 'Why does the author mention Alzheimer\'s disease?',
        options: [
          'To warn that language learning can cause neurological problems',
          'To illustrate that bilingualism may offer protective cognitive benefits',
          'To argue that only elderly people should study languages',
          'To show that monolingual individuals are healthier'
        ],
        correctAnswer: 1
      },
      {
        id: 'c1-np-q5',
        type: 'multiple_choice',
        question: 'What policy implication does the author draw from the research?',
        options: [
          'Language education should be restricted to the critical period',
          'Schools should stop teaching foreign languages',
          'Language learning should be encouraged at all ages as it remains achievable and beneficial',
          'Only polyglots should receive advanced education'
        ],
        correctAnswer: 2
      }
    ]
  },

  {
    id: 'c1-ai-ethics',
    title: 'The Ethics of Artificial Intelligence',
    cefrLevel: 'C1',
    topic: 'Science',
    text: 'As artificial intelligence systems become increasingly sophisticated and ubiquitous, society is confronted with a constellation of ethical dilemmas that previous generations of technology never posed. From algorithmic bias to autonomous decision-making, the challenges raised by AI demand careful philosophical and practical consideration.\n\nOne of the most pressing concerns is the issue of bias embedded within AI systems. Machine learning algorithms are trained on datasets generated by human activity, and these datasets inevitably reflect existing societal prejudices. Studies have revealed, for instance, that facial recognition systems exhibit significantly higher error rates for individuals with darker skin tones, and that hiring algorithms can systematically disadvantage female applicants. The troubling implication is that AI does not merely replicate human biases — it can amplify and institutionalize them at an unprecedented scale.\n\nThe question of accountability presents another formidable challenge. When an autonomous vehicle causes a fatal accident, or when an AI-powered medical diagnostic tool provides an erroneous recommendation, determining responsibility becomes profoundly complex. Traditional legal frameworks, predicated on the assumption that decisions are made by identifiable human agents, are ill-equipped to address situations in which consequential judgments are delegated to opaque algorithmic systems. The "black box" nature of many deep learning models — wherein even their developers cannot fully explain how specific outputs are generated — compounds this difficulty.\n\nPrivacy represents yet another dimension of the ethical landscape. AI systems increasingly rely on vast quantities of personal data to function effectively. Surveillance technologies powered by AI can track individuals\' movements, predict their behavior, and infer intimate details about their lives. The tension between the utility of such systems — in public safety, healthcare, and urban planning — and the fundamental right to privacy remains unresolved.\n\nSome ethicists argue for a precautionary approach, advocating for strict regulatory frameworks that would slow AI deployment until adequate safeguards are established. Others contend that overly restrictive regulation could stifle innovation and deny society the considerable benefits that AI can deliver, from accelerating drug discovery to optimizing energy consumption.\n\nWhat is increasingly clear is that the development of AI cannot be left solely to technologists. Meaningful governance requires interdisciplinary collaboration among computer scientists, ethicists, legal scholars, policymakers, and the affected communities themselves. The decisions made in this domain will shape not only the trajectory of technology but the character of the societies that deploy it.',
    wordDefinitions: {
      'ubiquitous': 'present, appearing, or found everywhere',
      'constellation': 'a group or cluster of related things',
      'algorithmic': 'relating to a process or set of rules followed in calculations or problem-solving',
      'institutionalize': 'to establish something as a norm or standard practice within a system',
      'predicated': 'founded or based on a particular belief or assumption',
      'opaque': 'not transparent; difficult to understand or explain',
      'precautionary': 'taken as a measure of caution to prevent something undesirable',
      'interdisciplinary': 'involving or combining two or more academic fields or areas of expertise'
    },
    questions: [
      {
        id: 'c1-ae-q1',
        type: 'multiple_choice',
        question: 'Why does the passage suggest that AI bias is particularly dangerous?',
        options: [
          'Because AI systems are expensive to develop',
          'Because AI can amplify and institutionalize human biases at an unprecedented scale',
          'Because developers intentionally program discriminatory outcomes',
          'Because AI bias only affects a small number of people'
        ],
        correctAnswer: 1
      },
      {
        id: 'c1-ae-q2',
        type: 'multiple_choice',
        question: 'What does the "black box" problem refer to in the context of AI accountability?',
        options: [
          'The physical casing of AI hardware',
          'The inability to fully explain how deep learning models reach specific decisions',
          'The high cost of developing AI systems',
          'The secrecy of AI company business models'
        ],
        correctAnswer: 1
      },
      {
        id: 'c1-ae-q3',
        type: 'multiple_choice',
        question: 'What tension does the passage identify regarding AI and privacy?',
        options: [
          'The conflict between AI companies and government regulators',
          'The balance between the practical utility of AI surveillance and the fundamental right to privacy',
          'The disagreement among ethicists about whether privacy matters',
          'The tension between different AI technologies competing in the market'
        ],
        correctAnswer: 1
      },
      {
        id: 'c1-ae-q4',
        type: 'multiple_choice',
        question: 'What does the author conclude about who should govern AI development?',
        options: [
          'Only computer scientists are qualified to make these decisions',
          'Governments should ban AI development entirely',
          'Governance requires interdisciplinary collaboration across multiple fields and communities',
          'The market should determine how AI is regulated'
        ],
        correctAnswer: 2
      },
      {
        id: 'c1-ae-q5',
        type: 'true_false',
        question: 'The passage presents strict AI regulation and unrestricted innovation as the only two possible approaches.',
        options: ['True', 'False'],
        correctAnswer: 1
      }
    ]
  },

  // ─── C2 Passages (500-700 words) ──────────────────────────────────────────

  {
    id: 'c2-epistemology',
    title: 'The Epistemology of Scientific Revolutions',
    cefrLevel: 'C2',
    topic: 'Science',
    text: 'The question of how scientific knowledge advances — whether through gradual accumulation or through rupture and reconstitution — has occupied philosophers of science for the better part of a century and remains a matter of vigorous contestation. At the heart of this debate lie fundamentally divergent conceptions of what constitutes scientific rationality and how epistemic authority is established and overthrown.\n\nKarl Popper\'s falsificationism, articulated most fully in "The Logic of Scientific Discovery," offered what appeared to be an elegant demarcation criterion: genuine scientific theories, Popper argued, are distinguished from pseudoscientific ones by their susceptibility to empirical refutation. A theory that cannot, even in principle, be falsified by observable evidence does not qualify as scientific. On this account, scientific progress occurs through a process of conjecture and refutation — bold hypotheses are proposed and subsequently subjected to rigorous attempts at disproof. Those that survive repeated testing are provisionally retained, not because they are verified as true, but because they have not yet been shown to be false.\n\nThomas Kuhn\'s "The Structure of Scientific Revolutions" challenged this rationalist account at its foundations. Kuhn argued that scientific development does not proceed through the linear accumulation of knowledge but through a cyclical pattern of paradigm shifts. During periods of "normal science," researchers operate within a shared paradigm — a constellation of theories, methods, and assumptions that define both the problems worth investigating and the standards by which solutions are judged. Anomalies that resist explanation within the prevailing paradigm are initially ignored or accommodated through ad hoc modifications. Only when anomalies accumulate to the point of crisis does the scientific community become receptive to a fundamentally new paradigm, which reconfigures the entire conceptual landscape.\n\nCrucially, Kuhn maintained that successive paradigms are "incommensurable" — that is, they are not merely different theories about the same phenomena but fundamentally different ways of perceiving and categorizing the world. The transition from Newtonian mechanics to Einsteinian relativity, for instance, did not simply add new facts to an existing framework; it redefined the very concepts of space, time, and mass. This thesis carried a deeply unsettling implication: if paradigms are incommensurable, there can be no paradigm-neutral standpoint from which to adjudicate between them, and the choice between competing paradigms becomes, at least in part, a sociological rather than a purely rational affair.\n\nImre Lakatos sought to mediate between Popper and Kuhn by proposing the methodology of "scientific research programmes." On Lakatos\'s account, scientists do not abandon theories upon encountering a single falsifying instance, as Popper\'s strict falsificationism would demand. Instead, they work within research programmes composed of a "hard core" of central assumptions shielded by a "protective belt" of auxiliary hypotheses. A research programme is deemed progressive if its theoretical modifications lead to novel predictions that are subsequently corroborated, and degenerating if it merely accommodates anomalies retroactively without generating new empirical content.\n\nThe sociology of scientific knowledge, advanced by scholars such as David Bloor and Barry Barnes, pushed the analysis further still, arguing that scientific beliefs — including those accepted as established facts — are shaped by social interests, institutional structures, and cultural contexts. On this "strong programme," the same explanatory resources should be brought to bear on both true and false beliefs: the sociologist\'s task is not to explain why some scientists went wrong but to account symmetrically for how all scientific consensus is produced.\n\nThese competing frameworks illuminate a tension that lies at the very heart of the scientific enterprise: the aspiration toward objective, mind-independent knowledge exists in perpetual tension with the recognition that science is, inescapably, a human activity conducted by situated agents within historically contingent communities. Far from undermining the authority of science, however, this recognition invites a more sophisticated understanding of how reliable knowledge is produced — one that acknowledges both the remarkable epistemic achievements of the scientific method and the social conditions that make those achievements possible.',
    wordDefinitions: {
      'contestation': 'the action or process of disputing or arguing',
      'demarcation': 'the determination of boundaries or limits, especially between categories',
      'incommensurable': 'not able to be judged by the same standards; lacking a common basis for comparison',
      'adjudicate': 'to make a formal judgment or decision about a disputed matter',
      'corroborated': 'confirmed or supported with evidence or authority',
      'retroactively': 'applying to or affecting matters from the past, after the fact',
      'contingent': 'dependent on circumstances; not certain or fixed',
      'epistemic': 'relating to knowledge or the conditions for acquiring it'
    },
    questions: [
      {
        id: 'c2-ep-q1',
        type: 'multiple_choice',
        question: 'What is the most destabilizing implication of Kuhn\'s incommensurability thesis?',
        options: [
          'Scientific theories are always improving over time',
          'There exists no neutral vantage point from which to rationally choose between competing paradigms',
          'All scientists agree on the same fundamental assumptions',
          'Paradigm shifts happen too frequently to be meaningful'
        ],
        correctAnswer: 1
      },
      {
        id: 'c2-ep-q2',
        type: 'multiple_choice',
        question: 'How does Lakatos\'s position relate to those of Popper and Kuhn?',
        options: [
          'He rejects both entirely and proposes an unrelated theory',
          'He agrees with Kuhn that science is entirely sociological',
          'He attempts to reconcile Popperian rationalism with Kuhnian observations about scientific practice',
          'He argues that Popper\'s strict falsificationism is the only valid approach'
        ],
        correctAnswer: 2
      },
      {
        id: 'c2-ep-q3',
        type: 'multiple_choice',
        question: 'What does the "strong programme" in the sociology of scientific knowledge demand?',
        options: [
          'That scientists use stronger experimental methods',
          'That true and false beliefs be explained using the same types of social causes',
          'That sociologists replace scientists in determining truth',
          'That only verified scientific facts be taught in universities'
        ],
        correctAnswer: 1
      },
      {
        id: 'c2-ep-q4',
        type: 'multiple_choice',
        question: 'What is the fundamental tension the passage identifies within science?',
        options: [
          'The conflict between pure and applied science',
          'The disagreement between physicists and biologists',
          'The aspiration toward objective knowledge in tension with the recognition that science is a situated human activity',
          'The competition for funding between different research programmes'
        ],
        correctAnswer: 2
      },
      {
        id: 'c2-ep-q5',
        type: 'multiple_choice',
        question: 'Why does the author argue that recognizing the social dimensions of science does not undermine its authority?',
        options: [
          'Because social factors have no real influence on scientific outcomes',
          'Because it leads to a more sophisticated understanding of how reliable knowledge is produced',
          'Because scientists are immune to social pressures',
          'Because the author believes science should not claim authority'
        ],
        correctAnswer: 1
      }
    ]
  },

  {
    id: 'c2-language-policy',
    title: 'Postcolonial Perspectives on Language Policy',
    cefrLevel: 'C2',
    topic: 'Culture',
    text: 'The global dominance of English as the lingua franca of commerce, diplomacy, science, and higher education is frequently presented as a natural and benign consequence of globalization. Yet postcolonial scholars have subjected this narrative to sustained critique, arguing that the ascendancy of English is inextricable from histories of imperial conquest and that contemporary language policies perpetuate structures of inequality that operate along lines remarkably consonant with those of the colonial era.\n\nRobert Phillipson\'s concept of "linguistic imperialism" provides a foundational framework for this critique. Phillipson contends that the global spread of English has been actively promoted through institutional mechanisms — from the British Council to American cultural diplomacy — that systematically privilege English at the expense of indigenous and regional languages. The result is not merely the adoption of a convenient communication tool but a thoroughgoing epistemological restructuring: when English becomes the exclusive medium of instruction in universities, when academic publishing overwhelmingly favors English-language journals, and when international organizations conduct their proceedings in English, the knowledge systems, intellectual traditions, and cultural perspectives embedded in other languages are progressively marginalized.\n\nThis marginalization has tangible consequences for linguistic diversity. UNESCO estimates that approximately half of the world\'s roughly seven thousand languages are endangered, with one language disappearing approximately every two weeks. While language shift is driven by multiple factors — urbanization, economic migration, and intergenerational transmission failure among them — the hegemonic status of a small number of prestige languages, English foremost among them, exerts a gravitational force that accelerates the process. Each language that vanishes takes with it irreplaceable bodies of ecological knowledge, philosophical insight, and literary achievement accumulated over centuries.\n\nAdvocates of English as a global language respond that access to English provides marginalized communities with economic opportunities, social mobility, and participation in global discourse that would otherwise be foreclosed. Amartya Sen has argued that denying communities access to a dominant language can itself constitute a form of oppression, trapping them within local economies and power structures. On this view, the question is not whether to teach English but how to do so without displacing indigenous languages and the cultural identities they sustain.\n\nThe concept of "additive bilingualism" offers one promising approach. Rather than positioning English as a replacement for local languages — a "subtractive" model that has historically characterized colonial education — additive bilingualism seeks to develop proficiency in English alongside the maintenance and development of mother tongues. Successful implementations of this model, such as those in certain Scandinavian countries and parts of South Africa, demonstrate that multilingual education can be pedagogically effective and culturally sustaining simultaneously.\n\nNevertheless, implementing such policies requires confronting deeply entrenched power asymmetries. The prestige associated with English is not merely linguistic but economic and institutional; reversing the incentive structures that drive language shift demands sustained political commitment, adequate funding for minority-language education, and a fundamental revaluation of what constitutes legitimate knowledge. As Ngũgĩ wa Thiong\'o has eloquently argued, the decolonization of the mind cannot be achieved without the decolonization of language — for it is through language that we apprehend the world, and the language in which we think inevitably shapes the thoughts we are capable of thinking.',
    wordDefinitions: {
      'lingua franca': 'a language used as a common means of communication between speakers of different native languages',
      'inextricable': 'impossible to disentangle or separate from something else',
      'hegemonic': 'exercising dominant influence or authority over others',
      'epistemological': 'relating to the theory of knowledge, especially regarding its methods, validity, and scope',
      'marginalized': 'treated as insignificant or relegated to a position of lesser importance',
      'subtractive': 'involving the removal or loss of something, especially one language being replaced by another',
      'asymmetries': 'imbalances; lacks of equality or equivalence between parts',
      'apprehend': 'to understand or perceive; to grasp intellectually'
    },
    questions: [
      {
        id: 'c2-lp-q1',
        type: 'multiple_choice',
        question: 'What does the passage suggest about the "natural" spread of English?',
        options: [
          'It is a spontaneous result of English being inherently superior to other languages',
          'It is an organic process driven purely by market forces',
          'It has been actively promoted through institutional mechanisms tied to imperial histories',
          'It occurred independently of any political or economic factors'
        ],
        correctAnswer: 2
      },
      {
        id: 'c2-lp-q2',
        type: 'multiple_choice',
        question: 'How does the passage characterize the loss of indigenous languages?',
        options: [
          'As a minor inconvenience with no lasting consequences',
          'As an inevitable and ultimately positive aspect of modernization',
          'As the destruction of irreplaceable knowledge systems, philosophies, and literary traditions',
          'As a problem only affecting small, isolated communities'
        ],
        correctAnswer: 2
      },
      {
        id: 'c2-lp-q3',
        type: 'multiple_choice',
        question: 'Why does the passage include Amartya Sen\'s perspective?',
        options: [
          'To argue that English should replace all other languages',
          'To present the counterargument that denying access to English can also be oppressive',
          'To prove that linguistic imperialism does not exist',
          'To demonstrate that economics is more important than culture'
        ],
        correctAnswer: 1
      },
      {
        id: 'c2-lp-q4',
        type: 'multiple_choice',
        question: 'What distinguishes "additive bilingualism" from the colonial education model?',
        options: [
          'It teaches English more quickly and efficiently',
          'It focuses exclusively on indigenous languages',
          'It develops English proficiency while maintaining and supporting mother tongues',
          'It requires students to choose between English and their native language'
        ],
        correctAnswer: 2
      },
      {
        id: 'c2-lp-q5',
        type: 'multiple_choice',
        question: 'What does Ngũgĩ wa Thiong\'o\'s argument, as cited in the passage, imply about the relationship between language and thought?',
        options: [
          'Language is merely a tool that has no influence on cognition',
          'All languages produce identical patterns of thought',
          'The language in which we think fundamentally shapes and constrains our cognitive possibilities',
          'Decolonization is possible without addressing language at all'
        ],
        correctAnswer: 2
      }
    ]
  },

  {
    id: 'c2-consciousness',
    title: 'The Philosophy of Mind and Consciousness',
    cefrLevel: 'C2',
    topic: 'Science',
    text: 'Among the most intractable problems in philosophy — and, increasingly, in neuroscience — is the question of consciousness: how and why do subjective, qualitative experiences arise from the electrochemical activity of neural tissue? This question, which David Chalmers has famously designated "the hard problem of consciousness," resists the reductive strategies that have proven so extraordinarily productive in other domains of scientific inquiry.\n\nThe hard problem can be distinguished from what Chalmers terms the "easy problems" — those concerning the functional and computational mechanisms of cognition. Explaining how the brain discriminates stimuli, integrates information, controls behavior, and reports on internal states are formidable scientific challenges, yet they are "easy" in the sense that they require only the identification of neural mechanisms that perform specific functions. The hard problem, by contrast, asks why these processes are accompanied by subjective experience at all: why is there "something it is like" to see the color red, to taste chocolate, or to feel pain? The explanatory gap between objective neural processes and subjective phenomenal states — the gap between the "how" and the "why" — remains as wide and philosophically vexing as it was when Leibniz first posed his mill argument three centuries ago.\n\nThe philosophical landscape is populated by a range of competing positions. Substance dualism, most famously associated with Descartes, posits that mind and matter are ontologically distinct — that consciousness is a non-physical phenomenon that cannot be reduced to or explained by the properties of physical matter. While dualism accords with pre-theoretical intuitions about the apparent irreducibility of subjective experience, it faces the notoriously difficult interaction problem: if the mental and the physical are fundamentally different substances, how do they causally interact? How does a non-physical intention cause a physical arm to rise?\n\nPhysicalism, the dominant view in contemporary philosophy of mind, maintains that consciousness is ultimately a physical phenomenon — that mental states are identical with, constituted by, or supervene upon brain states. Reductive physicalists, such as the identity theorists of the mid-twentieth century, argued that types of mental states are identical with types of brain states: pain, for instance, just is the firing of C-fibers. Yet this type-identity theory has been largely supplanted by functionalist accounts, which identify mental states not with specific physical substrates but with their functional roles — the causal relations they bear to sensory inputs, behavioral outputs, and other mental states. On the functionalist view, consciousness could in principle be realized in any system that instantiates the appropriate functional organization, whether biological or artificial.\n\nFunctionalism\'s agnosticism about physical substrates gives rise to its own difficulties, however. Frank Jackson\'s celebrated "knowledge argument" — the thought experiment of Mary, the color scientist who has spent her entire life in a black-and-white room — was designed to demonstrate that phenomenal knowledge cannot be exhaustively captured by functional or physical descriptions. When Mary finally sees the color red for the first time, Jackson argued, she learns something genuinely new: what it is like to experience red. If physicalism were complete, no new knowledge should be possible.\n\nMore recently, panpsychism and integrated information theory have emerged as heterodox alternatives. Panpsychism posits that consciousness, or proto-consciousness, is a fundamental feature of matter itself — that even elementary particles possess some rudimentary form of experience. While this view avoids the emergence problem that bedevils physicalist accounts (the question of how something as radically novel as consciousness could "emerge" from wholly non-conscious matter), it introduces its own formidable difficulties, chief among them the "combination problem": how do the micro-experiences of individual particles combine to form the unified conscious experience of a human mind?\n\nWhat these debates reveal is that consciousness remains a phenomenon that resists assimilation into any single explanatory framework. The hard problem persists not because of a lack of empirical data but because of a fundamental conceptual gap between the objective methods of science and the irreducibly subjective character of experience itself.',
    wordDefinitions: {
      'intractable': 'extremely difficult or impossible to solve or manage',
      'reductive': 'involving the analysis of complex phenomena by breaking them down into simpler, more fundamental components',
      'phenomenal': 'relating to subjective, conscious experience as perceived by the mind',
      'ontologically': 'in a way that relates to the nature of being and existence',
      'supervene': 'to occur as something additional or consequent upon a lower-level set of properties',
      'agnosticism': 'a position of uncertainty or non-commitment regarding a particular question',
      'heterodox': 'not conforming to accepted or orthodox standards or beliefs',
      'assimilation': 'the process of absorbing or integrating something into a larger whole'
    },
    questions: [
      {
        id: 'c2-co-q1',
        type: 'multiple_choice',
        question: 'Why does Chalmers label the functional problems of cognition "easy" despite their difficulty?',
        options: [
          'Because they have already been solved by neuroscience',
          'Because they require only identifying mechanisms that perform functions, not explaining subjective experience',
          'Because they are simple compared to problems in physics',
          'Because any undergraduate student can solve them'
        ],
        correctAnswer: 1
      },
      {
        id: 'c2-co-q2',
        type: 'multiple_choice',
        question: 'What is the significance of Jackson\'s Mary thought experiment?',
        options: [
          'It proves that color blindness is a neurological disorder',
          'It demonstrates that black-and-white environments are harmful to development',
          'It aims to show that phenomenal experience contains knowledge that physical descriptions cannot capture',
          'It confirms that functionalism is the correct theory of consciousness'
        ],
        correctAnswer: 2
      },
      {
        id: 'c2-co-q3',
        type: 'multiple_choice',
        question: 'What problem does dualism face that the passage identifies as particularly notorious?',
        options: [
          'The inability to explain how non-physical mind and physical matter causally interact',
          'The failure to account for unconscious mental processes',
          'The difficulty of measuring consciousness empirically',
          'The incompatibility with religious worldviews'
        ],
        correctAnswer: 0
      },
      {
        id: 'c2-co-q4',
        type: 'multiple_choice',
        question: 'Why might panpsychism be considered an advantage over standard physicalism?',
        options: [
          'It has been experimentally verified in laboratory conditions',
          'It avoids the problem of explaining how consciousness emerges from wholly non-conscious matter',
          'It is simpler and requires fewer assumptions',
          'It is endorsed by the majority of neuroscientists'
        ],
        correctAnswer: 1
      },
      {
        id: 'c2-co-q5',
        type: 'multiple_choice',
        question: 'What does the passage ultimately suggest about the hard problem of consciousness?',
        options: [
          'It will be solved within the next decade through neuroimaging advances',
          'It is a pseudo-problem that dissolves under careful logical analysis',
          'It persists due to a fundamental conceptual gap between objective scientific methods and subjective experience',
          'It has already been resolved by functionalist accounts'
        ],
        correctAnswer: 2
      }
    ]
  },

  {
    id: 'c2-judicial-review',
    title: 'Judicial Review and Constitutional Interpretation',
    cefrLevel: 'C2',
    topic: 'Culture',
    text: 'The practice of judicial review — the power of courts to invalidate legislative and executive acts that contravene constitutional provisions — occupies a peculiar and contested position within democratic theory. On the one hand, it is widely regarded as an indispensable safeguard against the tyranny of the majority, a mechanism through which fundamental rights are shielded from the vicissitudes of popular sentiment. On the other, it vests unelected judges with the authority to override the decisions of democratically elected legislatures, raising what Alexander Bickel famously termed "the counter-majoritarian difficulty." The tension between these perspectives has animated constitutional jurisprudence for over two centuries and shows no signs of resolution.\n\nThe origins of judicial review in the American legal tradition are conventionally traced to Chief Justice John Marshall\'s landmark opinion in Marbury v. Madison (1803), in which the Supreme Court asserted its authority to declare acts of Congress unconstitutional. Marshall\'s reasoning rested on the proposition that the Constitution is the supreme law of the land and that it falls to the judiciary, as the institution charged with interpreting the law, to determine when legislative enactments transgress constitutional boundaries. This argument, though now deeply embedded in American constitutional culture, was by no means self-evident at the time; the Constitution itself does not explicitly confer the power of judicial review upon the courts.\n\nThe philosophical divide between judicial activism and judicial restraint reflects fundamentally different conceptions of the judicial role. Advocates of judicial restraint, drawing on the work of scholars such as James Bradley Thayer and, more recently, John Hart Ely, argue that courts should defer to the political branches except in cases of clear constitutional violation. On this view, the legitimacy of judicial review depends on its exercise being confined to narrow, well-defined circumstances; an expansive judiciary that routinely substitutes its own policy preferences for those of the legislature undermines democratic self-governance. Ely\'s "representation-reinforcing" theory proposed that judicial review is most defensible when it corrects defects in the democratic process itself — protecting discrete and insular minorities, ensuring fair representation, and safeguarding the channels of political change.\n\nProponents of a more activist judicial philosophy contend that the Constitution embodies substantive moral commitments — to equality, dignity, liberty, and due process — that courts have both the authority and the obligation to enforce, even when doing so requires overriding majoritarian preferences. Ronald Dworkin\'s theory of "law as integrity" maintained that judges must interpret constitutional provisions in light of the moral principles that best justify and cohere with the legal system as a whole. On Dworkin\'s account, constitutional adjudication is not a mechanical exercise in textual exegesis but a constructive interpretive endeavor in which judges seek the interpretation that presents the law in its morally best light.\n\nThe debate is further complicated by the question of interpretive methodology. Originalists, such as Antonin Scalia and Robert Bork, maintain that constitutional provisions should be interpreted according to their original public meaning at the time of ratification. This approach, they argue, constrains judicial discretion and tethers constitutional law to democratically enacted text rather than to the evolving moral sensibilities of individual judges. Living constitutionalists, by contrast, argue that the Constitution must be interpreted as a dynamic document whose broad principles are applied to circumstances the framers could not have foreseen — that the meaning of "equal protection" or "cruel and unusual punishment" must evolve as society\'s understanding of these concepts matures.\n\nWhat these debates ultimately reveal is that judicial review cannot be understood in purely legal terms; it is inescapably a political institution embedded within a broader framework of democratic governance. The question is not whether judges exercise discretion — they manifestly do — but how that discretion should be structured, constrained, and legitimated. The enduring challenge for constitutional democracies is to design institutional arrangements that harness the protective potential of judicial review while mitigating the risks of judicial overreach — a challenge that each generation must negotiate anew in light of its own political circumstances and moral commitments.',
    wordDefinitions: {
      'contravene': 'to act in opposition to or violation of a law, rule, or principle',
      'vicissitudes': 'unpredictable changes or variations in circumstances or fortune',
      'jurisprudence': 'the theory and philosophy of law; the body of judicial decisions',
      'transgress': 'to go beyond the limits of what is morally, socially, or legally acceptable',
      'exegesis': 'critical explanation or interpretation of a text, especially a legal or religious one',
      'tethers': 'ties or connects firmly to a fixed point or principle',
      'legitimated': 'made legitimate or justified; given authority or acceptance',
      'adjudication': 'the formal process of making a legal judgment or decision'
    },
    questions: [
      {
        id: 'c2-jr-q1',
        type: 'multiple_choice',
        question: 'What is "the counter-majoritarian difficulty" that Bickel identified?',
        options: [
          'The problem of getting a majority of voters to agree on any single issue',
          'The tension between unelected judges overriding decisions of elected legislatures',
          'The difficulty of amending the Constitution through the legislative process',
          'The challenge of ensuring that minority parties win elections'
        ],
        correctAnswer: 1
      },
      {
        id: 'c2-jr-q2',
        type: 'multiple_choice',
        question: 'According to the passage, why was Marshall\'s assertion in Marbury v. Madison not "self-evident"?',
        options: [
          'Because the Constitution explicitly forbids judicial review',
          'Because Congress had already claimed the power for itself',
          'Because the Constitution does not explicitly grant courts the power of judicial review',
          'Because Marshall was not qualified to make legal rulings'
        ],
        correctAnswer: 2
      },
      {
        id: 'c2-jr-q3',
        type: 'multiple_choice',
        question: 'How does Ely\'s "representation-reinforcing" theory justify judicial review?',
        options: [
          'By arguing that judges should always defer to the legislature',
          'By claiming courts should impose their moral views on society',
          'By proposing that judicial review is most legitimate when it corrects failures in the democratic process itself',
          'By advocating for the abolition of constitutional limits on legislative power'
        ],
        correctAnswer: 2
      },
      {
        id: 'c2-jr-q4',
        type: 'multiple_choice',
        question: 'What fundamental difference does the passage identify between originalism and living constitutionalism?',
        options: [
          'Originalists favor judicial activism while living constitutionalists favor restraint',
          'Originalists interpret provisions by their original public meaning while living constitutionalists treat the Constitution as a dynamic document',
          'Originalists reject the Constitution while living constitutionalists embrace it',
          'There is no meaningful difference between the two approaches'
        ],
        correctAnswer: 1
      },
      {
        id: 'c2-jr-q5',
        type: 'multiple_choice',
        question: 'What does the passage ultimately conclude about judicial review?',
        options: [
          'It should be abolished as undemocratic',
          'It is a purely legal institution with no political dimensions',
          'It is an inescapably political institution whose discretion must be structured and legitimated within democratic governance',
          'It is perfect as currently practiced and requires no reform'
        ],
        correctAnswer: 2
      }
    ]
  },

  {
    id: 'c2-microbiome',
    title: 'The Microbiome-Gut-Brain Axis',
    cefrLevel: 'C2',
    topic: 'Science',
    text: 'Over the past two decades, a quiet revolution has been unfolding at the intersection of microbiology, gastroenterology, and neuroscience. The discovery that the trillions of microorganisms residing in the human gastrointestinal tract — collectively termed the gut microbiome — exert profound and far-reaching influence on brain function, cognition, and emotional regulation has fundamentally altered our understanding of the relationship between body and mind. The bidirectional communication network linking the gut and the brain, now commonly referred to as the microbiome-gut-brain axis, represents one of the most consequential frontiers in contemporary biomedical research.\n\nThe gut microbiome is a staggeringly complex ecosystem. The human intestine harbors approximately thirty-eight trillion bacterial cells — a figure that rivals the total number of human cells in the body — representing over a thousand distinct species. This microbial community is not a passive inhabitant but an active metabolic organ that synthesizes essential vitamins, ferments dietary fibers into short-chain fatty acids, modulates the immune system, and maintains the integrity of the intestinal epithelial barrier. Disruptions to this ecosystem, a condition termed dysbiosis, have been implicated in a widening array of pathologies, from inflammatory bowel disease and metabolic syndrome to conditions once considered exclusively neurological or psychiatric in origin.\n\nThe pathways through which gut microbes communicate with the brain are multiple and interconnected. The vagus nerve, the longest cranial nerve in the body, serves as a primary conduit, transmitting afferent signals from the enteric nervous system — the vast neural network embedded within the gastrointestinal wall, sometimes called the "second brain" — directly to the brainstem. Experimental studies in germ-free mice have demonstrated that animals raised without any gut bacteria exhibit pronounced alterations in stress reactivity, anxiety-related behavior, and social cognition, abnormalities that can be partially reversed through the introduction of specific bacterial strains during critical developmental windows.\n\nEqually remarkable is the capacity of gut microbes to influence neurotransmitter metabolism. Approximately ninety-five percent of the body\'s serotonin — the neurotransmitter most commonly associated with mood regulation — is produced not in the brain but in the enterochromaffin cells of the gut, and its synthesis is directly modulated by microbial metabolites. Certain species of Lactobacillus and Bifidobacterium produce gamma-aminobutyric acid, the brain\'s principal inhibitory neurotransmitter, while other microbial taxa generate precursors to dopamine and norepinephrine. The implications are profound: the chemical substrates of mood, motivation, and cognitive function are, to a degree previously unimagined, products of microbial metabolism.\n\nThe clinical ramifications of these discoveries are beginning to crystallize, though much remains speculative. Observational studies have documented altered microbiome compositions in patients with major depressive disorder, autism spectrum disorder, Parkinson\'s disease, and Alzheimer\'s disease, though whether these alterations are causally implicated or merely epiphenomenal remains a matter of active investigation. Interventional studies involving probiotics — sometimes termed "psychobiotics" when administered with the intention of conferring mental health benefits — have yielded preliminary but encouraging results. A randomized controlled trial conducted at University College Cork demonstrated that four weeks of supplementation with Bifidobacterium longum 1714 significantly attenuated cortisol responses to acute stress and improved subjective reports of daily stress in healthy volunteers.\n\nNevertheless, the field confronts formidable methodological challenges. The microbiome exhibits enormous inter-individual variability, shaped by genetics, diet, geography, medication use, and life history, making it exceedingly difficult to establish universal causal pathways. Animal models, while invaluable for mechanistic studies, cannot be straightforwardly extrapolated to human psychiatric conditions, which are themselves heterogeneous and multifactorial. Moreover, the reductionist impulse to identify single bacterial species as causative agents for complex neuropsychiatric disorders risks oversimplifying what is, in reality, an ecological phenomenon governed by community-level dynamics and emergent properties.\n\nWhat the microbiome-gut-brain axis ultimately compels us to reconsider is the very boundary between organism and environment, between self and non-self. The human body is not a sovereign entity but a superorganism — a composite of human and microbial genomes whose integrated functioning produces the phenomena we call health and disease, thought and emotion.',
    wordDefinitions: {
      'dysbiosis': 'an imbalance or disruption in the composition of the microbial community, particularly in the gut',
      'afferent': 'carrying signals toward a central organ or point, especially nerve impulses toward the brain',
      'enterochromaffin': 'relating to specialized cells in the gut lining that produce serotonin and other signaling molecules',
      'epiphenomenal': 'occurring as a secondary effect or byproduct rather than as a cause',
      'attenuated': 'reduced in force, effect, or intensity; weakened',
      'heterogeneous': 'diverse in character or content; composed of dissimilar elements',
      'reductionist': 'relating to the practice of analyzing complex phenomena by reducing them to simpler components',
      'superorganism': 'an organized community of organisms that functions as a unified whole'
    },
    questions: [
      {
        id: 'c2-mb-q1',
        type: 'multiple_choice',
        question: 'Why does the passage describe the gut microbiome as an "active metabolic organ"?',
        options: [
          'Because it is physically attached to other organs in the body',
          'Because it passively absorbs nutrients from food',
          'Because it performs essential biological functions such as vitamin synthesis, fiber fermentation, and immune modulation',
          'Because it was surgically implanted by doctors'
        ],
        correctAnswer: 2
      },
      {
        id: 'c2-mb-q2',
        type: 'multiple_choice',
        question: 'What is the significance of the finding that ninety-five percent of serotonin is produced in the gut?',
        options: [
          'It proves that the brain is unnecessary for emotional regulation',
          'It suggests that mood and cognitive function are partly products of microbial metabolism, challenging brain-centric models',
          'It means that gut bacteria are more intelligent than brain cells',
          'It has no relevance to neuroscience'
        ],
        correctAnswer: 1
      },
      {
        id: 'c2-mb-q3',
        type: 'multiple_choice',
        question: 'What does the passage identify as a key methodological challenge in microbiome research?',
        options: [
          'The inability to culture any gut bacteria in laboratory conditions',
          'The enormous inter-individual variability of the microbiome, making universal causal pathways difficult to establish',
          'The complete absence of animal models for studying gut-brain interactions',
          'The refusal of patients to participate in clinical trials'
        ],
        correctAnswer: 1
      },
      {
        id: 'c2-mb-q4',
        type: 'multiple_choice',
        question: 'Why does the author caution against a "reductionist impulse" in microbiome science?',
        options: [
          'Because reductionism has never been useful in any scientific field',
          'Because identifying single species as causes of complex disorders oversimplifies an ecological phenomenon governed by community dynamics',
          'Because the author opposes all forms of scientific analysis',
          'Because bacterial species cannot be studied individually'
        ],
        correctAnswer: 1
      },
      {
        id: 'c2-mb-q5',
        type: 'multiple_choice',
        question: 'What conceptual boundary does the passage argue the microbiome-gut-brain axis forces us to reconsider?',
        options: [
          'The boundary between physics and chemistry',
          'The boundary between Eastern and Western medicine',
          'The boundary between organism and environment, between self and non-self',
          'The boundary between professional and amateur scientists'
        ],
        correctAnswer: 2
      }
    ]
  },

  {
    id: 'c2-unreliable-narrator',
    title: 'Unreliable Narration in Postmodern Fiction',
    cefrLevel: 'C2',
    topic: 'Culture',
    text: 'The figure of the unreliable narrator has occupied literary criticism since Wayne C. Booth coined the term in his seminal 1961 work "The Rhetoric of Fiction," yet it is in postmodern literature that the device achieves its most radical and philosophically resonant elaboration. Where earlier deployments of narrative unreliability — the self-deceiving governess of Henry James\'s "The Turn of the Screw," the confessional dissembling of Dostoevsky\'s underground man — operated within a framework that presupposed a stable, recoverable truth from which the narrator\'s account deviated, postmodern fiction dissolves the very ground upon which such judgments of reliability depend. The result is a literature that interrogates not merely the trustworthiness of individual narrators but the epistemological foundations of narrative itself.\n\nBooth\'s original formulation distinguished between narrators whose values and perceptions align with those implied by the text as a whole — reliable narrators — and those whose accounts are undercut by textual signals indicating bias, ignorance, or deliberate deception. This taxonomy, while immensely productive, relies upon the concept of an "implied author" whose norms serve as a stable benchmark against which the narrator\'s deviations can be measured. Postmodern narratology, however, has subjected this concept to sustained interrogation. If the implied author is itself a textual construct, critics such as Ansgar Nunning have asked, what grounds the distinction between reliability and unreliability? The question is not merely theoretical; it strikes at the heart of how readers construct meaning from fictional texts.\n\nVladimir Nabokov\'s "Lolita" illustrates the mechanisms of unreliable narration with devastating precision. Humbert Humbert\'s ornate, erudite prose seduces the reader into a rhetorical complicity that mirrors the narrative\'s own predatory logic. His account is unreliable not primarily because he lies — though he does, selectively — but because his verbal virtuosity functions as a strategy of aesthetic displacement, transforming the sordid reality of child abuse into an ostensibly tragic love story. The reader\'s task is to resist the narrator\'s rhetorical enchantment and perceive the suffering that his elegant prose systematically occludes. What makes "Lolita" a watershed text is its demonstration that unreliability can operate not through manifest falsehood but through the strategic deployment of literary beauty itself.\n\nPostmodern fiction extends these techniques into territories where the distinction between truth and fabrication becomes ontologically unstable. Italo Calvino\'s "If on a winter\'s night a traveler" presents the reader with a series of interrupted narrative beginnings, each attributed to a different author and genre, foregrounding the act of reading itself as a constitutive rather than passive process. The novel\'s second-person address — "You are about to begin reading" — implicates the reader directly in the construction of narrative meaning, collapsing the distance between the text and its interpretation. Similarly, Paul Auster\'s "New York Trilogy" deploys detective fiction conventions only to systematically subvert them: the investigator discovers not a solution but the disintegration of his own identity, and the narrative trails off into ambiguity rather than resolution.\n\nThe metafictional strategies characteristic of postmodern unreliable narration — self-referentiality, embedded narratives, ontological boundary-crossing, and the foregrounding of textual artifice — serve a purpose that extends beyond mere formal experimentation. They enact, at the level of narrative structure, a philosophical skepticism about the capacity of language to represent reality transparently. If all narration involves selection, ordering, and interpretation — if, as Hayden White argued, even historical narrative imposes emplotment structures that are fundamentally literary in character — then the distinction between "reliable" and "unreliable" narration threatens to dissolve into a matter of degree rather than kind.\n\nThis recognition carries implications beyond literary criticism. In an era of contested facts, algorithmic curation, and narrative warfare, the postmodern interrogation of narrative reliability acquires an urgent civic dimension. The skills cultivated by reading unreliable narration — the capacity to detect rhetorical manipulation, to attend to what is omitted as well as what is stated, to recognize that perspective is always partial and interested — are precisely the skills demanded by democratic citizenship in an age of information saturation. What postmodern fiction ultimately teaches is not that truth does not exist but that access to truth requires perpetual vigilance about the narrative structures through which it is mediated.',
    wordDefinitions: {
      'dissembling': 'the act of concealing one\'s true motives, feelings, or beliefs under a false appearance',
      'epistemological': 'relating to the theory of knowledge, particularly its nature, scope, and limits',
      'complicity': 'involvement as an associate or accomplice in a questionable act or relationship',
      'occludes': 'blocks, obstructs, or conceals from view',
      'ontologically': 'in a way that relates to the fundamental nature of being and reality',
      'emplotment': 'the process of organizing a sequence of events into a narrative structure with a plot',
      'metafictional': 'relating to fiction that self-consciously addresses the conventions and devices of fiction itself',
      'mediated': 'conveyed or transmitted through an intermediate process, channel, or structure'
    },
    questions: [
      {
        id: 'c2-un-q1',
        type: 'multiple_choice',
        question: 'According to the passage, what distinguishes postmodern unreliable narration from earlier forms?',
        options: [
          'Postmodern narrators always tell deliberate lies, unlike earlier narrators',
          'Earlier forms presupposed a recoverable truth from which the narrator deviated, while postmodern fiction dissolves the ground for judging reliability itself',
          'Postmodern fiction uses first-person narration while earlier fiction used third-person',
          'There is no meaningful difference between the two'
        ],
        correctAnswer: 1
      },
      {
        id: 'c2-un-q2',
        type: 'multiple_choice',
        question: 'How does the passage characterize Humbert Humbert\'s unreliability in "Lolita"?',
        options: [
          'He is unreliable because he frequently contradicts himself about factual matters',
          'He is unreliable because he admits to being a liar from the beginning',
          'His unreliability operates through aesthetic displacement — his literary virtuosity conceals the reality of abuse',
          'He is actually a reliable narrator who tells the truth throughout'
        ],
        correctAnswer: 2
      },
      {
        id: 'c2-un-q3',
        type: 'multiple_choice',
        question: 'Why does the passage describe Calvino\'s second-person address as significant?',
        options: [
          'Because it makes the novel easier to read for non-native speakers',
          'Because it implicates the reader in constructing narrative meaning, collapsing the distance between text and interpretation',
          'Because second-person narration was invented by Calvino',
          'Because it allows the author to avoid revealing the ending'
        ],
        correctAnswer: 1
      },
      {
        id: 'c2-un-q4',
        type: 'multiple_choice',
        question: 'What broader philosophical point do postmodern metafictional strategies enact, according to the passage?',
        options: [
          'That all fiction is equally worthless as a form of communication',
          'That realist fiction is always superior to experimental fiction',
          'A skepticism about language\'s capacity to represent reality transparently',
          'That literary criticism should be abolished'
        ],
        correctAnswer: 2
      },
      {
        id: 'c2-un-q5',
        type: 'multiple_choice',
        question: 'What does the passage ultimately argue postmodern fiction teaches about truth?',
        options: [
          'That truth does not exist and all claims to knowledge are equally false',
          'That truth is always obvious and needs no critical examination',
          'That truth exists only in scientific texts, never in literature',
          'That access to truth requires perpetual vigilance about the narrative structures through which it is mediated'
        ],
        correctAnswer: 3
      }
    ]
  }
]
