import React, { useState, useCallback, useRef, useEffect } from 'react'
import { readingPassages, ReadingPassage, ReadingQuestion } from '../data/readingPassages'

interface ReadingExerciseProps {
  onComplete?: (score: number, passageId: string) => void
}

const LEVEL_COLORS: Record<string, { color: string; bg: string }> = {
  A1: { color: '#155724', bg: '#d4edda' },
  A2: { color: '#856404', bg: '#fff3cd' },
  B1: { color: '#0c5460', bg: '#d1ecf1' },
  B2: { color: '#721c24', bg: '#f8d7da' },
  C1: { color: '#383d41', bg: '#e2e3e5' }
}

const TOPIC_COLORS: Record<string, { color: string; bg: string }> = {
  'Daily Life': { color: '#007bff', bg: '#e7f3ff' },
  'Science': { color: '#28a745', bg: '#e8f5e9' },
  'Culture': { color: '#6f42c1', bg: '#f3e8ff' }
}

const getWordCount = (text: string): number => {
  return text.split(/\s+/).filter(w => w.length > 0).length
}

export const ReadingExercise: React.FC<ReadingExerciseProps> = ({ onComplete }) => {
  const [activePassage, setActivePassage] = useState<ReadingPassage | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [tooltipWord, setTooltipWord] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const passageTextRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).dataset?.definitionWord
      ) {
        setTooltipWord(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectPassage = (passage: ReadingPassage) => {
    setActivePassage(passage)
    setAnswers({})
    setShowResults(false)
    setTooltipWord(null)
  }

  const handleBack = () => {
    setActivePassage(null)
    setAnswers({})
    setShowResults(false)
    setTooltipWord(null)
  }

  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleSubmit = () => {
    if (!activePassage) return
    if (Object.keys(answers).length !== activePassage.questions.length) {
      alert('Please answer all questions before submitting.')
      return
    }

    const correctAnswers = activePassage.questions.reduce((count, question) => {
      return count + (answers[question.id] === question.correctAnswer ? 1 : 0)
    }, 0)

    const score = Math.round((correctAnswers / activePassage.questions.length) * 100)
    setShowResults(true)

    if (onComplete) {
      onComplete(score, activePassage.id)
    }
  }

  const resetExercise = () => {
    setAnswers({})
    setShowResults(false)
    setTooltipWord(null)
  }

  const getScore = useCallback((): number => {
    if (!activePassage) return 0
    const correctAnswers = activePassage.questions.reduce((count, question) => {
      return count + (answers[question.id] === question.correctAnswer ? 1 : 0)
    }, 0)
    return Math.round((correctAnswers / activePassage.questions.length) * 100)
  }, [activePassage, answers])

  const getCorrectCount = useCallback((): number => {
    if (!activePassage) return 0
    return activePassage.questions.reduce((count, question) => {
      return count + (answers[question.id] === question.correctAnswer ? 1 : 0)
    }, 0)
  }, [activePassage, answers])

  const handleWordClick = (word: string, event: React.MouseEvent<HTMLSpanElement>) => {
    if (tooltipWord === word) {
      setTooltipWord(null)
      return
    }

    const rect = (event.target as HTMLElement).getBoundingClientRect()
    const containerRect = passageTextRef.current?.getBoundingClientRect()

    if (containerRect) {
      setTooltipPos({
        top: rect.bottom - containerRect.top + 8,
        left: Math.max(0, Math.min(rect.left - containerRect.left, containerRect.width - 280))
      })
    }

    setTooltipWord(word)
  }

  const renderPassageText = (passage: ReadingPassage) => {
    const definedWords = Object.keys(passage.wordDefinitions)

    // Build a regex to match any defined word/phrase (case-insensitive, whole word)
    // Sort by length descending so longer phrases match first
    const sortedWords = [...definedWords].sort((a, b) => b.length - a.length)
    const escapedWords = sortedWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    const regex = new RegExp(`\\b(${escapedWords.join('|')})\\b`, 'gi')

    // Split text into paragraphs
    const paragraphs = passage.text.split('\n').filter(p => p.trim())

    return paragraphs.map((paragraph, pIndex) => {
      const parts: React.ReactNode[] = []
      let lastIndex = 0
      let match: RegExpExecArray | null

      // Reset regex lastIndex for each paragraph
      regex.lastIndex = 0

      while ((match = regex.exec(paragraph)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          parts.push(paragraph.slice(lastIndex, match.index))
        }

        const matchedText = match[0]
        const definitionKey = definedWords.find(
          w => w.toLowerCase() === matchedText.toLowerCase()
        )

        if (definitionKey) {
          parts.push(
            <span
              key={`${pIndex}-${match.index}`}
              data-definition-word={definitionKey}
              onClick={(e) => handleWordClick(definitionKey, e)}
              style={{
                borderBottom: '2px dotted #007bff',
                color: '#007bff',
                cursor: 'pointer',
                fontWeight: 500,
                position: 'relative'
              }}
            >
              {matchedText}
            </span>
          )
        }

        lastIndex = match.index + matchedText.length
      }

      // Add remaining text
      if (lastIndex < paragraph.length) {
        parts.push(paragraph.slice(lastIndex))
      }

      return (
        <p key={pIndex} style={{ marginBottom: '12px', lineHeight: '1.8' }}>
          {parts}
        </p>
      )
    })
  }

  const renderQuestion = (question: ReadingQuestion, index: number) => (
    <div key={question.id} style={{ marginBottom: '20px' }}>
      <h4 style={{ marginBottom: '10px' }}>
        {index + 1}. {question.question}
      </h4>

      <div style={{ paddingLeft: '20px' }}>
        {question.options.map((option, optionIndex) => (
          <label
            key={optionIndex}
            style={{
              display: 'block',
              marginBottom: '8px',
              cursor: showResults ? 'default' : 'pointer',
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
              <span style={{ color: '#28a745', marginLeft: '10px' }}>&#10003;</span>
            )}
            {showResults && answers[question.id] === optionIndex && optionIndex !== question.correctAnswer && (
              <span style={{ color: '#dc3545', marginLeft: '10px' }}>&#10007;</span>
            )}
          </label>
        ))}
      </div>
    </div>
  )

  // ─── Passage Selection Screen ─────────────────────────────────────────────

  if (!activePassage) {
    const levels: Array<'A1' | 'A2' | 'B1' | 'B2'> = ['A1', 'A2', 'B1', 'B2']

    return (
      <div className="container">
        <h2 style={{ marginBottom: '30px' }}>Reading Comprehension</h2>

        {levels.map(level => {
          const passagesForLevel = readingPassages.filter(p => p.cefrLevel === level)
          if (passagesForLevel.length === 0) return null

          const levelColor = LEVEL_COLORS[level]

          return (
            <div key={level} style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{
                  display: 'inline-block',
                  fontSize: '14px',
                  padding: '4px 14px',
                  borderRadius: '10px',
                  backgroundColor: levelColor.bg,
                  color: levelColor.color,
                  fontWeight: 700
                }}>
                  {level}
                </span>
                <span style={{ color: '#666', fontSize: '14px' }}>
                  {level === 'A1' && 'Beginner'}
                  {level === 'A2' && 'Elementary'}
                  {level === 'B1' && 'Intermediate'}
                  {level === 'B2' && 'Upper Intermediate'}
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px'
              }}>
                {passagesForLevel.map(passage => {
                  const topicColor = TOPIC_COLORS[passage.topic] || { color: '#666', bg: '#f0f0f0' }
                  const wordCount = getWordCount(passage.text)

                  return (
                    <div
                      key={passage.id}
                      className="card"
                      style={{
                        cursor: 'pointer',
                        padding: '20px',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        marginBottom: '0'
                      }}
                      onClick={() => handleSelectPassage(passage)}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
                        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#333' }}>
                        {passage.title}
                      </h3>

                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                        <span style={{
                          display: 'inline-block',
                          fontSize: '12px',
                          padding: '2px 10px',
                          borderRadius: '10px',
                          backgroundColor: levelColor.bg,
                          color: levelColor.color,
                          fontWeight: 600
                        }}>
                          {passage.cefrLevel}
                        </span>
                        <span style={{
                          display: 'inline-block',
                          fontSize: '12px',
                          padding: '2px 10px',
                          borderRadius: '10px',
                          backgroundColor: topicColor.bg,
                          color: topicColor.color,
                          fontWeight: 600
                        }}>
                          {passage.topic}
                        </span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#888' }}>
                        <span>{wordCount} words</span>
                        <span>{passage.questions.length} questions</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // ─── Reading Screen ───────────────────────────────────────────────────────

  const levelColor = LEVEL_COLORS[activePassage.cefrLevel]
  const score = getScore()

  return (
    <div className="container">
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <button
          className="btn btn-secondary"
          onClick={handleBack}
          style={{ fontSize: '14px', padding: '8px 16px' }}
        >
          Back
        </button>
        <h2 style={{ margin: 0, flex: 1 }}>{activePassage.title}</h2>
        <span style={{
          display: 'inline-block',
          fontSize: '14px',
          padding: '4px 14px',
          borderRadius: '10px',
          backgroundColor: levelColor.bg,
          color: levelColor.color,
          fontWeight: 700
        }}>
          {activePassage.cefrLevel}
        </span>
      </div>

      {/* Passage text area */}
      <div className="card" style={{ position: 'relative' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h3 style={{ margin: 0 }}>Passage</h3>
          <span style={{ fontSize: '13px', color: '#888' }}>
            Click highlighted words for definitions
          </span>
        </div>

        <div
          ref={passageTextRef}
          style={{
            position: 'relative',
            fontSize: '16px',
            color: '#333',
            lineHeight: '1.8',
            padding: '16px',
            backgroundColor: '#fafafa',
            borderRadius: '8px',
            border: '1px solid #eee'
          }}
        >
          {renderPassageText(activePassage)}

          {/* Tooltip */}
          {tooltipWord && activePassage.wordDefinitions[tooltipWord] && (
            <div
              ref={tooltipRef}
              style={{
                position: 'absolute',
                top: `${tooltipPos.top}px`,
                left: `${tooltipPos.left}px`,
                width: '280px',
                padding: '12px 16px',
                backgroundColor: '#333',
                color: '#fff',
                borderRadius: '8px',
                fontSize: '14px',
                lineHeight: '1.5',
                zIndex: 100,
                boxShadow: '0 4px 16px rgba(0,0,0,0.25)'
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: '4px', color: '#7ec8e3' }}>
                {tooltipWord}
              </div>
              <div>{activePassage.wordDefinitions[tooltipWord]}</div>
            </div>
          )}
        </div>
      </div>

      {/* Questions */}
      <div className="card">
        <h3 style={{ marginBottom: '20px' }}>Comprehension Questions</h3>

        {activePassage.questions.map((question, index) =>
          renderQuestion(question, index)
        )}

        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          {!showResults ? (
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== activePassage.questions.length}
              style={{
                opacity: Object.keys(answers).length !== activePassage.questions.length ? 0.5 : 1
              }}
            >
              Submit Answers
            </button>
          ) : (
            <div>
              <div className={`score ${score >= 80 ? 'excellent' : score >= 60 ? 'good' : 'fair'}`}>
                Your Score: {score}/100
              </div>
              <p style={{ margin: '10px 0' }}>
                You got {getCorrectCount()} out of {activePassage.questions.length} questions correct!
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
                <button
                  className="btn btn-secondary"
                  onClick={resetExercise}
                >
                  Try Again
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleBack}
                >
                  Choose Another Passage
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
