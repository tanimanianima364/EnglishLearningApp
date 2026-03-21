import React, { useState } from 'react'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'

interface PronunciationPracticeProps {
  targetText: string
  onComplete?: (score: number, transcript: string) => void
}

export const PronunciationPractice: React.FC<PronunciationPracticeProps> = ({ 
  targetText, 
  onComplete 
}) => {
  const { isListening, transcript, confidence, error, startListening, stopListening, resetTranscript } = useSpeechRecognition()
  const [score, setScore] = useState<number | null>(null)

  const calculateScore = (target: string, spoken: string): number => {
    const targetWords = target.toLowerCase().split(' ')
    const spokenWords = spoken.toLowerCase().split(' ')
    
    let matches = 0
    const maxLength = Math.max(targetWords.length, spokenWords.length)
    
    targetWords.forEach((word, index) => {
      if (spokenWords[index] === word) {
        matches++
      }
    })
    
    return Math.round((matches / maxLength) * 100)
  }

  const handlePractice = () => {
    resetTranscript()
    setScore(null)
    startListening(targetText)
  }

  const handleComplete = () => {
    if (transcript) {
      const calculatedScore = calculateScore(targetText, transcript)
      setScore(calculatedScore)
      if (onComplete) {
        onComplete(calculatedScore, transcript)
      }
    }
  }

  const getScoreClass = (score: number) => {
    if (score >= 90) return 'excellent'
    if (score >= 75) return 'good'
    if (score >= 60) return 'fair'
    return 'poor'
  }

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Excellent pronunciation! 🎉'
    if (score >= 75) return 'Good job! Keep practicing 👍'
    if (score >= 60) return 'Not bad, try again for better accuracy 📚'
    return 'Keep practicing, you can do better! 💪'
  }

  return (
    <div className="card">
      <h3>Pronunciation Practice</h3>
      
      <div style={{ margin: '20px 0' }}>
        <h4>Target Phrase:</h4>
        <p style={{ 
          fontSize: '18px', 
          padding: '15px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          border: '2px solid #dee2e6'
        }}>
          "{targetText}"
        </p>
      </div>

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        {!isListening ? (
          <button 
            className="btn btn-primary" 
            onClick={handlePractice}
            style={{ marginRight: '10px' }}
          >
            🎤 Start Speaking
          </button>
        ) : (
          <button 
            className="btn btn-danger recording" 
            onClick={stopListening}
            style={{ marginRight: '10px' }}
          >
            ⏹️ Stop
          </button>
        )}

        {transcript && !isListening && (
          <button 
            className="btn btn-success" 
            onClick={handleComplete}
          >
            ✓ Check Pronunciation
          </button>
        )}
      </div>

      {error && (
        <div style={{ 
          color: '#dc3545', 
          textAlign: 'center', 
          margin: '10px 0',
          padding: '10px',
          backgroundColor: '#f8d7da',
          borderRadius: '4px'
        }}>
          Error: {error}
        </div>
      )}

      {transcript && (
        <div style={{ margin: '20px 0' }}>
          <h4>What you said:</h4>
          <p style={{ 
            fontSize: '16px', 
            padding: '15px', 
            backgroundColor: '#e7f3ff', 
            borderRadius: '8px',
            border: '2px solid #b8daff'
          }}>
            "{transcript}"
          </p>
          {confidence > 0 && (
            <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>
              Confidence: {Math.round(confidence * 100)}%
            </p>
          )}
        </div>
      )}

      {score !== null && (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <div className={`score ${getScoreClass(score)}`}>
            Score: {score}/100
          </div>
          <p style={{ fontSize: '16px', marginTop: '10px' }}>
            {getScoreMessage(score)}
          </p>
        </div>
      )}
    </div>
  )
}