import React, { useState, useMemo } from 'react'
import { grammarLessons, GrammarLesson, GrammarExerciseItem } from '../data/grammarLessons'
import { useGrammar } from '../hooks/useGrammar'
import { sortByFrequency, scoreContentFrequency, getFrequencyBand, getFrequencyBandDisplay } from '../utils/frequencyUtils'

interface GrammarExerciseProps {
  onComplete?: (score: number, lessonId: string) => void
}

type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2'

export const GrammarExercise: React.FC<GrammarExerciseProps> = ({ onComplete }) => {
  const { submitLessonScore, getLessonBestScore, isLessonCompleted } = useGrammar()
  const [activeLesson, setActiveLesson] = useState<GrammarLesson | null>(null)
  const [currentExIdx, setCurrentExIdx] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [showFinal, setShowFinal] = useState(false)
  const [filterLevel, setFilterLevel] = useState<CefrLevel | 'all'>('all')

  const filteredLessons = useMemo(() => {
    const base = filterLevel === 'all' ? grammarLessons : grammarLessons.filter(l => l.cefrLevel === filterLevel)
    return sortByFrequency(base, l => l.exercises.map(e => e.question).join(' '))
  }, [filterLevel])

  const lessonsByLevel = useMemo(() => {
    const groups: Record<string, GrammarLesson[]> = {}
    for (const l of filteredLessons) {
      if (!groups[l.cefrLevel]) groups[l.cefrLevel] = []
      groups[l.cefrLevel].push(l)
    }
    return groups
  }, [filteredLessons])

  const currentExercise = activeLesson?.exercises[currentExIdx]

  const handleSelectAnswer = (answer: string) => {
    if (showFeedback) return
    setUserAnswer(answer)
  }

  const handleCheck = () => {
    if (!userAnswer.trim() || !currentExercise) return
    setShowFeedback(true)
    const isCorrect = userAnswer.trim().toLowerCase() === currentExercise.correctAnswer.toLowerCase()
    if (isCorrect) setCorrectCount(c => c + 1)
  }

  const handleNext = () => {
    if (!activeLesson) return
    if (currentExIdx + 1 >= activeLesson.exercises.length) {
      const score = Math.round(((correctCount + (userAnswer.trim().toLowerCase() === currentExercise?.correctAnswer.toLowerCase() ? 0 : 0)) / activeLesson.exercises.length) * 100)
      // correctCount already includes last answer if correct
      const finalScore = Math.round((correctCount / activeLesson.exercises.length) * 100)
      setShowFinal(true)
      submitLessonScore(activeLesson.id, finalScore)
      if (onComplete) onComplete(finalScore, activeLesson.id)
      return
    }
    setCurrentExIdx(i => i + 1)
    setUserAnswer('')
    setShowFeedback(false)
  }

  const handleBack = () => {
    setActiveLesson(null)
    setCurrentExIdx(0)
    setUserAnswer('')
    setShowFeedback(false)
    setCorrectCount(0)
    setShowExplanation(false)
    setShowFinal(false)
  }

  const isCorrect = showFeedback && currentExercise &&
    userAnswer.trim().toLowerCase() === currentExercise.correctAnswer.toLowerCase()

  // Final score screen
  if (showFinal && activeLesson) {
    const score = Math.round((correctCount / activeLesson.exercises.length) * 100)
    return (
      <div className="card">
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Lesson Complete: {activeLesson.title}
        </h3>
        <div className={`score ${score >= 90 ? 'excellent' : score >= 75 ? 'good' : score >= 60 ? 'fair' : 'poor'}`}>
          {score}/100
        </div>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '24px' }}>
          {correctCount} / {activeLesson.exercises.length} correct
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={handleBack}>All Lessons</button>
          <button className="btn btn-primary" onClick={() => {
            setCurrentExIdx(0); setUserAnswer(''); setShowFeedback(false);
            setCorrectCount(0); setShowFinal(false)
          }}>Try Again</button>
        </div>
      </div>
    )
  }

  // Lesson screen
  if (activeLesson && currentExercise) {
    return (
      <div>
        <div className="card" style={{ padding: '16px 20px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', padding: '4px' }}>←</button>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px' }}>{activeLesson.title}</h3>
                <span style={{ fontSize: '12px', color: '#666' }}>{activeLesson.cefrLevel} — {activeLesson.category}</span>
              </div>
            </div>
            <span style={{ fontSize: '14px', color: '#666' }}>
              {currentExIdx + 1} / {activeLesson.exercises.length}
            </span>
          </div>
        </div>

        {/* Expandable explanation */}
        <div className="card" style={{ padding: '14px 20px', marginBottom: '12px' }}>
          <details>
            <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>
              Grammar Rule
            </summary>
            <div style={{ marginTop: '10px' }}>
              <p style={{ color: '#333', lineHeight: '1.6', marginBottom: '10px' }}>{activeLesson.explanation}</p>
              <div style={{ padding: '10px', backgroundColor: '#e7f3ff', borderRadius: '6px' }}>
                {activeLesson.examples.map((ex, i) => (
                  <p key={i} style={{ margin: i === activeLesson.examples.length - 1 ? 0 : '4px 0', fontSize: '14px', color: '#0056b3' }}>
                    {ex}
                  </p>
                ))}
              </div>
            </div>
          </details>
        </div>

        {/* Exercise */}
        <div className="card">
          <div style={{
            padding: '4px 10px',
            borderRadius: '4px',
            display: 'inline-block',
            fontSize: '12px',
            fontWeight: 600,
            marginBottom: '12px',
            backgroundColor: currentExercise.type === 'multiple_choice' ? '#e7f3ff' :
              currentExercise.type === 'fill_blank' ? '#fff3cd' : '#f8d7da',
            color: currentExercise.type === 'multiple_choice' ? '#004085' :
              currentExercise.type === 'fill_blank' ? '#856404' : '#721c24'
          }}>
            {currentExercise.type === 'multiple_choice' ? 'Multiple Choice' :
              currentExercise.type === 'fill_blank' ? 'Fill in the Blank' : 'Error Correction'}
          </div>

          <p style={{ fontSize: '17px', lineHeight: '1.6', margin: '0 0 20px 0', color: '#333' }}>
            {currentExercise.question}
          </p>

          {/* Options for MCQ and fill_blank */}
          {currentExercise.options && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {currentExercise.options.map((opt, i) => {
                let bg = userAnswer === opt ? '#e7f3ff' : 'white'
                let border = userAnswer === opt ? '2px solid #007bff' : '2px solid #e0e0e0'
                if (showFeedback) {
                  if (opt.toLowerCase() === currentExercise.correctAnswer.toLowerCase()) {
                    bg = '#d4edda'; border = '2px solid #28a745'
                  } else if (opt === userAnswer) {
                    bg = '#f8d7da'; border = '2px solid #dc3545'
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSelectAnswer(opt)}
                    disabled={showFeedback}
                    style={{
                      padding: '12px 16px', backgroundColor: bg, border, borderRadius: '8px',
                      fontSize: '15px', textAlign: 'left', cursor: showFeedback ? 'default' : 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          )}

          {/* Text input for error correction */}
          {currentExercise.type === 'error_correction' && !currentExercise.options && (
            <div style={{ marginBottom: '16px' }}>
              <input
                type="text"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                placeholder="Type the corrected sentence..."
                disabled={showFeedback}
                style={{
                  width: '100%', padding: '12px 16px',
                  border: '2px solid #e0e0e0', borderRadius: '8px',
                  fontSize: '15px', outline: 'none'
                }}
                onFocus={e => e.target.style.borderColor = '#007bff'}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                onKeyDown={e => { if (e.key === 'Enter' && !showFeedback) handleCheck() }}
              />
            </div>
          )}

          {/* Check / Feedback */}
          {!showFeedback ? (
            <button
              className="btn btn-success"
              onClick={handleCheck}
              disabled={!userAnswer.trim()}
              style={{ width: '100%' }}
            >
              Check Answer
            </button>
          ) : (
            <div>
              <div style={{
                padding: '12px 16px', borderRadius: '8px', marginBottom: '12px',
                backgroundColor: isCorrect ? '#d4edda' : '#f8d7da',
                color: isCorrect ? '#155724' : '#721c24'
              }}>
                <strong>{isCorrect ? 'Correct!' : 'Incorrect'}</strong>
                {!isCorrect && (
                  <span> — Answer: <strong>{currentExercise.correctAnswer}</strong></span>
                )}
              </div>
              <div style={{
                padding: '12px 16px', borderRadius: '8px', marginBottom: '16px',
                backgroundColor: '#f8f9fa', fontSize: '14px', color: '#555'
              }}>
                {currentExercise.explanation}
              </div>
              <button className="btn btn-primary" onClick={handleNext} style={{ width: '100%' }}>
                {currentExIdx + 1 >= activeLesson.exercises.length ? 'See Results' : 'Next Exercise'}
              </button>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div style={{ height: '6px', backgroundColor: '#e0e0e0', borderRadius: '3px', overflow: 'hidden', marginTop: '12px' }}>
          <div style={{
            height: '100%',
            width: `${((currentExIdx + (showFeedback ? 1 : 0)) / activeLesson.exercises.length) * 100}%`,
            backgroundColor: '#007bff', transition: 'width 0.3s'
          }} />
        </div>
      </div>
    )
  }

  // Lesson selection screen
  return (
    <div>
      <div className="card" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0 }}>📝 Grammar Lessons</h2>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {(['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map(level => (
            <button
              key={level}
              className={`btn ${filterLevel === level ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '13px', padding: '6px 16px' }}
              onClick={() => setFilterLevel(level)}
            >
              {level === 'all' ? 'All Levels' : level}
            </button>
          ))}
        </div>
      </div>

      {Object.entries(lessonsByLevel).map(([level, lessons]) => (
        <div key={level} style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '12px', color: '#555' }}>{level}</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '12px'
          }}>
            {lessons.map(lesson => {
              const bestScore = getLessonBestScore(lesson.id)
              const completed = isLessonCompleted(lesson.id)
              return (
                <div
                  key={lesson.id}
                  className="card"
                  style={{
                    cursor: 'pointer', padding: '16px', marginBottom: '0',
                    borderLeft: completed ? '4px solid #28a745' : '4px solid #e0e0e0',
                    transition: 'transform 0.2s'
                  }}
                  onClick={() => {
                    setActiveLesson(lesson)
                    setCurrentExIdx(0); setUserAnswer(''); setShowFeedback(false);
                    setCorrectCount(0); setShowFinal(false)
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '15px' }}>{lesson.title}</h4>
                      <span style={{
                        fontSize: '12px', padding: '2px 8px', borderRadius: '10px',
                        backgroundColor: '#f0f0f0', color: '#666'
                      }}>
                        {lesson.category}
                      </span>
                      {(() => {
                        const band = getFrequencyBand(scoreContentFrequency(lesson.exercises.map(e => e.question).join(' ')))
                        const display = getFrequencyBandDisplay(band)
                        return (
                          <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '10px', backgroundColor: display.bg, color: display.color, marginLeft: '4px' }}>
                            {display.label}
                          </span>
                        )
                      })()}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {bestScore !== null && (
                        <span style={{
                          fontSize: '13px', fontWeight: 700,
                          color: bestScore >= 80 ? '#28a745' : bestScore >= 60 ? '#ffc107' : '#dc3545'
                        }}>
                          {bestScore}%
                        </span>
                      )}
                      {completed && <div style={{ fontSize: '11px', color: '#28a745' }}>Completed</div>}
                    </div>
                  </div>
                  <p style={{ fontSize: '13px', color: '#888', margin: '8px 0 0 0' }}>
                    {lesson.exercises.length} exercises
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
