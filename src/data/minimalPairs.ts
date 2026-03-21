export interface MinimalPair {
  id: string
  pair: [string, string]
  category: string
  hint: string
}

export const minimalPairs: MinimalPair[] = [
  // Vowel pairs
  { id: 'v1', pair: ['ship', 'sheep'], category: 'Vowels', hint: '/ɪ/ vs /iː/ — short vs long "ee"' },
  { id: 'v2', pair: ['bit', 'beat'], category: 'Vowels', hint: '/ɪ/ vs /iː/ — short vs long "ee"' },
  { id: 'v3', pair: ['sit', 'seat'], category: 'Vowels', hint: '/ɪ/ vs /iː/ — short vs long "ee"' },
  { id: 'v4', pair: ['lip', 'leap'], category: 'Vowels', hint: '/ɪ/ vs /iː/ — short vs long "ee"' },
  { id: 'v5', pair: ['cat', 'cut'], category: 'Vowels', hint: '/æ/ vs /ʌ/ — "a" in cat vs "u" in cut' },
  { id: 'v6', pair: ['hat', 'hut'], category: 'Vowels', hint: '/æ/ vs /ʌ/ — "a" in hat vs "u" in hut' },
  { id: 'v7', pair: ['bat', 'but'], category: 'Vowels', hint: '/æ/ vs /ʌ/ — "a" in bat vs "u" in but' },
  { id: 'v8', pair: ['cup', 'cop'], category: 'Vowels', hint: '/ʌ/ vs /ɒ/ — "u" in cup vs "o" in cop' },
  { id: 'v9', pair: ['full', 'fool'], category: 'Vowels', hint: '/ʊ/ vs /uː/ — short vs long "oo"' },
  { id: 'v10', pair: ['pull', 'pool'], category: 'Vowels', hint: '/ʊ/ vs /uː/ — short vs long "oo"' },
  { id: 'v11', pair: ['bed', 'bad'], category: 'Vowels', hint: '/e/ vs /æ/ — "e" in bed vs "a" in bad' },
  { id: 'v12', pair: ['pen', 'pan'], category: 'Vowels', hint: '/e/ vs /æ/ — "e" in pen vs "a" in pan' },
  { id: 'v13', pair: ['men', 'man'], category: 'Vowels', hint: '/e/ vs /æ/ — "e" in men vs "a" in man' },

  // Consonant pairs
  { id: 'c1', pair: ['light', 'right'], category: 'Consonants', hint: '/l/ vs /r/ — L vs R' },
  { id: 'c2', pair: ['led', 'red'], category: 'Consonants', hint: '/l/ vs /r/ — L vs R' },
  { id: 'c3', pair: ['long', 'wrong'], category: 'Consonants', hint: '/l/ vs /r/ — L vs R' },
  { id: 'c4', pair: ['lock', 'rock'], category: 'Consonants', hint: '/l/ vs /r/ — L vs R' },
  { id: 'c5', pair: ['lake', 'rake'], category: 'Consonants', hint: '/l/ vs /r/ — L vs R' },
  { id: 'c6', pair: ['fan', 'van'], category: 'Consonants', hint: '/f/ vs /v/ — unvoiced vs voiced' },
  { id: 'c7', pair: ['fast', 'vast'], category: 'Consonants', hint: '/f/ vs /v/ — unvoiced vs voiced' },
  { id: 'c8', pair: ['fine', 'vine'], category: 'Consonants', hint: '/f/ vs /v/ — unvoiced vs voiced' },
  { id: 'c9', pair: ['bat', 'pat'], category: 'Consonants', hint: '/b/ vs /p/ — voiced vs unvoiced' },
  { id: 'c10', pair: ['bear', 'pear'], category: 'Consonants', hint: '/b/ vs /p/ — voiced vs unvoiced' },
  { id: 'c11', pair: ['buy', 'pie'], category: 'Consonants', hint: '/b/ vs /p/ — voiced vs unvoiced' },
  { id: 'c12', pair: ['thin', 'tin'], category: 'Consonants', hint: '/θ/ vs /t/ — "th" vs "t"' },
  { id: 'c13', pair: ['think', 'sink'], category: 'Consonants', hint: '/θ/ vs /s/ — "th" vs "s"' },
  { id: 'c14', pair: ['three', 'tree'], category: 'Consonants', hint: '/θ/ vs /t/ — "th" vs "t"' },
  { id: 'c15', pair: ['then', 'den'], category: 'Consonants', hint: '/ð/ vs /d/ — voiced "th" vs "d"' },
  { id: 'c16', pair: ['that', 'dat'], category: 'Consonants', hint: '/ð/ vs /d/ — voiced "th" vs "d"' },
  { id: 'c17', pair: ['sing', 'thing'], category: 'Consonants', hint: '/s/ vs /θ/ — "s" vs "th"' },
  { id: 'c18', pair: ['jaw', 'shore'], category: 'Consonants', hint: '/dʒ/ vs /ʃ/ — "j" vs "sh"' },
  { id: 'c19', pair: ['cheap', 'sheep'], category: 'Consonants', hint: '/tʃ/ vs /ʃ/ — "ch" vs "sh"' },
  { id: 'c20', pair: ['chain', 'Shane'], category: 'Consonants', hint: '/tʃ/ vs /ʃ/ — "ch" vs "sh"' },

  // Word stress pairs
  { id: 's1', pair: ['record', 'record'], category: 'Stress', hint: 'REcord (noun) vs reCORD (verb) — stress changes meaning' },
  { id: 's2', pair: ['present', 'present'], category: 'Stress', hint: 'PREsent (noun/adj) vs preSENT (verb)' },
  { id: 's3', pair: ['desert', 'dessert'], category: 'Stress', hint: 'DEsert (dry land) vs deSSERT (sweet food)' },
  { id: 's4', pair: ['object', 'object'], category: 'Stress', hint: 'OBject (noun) vs obJECT (verb)' },
  { id: 's5', pair: ['permit', 'permit'], category: 'Stress', hint: 'PERmit (noun) vs perMIT (verb)' },
]
