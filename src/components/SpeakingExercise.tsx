import React, { useState } from 'react'
import { AudioRecorder } from './AudioRecorder'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'

interface SpeakingPrompt {
  id: string
  type: 'conversation' | 'description' | 'opinion' | 'story'
  prompt: string
  tips?: string[]
  timeLimit?: number
}

interface SpeakingExerciseProps {
  prompt: SpeakingPrompt
  onComplete?: (transcript: string, duration: number) => void
}

export const SpeakingExercise: React.FC<SpeakingExerciseProps> = ({ 
  prompt, 
  onComplete 
}) => {
  const [showTips, setShowTips] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [currentTranscript, setCurrentTranscript] = useState('')
  const { transcript, startListening, stopListening, resetTranscript } = useSpeechRecognition()

  const handleRecordingComplete = (audioBlob: Blob, duration: number) => {
    setIsRecording(false)
    if (onComplete) {
      onComplete(transcript || 'No transcript available', duration)
    }
  }

  const handleStartSpeaking = () => {
    setIsRecording(true)
    resetTranscript()
    startListening()
  }

  const handleStopSpeaking = () => {
    setIsRecording(false)
    stopListening()
  }

  const getPromptIcon = (type: string) => {
    switch (type) {
      case 'conversation': return '💬'
      case 'description': return '🖼️'
      case 'opinion': return '🤔'
      case 'story': return '📚'
      default: return '🗣️'
    }
  }

  const getPromptTypeLabel = (type: string) => {
    switch (type) {
      case 'conversation': return 'Conversation Practice'
      case 'description': return 'Description Exercise'
      case 'opinion': return 'Opinion Sharing'
      case 'story': return 'Storytelling'
      default: return 'Speaking Practice'
    }
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ fontSize: '24px', marginRight: '10px' }}>
          {getPromptIcon(prompt.type)}
        </span>
        <h3>{getPromptTypeLabel(prompt.type)}</h3>
      </div>

      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <p style={{ fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
          {prompt.prompt}
        </p>
        {prompt.timeLimit && (
          <p style={{ 
            fontSize: '14px', 
            color: '#666', 
            marginTop: '10px', 
            margin: 0 
          }}>
            ⏱️ Suggested time: {prompt.timeLimit} seconds
          </p>
        )}
      </div>

      {prompt.tips && (
        <div style={{ marginBottom: '20px' }}>
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowTips(!showTips)}
            style={{ fontSize: '14px', padding: '8px 16px' }}
          >
            💡 {showTips ? 'Hide Tips' : 'Show Tips'}
          </button>
          
          {showTips && (
            <div style={{ 
              marginTop: '10px',
              padding: '15px',
              backgroundColor: '#e7f3ff',
              borderRadius: '8px',
              border: '1px solid #b8daff'
            }}>
              <h4 style={{ marginBottom: '10px', fontSize: '14px' }}>Tips:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {prompt.tips.map((tip, index) => (
                  <li key={index} style={{ marginBottom: '5px', fontSize: '14px' }}>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        {!isRecording ? (
          <button 
            className="btn btn-primary" 
            onClick={handleStartSpeaking}
            style={{ fontSize: '16px', padding: '12px 24px' }}
          >
            🎤 Start Speaking
          </button>
        ) : (
          <button 
            className="btn btn-danger recording" 
            onClick={handleStopSpeaking}
            style={{ fontSize: '16px', padding: '12px 24px' }}
          >
            ⏹️ Stop Speaking
          </button>
        )}
      </div>

      {isRecording && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          backgroundColor: '#fff3cd',
          borderRadius: '8px',
          border: '1px solid #ffeaa7',
          margin: '20px 0'
        }}>
          <p style={{ margin: 0, color: '#856404' }}>
            🎙️ Recording... Speak clearly and naturally!
          </p>
        </div>
      )}

      {transcript && !isRecording && (
        <div style={{ margin: '20px 0' }}>
          <h4>What you said:</h4>
          <div style={{ 
            padding: '15px', 
            backgroundColor: '#e7f3ff', 
            borderRadius: '8px',
            border: '2px solid #b8daff'
          }}>
            <p style={{ margin: 0, lineHeight: '1.6' }}>
              "{transcript}"
            </p>
          </div>
        </div>
      )}

      <AudioRecorder onRecordingComplete={handleRecordingComplete} />
    </div>
  )
}