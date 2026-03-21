import React, { useState, useMemo } from 'react'
import { writingExercises, SentenceOrderExercise } from '../data/writingExercises'
import { sortByFrequency } from '../utils/frequencyUtils'

interface WritingExerciseProps {
  onComplete?: (score: number, exerciseType: string) => void
}

type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2'

export const SentenceBuilder: React.FC<WritingExerciseProps> = ({ onComplete }) => {
  const [selectedLevel, setSelectedLevel] = useState<CefrLevel>('A1')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [checked, setChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)

  const exercises = useMemo(() => {
    return sortByFrequency(
      writingExercises.filter(
        (ex): ex is SentenceOrderExercise =>
          ex.type === 'sentence_order' && ex.cefrLevel === selectedLevel
      ),
      ex => ex.correctOrder.join(' ')
    )
  }, [selectedLevel])

  const currentExercise = exercises[currentIndex] || null

  const remainingWords = useMemo(() => {
    if (!currentExercise) return []
    const used = [...selectedWords]
    return currentExercise.words.filter(word => {
      const idx = used.indexOf(word)
      if (idx !== -1) {
        used.splice(idx, 1)
        return false
      }
      return true
    })
  }, [currentExercise, selectedWords])

  const handleLevelChange = (level: CefrLevel) => {
    setSelectedLevel(level)
    setCurrentIndex(0)
    setSelectedWords([])
    setChecked(false)
    setIsCorrect(false)
    setScore(0)
    setAnsweredCount(0)
  }

  const handleWordClick = (word: string) => {
    if (checked) return
    setSelectedWords(prev => [...prev, word])
  }

  const handleUndo = () => {
    if (checked || selectedWords.length === 0) return
    setSelectedWords(prev => prev.slice(0, -1))
  }

  const handleClear = () => {
    if (checked) return
    setSelectedWords([])
  }

  const handleCheck = () => {
    if (!currentExercise || selectedWords.length === 0) return
    const correct =
      selectedWords.length === currentExercise.correctOrder.length &&
      selectedWords.every((w, i) => w === currentExercise.correctOrder[i])
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
      setSelectedWords([])
      setChecked(false)
      setIsCorrect(false)
    } else {
      const finalScore = Math.round((score / exercises.length) * 100)
      if (onComplete) {
        onComplete(finalScore, 'sentence_order')
      }
    }
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
          No sentence order exercises available for this level.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '8px' }}>Sentence Builder</h2>
        <p style={{ color: '#666', fontSize: '15px' }}>
          Arrange the words in the correct order to form a sentence.
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

      {/* Hint */}
      {currentExercise.hint && (
        <div style={{
          marginBottom: '16px',
          padding: '10px 16px',
          backgroundColor: '#e7f3ff',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#0056b3'
        }}>
          Hint: {currentExercise.hint}
        </div>
      )}

      {/* Sentence Area */}
      <div className="card" style={{
        minHeight: '80px',
        border: checked
          ? `3px solid ${isCorrect ? '#28a745' : '#dc3545'}`
          : '3px solid #e0e0e0',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '8px',
        padding: '20px',
        transition: 'border-color 0.3s'
      }}>
        {selectedWords.length === 0 ? (
          <span style={{ color: '#aaa', fontSize: '15px', fontStyle: 'italic' }}>
            Click the words below to build the sentence...
          </span>
        ) : (
          selectedWords.map((word, idx) => (
            <span
              key={`${word}-${idx}`}
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: checked
                  ? (isCorrect ? '#d4edda' : '#f8d7da')
                  : '#e7f3ff',
                color: checked
                  ? (isCorrect ? '#155724' : '#721c24')
                  : '#007bff',
                borderRadius: '20px',
                fontSize: '16px',
                fontWeight: 600
              }}
            >
              {word}
            </span>
          ))
        )}
      </div>

      {/* Feedback */}
      {checked && (
        <div style={{
          marginTop: '12px',
          padding: '12px 16px',
          borderRadius: '8px',
          backgroundColor: isCorrect ? '#d4edda' : '#f8d7da',
          color: isCorrect ? '#155724' : '#721c24',
          fontSize: '15px'
        }}>
          {isCorrect ? (
            <span>Correct! Well done!</span>
          ) : (
            <span>
              Not quite. The correct sentence is:{' '}
              <strong>{currentExercise.correctOrder.join(' ')}</strong>
            </span>
          )}
        </div>
      )}

      {/* Available Word Tokens */}
      {!checked && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          margin: '20px 0',
          justifyContent: 'center'
        }}>
          {remainingWords.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              onClick={() => handleWordClick(word)}
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#fff',
                color: '#333',
                border: '2px solid #007bff',
                borderRadius: '24px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#007bff'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#fff'
                e.currentTarget.style.color = '#333'
              }}
            >
              {word}
            </button>
          ))}
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
          <>
            <button
              className="btn btn-secondary"
              onClick={handleUndo}
              disabled={selectedWords.length === 0}
              style={{
                opacity: selectedWords.length === 0 ? 0.5 : 1,
                fontSize: '14px',
                padding: '10px 20px'
              }}
            >
              Undo
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleClear}
              disabled={selectedWords.length === 0}
              style={{
                opacity: selectedWords.length === 0 ? 0.5 : 1,
                fontSize: '14px',
                padding: '10px 20px'
              }}
            >
              Clear
            </button>
            <button
              className="btn btn-primary"
              onClick={handleCheck}
              disabled={selectedWords.length === 0}
              style={{
                opacity: selectedWords.length === 0 ? 0.5 : 1,
                fontSize: '14px',
                padding: '10px 24px'
              }}
            >
              Check
            </button>
          </>
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
            You got {score} out of {exercises.length} sentences correct!
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
