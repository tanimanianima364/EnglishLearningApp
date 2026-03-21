import React, { useState, useMemo } from 'react'
import { writingExercises, GapFillExercise as GapFillExerciseType } from '../data/writingExercises'
import { sortByFrequency } from '../utils/frequencyUtils'

interface WritingExerciseProps {
  onComplete?: (score: number, exerciseType: string) => void
}

type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2'

export const GapFillExercise: React.FC<WritingExerciseProps> = ({ onComplete }) => {
  const [selectedLevel, setSelectedLevel] = useState<CefrLevel>('A1')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)

  const exercises = useMemo(() => {
    return sortByFrequency(
      writingExercises.filter(
        (ex): ex is GapFillExerciseType =>
          ex.type === 'gap_fill' && ex.cefrLevel === selectedLevel
      ),
      ex => ex.sentence
    )
  }, [selectedLevel])

  const currentExercise = exercises[currentIndex] || null

  const handleLevelChange = (level: CefrLevel) => {
    setSelectedLevel(level)
    setCurrentIndex(0)
    setSelectedOption(null)
    setChecked(false)
    setIsCorrect(false)
    setScore(0)
    setAnsweredCount(0)
  }

  const handleOptionClick = (option: string) => {
    if (checked) return
    setSelectedOption(option)
  }

  const handleCheck = () => {
    if (!currentExercise || !selectedOption) return
    const correct = selectedOption === currentExercise.correctAnswer
    setIsCorrect(correct)
    setChecked(true)
    setAnsweredCount(prev => prev + 1)
    if (correct) {
      setScore(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedOption(null)
      setChecked(false)
      setIsCorrect(false)
    } else {
      const finalScore = Math.round((score / exercises.length) * 100)
      if (onComplete) {
        onComplete(finalScore, 'gap_fill')
      }
    }
  }

  const renderSentenceWithBlank = () => {
    if (!currentExercise) return null
    const parts = currentExercise.sentence.split('___')
    const filledWord = selectedOption || '___'
    const blankColor = checked
      ? (isCorrect ? '#28a745' : '#dc3545')
      : (selectedOption ? '#007bff' : '#999')

    return (
      <p style={{ fontSize: '20px', lineHeight: '1.6', textAlign: 'center', margin: 0 }}>
        {parts[0]}
        <span style={{
          display: 'inline-block',
          padding: '4px 16px',
          borderBottom: `3px solid ${blankColor}`,
          fontWeight: 700,
          color: blankColor,
          minWidth: '80px',
          textAlign: 'center',
          transition: 'all 0.2s'
        }}>
          {filledWord}
        </span>
        {parts[1]}
      </p>
    )
  }

  const isLastExercise = currentIndex === exercises.length - 1
  const finalScore = exercises.length > 0 ? Math.round((score / exercises.length) * 100) : 0

  const getScoreLabel = () => {
    if (finalScore >= 80) return 'excellent'
    if (finalScore >= 60) return 'good'
    return 'fair'
  }

  if (!currentExercise) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: '#666', fontSize: '16px' }}>
          No gap fill exercises available for this level.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '8px' }}>Gap Fill</h2>
        <p style={{ color: '#666', fontSize: '15px' }}>
          Choose the correct word to complete the sentence.
        </p>
      </div>

      {/* Level Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
        {(['A1', 'A2', 'B1', 'B2'] as CefrLevel[]).map(level => (
          <button
            key={level}
            className={`btn ${selectedLevel === level ? 'btn-primary' : 'btn-secondary'}`}
            style={{ flex: 1, fontSize: '14px', padding: '10px' }}
            onClick={() => handleLevelChange(level)}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Progress & Score */}
      <div className="card" style={{ padding: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', color: '#666' }}>
            Question {currentIndex + 1} of {exercises.length}
          </span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#007bff' }}>
            Score: {score}/{answeredCount}
          </span>
        </div>
        <div style={{
          marginTop: '10px',
          height: '6px',
          backgroundColor: '#e0e0e0',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${((currentIndex + (checked ? 1 : 0)) / exercises.length) * 100}%`,
            height: '100%',
            backgroundColor: '#007bff',
            borderRadius: '3px',
            transition: 'width 0.3s'
          }} />
        </div>
      </div>

      {/* Sentence with Blank */}
      <div className="card" style={{
        padding: '30px 24px',
        border: checked
          ? `3px solid ${isCorrect ? '#28a745' : '#dc3545'}`
          : '3px solid #e0e0e0',
        transition: 'border-color 0.3s'
      }}>
        {renderSentenceWithBlank()}
      </div>

      {/* Option Buttons */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        margin: '24px 0',
        justifyContent: 'center'
      }}>
        {currentExercise.options.map(option => {
          let bgColor = '#fff'
          let borderColor = '#007bff'
          let textColor = '#333'

          if (checked) {
            if (option === currentExercise.correctAnswer) {
              bgColor = '#d4edda'
              borderColor = '#28a745'
              textColor = '#155724'
            } else if (option === selectedOption && option !== currentExercise.correctAnswer) {
              bgColor = '#f8d7da'
              borderColor = '#dc3545'
              textColor = '#721c24'
            } else {
              bgColor = '#f8f9fa'
              borderColor = '#dee2e6'
              textColor = '#999'
            }
          } else if (option === selectedOption) {
            bgColor = '#007bff'
            borderColor = '#007bff'
            textColor = '#fff'
          }

          return (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              disabled={checked}
              style={{
                padding: '12px 28px',
                backgroundColor: bgColor,
                color: textColor,
                border: `2px solid ${borderColor}`,
                borderRadius: '24px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: checked ? 'default' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                opacity: checked && option !== selectedOption && option !== currentExercise.correctAnswer ? 0.5 : 1
              }}
            >
              {option}
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {checked && (
        <div style={{
          padding: '14px 18px',
          borderRadius: '8px',
          backgroundColor: isCorrect ? '#d4edda' : '#f8d7da',
          color: isCorrect ? '#155724' : '#721c24',
          fontSize: '15px',
          marginBottom: '16px'
        }}>
          {isCorrect ? (
            <span style={{ fontWeight: 600 }}>Correct!</span>
          ) : (
            <span>
              <span style={{ fontWeight: 600 }}>Incorrect.</span> The correct answer is{' '}
              <strong>"{currentExercise.correctAnswer}"</strong>.
            </span>
          )}
          <p style={{ marginTop: '8px', fontSize: '14px', opacity: 0.9 }}>
            {currentExercise.explanation}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginTop: '20px',
        flexWrap: 'wrap'
      }}>
        {!checked ? (
          <button
            className="btn btn-primary"
            onClick={handleCheck}
            disabled={!selectedOption}
            style={{
              opacity: !selectedOption ? 0.5 : 1,
              fontSize: '14px',
              padding: '10px 24px'
            }}
          >
            Check
          </button>
        ) : (
          <button
            className={`btn ${isLastExercise ? 'btn-success' : 'btn-primary'}`}
            onClick={handleNext}
            style={{ fontSize: '14px', padding: '10px 24px' }}
          >
            {isLastExercise ? 'Finish' : 'Next'}
          </button>
        )}
      </div>

      {/* Final score when all exercises are done */}
      {checked && isLastExercise && (
        <div className="card" style={{ textAlign: 'center', marginTop: '24px' }}>
          <div className={`score ${getScoreLabel()}`}>
            Final Score: {finalScore}/100
          </div>
          <p style={{ margin: '10px 0', color: '#666' }}>
            You got {score} out of {exercises.length} answers correct!
          </p>
          <button
            className="btn btn-secondary"
            onClick={() => handleLevelChange(selectedLevel)}
            style={{ marginTop: '10px', fontSize: '14px', padding: '10px 20px' }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
