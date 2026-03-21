import { useState, useCallback, useRef } from 'react'

interface SpeechRecognitionState {
  isListening: boolean
  transcript: string
  confidence: number
  error: string | null
}

export const useSpeechRecognition = () => {
  const [state, setState] = useState<SpeechRecognitionState>({
    isListening: false,
    transcript: '',
    confidence: 0,
    error: null
  })

  const recognitionRef = useRef<any>(null)

  const startListening = useCallback((targetText?: string) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setState(prev => ({ ...prev, error: 'Speech recognition not supported' }))
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setState(prev => ({ ...prev, isListening: true, error: null }))
    }

    recognition.onresult = (event: any) => {
      const result = event.results[0]
      const transcript = result[0].transcript
      const confidence = result[0].confidence

      setState(prev => ({
        ...prev,
        transcript,
        confidence,
        isListening: false
      }))
    }

    recognition.onerror = (event: any) => {
      setState(prev => ({
        ...prev,
        error: event.error,
        isListening: false
      }))
    }

    recognition.onend = () => {
      setState(prev => ({ ...prev, isListening: false }))
    }

    recognitionRef.current = recognition
    recognition.start()
  }, [])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }, [])

  const resetTranscript = useCallback(() => {
    setState(prev => ({
      ...prev,
      transcript: '',
      confidence: 0,
      error: null
    }))
  }, [])

  return {
    ...state,
    startListening,
    stopListening,
    resetTranscript
  }
}