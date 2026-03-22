import { useState, useCallback, useRef } from 'react'

export interface Message {
  id: string
  sender: 'user' | 'ai'
  text: string
  timestamp: Date
  grammarTip?: string
}

export interface ConversationScenario {
  id: string
  title: string
  icon: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  aiRole: string
  openingMessage: string
  vocabulary: { word: string; meaning: string }[]
  usefulPhrases: string[]
  phases: PhaseConfig[]
  fallbackResponses: string[]
}

interface PhaseConfig {
  patterns: PatternConfig[]
  fallback: string[]
}

interface PatternConfig {
  triggers: string[]
  responses: string[]
  grammarTip?: string
  advance?: boolean
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export const scenarios: ConversationScenario[] = [
  {
    id: 'restaurant',
    title: 'At a Restaurant',
    icon: '🍽️',
    description: 'Practice ordering food and talking with a waiter',
    difficulty: 'Beginner',
    aiRole: 'Waiter',
    openingMessage: "Welcome to The Golden Fork! I'll be your server today. Would you like to start with something to drink?",
    vocabulary: [
      { word: 'appetizer', meaning: 'A small dish before the main meal' },
      { word: 'entree', meaning: 'The main dish of a meal' },
      { word: 'specials', meaning: "Today's recommended dishes" },
      { word: 'check / bill', meaning: 'The payment for your meal' },
      { word: 'tip', meaning: 'Extra money for the server' },
      { word: 'reservation', meaning: 'A table booked in advance' }
    ],
    usefulPhrases: [
      "I'd like to order...",
      "Could I have the...?",
      "What do you recommend?",
      "Can I see the menu, please?",
      "I'll have the same.",
      "Could we get the check, please?"
    ],
    phases: [
      {
        patterns: [
          { triggers: ['water', 'juice', 'coffee', 'tea', 'coke', 'soda', 'beer', 'wine', 'drink'],
            responses: [
              "Great choice! I'll bring that right over. Would you like to see our menu while you wait?",
              "Coming right up! In the meantime, here's our menu. Today's special is grilled salmon with herbs."
            ], advance: true },
          { triggers: ['menu', 'see', 'look', 'what do you have'],
            responses: [
              "Of course! Here's our menu. We have pasta, steak, grilled chicken, and fresh seafood. Today's special is grilled salmon. Would you like something to drink while you decide?",
              "Here you go! I'd especially recommend our pasta dishes today. They're freshly made. Can I get you something to drink?"
            ], advance: true },
          { triggers: ['hello', 'hi', 'hey', 'good'],
            responses: [
              "Hello! Great to have you here tonight. Can I start you off with a drink? We have fresh lemonade, iced tea, or any soft drink you'd like.",
              "Hi there! Welcome in. Would you like to hear about our drink specials today?"
            ] },
          { triggers: ['table', 'seat', 'reservation', 'book'],
            responses: [
              "Of course! Let me find you a nice table. Would you prefer by the window or in a quieter corner?",
              "Right this way! I have a lovely table for you. Here's the menu — can I get you started with drinks?"
            ], advance: true }
        ],
        fallback: [
          "Welcome! Would you like to start with a drink, or shall I bring the menu right away?",
          "Sure thing! Can I get you something to drink first?"
        ]
      },
      {
        patterns: [
          { triggers: ['chicken', 'steak', 'fish', 'salmon', 'pasta', 'salad', 'soup', 'burger', 'pizza', 'order', 'like', 'have', 'want', 'get'],
            responses: [
              "Excellent choice! How would you like that prepared? And would you like a side salad or fries with that?",
              "Great taste! That's one of our most popular dishes. Would you like any appetizers to start?",
              "Perfect! And for the side, we have mashed potatoes, steamed vegetables, or a garden salad. What sounds good?"
            ], grammarTip: "Use \"I'd like...\" or \"Could I have...?\" instead of \"I want...\" for more polite ordering.", advance: true },
          { triggers: ['recommend', 'suggest', 'best', 'popular', 'special', 'good'],
            responses: [
              "I'd highly recommend our grilled salmon — it's fresh and comes with lemon butter sauce. Our homemade pasta is also very popular!",
              "Our chef's special today is a wonderful mushroom risotto. The steak is also excellent if you're in the mood for something hearty."
            ] },
          { triggers: ['vegetarian', 'vegan', 'allerg', 'gluten'],
            responses: [
              "Of course! We have several options. Our garden salad, vegetable pasta, and mushroom risotto are all vegetarian. I can also ask the chef to modify any dish for dietary needs.",
              "No problem at all! Let me point out the vegetarian and allergy-friendly items on the menu. We take dietary restrictions very seriously."
            ] }
        ],
        fallback: [
          "Take your time looking at the menu! Our pasta and grilled dishes are very popular. Let me know when you're ready to order.",
          "No rush! Would you like to hear about today's specials while you decide?"
        ]
      },
      {
        patterns: [
          { triggers: ['side', 'salad', 'fries', 'potato', 'vegetable', 'rice', 'bread'],
            responses: [
              "Perfect! I'll put that order in for you right away. It should be ready in about 15 minutes. Can I get you anything else?",
              "Wonderful! Your food will be out shortly. Would you like some bread for the table while you wait?"
            ], advance: true },
          { triggers: ['yes', 'sure', 'okay', 'please', 'sounds good', 'that'],
            responses: [
              "Great! I've noted everything down. Your order will be ready soon. Enjoy!",
              "Wonderful choice! I'll get that started for you. Would you like anything else?"
            ], advance: true },
          { triggers: ['no', 'nothing', 'that\'s all', 'fine', 'enough', 'good'],
            responses: [
              "Alright! I'll put your order in now. It should be about 15 minutes. Enjoy!",
              "Perfect! Your order is in. I'll bring everything out as soon as it's ready."
            ], advance: true },
          { triggers: ['dessert', 'sweet', 'cake', 'ice cream'],
            responses: [
              "We have wonderful desserts! Chocolate lava cake, tiramisu, and homemade ice cream. Would you like to order one now, or after your main course?",
              "Great idea! Our chocolate cake is incredible. I can bring the dessert menu later if you'd prefer."
            ] }
        ],
        fallback: [
          "I've got your main order. Would you like to add any sides or appetizers?",
          "Your order is looking great! Anything else I can add for you?"
        ]
      },
      {
        patterns: [
          { triggers: ['check', 'bill', 'pay', 'how much', 'total', 'card', 'cash'],
            responses: [
              "Of course! Your total comes to $34.50. Would you like to pay by card or cash?",
              "Here's your bill. I hope you enjoyed your meal! You can pay whenever you're ready."
            ], grammarTip: "\"Could we get the check, please?\" is a polite way to ask for the bill in American English. In British English, you'd say \"bill\" instead of \"check\".", advance: true },
          { triggers: ['delicious', 'good', 'great', 'amazing', 'love', 'enjoy', 'wonderful', 'excellent'],
            responses: [
              "I'm so glad you enjoyed it! I'll pass your compliments to the chef. Would you like any dessert or coffee?",
              "That's wonderful to hear! Can I interest you in our dessert menu, or would you like the check?"
            ] },
          { triggers: ['dessert', 'cake', 'sweet', 'ice cream', 'coffee'],
            responses: [
              "Excellent! For dessert, we have chocolate lava cake, crème brûlée, and artisan ice cream. What catches your eye?",
              "Our tiramisu is made fresh daily and it's absolutely divine. We also have a lovely fruit sorbet if you'd prefer something lighter."
            ] }
        ],
        fallback: [
          "How is everything? Can I get you anything else, or would you like the check?",
          "I hope you're enjoying your meal! Just let me know if you need anything."
        ]
      },
      {
        patterns: [
          { triggers: ['card', 'credit', 'debit', 'cash', 'pay', 'visa', 'master'],
            responses: [
              "All done! Thank you so much for dining with us tonight. We hope to see you again soon! Have a wonderful evening!",
              "Payment processed! Thank you for visiting The Golden Fork. It was a pleasure serving you. Goodnight!"
            ] },
          { triggers: ['thank', 'thanks', 'bye', 'goodbye', 'good night', 'great time'],
            responses: [
              "Thank you for coming! It was my pleasure to serve you. Have a wonderful evening, and please visit us again!",
              "You're very welcome! We hope you had a great experience. See you next time! Goodnight!"
            ] },
          { triggers: ['tip', 'service'],
            responses: [
              "That's very generous of you, thank you so much! I'm glad you enjoyed your time here. Have a great night!",
              "You're too kind! Thank you for the wonderful tip. We hope to see you again soon!"
            ] }
        ],
        fallback: [
          "Thank you for dining with us! Here's your change. Have a wonderful evening!",
          "It was great having you! Please come again. Have a good night!"
        ]
      }
    ],
    fallbackResponses: [
      "I'm sorry, I didn't quite catch that. Would you like to see the menu or order a drink?",
      "Of course! Is there anything specific I can help you with?",
      "Sure thing! Take your time — just let me know when you're ready."
    ]
  },
  {
    id: 'hotel',
    title: 'Hotel Check-in',
    icon: '🏨',
    description: 'Practice checking into a hotel and asking about services',
    difficulty: 'Beginner',
    aiRole: 'Hotel Receptionist',
    openingMessage: "Good evening! Welcome to the Grand Plaza Hotel. Do you have a reservation with us?",
    vocabulary: [
      { word: 'reservation', meaning: 'A room booked in advance' },
      { word: 'check-in / check-out', meaning: 'Arrival / departure process' },
      { word: 'suite', meaning: 'A large, luxury hotel room' },
      { word: 'amenities', meaning: 'Hotel facilities (pool, gym, etc.)' },
      { word: 'complimentary', meaning: 'Free, included with your stay' },
      { word: 'concierge', meaning: 'Staff who helps with arrangements' }
    ],
    usefulPhrases: [
      "I have a reservation under the name...",
      "Is breakfast included?",
      "What time is check-out?",
      "Could I get a wake-up call?",
      "Is there Wi-Fi available?",
      "I'd like a room with a view."
    ],
    phases: [
      {
        patterns: [
          { triggers: ['yes', 'reservation', 'book', 'booked', 'name'],
            responses: [
              "Wonderful! Could I have your name, please? I'll pull up your reservation right away.",
              "Great! Let me look that up. What name is the reservation under?"
            ], advance: true },
          { triggers: ['no', 'don\'t', 'walk-in', 'available', 'any room'],
            responses: [
              "No problem at all! Let me check our availability. We have single rooms, doubles, and a few suites available tonight. What would you prefer?",
              "That's perfectly fine! We do have rooms available. Would you prefer a single or double room?"
            ], advance: true },
          { triggers: ['hello', 'hi', 'good', 'evening', 'morning'],
            responses: [
              "Hello! Welcome to our hotel. Are you checking in today? Do you have a reservation?",
              "Hi there! Welcome! Are you here to check in?"
            ] }
        ],
        fallback: [
          "Welcome! Are you checking in tonight? I'd be happy to help with a reservation.",
          "Thank you for choosing the Grand Plaza. Do you have a reservation, or would you like to book a room?"
        ]
      },
      {
        patterns: [
          { triggers: ['single', 'double', 'suite', 'king', 'queen', 'twin', 'room'],
            responses: [
              "Excellent choice! We have that available for $120 per night. The room includes free Wi-Fi, a minibar, and access to our fitness center. How many nights will you be staying?",
              "Great! That room comes with a lovely city view. It's $135 per night with breakfast included. How long is your stay?"
            ], grammarTip: "\"I'd like a room with...\" is a polite way to make requests. For example: \"I'd like a room with a king-size bed and a city view.\"", advance: true },
          { triggers: ['cheap', 'price', 'cost', 'how much', 'rate', 'affordable', 'budget'],
            responses: [
              "Our standard single rooms start at $89 per night, doubles at $120, and suites from $200. All rooms include breakfast and Wi-Fi. What fits your needs?",
              "We have several options! Our most affordable room is the standard single at $89 per night. Would you like to hear about our other options?"
            ] },
          { triggers: ['view', 'quiet', 'floor', 'window'],
            responses: [
              "We have rooms with city views on the upper floors, or quieter garden-view rooms on the lower floors. The city view rooms are $15 more per night. Which would you prefer?",
              "Great request! Our higher floors have beautiful panoramic views. I can put you on the 8th floor with a city view. Sound good?"
            ] }
        ],
        fallback: [
          "I found your reservation! Let me get you checked in. Could you show me your ID, please?",
          "Let me prepare your room key. Would you like a room on a higher floor or a lower floor?"
        ]
      },
      {
        patterns: [
          { triggers: ['night', 'nights', 'day', 'days', 'week', 'stay', 'until', 'one', 'two', 'three'],
            responses: [
              "Perfect! I've got that noted. Here's your room key — you're in room 507 on the fifth floor. The elevator is just around the corner. Breakfast is served from 7 to 10 AM in the dining hall.",
              "All set! Your room is 312. Elevators are to your right. Our pool is open until 10 PM, and breakfast starts at 7 AM. Is there anything else you'd like to know?"
            ], advance: true },
          { triggers: ['breakfast', 'food', 'restaurant', 'eat', 'dining'],
            responses: [
              "Breakfast is complimentary and served from 7 to 10 AM in our ground floor restaurant. We also have a rooftop bar open from 5 PM. Room service is available 24 hours.",
              "Great question! Breakfast is included — it's a buffet from 7 to 10 AM. For lunch and dinner, our restaurant offers a full menu. Room service is also available."
            ] },
          { triggers: ['wifi', 'internet', 'password', 'wi-fi'],
            responses: [
              "Wi-Fi is complimentary throughout the hotel. The network name is 'GrandPlaza-Guest' and the password is on your key card envelope. Connection is high-speed in all rooms.",
              "Free Wi-Fi is included! You'll find the login details on the card inside your key folder. Just connect to 'GrandPlaza-Guest'."
            ] }
        ],
        fallback: [
          "Your room is almost ready! Is there anything specific you'd like to know about the hotel?",
          "Wonderful! Let me finalize your check-in. Do you have any questions about our amenities?"
        ]
      },
      {
        patterns: [
          { triggers: ['pool', 'gym', 'spa', 'fitness', 'swim', 'exercise', 'sauna'],
            responses: [
              "Our pool is on the rooftop — open from 7 AM to 10 PM. The gym is 24-hour access with your room key, and our spa offers massages and treatments. Would you like to book a spa session?",
              "The fitness center is on the 2nd floor, open 24/7. The pool and spa are on the rooftop. Towels are provided at the pool area. Enjoy!"
            ] },
          { triggers: ['check-out', 'checkout', 'leave', 'departure', 'late'],
            responses: [
              "Check-out time is 11 AM. We do offer late check-out until 2 PM for a small fee, subject to availability. Would you like me to arrange that?",
              "Standard check-out is at 11 AM. If you need a late check-out, just let us know the night before and we'll do our best to accommodate you."
            ] },
          { triggers: ['taxi', 'cab', 'car', 'transport', 'airport', 'uber'],
            responses: [
              "I can arrange airport transportation for you! We have a shuttle service for $25, or I can call a taxi. The airport is about 30 minutes away. When do you need the ride?",
              "Of course! Our concierge can arrange a car for you anytime. Just give us an hour's notice. Would you like me to set that up?"
            ] },
          { triggers: ['thank', 'thanks', 'great', 'perfect', 'wonderful'],
            responses: [
              "You're very welcome! Enjoy your stay. If you need anything at all, just dial 0 from your room phone. Have a wonderful evening!",
              "My pleasure! Don't hesitate to call the front desk anytime — we're here 24/7. Have a great stay!"
            ] }
        ],
        fallback: [
          "Is there anything else I can help you with? Our concierge desk is also available for restaurant reservations and tour bookings.",
          "Enjoy your stay! Remember, the front desk is available 24/7 if you need anything."
        ]
      }
    ],
    fallbackResponses: [
      "I'd be happy to help! Could you tell me more about what you need?",
      "Of course! Is there something specific about the hotel you'd like to know?",
      "I'm here to help! Would you like information about our rooms or amenities?"
    ]
  },
  {
    id: 'shopping',
    title: 'Clothes Shopping',
    icon: '🛍️',
    description: 'Practice shopping for clothes and asking about products',
    difficulty: 'Beginner',
    aiRole: 'Shop Assistant',
    openingMessage: "Hi there! Welcome to Fashion Avenue. Are you looking for anything in particular today?",
    vocabulary: [
      { word: 'fitting room', meaning: 'A room to try on clothes' },
      { word: 'size', meaning: 'How big or small (S, M, L, XL)' },
      { word: 'on sale', meaning: 'Available at a reduced price' },
      { word: 'receipt', meaning: 'Proof of purchase' },
      { word: 'refund', meaning: 'Getting your money back' },
      { word: 'browse', meaning: 'To look around casually' }
    ],
    usefulPhrases: [
      "I'm looking for...",
      "Do you have this in a different size?",
      "Can I try this on?",
      "How much is this?",
      "Is this on sale?",
      "I'll take it."
    ],
    phases: [
      {
        patterns: [
          { triggers: ['shirt', 'blouse', 'top', 'jacket', 'coat', 'dress', 'pants', 'jeans', 'skirt', 'shoes', 'sneakers', 'suit'],
            responses: [
              "Great! We have a wonderful selection. Let me show you what we have. Are you looking for something casual or more formal?",
              "We just got some new arrivals! Follow me — they're right over here. Do you have a preferred color?"
            ], advance: true },
          { triggers: ['browse', 'look', 'looking around', 'just looking', 'browsing'],
            responses: [
              "Of course! Take your time. We have new arrivals on the left side, and our sale items are in the back. Let me know if you need any help!",
              "Feel free to look around! Everything on the front rack is from our new spring collection. I'll be right here if you have any questions."
            ] },
          { triggers: ['gift', 'present', 'someone', 'birthday', 'friend'],
            responses: [
              "How nice! We have some great gift options. Do you know what size they wear? And do they prefer casual or dressy styles?",
              "Shopping for a gift? That's lovely! Is it for a man or a woman? I can help you find something perfect."
            ], advance: true }
        ],
        fallback: [
          "We have clothing, shoes, and accessories. What category interests you?",
          "Feel free to browse! We have great deals on our spring collection right now."
        ]
      },
      {
        patterns: [
          { triggers: ['small', 'medium', 'large', 'size', 'xs', 'xl', 'extra'],
            responses: [
              "Let me check... Yes, we have that in your size! Would you like to try it on? The fitting rooms are just over there.",
              "I think this would fit you perfectly. We also have it in the next size up if you prefer a looser fit. Want to try both?"
            ], grammarTip: "\"Do you have this in a size...?\" or \"Do you have this in medium?\" is the standard way to ask about sizes.", advance: true },
          { triggers: ['color', 'blue', 'red', 'black', 'white', 'green', 'pink', 'grey', 'gray', 'brown', 'navy'],
            responses: [
              "Great choice! That color really suits the style. We also have it in navy and charcoal if you'd like to see those. Would you like to try it on?",
              "That's a very popular color! I think it would look great on you. Shall I grab your size?"
            ] },
          { triggers: ['casual', 'formal', 'business', 'party', 'work', 'office', 'everyday'],
            responses: [
              "I know exactly what you need! Let me show you a few options. We have some beautiful pieces that would be perfect. What's your size?",
              "Great! We have a wonderful selection for that. Follow me — I'll show you our top picks. Do you have a budget in mind?"
            ] }
        ],
        fallback: [
          "What size do you usually wear? I can check what we have in stock.",
          "These are some of our bestsellers. Would you like to try any of them on?"
        ]
      },
      {
        patterns: [
          { triggers: ['try', 'fitting', 'try on', 'test', 'wear'],
            responses: [
              "Absolutely! The fitting rooms are right behind you on the left. Take your time! I'll be right here if you need a different size.",
              "Of course! Here, let me open a fitting room for you. I'll bring you another size just in case."
            ], advance: true },
          { triggers: ['how much', 'price', 'cost', 'expensive', 'cheap', 'afford', 'sale', 'discount'],
            responses: [
              "This one is $49.99, and we actually have a 20% off promotion this week! That brings it down to about $40. It's a great deal!",
              "The original price is $65, but it's currently on sale for $45. And if you buy two or more items, you get an extra 10% off!"
            ], grammarTip: "\"How much is this?\" or \"How much does this cost?\" — both are correct. Avoid saying \"How much money is this?\"" },
          { triggers: ['another', 'different', 'other', 'else', 'more', 'option'],
            responses: [
              "Of course! Let me grab a few more options for you. We just restocked yesterday, so there's lots to choose from.",
              "Sure! I have some similar styles here that you might also like. Let me show you."
            ] }
        ],
        fallback: [
          "How does it look? Would you like to try it on, or shall I check for other sizes?",
          "That style is very trendy this season! Want me to find your size?"
        ]
      },
      {
        patterns: [
          { triggers: ['take', 'buy', 'get', 'purchase', 'want', 'love', 'perfect', 'this one', 'i\'ll'],
            responses: [
              "Wonderful choice! Shall I ring that up for you? We accept all major credit cards and cash. Would you like a gift bag?",
              "Great decision! Let me take that to the register for you. Will that be cash or card today?"
            ], advance: true },
          { triggers: ['fit', 'fits', 'looks', 'feel', 'comfortable', 'nice', 'good', 'great'],
            responses: [
              "It looks fantastic on you! That style really suits you. Would you like to get it?",
              "You look great! That's a really good fit. It goes well with both casual and semi-formal outfits."
            ] },
          { triggers: ['tight', 'loose', 'big', 'small', 'long', 'short', 'doesn\'t fit'],
            responses: [
              "No worries! Let me get you a different size. Would you like to try one size up or one size down?",
              "I'll swap that out for you right away! Do you want me to bring the next size?"
            ] }
        ],
        fallback: [
          "What do you think? Would you like to take it, or would you like to see more options?",
          "It's a great piece! Let me know if you'd like to purchase it or keep browsing."
        ]
      },
      {
        patterns: [
          { triggers: ['card', 'cash', 'pay', 'credit', 'debit', 'apple pay'],
            responses: [
              "All done! Here's your receipt. You have 30 days to return or exchange with the receipt. Thank you for shopping with us!",
              "Payment complete! Would you like me to fold it or leave it on the hanger? Here's your receipt. Thank you!"
            ] },
          { triggers: ['return', 'exchange', 'refund', 'policy'],
            responses: [
              "Our return policy is 30 days with the receipt for a full refund. Exchanges are accepted within 60 days. Just bring the item in its original condition.",
              "You can return or exchange within 30 days, no questions asked! Just keep the receipt and tags on."
            ] },
          { triggers: ['thank', 'thanks', 'bye', 'goodbye'],
            responses: [
              "Thank you for shopping at Fashion Avenue! Come back and see us again soon. Have a wonderful day!",
              "You're welcome! Enjoy your new outfit. See you next time! Bye!"
            ] }
        ],
        fallback: [
          "Here's your bag! Thank you so much for shopping with us today. Have a great day!",
          "Thank you for your purchase! Don't forget — 30-day returns with your receipt. Have a lovely day!"
        ]
      }
    ],
    fallbackResponses: [
      "I'm here to help! What kind of clothing are you interested in?",
      "Can I help you find something? We have lots of new arrivals!",
      "Let me know if you need any help. I'd love to find the perfect outfit for you!"
    ]
  },
  {
    id: 'airport',
    title: 'At the Airport',
    icon: '✈️',
    description: 'Practice checking in for a flight and navigating the airport',
    difficulty: 'Intermediate',
    aiRole: 'Airline Staff',
    openingMessage: "Hello! Welcome to SkyWings Airlines check-in counter. May I see your passport and booking confirmation, please?",
    vocabulary: [
      { word: 'boarding pass', meaning: 'Your ticket to board the plane' },
      { word: 'carry-on', meaning: 'Small bag you take on the plane' },
      { word: 'layover', meaning: 'A stop between connecting flights' },
      { word: 'terminal', meaning: 'A building section of the airport' },
      { word: 'gate', meaning: 'Where you board your plane' },
      { word: 'turbulence', meaning: 'Bumpy air during flight' }
    ],
    usefulPhrases: [
      "I'd like a window/aisle seat, please.",
      "How much luggage can I bring?",
      "Where is the boarding gate?",
      "Is the flight on time?",
      "I have a connecting flight to...",
      "Could I upgrade my seat?"
    ],
    phases: [
      {
        patterns: [
          { triggers: ['here', 'passport', 'booking', 'confirmation', 'yes', 'sure'],
            responses: [
              "Thank you! Let me pull up your booking... I see you're on flight SW402 to London. Is that correct? Are you checking any luggage today?",
              "Perfect! I've found your reservation. Flight SW215 to Tokyo, departing at 3:45 PM. How many bags will you be checking?"
            ], advance: true },
          { triggers: ['help', 'check in', 'checking in', 'check-in', 'flight'],
            responses: [
              "Of course! I can help you with check-in. Could I see your passport and booking reference number, please?",
              "Happy to help! Do you have your passport and booking confirmation ready?"
            ] }
        ],
        fallback: [
          "I'll need your passport and booking confirmation to get started. Do you have those handy?",
          "No problem! Just show me your travel documents and I'll get you checked in right away."
        ]
      },
      {
        patterns: [
          { triggers: ['one', 'two', 'bag', 'bags', 'luggage', 'suitcase', 'check', 'none', 'no bag', 'carry'],
            responses: [
              "Got it! Just a reminder — each checked bag can weigh up to 23 kg. Your carry-on should fit in the overhead bin. Now, do you have a seating preference? Window, middle, or aisle?",
              "Perfect! I'll tag those for you. Your baggage claim ticket will be on your boarding pass. Would you like a window or aisle seat?"
            ], grammarTip: "\"How much luggage\" refers to weight/amount. \"How many bags\" refers to the number. Both are useful at the airport!", advance: true },
          { triggers: ['weight', 'heavy', 'overweight', 'limit', 'kg', 'kilogram', 'pound'],
            responses: [
              "The weight limit is 23 kg per checked bag. If your bag is overweight, there's a $50 fee per extra bag or you can rearrange items. Would you like me to weigh your bags?",
              "Each bag can be up to 23 kg. Your carry-on should be under 7 kg. Let me weigh your checked bags for you."
            ] }
        ],
        fallback: [
          "How many bags will you be checking today? Remember, carry-on bags can go with you on the plane.",
          "I'll need to know about your luggage. Are you checking any bags or just carrying on?"
        ]
      },
      {
        patterns: [
          { triggers: ['window', 'aisle', 'middle', 'seat', 'front', 'back', 'exit', 'leg'],
            responses: [
              "I've got you a window seat in row 14. Here's your boarding pass! Your gate is B7, and boarding starts at 3:15 PM. The security checkpoint is straight ahead.",
              "Done! You're in seat 22A, aisle. Boarding begins at 2:45 PM from Gate C12. Make sure to go through security — it's down the hall to the right."
            ], advance: true },
          { triggers: ['upgrade', 'business', 'first class', 'premium', 'better'],
            responses: [
              "Let me check availability... We do have business class seats available for an additional $350. You'd get extra legroom, priority boarding, and a meal service. Would you like to upgrade?",
              "I can check on upgrades for you! Business class is $300 more and includes lounge access and a flatbed seat. Shall I go ahead?"
            ] }
        ],
        fallback: [
          "Would you prefer a window or aisle seat? I have a few good options available.",
          "Any seating preference? I can try to get you a seat with more legroom if available."
        ]
      },
      {
        patterns: [
          { triggers: ['delay', 'late', 'on time', 'cancel', 'status', 'time'],
            responses: [
              "Let me check... Your flight is currently on time! Boarding starts in about 2 hours. You have plenty of time to grab a coffee or visit the duty-free shops.",
              "Good news — everything is running on schedule. You should be at the gate about 30 minutes before boarding. Enjoy the airport facilities!"
            ] },
          { triggers: ['lounge', 'food', 'restaurant', 'shop', 'duty free', 'cafe', 'coffee', 'eat'],
            responses: [
              "There are several restaurants and cafes past security. The duty-free shops are in Terminal B near your gate. There's also a nice lounge on the second floor if you have access.",
              "Past security, you'll find plenty of options! There's a great coffee shop near Gate B5, and the food court is in the center of the terminal."
            ] },
          { triggers: ['connect', 'transfer', 'layover', 'next flight', 'transit'],
            responses: [
              "For connecting flights, follow the 'Connections' signs after you land. You won't need to go through customs unless you're leaving the airport. Your next boarding pass is included.",
              "Your layover is 2 hours, which should be enough time. Look for the 'Transit' signs when you arrive. The connecting gate will be on your boarding pass."
            ] },
          { triggers: ['thank', 'thanks', 'bye', 'goodbye'],
            responses: [
              "You're welcome! Have a wonderful flight. Don't forget — Gate B7, boarding at 3:15 PM. Safe travels!",
              "My pleasure! Enjoy your trip. Remember to be at the gate 30 minutes before boarding. Bon voyage!"
            ] }
        ],
        fallback: [
          "You're all set! Remember to head to security first, then find your gate. Have a great flight!",
          "Your boarding pass has all the details. Is there anything else you need before you head to the gate?"
        ]
      }
    ],
    fallbackResponses: [
      "I'm happy to help! Do you have questions about your flight or the airport?",
      "Let me know if you need help with anything else — directions, flight info, or baggage.",
      "Is there anything else I can assist you with today?"
    ]
  },
  {
    id: 'interview',
    title: 'Job Interview',
    icon: '💼',
    description: 'Practice answering common job interview questions',
    difficulty: 'Intermediate',
    aiRole: 'Hiring Manager',
    openingMessage: "Good morning! Thanks for coming in today. Please, have a seat. Let's start — could you tell me a little about yourself?",
    vocabulary: [
      { word: 'qualifications', meaning: 'Skills and experience for the job' },
      { word: 'relevant experience', meaning: 'Past work related to this job' },
      { word: 'strengths/weaknesses', meaning: 'What you do well / areas to improve' },
      { word: 'team player', meaning: 'Someone who works well with others' },
      { word: 'deadline', meaning: 'A time limit for completing work' },
      { word: 'position/role', meaning: 'The job title and responsibilities' }
    ],
    usefulPhrases: [
      "I have experience in...",
      "One of my strengths is...",
      "I'm passionate about...",
      "In my previous role, I...",
      "I'm looking for an opportunity to...",
      "I believe I can contribute by..."
    ],
    phases: [
      {
        patterns: [
          { triggers: ['name', 'i am', 'i\'m', 'my name', 'work', 'experience', 'years', 'background', 'graduated', 'studied'],
            responses: [
              "That's a great introduction! Thank you. Now, could you tell me about your most relevant work experience? What did you accomplish in your previous role?",
              "Wonderful! It sounds like you have an interesting background. What specific experience do you have that relates to this position?"
            ], grammarTip: "Start with a brief overview: name, current role, key experience. Use present perfect (\"I have worked...\") for ongoing experience and past simple (\"I worked...\") for completed roles.", advance: true },
          { triggers: ['hello', 'hi', 'good morning', 'nice to meet', 'thank'],
            responses: [
              "Nice to meet you too! So, let's get started. Tell me about yourself — your background, experience, and what brings you here today.",
              "Great to meet you! Please, make yourself comfortable. I'd love to hear about your professional background."
            ] }
        ],
        fallback: [
          "Take your time! I'd like to hear about your background, what you've been working on, and what interests you about this role.",
          "No rush! Just tell me a bit about yourself — where you've worked, what you've studied, and what you enjoy doing professionally."
        ]
      },
      {
        patterns: [
          { triggers: ['managed', 'led', 'built', 'created', 'improved', 'developed', 'achieved', 'responsible', 'project', 'team'],
            responses: [
              "Impressive! That shows great initiative. Now, what would you say are your top strengths? What makes you stand out from other candidates?",
              "That's excellent experience! You clearly take ownership of your work. Can you tell me about your greatest professional strength?"
            ], advance: true },
          { triggers: ['company', 'role', 'position', 'job', 'duties', 'tasks'],
            responses: [
              "That's helpful context! Can you share a specific achievement or project you're particularly proud of from that role?",
              "Interesting! What was the most challenging part of that role, and how did you handle it?"
            ] }
        ],
        fallback: [
          "That's great! Can you give me a specific example of a project or achievement you're proud of?",
          "Thank you for sharing. Could you tell me more about what you accomplished in your most recent role?"
        ]
      },
      {
        patterns: [
          { triggers: ['strength', 'strong', 'good at', 'skill', 'ability', 'capable', 'organized', 'leadership', 'communication', 'problem', 'creative', 'detail'],
            responses: [
              "That's a great strength to have! Now, everyone has areas to improve. What would you say is a weakness or something you're working on?",
              "Excellent! Those skills are very valuable for this position. On the flip side, is there an area you're currently trying to develop or improve?"
            ], grammarTip: "When discussing weaknesses, frame them positively: \"I sometimes focus too much on details, but I've been working on balancing the big picture with precision.\"", advance: true },
          { triggers: ['passionate', 'love', 'enjoy', 'interest', 'motivated'],
            responses: [
              "Passion really comes through in your work, and that's great! Now, what about areas where you'd like to grow? Everyone has them.",
              "I love hearing that enthusiasm! Let me ask — what's an area you feel you could improve in?"
            ], advance: true }
        ],
        fallback: [
          "What would you say are your greatest professional strengths? What sets you apart?",
          "I'd love to hear about your key skills. What do you think you'd bring to this team?"
        ]
      },
      {
        patterns: [
          { triggers: ['weakness', 'improve', 'working on', 'develop', 'challenge', 'difficult', 'sometimes', 'tend to', 'learning'],
            responses: [
              "I appreciate your honesty! Self-awareness is important. Now, why are you interested in this particular position? What attracted you to our company?",
              "That's a very mature answer. Knowing your areas for growth shows great self-awareness. So, what excites you about this opportunity?"
            ], advance: true },
          { triggers: ['perfect', 'no weakness', 'none', 'don\'t have'],
            responses: [
              "Everyone has areas to grow! It's actually a strength to recognize them. Perhaps think of something you've been learning recently or a skill you'd like to develop further.",
              "I appreciate the confidence! But being self-aware about development areas is actually something we value. Can you think of something you've been working to improve?"
            ] }
        ],
        fallback: [
          "It's okay to share areas you're working on — it shows maturity. What's something you've been trying to get better at?",
          "No one is perfect! What's a professional skill you'd like to develop further?"
        ]
      },
      {
        patterns: [
          { triggers: ['company', 'mission', 'product', 'culture', 'team', 'grow', 'opportunity', 'challenge', 'learn', 'career', 'impact', 'value'],
            responses: [
              "That's wonderful to hear! You've clearly done your research. Last question — do you have any questions for me about the role or the company?",
              "Great answer! It's clear you've thought about this. Before we wrap up, is there anything you'd like to ask me?"
            ], advance: true },
          { triggers: ['salary', 'pay', 'compensation', 'benefits', 'money', 'vacation'],
            responses: [
              "That's a fair question! The salary range for this position is competitive and based on experience. HR will go over the full compensation package with you. Do you have any other questions about the role itself?",
              "We offer a competitive package including health benefits, retirement plans, and flexible time off. The specific numbers would be discussed in the next round. Any questions about the day-to-day work?"
            ] }
        ],
        fallback: [
          "Why does this role interest you? What do you know about our company?",
          "What attracts you to this position specifically? We'd love to know what excites you about it."
        ]
      },
      {
        patterns: [
          { triggers: ['question', 'ask', 'team', 'day', 'typical', 'culture', 'next step', 'when', 'growth', 'project'],
            responses: [
              "Great question! We have a collaborative team of about 12 people. A typical day involves morning standups, focused work time, and team reviews. We really value work-life balance. Thank you so much for coming in today — we'll be in touch within a week!",
              "I'm glad you asked! There's lots of room for growth here. We promote from within and support continuing education. Thank you for your time today — it was a great conversation. We'll let you know our decision soon!"
            ] },
          { triggers: ['no question', 'no', 'nothing', 'that\'s all', 'i\'m good', 'covered everything'],
            responses: [
              "That's perfectly fine! Thank you so much for coming in. It was a pleasure speaking with you. We'll review all candidates and get back to you within a week. Have a great day!",
              "No problem! I think we covered a lot. Thank you for your time — you made a great impression. We'll be in touch soon!"
            ] },
          { triggers: ['thank', 'thanks', 'great', 'pleasure', 'enjoyed'],
            responses: [
              "The pleasure is mine! You've been an excellent candidate. We'll make our decision soon and reach out. Best of luck, and have a wonderful day!",
              "Thank you too! It was really enjoyable talking with you. We'll be in touch within the week. Take care!"
            ] }
        ],
        fallback: [
          "Thank you for a wonderful interview! We'll be in contact soon. Do you have any final questions?",
          "This has been a great conversation. We'll review everything and get back to you shortly. Thank you for your time!"
        ]
      }
    ],
    fallbackResponses: [
      "That's interesting! Could you elaborate a bit more?",
      "I'd love to hear more about that. Can you give me a specific example?",
      "Good point! Let me ask you about something else..."
    ]
  },
  {
    id: 'doctor',
    title: "Doctor's Visit",
    icon: '🏥',
    description: 'Practice describing symptoms and talking to a doctor',
    difficulty: 'Intermediate',
    aiRole: 'Doctor',
    openingMessage: "Good morning! I'm Dr. Smith. Please have a seat. What brings you in today? How are you feeling?",
    vocabulary: [
      { word: 'symptom', meaning: 'A sign of illness (pain, fever, etc.)' },
      { word: 'prescription', meaning: 'A doctor\'s order for medicine' },
      { word: 'diagnosis', meaning: 'Identifying what illness you have' },
      { word: 'allergic', meaning: 'Having a bad reaction to something' },
      { word: 'dose / dosage', meaning: 'The amount of medicine to take' },
      { word: 'appointment', meaning: 'A scheduled visit to the doctor' }
    ],
    usefulPhrases: [
      "I've been feeling...",
      "I have a pain in my...",
      "It started about... ago.",
      "I'm allergic to...",
      "How often should I take this?",
      "Do I need a follow-up appointment?"
    ],
    phases: [
      {
        patterns: [
          { triggers: ['head', 'headache', 'dizzy', 'migraine'],
            responses: [
              "I see, headaches can be tough. How long have you been experiencing this? Is it constant or does it come and go? And on a scale of 1 to 10, how would you rate the pain?",
              "A headache — let's figure this out. When did it start? Is it more of a sharp pain or a dull ache? Have you had any changes in vision?"
            ], advance: true },
          { triggers: ['stomach', 'nausea', 'sick', 'vomit', 'diarrhea', 'appetite'],
            responses: [
              "Sorry to hear that. How long has your stomach been bothering you? Have you eaten anything unusual recently? Any fever or chills?",
              "Stomach issues are no fun. When did the symptoms start? Have you been able to keep food down?"
            ], advance: true },
          { triggers: ['throat', 'cough', 'cold', 'flu', 'sneez', 'nose', 'fever', 'temperature', 'runny'],
            responses: [
              "It sounds like you might have a cold or flu. How long have you had these symptoms? Do you have a fever? Let me check your temperature.",
              "Those sound like cold symptoms. When did they start? Any body aches or fatigue along with it?"
            ], advance: true },
          { triggers: ['back', 'shoulder', 'knee', 'leg', 'arm', 'neck', 'muscle', 'joint', 'pain', 'hurt', 'sore'],
            responses: [
              "Let me take a look at that. How long have you been in pain? Did anything specific cause it — like an injury or heavy lifting?",
              "Pain can really affect your daily life. When did it start? Is it worse in the morning or at night? Can you show me exactly where it hurts?"
            ], advance: true },
          { triggers: ['tired', 'fatigue', 'exhausted', 'sleep', 'insomnia', 'energy', 'weak'],
            responses: [
              "Fatigue can have many causes. How long have you been feeling this way? How many hours of sleep are you getting? Have you noticed any other symptoms?",
              "I understand, low energy can be very frustrating. Let me ask — has anything changed recently? Your diet, stress levels, or sleep patterns?"
            ], advance: true },
          { triggers: ['not feeling well', 'feel bad', 'unwell', 'not good', 'terrible', 'awful'],
            responses: [
              "I'm sorry to hear that. Can you describe your symptoms? Where exactly do you feel unwell? When did it start?",
              "Let's figure out what's going on. Can you tell me more specifically what you're experiencing? Any pain, fever, or other symptoms?"
            ] }
        ],
        fallback: [
          "Take your time. Can you describe what symptoms you've been experiencing?",
          "I'm here to help. What specific symptoms have you noticed? When did they start?"
        ]
      },
      {
        patterns: [
          { triggers: ['day', 'days', 'week', 'weeks', 'month', 'yesterday', 'today', 'morning', 'night', 'since', 'ago', 'started'],
            responses: [
              "Thank you for that information. Are you currently taking any medications? And do you have any known allergies?",
              "That's helpful to know. Before I examine you, I need to ask — are you allergic to any medications? Are you taking anything currently?"
            ], grammarTip: "Use \"I've been feeling...\" (present perfect continuous) for ongoing symptoms: \"I've been feeling dizzy for three days.\" Use \"I felt...\" for a one-time event.", advance: true },
          { triggers: ['worse', 'better', 'same', 'getting', 'improving', 'constant', 'comes and goes'],
            responses: [
              "I see. That helps narrow things down. Do you have any allergies or current medications I should know about?",
              "Thank you. Are you on any medications right now? Any allergies?"
            ], advance: true }
        ],
        fallback: [
          "How long have you had these symptoms? Have they been getting better or worse?",
          "When did you first notice the symptoms? Is there anything that makes them better or worse?"
        ]
      },
      {
        patterns: [
          { triggers: ['no allerg', 'no medic', 'not taking', 'nothing', 'none', 'no'],
            responses: [
              "Good to know! Let me do a quick examination... Okay, based on what you've told me and what I can see, I have a good idea of what's going on. Let me explain my assessment.",
              "Alright! I'm going to check a few things... Okay, I think I understand what's happening. Let me share my thoughts with you."
            ], advance: true },
          { triggers: ['allerg', 'taking', 'medication', 'medicine', 'pill', 'drug', 'yes'],
            responses: [
              "Thank you for letting me know — that's important information. I'll make a note of that. Now let me examine you... Alright, I have a good picture of what's going on.",
              "Good, I've noted that down. It's always important to share this with your doctor. Let me take a closer look... Okay, I think I know what we're dealing with."
            ], advance: true }
        ],
        fallback: [
          "Are you currently taking any medications? It's important I know before making recommendations.",
          "Any allergies or medications I should be aware of?"
        ]
      },
      {
        patterns: [
          { triggers: ['what', 'diagnosis', 'wrong', 'is it', 'serious', 'bad', 'worried', 'tell me', 'okay', 'yes'],
            responses: [
              "Based on your symptoms, it seems like a mild viral infection. Nothing to worry about! I'll prescribe some medication to help with the symptoms. You should rest, drink plenty of fluids, and the medicine should help you feel better within a few days.",
              "It looks like you have some inflammation that's causing your discomfort. I'm going to prescribe an anti-inflammatory and a pain reliever. Make sure to take them with food. You should start feeling better in 3-5 days."
            ], grammarTip: "\"Should I take...?\" and \"Do I need to...?\" are useful for asking about treatment. Example: \"Should I take this with food?\"", advance: true },
          { triggers: ['prescription', 'medicine', 'treatment', 'cure', 'fix'],
            responses: [
              "I'm prescribing a course of medication for you. Take it twice a day with meals for one week. If symptoms don't improve in 5 days, please come back for a follow-up.",
              "Here's what I recommend: rest, plenty of fluids, and this medication. Take one tablet in the morning and one in the evening. You should feel improvement within a few days."
            ], advance: true }
        ],
        fallback: [
          "Let me explain what I think is going on and what we can do about it.",
          "Based on my examination, I have some recommendations for you. Would you like to hear them?"
        ]
      },
      {
        patterns: [
          { triggers: ['follow', 'come back', 'again', 'next', 'appointment', 'check-up', 'return'],
            responses: [
              "Let's schedule a follow-up in two weeks to see how you're doing. If anything gets worse before then, don't hesitate to come in or call us. Take care of yourself!",
              "I'd like to see you again in about 10 days. My receptionist can schedule that for you. In the meantime, rest up and take your medication as directed."
            ] },
          { triggers: ['how often', 'how long', 'how many', 'dosage', 'dose', 'take'],
            responses: [
              "Take one tablet twice daily — once in the morning and once in the evening, both with meals. Continue for the full 7 days even if you start feeling better. Don't skip doses!",
              "The dosage is one pill every 12 hours with food. Complete the full course. And drink at least 8 glasses of water a day while you're recovering."
            ] },
          { triggers: ['thank', 'thanks', 'grateful', 'appreciate', 'bye'],
            responses: [
              "You're very welcome! Take care of yourself, get plenty of rest, and don't forget to take your medication. Feel better soon! Goodbye!",
              "My pleasure! Remember — rest, fluids, and medication. You'll be feeling better in no time. Take care and have a good day!"
            ] },
          { triggers: ['exercise', 'work', 'sport', 'activity', 'gym', 'swim'],
            responses: [
              "I'd recommend taking it easy for the next few days. Light walking is fine, but avoid intense exercise until you're feeling better. Listen to your body!",
              "Rest is the best medicine right now. Give yourself 3-4 days before returning to physical activity. Start slow when you do go back."
            ] }
        ],
        fallback: [
          "Any other questions about your treatment? Remember to take your medication as prescribed and rest well.",
          "Is there anything else you'd like to know? Don't hesitate to call the office if you have concerns."
        ]
      }
    ],
    fallbackResponses: [
      "Could you tell me more about how you're feeling?",
      "I want to make sure I understand your symptoms correctly. Can you describe them again?",
      "Let me help you with that. Can you give me a few more details?"
    ]
  },
  {
    id: 'academic-seminar',
    title: 'Academic Seminar Discussion',
    icon: '🎓',
    description: 'Discuss research methodology in an academic seminar setting',
    difficulty: 'Advanced',
    aiRole: 'Professor',
    openingMessage: "Good afternoon, everyone. Welcome to today's seminar. We'll be examining the methodological approaches used in recent longitudinal studies on cognitive development. To get us started — what are your initial thoughts on the strengths and limitations of longitudinal research designs?",
    vocabulary: [
      { word: 'paradigm', meaning: 'A framework of concepts and assumptions in a field' },
      { word: 'methodology', meaning: 'The systematic approach used to conduct research' },
      { word: 'empirical', meaning: 'Based on observation or experiment rather than theory' },
      { word: 'hypothesis', meaning: 'A proposed explanation to be tested through research' },
      { word: 'correlation', meaning: 'A statistical relationship between two variables' },
      { word: 'longitudinal', meaning: 'A study conducted over an extended period of time' }
    ],
    usefulPhrases: [
      "Building on that point, I would argue that...",
      "The empirical evidence suggests that...",
      "One could challenge this assumption by...",
      "From a methodological standpoint...",
      "This raises an important epistemological question...",
      "I'd like to draw a distinction between..."
    ],
    phases: [
      {
        patterns: [
          { triggers: ['longitudinal', 'strength', 'advantage', 'track', 'over time', 'long term', 'change'],
            responses: [
              "Excellent observation. You're right that longitudinal designs allow us to track developmental trajectories. However, what about attrition bias — the tendency for participants to drop out over time? How might that compromise the validity of our findings?",
              "That's a well-articulated point. The ability to observe change over time is indeed a fundamental strength. But consider this: how do we disentangle the effects of maturation from those of the intervention itself?"
            ], advance: true },
          { triggers: ['limitation', 'weakness', 'problem', 'bias', 'confound', 'variable', 'issue'],
            responses: [
              "A very astute critique. Confounding variables are indeed a persistent challenge. Can you think of specific methodological safeguards that researchers might employ to mitigate these threats to internal validity?",
              "You've identified a crucial limitation. This is precisely why mixed-methods approaches have gained traction. How might qualitative data complement the quantitative findings in such studies?"
            ], advance: true },
          { triggers: ['think', 'believe', 'opinion', 'perspective', 'view', 'agree', 'disagree'],
            responses: [
              "That's an interesting perspective. Could you ground that in specific empirical evidence? In academic discourse, it's essential to substantiate our claims with data. What studies come to mind?",
              "I appreciate you sharing your viewpoint. Let's push this further — what theoretical framework are you drawing on? How does this align with the prevailing paradigm in the field?"
            ], advance: true }
        ],
        fallback: [
          "Let's focus on the methodological aspects. What do you see as the primary strengths or limitations of longitudinal research designs?",
          "Consider the practical challenges of conducting research over extended periods. What implications does this have for the reliability of findings?"
        ]
      },
      {
        patterns: [
          { triggers: ['method', 'approach', 'design', 'qualitative', 'quantitative', 'mixed', 'sample', 'data'],
            responses: [
              "You're touching on a fundamental methodological debate. The choice between qualitative and quantitative approaches isn't merely technical — it reflects deeper epistemological commitments. How does the researcher's paradigm influence their methodology?",
              "Precisely. The research design must align with the nature of the inquiry. Now, let's consider sampling strategies. What are the implications of convenience sampling versus stratified random sampling for the generalizability of findings?"
            ], grammarTip: "In academic discourse, use hedging language: \"This suggests...\" rather than \"This proves...\" — it reflects scholarly caution and intellectual humility.", advance: true },
          { triggers: ['validity', 'reliable', 'reliability', 'replicate', 'replication', 'measure'],
            responses: [
              "Validity and reliability are indeed the cornerstones of rigorous research. But there's an inherent tension — increasing internal validity through controlled conditions may compromise ecological validity. How do we navigate this trade-off?",
              "An essential point. The replication crisis has forced us to reconsider how we evaluate research quality. What role should pre-registration and open data play in strengthening the integrity of empirical research?"
            ], advance: true },
          { triggers: ['theory', 'framework', 'model', 'paradigm', 'conceptual'],
            responses: [
              "Theory-driven research is crucial for advancing our understanding. However, we must be wary of confirmation bias — the tendency to interpret data in ways that support our pre-existing theoretical commitments. How can we guard against this?",
              "The interplay between theory and data is central to the scientific enterprise. Are we testing theories, or are we constructing them from the data? This distinction has profound implications for how we design our studies."
            ], advance: true }
        ],
        fallback: [
          "Let's delve deeper into the methodological choices. How should researchers balance rigour with practical constraints?",
          "Consider how different methodological approaches might yield different conclusions from the same phenomenon. What does this tell us about the nature of knowledge?"
        ]
      },
      {
        patterns: [
          { triggers: ['critique', 'criticize', 'flaw', 'challenge', 'question', 'disagree', 'however', 'but', 'counter'],
            responses: [
              "A rigorous critique — well done. Constructive criticism is the engine of academic progress. Now, can you propose an alternative approach that would address the shortcomings you've identified while remaining feasible within practical constraints?",
              "You've raised a legitimate concern. Let me play devil's advocate: could the authors argue that these limitations, while acknowledged, do not fundamentally undermine the core findings? What would constitute a decisive refutation?"
            ], advance: true },
          { triggers: ['suggest', 'propose', 'recommend', 'alternative', 'instead', 'improve', 'better'],
            responses: [
              "That's a constructive suggestion. Proposing alternatives demonstrates genuine engagement with the material. How would you operationalize this approach? What specific measures and procedures would you employ?",
              "An innovative proposal. However, every methodological choice involves trade-offs. What new limitations might your proposed approach introduce, and how would you mitigate them?"
            ], advance: true },
          { triggers: ['ethics', 'ethical', 'consent', 'participant', 'harm', 'privacy'],
            responses: [
              "You've raised an increasingly important dimension of research methodology. Ethical considerations are not merely procedural hurdles — they fundamentally shape what questions we can ask and how we can investigate them. How should ethical imperatives be balanced against scientific objectives?",
              "Indeed, the ethical dimension cannot be overlooked. Informed consent, participant wellbeing, and data privacy are non-negotiable. But consider: are there research questions that are simply too important not to investigate, even when ethical challenges are considerable?"
            ], advance: true }
        ],
        fallback: [
          "Now I'd like you to adopt a critical lens. What aspects of the methodology would you challenge, and what alternatives would you propose?",
          "Critical evaluation is a hallmark of scholarly rigour. Where do you see the most significant vulnerabilities in the research design?"
        ]
      },
      {
        patterns: [
          { triggers: ['conclusion', 'summary', 'overall', 'in sum', 'to conclude', 'final', 'wrap', 'takeaway'],
            responses: [
              "An excellent synthesis. You've demonstrated a sophisticated understanding of both the theoretical and practical dimensions of research methodology. As we conclude, I'd encourage you all to read the supplementary papers on mixed-methods designs for next week's seminar.",
              "Well articulated. The ability to evaluate methodology critically while proposing constructive alternatives is precisely the skill set that distinguishes a competent researcher. Thank you all for a stimulating discussion."
            ] },
          { triggers: ['learn', 'interesting', 'insight', 'understand', 'appreciate', 'thank'],
            responses: [
              "I'm delighted to hear that. The capacity for critical methodological thinking will serve you well throughout your academic careers. Remember — the goal is not to find the perfect method, but to make informed, transparent choices about the inevitable trade-offs.",
              "Thank you for your engaged participation. Rigorous methodology is the foundation upon which credible knowledge is built. Continue to question assumptions and demand evidence — that is the essence of scholarly inquiry."
            ] },
          { triggers: ['apply', 'practice', 'research', 'project', 'dissertation', 'thesis', 'study'],
            responses: [
              "Absolutely — connecting theory to practice is essential. When designing your own research, begin with a clear question, select your methodology based on epistemological fit, and always anticipate potential limitations. I'm happy to discuss your individual projects during office hours.",
              "That's the right mindset. Your own research projects will benefit enormously from this kind of methodological awareness. Remember: transparency about your choices and their limitations is what distinguishes rigorous scholarship from mere data collection."
            ] }
        ],
        fallback: [
          "Let's draw our discussion to a close. What key methodological principles will you take away from today's seminar?",
          "As we wrap up, consider how today's discussion might inform your own approach to research. What has resonated most strongly?"
        ]
      }
    ],
    fallbackResponses: [
      "Could you elaborate on that point? Try to connect it to the methodological concepts we've been discussing.",
      "That's an interesting observation. How does it relate to the empirical evidence we've examined?",
      "Let's ground this in the literature. Can you reference specific studies or theoretical frameworks to support your argument?"
    ]
  },
  {
    id: 'business-negotiation',
    title: 'Business Negotiation',
    icon: '🤝',
    description: 'Negotiate terms of a business partnership agreement',
    difficulty: 'Advanced',
    aiRole: 'Business Partner',
    openingMessage: "Good morning. Thank you for taking the time to meet today. As you know, our companies have been exploring the possibility of a strategic partnership. I believe there's significant potential for mutual benefit here. Shall we begin by discussing what each side hopes to achieve from this collaboration?",
    vocabulary: [
      { word: 'stakeholder', meaning: 'A person or group with an interest in the outcome' },
      { word: 'leverage', meaning: 'Advantage or power used in negotiations' },
      { word: 'due diligence', meaning: 'Thorough investigation before a business deal' },
      { word: 'equity', meaning: 'Ownership share in a company' },
      { word: 'ROI', meaning: 'Return on investment — profit relative to cost' },
      { word: 'synergy', meaning: 'Combined value greater than the sum of parts' }
    ],
    usefulPhrases: [
      "We'd like to propose the following terms...",
      "That's an interesting offer, but we'd need to see...",
      "Perhaps we could find a middle ground on...",
      "From our perspective, the key priority is...",
      "We're prepared to make a concession on... provided that...",
      "Let me consult with my team and get back to you on that."
    ],
    phases: [
      {
        patterns: [
          { triggers: ['goal', 'objective', 'hope', 'achieve', 'want', 'looking for', 'interested', 'aim', 'expect'],
            responses: [
              "Those are well-defined objectives. From our side, we're primarily looking to expand our market reach in the Asia-Pacific region, and your established distribution network there is extremely attractive. How do you envision the revenue-sharing structure for this partnership?",
              "I appreciate the transparency. Our priorities are quite complementary — we bring the technology platform, and you bring the market expertise. Let's talk specifics. What kind of equity split or revenue share did you have in mind?"
            ], advance: true },
          { triggers: ['market', 'grow', 'expand', 'scale', 'customer', 'revenue', 'profit'],
            responses: [
              "Market expansion is certainly a compelling driver for this partnership. Our projections suggest a potential 40% increase in combined revenue within the first 18 months. However, the question remains — how do we structure this to ensure both parties bear proportional risk? What's your initial thinking on that?",
              "I couldn't agree more about the growth potential. Our due diligence indicates strong synergies between our respective portfolios. Shall we move on to discussing the specific terms of the arrangement?"
            ], advance: true },
          { triggers: ['hello', 'morning', 'afternoon', 'pleased', 'glad', 'thank', 'yes', 'sure', 'absolutely'],
            responses: [
              "Likewise, it's a pleasure. I've been looking forward to this discussion. To set the stage — could you outline your company's primary objectives for this partnership? Understanding your priorities will help us identify areas of mutual interest.",
              "Thank you. I think we have a genuine opportunity here. Before we get into the specifics, I'd like to understand what success looks like from your perspective. What are the key outcomes you're hoping to achieve?"
            ] }
        ],
        fallback: [
          "Let's establish a foundation for our discussion. What does your team see as the primary drivers for pursuing this partnership?",
          "I think it's important we're aligned on objectives from the outset. What are the non-negotiable outcomes for your side?"
        ]
      },
      {
        patterns: [
          { triggers: ['propose', 'offer', 'suggest', 'terms', 'deal', 'structure', 'split', 'share', 'percent', 'arrangement'],
            responses: [
              "That's a reasonable starting position. However, given that our technology infrastructure represents the core IP in this arrangement, we feel a 60-40 revenue split in our favour would more accurately reflect each party's contribution. We're open to adjusting this based on performance milestones. What are your thoughts?",
              "I appreciate you putting a concrete proposal on the table. Let me be candid — our board would need to see a more favourable equity position to approve this arrangement. Could we explore a tiered structure where the split adjusts based on quarterly performance targets?"
            ], grammarTip: "In negotiations, use conditional language to keep options open: \"We would be prepared to...\" or \"We could consider... provided that...\" — this signals flexibility without committing.", advance: true },
          { triggers: ['invest', 'investment', 'capital', 'fund', 'finance', 'money', 'budget', 'cost'],
            responses: [
              "Investment allocation is indeed critical. Our financial team has modelled several scenarios. A joint investment of $2 million in the first year would position us well, but we'd want clear milestones tied to each tranche of funding. How does your team view the initial capital commitment?",
              "Let's be precise about the financial architecture. We're thinking of a phased investment approach — $500,000 upfront with additional capital released upon hitting agreed KPIs. This mitigates risk for both parties. Does this approach align with your financial planning?"
            ], advance: true },
          { triggers: ['timeline', 'when', 'deadline', 'launch', 'start', 'begin', 'schedule'],
            responses: [
              "Timing is certainly a factor. Our stakeholders are keen to see tangible progress within Q2. I'd propose a 90-day implementation runway with a soft launch in the target market. Does that timeline work for your operational capacity?",
              "We're looking at a phased rollout. The due diligence phase should take about six weeks, followed by a pilot programme in a single market. If the pilot metrics are positive, we scale. Shall we map out the specific milestones?"
            ] }
        ],
        fallback: [
          "I'd like to hear your specific proposal. What terms do you believe would create a fair and sustainable partnership?",
          "Let's get into the details. What structure do you envision for the revenue sharing and governance of this partnership?"
        ]
      },
      {
        patterns: [
          { triggers: ['counter', 'alternative', 'instead', 'rather', 'adjust', 'modify', 'revise', 'reconsider', 'compromise', 'middle ground'],
            responses: [
              "I hear you, and I appreciate the willingness to negotiate. What if we met in the middle — say a 55-45 split for the first year, with a renegotiation clause triggered by hitting revenue targets? We'd also want exclusivity in the Asia-Pacific region. Is that something you could take to your board?",
              "That's a constructive counter-proposal. Let me think about this. We could potentially agree to those terms if you'd be willing to include a performance guarantee — a minimum commitment to marketing spend in the first two quarters. Would that be acceptable?"
            ], advance: true },
          { triggers: ['concern', 'risk', 'worry', 'problem', 'issue', 'difficult', 'challenge', 'hesitant'],
            responses: [
              "Your concerns are entirely valid, and I don't want to minimize them. Risk mitigation should be built into the agreement. What if we included exit clauses with clearly defined trigger conditions? That way, neither party is locked into an arrangement that isn't delivering results.",
              "I understand the hesitation. Every partnership carries inherent risk. Perhaps we could structure this with a six-month probationary period, after which both parties can renegotiate or exit without penalty. Would that address your concerns?"
            ], advance: true },
          { triggers: ['exclusive', 'compete', 'competition', 'restrict', 'clause', 'non-compete', 'protect'],
            responses: [
              "Exclusivity is certainly negotiable, but it cuts both ways. If we grant regional exclusivity, we'd need assurance of minimum performance thresholds. We can't afford to lock up a market without seeing returns. Let's define what those benchmarks would look like.",
              "We're open to discussing exclusivity provisions, but they need to be reciprocal. If you're asking us to refrain from partnering with competitors in your market, we'd need similar protections in ours. Shall we draft the specific terms?"
            ] }
        ],
        fallback: [
          "Negotiations involve give and take. Where do you see room for flexibility, and what are your firm requirements?",
          "Let's try to find common ground. What concessions might your side be willing to make in exchange for the terms you're prioritizing?"
        ]
      },
      {
        patterns: [
          { triggers: ['agree', 'accept', 'deal', 'work', 'fine', 'fair', 'reasonable', 'happy', 'satisfied', 'good'],
            responses: [
              "Excellent. I'm pleased we've reached an agreement in principle. I'll have our legal team draft a memorandum of understanding reflecting today's discussion. We should plan for a formal signing within two weeks, pending board approval on both sides. Thank you for a very productive negotiation.",
              "Wonderful. I believe we've crafted a framework that serves both parties well. The next step is to formalize these terms through our respective legal counsel. I'll have a draft agreement sent over by Friday. This has been a very constructive discussion."
            ] },
          { triggers: ['legal', 'contract', 'lawyer', 'counsel', 'formal', 'document', 'sign', 'paper', 'writing'],
            responses: [
              "Absolutely — nothing is binding until it's in writing. I'll instruct our legal team to prepare a comprehensive partnership agreement incorporating all the terms we've discussed today. Shall we schedule a follow-up meeting for next week to review the draft?",
              "Of course, the devil is in the details, as they say. Our counsel will draft the formal agreement. I suggest both legal teams coordinate directly to expedite the process. Is there a timeline on your end for board ratification?"
            ] },
          { triggers: ['thank', 'pleasure', 'forward', 'look forward', 'great', 'appreciate', 'bye', 'goodbye'],
            responses: [
              "The pleasure is mine. I'm genuinely optimistic about this partnership. I believe we've laid a strong foundation today. I'll be in touch early next week with the draft terms. Thank you for your time and your willingness to find mutually beneficial solutions.",
              "Thank you for a thoroughly professional and productive negotiation. I have every confidence this partnership will deliver outstanding results for both organizations. Let's touch base on Monday to finalize the timeline. Have a great rest of your day."
            ] }
        ],
        fallback: [
          "I think we're close to an agreement. Shall we summarize the key terms and next steps to ensure we're fully aligned?",
          "Let's work towards closing this out. Are there any remaining points of contention, or are we ready to move forward?"
        ]
      }
    ],
    fallbackResponses: [
      "Could you clarify your position on that? I want to ensure I understand your perspective fully before responding.",
      "That's an interesting point. How does it relate to the commercial terms we've been discussing?",
      "Let's make sure we're on the same page. Could you elaborate on what you're proposing?"
    ]
  },
  {
    id: 'philosophical-debate',
    title: 'Philosophical Debate',
    icon: '🧠',
    description: 'Engage in a debate about free will versus determinism',
    difficulty: 'Advanced',
    aiRole: 'Philosophy Professor',
    openingMessage: "Welcome to today's debate. We'll be exploring one of philosophy's most enduring questions: do human beings possess genuine free will, or are our actions entirely determined by prior causes? I'd like to begin by asking you to state your position. Do you lean towards free will, determinism, or perhaps some form of compatibilism?",
    vocabulary: [
      { word: 'determinism', meaning: 'The view that all events are caused by prior events and natural laws' },
      { word: 'compatibilism', meaning: 'The position that free will and determinism can coexist' },
      { word: 'agency', meaning: 'The capacity to act independently and make choices' },
      { word: 'causation', meaning: 'The relationship between cause and effect' },
      { word: 'volition', meaning: 'The exercise of will; making a deliberate choice' },
      { word: 'autonomy', meaning: 'Self-governance; the ability to direct one\'s own life' }
    ],
    usefulPhrases: [
      "I would contend that...",
      "This argument rests on the assumption that...",
      "One could object to this by pointing out that...",
      "The logical implication of that position is...",
      "If we follow this line of reasoning to its conclusion...",
      "I'd like to draw a distinction between... and..."
    ],
    phases: [
      {
        patterns: [
          { triggers: ['free will', 'freedom', 'choice', 'choose', 'libertarian', 'indetermin', 'agent', 'autonomous'],
            responses: [
              "An interesting stance. The libertarian position on free will is intuitively appealing, but it faces a formidable challenge: if our decisions are not determined by prior causes, then aren't they essentially random? And if they're random, in what meaningful sense are they truly 'ours'? How would you respond to this objection?",
              "So you're defending a robust notion of free will. Consider this: neuroscience has shown that brain activity associated with a decision can be detected before the person becomes consciously aware of making that decision. Does this evidence from Libet's experiments trouble your position?"
            ], advance: true },
          { triggers: ['determinism', 'determined', 'cause', 'caused', 'inevitable', 'no free will', 'illusion', 'physics', 'law'],
            responses: [
              "A bold position. Hard determinism has a certain austere logic to it. But consider the implications for moral responsibility: if no one could have acted otherwise, how can we justifiably hold anyone accountable for their actions? Doesn't your position undermine the entire foundation of ethics and justice?",
              "You've taken the determinist stance. Let me press you on this: if determinism is true, then your very argument for determinism was itself determined. You couldn't have believed otherwise. Does this self-referential paradox not give you pause?"
            ], advance: true },
          { triggers: ['compatibil', 'both', 'middle', 'reconcile', 'soft determinism', 'between'],
            responses: [
              "Ah, the compatibilist position — often called the most sophisticated but also the most contentious of the three. Critics from both sides accuse compatibilists of having their cake and eating it too. How do you define 'free will' in a way that's compatible with causal determinism without merely redefining the term into vacuity?",
              "Compatibilism has a distinguished philosophical pedigree — Hume, Frankfurt, Dennett. But the hard incompatibilist might argue that you've simply changed the subject. If every action is causally necessitated, calling it 'free' because it wasn't coerced seems like a semantic sleight of hand. How do you counter this?"
            ], advance: true }
        ],
        fallback: [
          "Before we proceed, I'd like to hear your initial position. Do you believe in free will, or do you think our actions are determined by forces beyond our conscious control?",
          "Let's establish your thesis. Where do you stand on the spectrum between libertarian free will and hard determinism?"
        ]
      },
      {
        patterns: [
          { triggers: ['moral', 'responsibility', 'blame', 'praise', 'punishment', 'justice', 'account', 'deserve', 'guilt'],
            responses: [
              "You've identified what many consider the most consequential dimension of this debate. If determinism is true, it seems to follow that no one truly deserves punishment or praise. Yet our entire legal and social framework presupposes moral responsibility. Can you envision a coherent system of justice that doesn't rely on the assumption of free will?",
              "The question of moral responsibility is indeed where the rubber meets the road. Consider Frankfurt's thought experiments about alternative possibilities: he argues that moral responsibility doesn't require the ability to do otherwise — only that one acts on one's own authentic desires. Does this satisfy you, or does it concede too much?"
            ], grammarTip: "In philosophical debate, use subjunctive constructions: \"Were determinism true, it would follow that...\" and conditional chains: \"If P, then Q; but not Q; therefore not P\" (modus tollens).", advance: true },
          { triggers: ['science', 'brain', 'neuro', 'physics', 'quantum', 'biology', 'experiment', 'evidence'],
            responses: [
              "The empirical angle is crucial. Neuroscience seems to support determinism at the macroscopic level, but quantum mechanics introduces genuine indeterminacy at the subatomic level. The question is whether quantum indeterminacy scales up to influence neural processes in any meaningful way. What's your assessment of this argument?",
              "You raise an important point about the relationship between science and philosophy. However, we must be careful not to conflate explanatory levels. Even if we fully mapped the neural correlates of every decision, would that settle the philosophical question? Or is free will a concept that operates at a different level of analysis entirely?"
            ], advance: true },
          { triggers: ['consciousness', 'experience', 'awareness', 'subjective', 'mind', 'feel', 'phenomenal', 'qualia'],
            responses: [
              "The hard problem of consciousness does indeed intersect with the free will debate in fascinating ways. If subjective experience is irreducible to physical processes, perhaps volition occupies that same irreducible space. But this risks placing free will beyond the reach of rational inquiry altogether. How do you navigate this tension?",
              "Consciousness is often invoked as the missing ingredient that makes free will possible. But the explanatory gap between neural activity and phenomenal experience is precisely what makes this argument difficult to evaluate. Are we explaining free will, or are we simply relocating the mystery?"
            ], advance: true }
        ],
        fallback: [
          "Let's examine the implications of your position. How does your stance on free will affect your views on moral responsibility, punishment, and social organization?",
          "Consider the empirical evidence from neuroscience and physics. How does scientific knowledge inform or constrain the philosophical debate about free will?"
        ]
      },
      {
        patterns: [
          { triggers: ['object', 'counter', 'however', 'but', 'disagree', 'problem', 'flaw', 'weak', 'challenge', 'wrong'],
            responses: [
              "A penetrating objection. You're right to press on that point. Let me offer a defence and see if you can dismantle it: one might argue that even within a deterministic framework, the distinction between actions caused by internal deliberation and those caused by external coercion is morally significant. Does this pragmatic distinction satisfy you?",
              "You've put your finger on a genuine difficulty. This is precisely why the debate has persisted for millennia. But consider whether the objection applies equally to all positions, or whether it targets one view more than others. Is there a version of the argument that survives your critique?"
            ], advance: true },
          { triggers: ['synthesis', 'combine', 'integrate', 'resolution', 'resolve', 'third way', 'beyond', 'transcend'],
            responses: [
              "Attempting a synthesis — very ambitious. Some contemporary philosophers, such as Dennett, argue that the kind of free will worth wanting is not the metaphysical variety but rather a practical, evolutionary capacity for flexible, reflective decision-making. Does this pragmatic redefinition appeal to you, or does it evade the fundamental question?",
              "The impulse to synthesize is admirable, but we must ensure we're not simply papering over a genuine contradiction. Can you articulate precisely how your synthesis resolves the apparent incompatibility, rather than merely asserting that it does?"
            ], advance: true },
          { triggers: ['Frankfurt', 'Hume', 'Kant', 'Spinoza', 'Dennett', 'Sartre', 'philosopher', 'Schopenhauer'],
            responses: [
              "Excellent — engaging directly with the philosophical tradition. That thinker's contribution to this debate is indeed significant. However, every major position has faced formidable objections. What do you see as the strongest counterargument to the view you've just cited, and how might it be addressed?",
              "It's valuable to draw on the history of philosophy here. But remember: the authority of a philosopher is not itself an argument. The question is whether their reasoning withstands scrutiny. Can you reconstruct their argument in your own terms and evaluate its premises?"
            ], advance: true }
        ],
        fallback: [
          "Now I'd like you to engage with the strongest objection to your position. What is the most compelling argument against your view, and how do you respond to it?",
          "Let's push the debate further. Can you identify a point of potential synthesis between the opposing positions, or do you believe they are fundamentally irreconcilable?"
        ]
      },
      {
        patterns: [
          { triggers: ['conclude', 'conclusion', 'final', 'summary', 'overall', 'end', 'wrap', 'position', 'stand'],
            responses: [
              "A thoughtful conclusion. You've demonstrated the ability to engage with complex philosophical arguments at a sophisticated level. Whether one ultimately embraces free will, determinism, or compatibilism, the exercise of rigorous argumentation is itself a testament to our capacity for rational deliberation. Thank you for a stimulating debate.",
              "Well argued throughout. Regardless of where one lands on this question, the debate itself illuminates fundamental aspects of what it means to be a thinking, choosing being. I commend your willingness to engage with positions that challenge your own. This is the essence of philosophical inquiry."
            ] },
          { triggers: ['learn', 'interesting', 'thought', 'enjoy', 'insight', 'appreciate', 'thank', 'grateful'],
            responses: [
              "The mark of a genuine philosopher is not certainty but the willingness to follow the argument wherever it leads. You've shown that quality today. I'd encourage you to explore the work of Frankfurt on moral responsibility and Dennett on compatibilism for further reading. This has been a truly enriching discussion.",
              "Thank you for your intellectual courage and rigour. Philosophy is not about winning debates — it's about deepening our understanding of fundamental questions. Your engagement today has been exemplary. Continue to question, to reason, and to remain open to revision."
            ] },
          { triggers: ['practical', 'life', 'daily', 'matter', 'real world', 'apply', 'relevance', 'important', 'why'],
            responses: [
              "An excellent question to close on. The free will debate is not merely academic — it has profound implications for how we structure our legal systems, how we educate our children, and how we understand ourselves as moral agents. Philosophy, at its best, transforms the way we navigate the world. Thank you for a remarkable debate.",
              "You've touched on something crucial. The practical implications of this debate extend to criminal justice, mental health, education, and personal responsibility. Far from being an ivory tower exercise, the question of free will shapes the very fabric of human society. I'm glad you see its relevance."
            ] }
        ],
        fallback: [
          "As we draw to a close, I'd like you to articulate your final position. Has the debate shifted your thinking in any way?",
          "Let's conclude. What is the most important insight you've gained from this debate, and how might it inform your broader philosophical outlook?"
        ]
      }
    ],
    fallbackResponses: [
      "That's an intriguing point. Could you develop it further and connect it to the central question of free will versus determinism?",
      "I'd like to hear more of your reasoning. What philosophical principles or evidence are you drawing on?",
      "Let's sharpen the argument. Can you state your position more precisely and anticipate the strongest objection to it?"
    ]
  }
]

export const useConversation = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentScenario, setCurrentScenario] = useState<ConversationScenario | null>(null)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const messageIdRef = useRef(0)

  const genId = () => {
    messageIdRef.current += 1
    return `msg-${messageIdRef.current}-${Date.now()}`
  }

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.85
    utterance.pitch = 1
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }, [])

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
  }, [])

  const selectScenario = useCallback((scenarioId: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId)
    if (!scenario) return

    setCurrentScenario(scenario)
    setCurrentPhase(0)
    messageIdRef.current = 0

    const aiMessage: Message = {
      id: genId(),
      sender: 'ai',
      text: scenario.openingMessage,
      timestamp: new Date()
    }
    setMessages([aiMessage])
  }, [])

  const findResponse = useCallback((userText: string, scenario: ConversationScenario, phase: number): {
    text: string
    grammarTip?: string
    nextPhase: number
  } => {
    const lower = userText.toLowerCase().trim()
    const safePhase = Math.min(phase, scenario.phases.length - 1)
    const phaseConfig = scenario.phases[safePhase]

    for (const pattern of phaseConfig.patterns) {
      const matched = pattern.triggers.some(t => lower.includes(t))
      if (matched) {
        return {
          text: pick(pattern.responses),
          grammarTip: pattern.grammarTip,
          nextPhase: pattern.advance ? Math.min(phase + 1, scenario.phases.length - 1) : phase
        }
      }
    }

    // Phase fallback
    if (phaseConfig.fallback.length > 0) {
      return {
        text: pick(phaseConfig.fallback),
        nextPhase: phase
      }
    }

    // Scenario fallback
    return {
      text: pick(scenario.fallbackResponses),
      nextPhase: phase
    }
  }, [])

  const sendMessage = useCallback((text: string, autoSpeak: boolean = false) => {
    if (!text.trim() || !currentScenario) return

    const userMessage: Message = {
      id: genId(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // Simulate typing delay
    const delay = 800 + Math.random() * 1200
    setTimeout(() => {
      setIsTyping(false)

      const result = findResponse(text, currentScenario, currentPhase)
      setCurrentPhase(result.nextPhase)

      const aiMessage: Message = {
        id: genId(),
        sender: 'ai',
        text: result.text,
        timestamp: new Date(),
        grammarTip: result.grammarTip
      }

      setMessages(prev => [...prev, aiMessage])

      if (autoSpeak) {
        speak(result.text)
      }
    }, delay)
  }, [currentScenario, currentPhase, findResponse, speak])

  const resetConversation = useCallback(() => {
    setMessages([])
    setCurrentScenario(null)
    setCurrentPhase(0)
    stopSpeaking()
  }, [stopSpeaking])

  return {
    messages,
    currentScenario,
    currentPhase,
    isTyping,
    isSpeaking,
    scenarios,
    selectScenario,
    sendMessage,
    resetConversation,
    speak,
    stopSpeaking
  }
}
