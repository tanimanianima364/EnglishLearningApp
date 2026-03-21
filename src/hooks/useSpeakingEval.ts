import { useState, useCallback } from 'react'
import { SpeakingEvaluation, CEFRLevel } from '../types/ai'
import { isAIAvailable, callClaudeJSON } from '../services/aiService'
import { speakingEvalPrompt } from '../services/aiPrompts'
import { scoreContentFrequency, getFrequencyBand } from '../utils/frequencyUtils'

const FILLER_WORDS = ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'literally', 'so', 'well', 'I mean', 'kind of', 'sort of']

function computeLocalMetrics(transcript: string, durationSec: number) {
  const words = transcript.split(/\s+/).filter(Boolean)
  const wordCount = words.length
  const wpm = durationSec > 0 ? Math.round((wordCount / durationSec) * 60) : 0

  const lower = transcript.toLowerCase()
  const fillerWords = FILLER_WORDS.filter(f => lower.includes(f))
  const fillerCount = FILLER_WORDS.reduce((count, f) => {
    const matches = lower.split(f).length - 1
    return count + matches
  }, 0)

  const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-z'-]/g, '')).filter(w => w.length >= 2))
  const typeTokenRatio = wordCount > 0 ? Math.round((uniqueWords.size / wordCount) * 100) / 100 : 0

  const freqScore = scoreContentFrequency(transcript)
  const freqBand = getFrequencyBand(freqScore)

  return { wordCount, wpm, fillerWords, fillerCount, typeTokenRatio, freqScore, freqBand }
}

export const useSpeakingEval = () => {
  const [evaluation, setEvaluation] = useState<SpeakingEvaluation | null>(null)
  const [localMetrics, setLocalMetrics] = useState<ReturnType<typeof computeLocalMetrics> | null>(null)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const evaluateWithAI = useCallback(async (transcript: string, prompt: string, durationMs: number) => {
    const durationSec = Math.round(durationMs / 1000)
    const local = computeLocalMetrics(transcript, durationSec)
    setLocalMetrics(local)

    if (!isAIAvailable()) {
      setError('API key not configured. Showing local metrics only.')
      return
    }

    setIsEvaluating(true)
    setError(null)

    try {
      const systemPrompt = speakingEvalPrompt(prompt, durationSec)
      const result = await callClaudeJSON<SpeakingEvaluation>(
        systemPrompt,
        [{ role: 'user', content: `Transcript:\n"${transcript}"` }],
        { maxTokens: 2048 }
      )
      setEvaluation(result)
    } catch (err: any) {
      setError(err?.message || 'AI evaluation failed')
    } finally {
      setIsEvaluating(false)
    }
  }, [])

  const getLocalMetrics = useCallback((transcript: string, durationMs: number) => {
    const local = computeLocalMetrics(transcript, Math.round(durationMs / 1000))
    setLocalMetrics(local)
    return local
  }, [])

  const reset = useCallback(() => {
    setEvaluation(null)
    setLocalMetrics(null)
    setError(null)
  }, [])

  return {
    evaluation,
    localMetrics,
    isEvaluating,
    error,
    evaluateWithAI,
    getLocalMetrics,
    reset
  }
}
