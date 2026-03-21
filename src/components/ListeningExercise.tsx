import React, { useState, useRef } from 'react'

interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
}

interface ListeningExerciseProps {
  audioSrc: string
  questions: Question[]
  title: string
  onComplete?: (score: number, answers: Record<string, number>) => void
}

export const ListeningExercise: React.FC<ListeningExerciseProps> = ({
  audioSrc,
  questions,
  title,
  onComplete
}) => {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
      alert('Please answer all questions before submitting.')
      return
    }

    const correctAnswers = questions.reduce((count, question) => {
      return count + (answers[question.id] === question.correctAnswer ? 1 : 0)
    }, 0)

    const score = Math.round((correctAnswers / questions.length) * 100)
    setShowResults(true)
    
    if (onComplete) {
      onComplete(score, answers)
    }
  }

  const handleAudioPlay = () => {
    setHasPlayedAudio(true)
  }

  const resetExercise = () => {
    setAnswers({})
    setShowResults(false)
    setHasPlayedAudio(false)
    if (audioRef.current) {
      audioRef.current.currentTime = 0
    }
  }

  const getScore = () => {
    const correctAnswers = questions.reduce((count, question) => {
      return count + (answers[question.id] === question.correctAnswer ? 1 : 0)
    }, 0)
    return Math.round((correctAnswers / questions.length) * 100)
  }

  return (
    <div className="card">
      <h3>{title}</h3>
      
      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <audio 
          ref={audioRef}
          controls 
          src={audioSrc} 
          onPlay={handleAudioPlay}
          style={{ width: '100%', maxWidth: '500px' }}
        />
        <p style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
          Listen to the audio and answer the questions below
        </p>
      </div>

      {hasPlayedAudio && (
        <div style={{ margin: '20px 0' }}>
          {questions.map((question, index) => (
            <div key={question.id} style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '10px' }}>
                {index + 1}. {question.text}
              </h4>
              
              <div style={{ paddingLeft: '20px' }}>
                {question.options.map((option, optionIndex) => (
                  <label 
                    key={optionIndex} 
                    style={{ 
                      display: 'block', 
                      marginBottom: '8px',
                      cursor: 'pointer',
                      padding: '8px',
                      borderRadius: '4px',
                      backgroundColor: showResults 
                        ? (optionIndex === question.correctAnswer 
                          ? '#d4edda' 
                          : (answers[question.id] === optionIndex && optionIndex !== question.correctAnswer)
                            ? '#f8d7da'
                            : 'transparent')
                        : (answers[question.id] === optionIndex ? '#e7f3ff' : 'transparent')
                    }}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={optionIndex}
                      checked={answers[question.id] === optionIndex}
                      onChange={() => handleAnswerChange(question.id, optionIndex)}
                      disabled={showResults}
                      style={{ marginRight: '10px' }}
                    />
                    {option}
                    {showResults && optionIndex === question.correctAnswer && (
                      <span style={{ color: '#28a745', marginLeft: '10px' }}>✓</span>
                    )}
                    {showResults && answers[question.id] === optionIndex && optionIndex !== question.correctAnswer && (
                      <span style={{ color: '#dc3545', marginLeft: '10px' }}>✗</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'center', margin: '30px 0' }}>
            {!showResults ? (
              <button 
                className="btn btn-primary" 
                onClick={handleSubmit}
                disabled={Object.keys(answers).length !== questions.length}
              >
                Submit Answers
              </button>
            ) : (
              <div>
                <div className={`score ${getScore() >= 80 ? 'excellent' : getScore() >= 60 ? 'good' : 'fair'}`}>
                  Your Score: {getScore()}/100
                </div>
                <p style={{ margin: '10px 0' }}>
                  You got {questions.reduce((count, question) => count + (answers[question.id] === question.correctAnswer ? 1 : 0), 0)} out of {questions.length} questions correct!
                </p>
                <button 
                  className="btn btn-secondary" 
                  onClick={resetExercise}
                  style={{ marginTop: '10px' }}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {!hasPlayedAudio && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          backgroundColor: '#fff3cd',
          borderRadius: '8px',
          border: '1px solid #ffeaa7'
        }}>
          <p>Please play the audio first to see the questions.</p>
        </div>
      )}
    </div>
  )
}