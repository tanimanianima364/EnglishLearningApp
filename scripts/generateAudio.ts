/**
 * Generate high-quality audio files for listening comprehension passages
 * using Google Cloud Text-to-Speech Neural2 voices.
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=./key.json npx tsx scripts/generateAudio.ts
 *
 * Generates MP3 files in public/audio/ for each listening passage.
 * Dialogues/debates use different voices for each speaker.
 * US and UK accents are mixed for C2 passages.
 */

import textToSpeech from '@google-cloud/text-to-speech'
import * as fs from 'fs'
import * as path from 'path'
import { listeningPassages } from '../src/data/listeningComprehension'
import { dictationSentences } from '../src/data/dictationSentences'

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'audio')

// Voice assignments for variety and accent diversity
const VOICES = {
  // US English
  monologue_us_female: { languageCode: 'en-US', name: 'en-US-Neural2-C', ssmlGender: 'FEMALE' as const },
  monologue_us_male: { languageCode: 'en-US', name: 'en-US-Neural2-D', ssmlGender: 'MALE' as const },
  lecture_us_female: { languageCode: 'en-US', name: 'en-US-Neural2-F', ssmlGender: 'FEMALE' as const },
  lecture_us_male: { languageCode: 'en-US', name: 'en-US-Neural2-J', ssmlGender: 'MALE' as const },
  // UK English (for C2 accent diversity)
  monologue_gb_female: { languageCode: 'en-GB', name: 'en-GB-Neural2-A', ssmlGender: 'FEMALE' as const },
  monologue_gb_male: { languageCode: 'en-GB', name: 'en-GB-Neural2-B', ssmlGender: 'MALE' as const },
}

// Assign voice based on passage type and level
function getVoice(type: string, cefrLevel: string, speakerIndex: number = 0) {
  const useUK = cefrLevel === 'C2' && speakerIndex % 2 === 1

  if (type === 'lecture') {
    return useUK ? VOICES.monologue_gb_male : VOICES.lecture_us_female
  }
  if (type === 'monologue') {
    return useUK ? VOICES.monologue_gb_female : VOICES.monologue_us_male
  }
  // dialogue/debate: alternate voices
  if (speakerIndex === 0) return VOICES.monologue_us_female
  return useUK ? VOICES.monologue_gb_male : VOICES.monologue_us_male
}

// Split dialogue transcript into speaker segments
function splitBySpeaker(transcript: string): { speaker: number; text: string }[] {
  const segments: { speaker: number; text: string }[] = []
  const parts = transcript.split(/(?=Speaker [A-Z] (?:says|responds|asks|replies|adds|counters|argues|continues|concludes):)/i)

  for (const part of parts) {
    const trimmed = part.trim()
    if (!trimmed) continue
    const isB = /^Speaker [Bb]/i.test(trimmed)
    segments.push({ speaker: isB ? 1 : 0, text: trimmed })
  }

  return segments.length > 0 ? segments : [{ speaker: 0, text: transcript }]
}

async function generatePassageAudio(
  client: textToSpeech.TextToSpeechClient,
  passage: { id: string; transcript: string; type: string; cefrLevel: string },
) {
  const outFile = path.join(OUTPUT_DIR, `${passage.id}.mp3`)

  // Skip if already generated
  if (fs.existsSync(outFile)) {
    console.log(`  [skip] ${passage.id} — already exists`)
    return
  }

  const isMultiSpeaker = passage.type === 'dialogue' || passage.type === 'debate'

  if (isMultiSpeaker) {
    // Generate separate audio for each speaker, then concatenate
    const segments = splitBySpeaker(passage.transcript)
    const audioBuffers: Buffer[] = []

    for (const seg of segments) {
      const voice = getVoice(passage.type, passage.cefrLevel, seg.speaker)
      const [response] = await client.synthesizeSpeech({
        input: { text: seg.text },
        voice,
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: passage.cefrLevel === 'C2' ? 1.05 : passage.cefrLevel === 'C1' ? 1.0 : 0.9,
        },
      })
      if (response.audioContent) {
        audioBuffers.push(Buffer.from(response.audioContent as Uint8Array))
      }
    }

    // Simple concatenation (MP3 frames are independently decodable)
    const combined = Buffer.concat(audioBuffers)
    fs.writeFileSync(outFile, combined)
  } else {
    // Single speaker
    const voice = getVoice(passage.type, passage.cefrLevel)
    const [response] = await client.synthesizeSpeech({
      input: { text: passage.transcript },
      voice,
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: passage.cefrLevel === 'C2' ? 1.05 : passage.cefrLevel === 'C1' ? 1.0 : 0.9,
      },
    })

    if (response.audioContent) {
      fs.writeFileSync(outFile, Buffer.from(response.audioContent as Uint8Array))
    }
  }

  console.log(`  [done] ${passage.id}`)
}

async function main() {
  console.log('=== Audio Generation for English Learning App ===')
  console.log(`Output: ${OUTPUT_DIR}`)

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const client = new textToSpeech.TextToSpeechClient()

  // Generate listening comprehension audio
  console.log(`\nListening Comprehension: ${listeningPassages.length} passages`)
  for (const passage of listeningPassages) {
    await generatePassageAudio(client, passage)
  }

  // Generate C1/C2 dictation audio
  const advancedDictation = dictationSentences.filter(d => d.cefrLevel === 'C1' || d.cefrLevel === 'C2')
  console.log(`\nDictation (C1/C2): ${advancedDictation.length} sentences`)
  for (const sentence of advancedDictation) {
    const outFile = path.join(OUTPUT_DIR, `dictation-${sentence.id}.mp3`)
    if (fs.existsSync(outFile)) {
      console.log(`  [skip] ${sentence.id}`)
      continue
    }

    const voice = sentence.cefrLevel === 'C2' ? VOICES.monologue_gb_male : VOICES.monologue_us_female
    const [response] = await client.synthesizeSpeech({
      input: { text: sentence.text },
      voice,
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: sentence.speed === 'fast' ? 1.1 : sentence.speed === 'slow' ? 0.8 : 0.95,
      },
    })

    if (response.audioContent) {
      fs.writeFileSync(outFile, Buffer.from(response.audioContent as Uint8Array))
    }
    console.log(`  [done] ${sentence.id}`)
  }

  // Summary
  const audioFiles = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.mp3'))
  const totalSize = audioFiles.reduce((sum, f) => sum + fs.statSync(path.join(OUTPUT_DIR, f)).size, 0)
  console.log(`\n=== Done ===`)
  console.log(`Files: ${audioFiles.length}`)
  console.log(`Total size: ${(totalSize / 1024 / 1024).toFixed(1)} MB`)
}

main().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
