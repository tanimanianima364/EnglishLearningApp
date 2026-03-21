export interface DictationSentence {
  id: string
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2'
  text: string
  speed: 'slow' | 'normal' | 'fast'
}

export const dictationSentences: DictationSentence[] = [
  // A1 - Simple, short sentences
  { id: 'a1-1', cefrLevel: 'A1', text: 'I like to eat breakfast every morning.', speed: 'slow' },
  { id: 'a1-2', cefrLevel: 'A1', text: 'She has two brothers and one sister.', speed: 'slow' },
  { id: 'a1-3', cefrLevel: 'A1', text: 'The cat is sleeping on the bed.', speed: 'slow' },
  { id: 'a1-4', cefrLevel: 'A1', text: 'We go to school by bus.', speed: 'slow' },
  { id: 'a1-5', cefrLevel: 'A1', text: 'My name is John and I am from Canada.', speed: 'slow' },
  { id: 'a1-6', cefrLevel: 'A1', text: 'Please open the window.', speed: 'slow' },
  { id: 'a1-7', cefrLevel: 'A1', text: 'He works in a hospital.', speed: 'slow' },
  { id: 'a1-8', cefrLevel: 'A1', text: 'There are five books on the table.', speed: 'slow' },
  { id: 'a1-9', cefrLevel: 'A1', text: 'I drink coffee in the morning.', speed: 'slow' },
  { id: 'a1-10', cefrLevel: 'A1', text: 'They are playing in the park.', speed: 'slow' },

  // A2 - Slightly longer, common situations
  { id: 'a2-1', cefrLevel: 'A2', text: 'I usually wake up at seven and take a shower before work.', speed: 'slow' },
  { id: 'a2-2', cefrLevel: 'A2', text: 'The restaurant on the corner serves delicious Italian food.', speed: 'slow' },
  { id: 'a2-3', cefrLevel: 'A2', text: 'She bought a new dress for the party last weekend.', speed: 'slow' },
  { id: 'a2-4', cefrLevel: 'A2', text: 'Can you tell me how to get to the train station?', speed: 'slow' },
  { id: 'a2-5', cefrLevel: 'A2', text: 'We had a wonderful time at the beach yesterday.', speed: 'slow' },
  { id: 'a2-6', cefrLevel: 'A2', text: 'The weather is getting colder and the leaves are falling.', speed: 'slow' },
  { id: 'a2-7', cefrLevel: 'A2', text: 'I need to buy some milk and bread from the supermarket.', speed: 'slow' },
  { id: 'a2-8', cefrLevel: 'A2', text: 'My favorite hobby is reading books about history.', speed: 'slow' },
  { id: 'a2-9', cefrLevel: 'A2', text: 'He called me yesterday to invite me to his birthday party.', speed: 'normal' },
  { id: 'a2-10', cefrLevel: 'A2', text: 'The children were excited because it was the first day of summer vacation.', speed: 'normal' },

  // B1 - Complex sentences, natural speed
  { id: 'b1-1', cefrLevel: 'B1', text: 'Although the meeting was scheduled for three o\'clock, it didn\'t start until half past four.', speed: 'normal' },
  { id: 'b1-2', cefrLevel: 'B1', text: 'If you practice speaking English every day, you will improve much faster than you expect.', speed: 'normal' },
  { id: 'b1-3', cefrLevel: 'B1', text: 'The company has been growing rapidly since it launched its new product last year.', speed: 'normal' },
  { id: 'b1-4', cefrLevel: 'B1', text: 'I have been living in this city for five years, but I still haven\'t visited the famous museum.', speed: 'normal' },
  { id: 'b1-5', cefrLevel: 'B1', text: 'She suggested that we should take a different route to avoid the heavy traffic.', speed: 'normal' },
  { id: 'b1-6', cefrLevel: 'B1', text: 'The documentary about climate change really made me think about our impact on the environment.', speed: 'normal' },
  { id: 'b1-7', cefrLevel: 'B1', text: 'By the time we arrived at the theater, the movie had already started.', speed: 'normal' },
  { id: 'b1-8', cefrLevel: 'B1', text: 'Learning a new language requires patience, dedication, and a lot of practice.', speed: 'normal' },
  { id: 'b1-9', cefrLevel: 'B1', text: 'The hotel where we stayed last summer was right next to a beautiful sandy beach.', speed: 'normal' },
  { id: 'b1-10', cefrLevel: 'B1', text: 'I would have called you earlier, but my phone battery died in the afternoon.', speed: 'normal' },

  // B2 - Advanced structures, faster delivery
  { id: 'b2-1', cefrLevel: 'B2', text: 'Had the government invested more in renewable energy, we might not be facing such severe environmental challenges today.', speed: 'normal' },
  { id: 'b2-2', cefrLevel: 'B2', text: 'The research, which was conducted over a period of three years, revealed some surprising findings about consumer behavior.', speed: 'normal' },
  { id: 'b2-3', cefrLevel: 'B2', text: 'Not only did the new policy fail to reduce unemployment, but it also led to a significant increase in public debt.', speed: 'normal' },
  { id: 'b2-4', cefrLevel: 'B2', text: 'It is widely believed that artificial intelligence will fundamentally transform the way we work within the next decade.', speed: 'normal' },
  { id: 'b2-5', cefrLevel: 'B2', text: 'Despite having studied abroad for several years, she still found it challenging to express herself naturally in formal situations.', speed: 'fast' },
  { id: 'b2-6', cefrLevel: 'B2', text: 'The professor emphasized that critical thinking skills are just as important as memorizing facts for academic success.', speed: 'fast' },
  { id: 'b2-7', cefrLevel: 'B2', text: 'Were it not for the generous donations from local businesses, the community center would have been forced to close.', speed: 'fast' },
  { id: 'b2-8', cefrLevel: 'B2', text: 'What concerns me most about social media is the way it can distort our perception of reality and affect mental health.', speed: 'fast' },
  { id: 'b2-9', cefrLevel: 'B2', text: 'The more you expose yourself to authentic materials, the more naturally you will acquire the nuances of the language.', speed: 'fast' },
  { id: 'b2-10', cefrLevel: 'B2', text: 'Having considered all the available options, the committee decided to postpone the decision until further evidence could be gathered.', speed: 'fast' },
]
