import { useState, useRef, useCallback } from 'react'

interface AudioRecorderState {
  isRecording: boolean
  audioURL: string | null
  audioBlob: Blob | null
  duration: number
}

export const useAudioRecorder = () => {
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    audioURL: null,
    audioBlob: null,
    duration: 0
  })

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const startTimeRef = useRef<number>(0)

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' })
        const audioURL = URL.createObjectURL(audioBlob)
        const duration = Date.now() - startTimeRef.current
        
        setState(prev => ({
          ...prev,
          isRecording: false,
          audioURL,
          audioBlob,
          duration
        }))
        
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop())
        }
      }
      
      startTimeRef.current = Date.now()
      mediaRecorder.start()
      setState(prev => ({ ...prev, isRecording: true }))
      
    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop()
    }
  }, [state.isRecording])

  const clearRecording = useCallback(() => {
    if (state.audioURL) {
      URL.revokeObjectURL(state.audioURL)
    }
    setState({
      isRecording: false,
      audioURL: null,
      audioBlob: null,
      duration: 0
    })
  }, [state.audioURL])

  return {
    ...state,
    startRecording,
    stopRecording,
    clearRecording
  }
}