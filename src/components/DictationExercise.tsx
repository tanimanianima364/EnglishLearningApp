import React, { useState, useMemo, useCallback } from 'react'
import { dictationSentences, DictationSentence } from '../data/dictationSentences'
import { sortByFrequency } from '../utils/frequencyUtils'

interface DictationExerciseProps {
  onComplete?: (score: number, level: string) => void
}

type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2'

function speakText(text: string, speed: DictationSentence['speed']) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = speed === 'slow' ? 0.7 : speed === 'fast' ? 1.1 : 0.9
  window.speechSynthesis.speak(utterance)
}

function diffWords(original: string, typed: string): { word: string; correct: boolean }[] {
  const origWords = original.toLowerCase().replace(/[^a-z'\-\s]/g, '').split(/\s+/).filter(Boolean)
  const typedWords = typed.toLowerCase().replace(/[^a-z'\-\s]/g, '').split(/\s+/).filter(Boolean)

  return origWords.map((word, i) => ({
    word,
    correct: i < typedWords.length && typedWords[i] === word
  }))
}

export const DictationExercise: React.FC<DictationExerciseProps> = ({ onComplete }) => {
  const [selectedLevel, setSelectedLevel] = useState<CefrLevel>('A1')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [scores, setScores] = useState<number[]>([])
  const [playCount, setPlayCount] = useState(0)
  const [showFinal, setShowFinal] = useState(false)

  const levelSentences = useMemo(
    () => sortByFrequency(
      dictationSentences.filter(s => s.cefrLevel === selectedLevel),
      s => s.text
    ),
    [selectedLevel]
  )

  const currentSentence = levelSentences[currentIndex]
  const EXERCISES_PER_SESSION = Math.min(5, levelSentences.length)

  const handlePlay = useCallback(() => {
    if (currentSentence) {
      speakText(currentSentence.text, currentSentence.speed)
      setPlayCount(p => p + 1)
    }
  }, [currentSentence])

  const handlePlaySlow = useCallback(() => {
    if (currentSentence) {
      speakText(currentSentence.text, 'slow')
      setPlayCount(p => p + 1)
    }
  }, [currentSentence])

  const handleSubmit = () => {
    if (!userInput.trim() || !currentSentence) return
    setSubmitted(true)
    const result = diffWords(currentSentence.text, userInput)
    const correct = result.filter(r => r.correct).length
    const score = Math.round((correct / result.length) * 100)
    setScores(prev => [...prev, score])
  }

  const handleNext = () => {
    if (currentIndex + 1 >= EXERCISES_PER_SESSION) {
      setShowFinal(true)
      const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      if (onComplete) onComplete(avgScore, selectedLevel)
      return
    }
    setCurrentIndex(i => i + 1)
    setUserInput('')
    setSubmitted(false)
    setPlayCount(0)
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setUserInput('')
    setSubmitted(false)
    setScores([])
    setPlayCount(0)
    setShowFinal(false)
  }

  const result = submitted && currentSentence ? diffWords(currentSentence.text, userInput) : null
  const currentScore = result ? Math.round((result.filter(r => r.correct).length / result.length) * 100) : 0

  // Final results
  if (showFinal) {
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    return (
      <div className="card">
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Dictation Results — {selectedLevel}</h3>
        <div className={`score ${avg >= 90 ? 'excellent' : avg >= 75 ? 'good' : avg >= 60 ? 'fair' : 'poor'}`}>
          {avg}/100
        </div>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
          {scores.length} sentences completed
        </p>
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
          {scores.map((s, i) => (
            <span key={i} style={{
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '13px',
              color: 'white',
              backgroundColor: s >= 90 ? '#28a745' : s >= 75 ? '#007bff' : s >= 60 ? '#ffc107' : '#dc3545'
            }}>{s}%</span>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-primary" onClick={handleRestart}>Try Again</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="card" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3>🎧 Dictation Exercise</h3>
          <span style={{ fontSize: '14px', color: '#666' }}>
            {currentIndex + 1} / {EXERCISES_PER_SESSION}
          </span>
        </div>

        {/* Level tabs */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
          {(['A1', 'A2', 'B1', 'B2'] as CefrLevel[]).map(level => (
            <button
              key={level}
              className={`btn ${selectedLevel === level ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '13px', padding: '6px 16px' }}
              onClick={() => {
                setSelectedLevel(level)
                handleRestart()
              }}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Play controls */}
        <div style={{ textAlign: 'center', margin: '24px 0' }}>
          <p style={{ color: '#666', marginBottom: '12px', fontSize: '15px' }}>
            Listen and type what you hear.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={handlePlay} style={{ fontSize: '18px', padding: '12px 28px' }}>
              🔊 Play
            </button>
            <button className="btn btn-secondary" onClick={handlePlaySlow} style={{ fontSize: '14px', padding: '12px 20px' }}>
              🐢 Slow
            </button>
          </div>
          {playCount > 0 && (
            <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
              Played {playCount} time{playCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Input */}
        <div style={{ marginBottom: '16px' }}>
          <textarea
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            placeholder="Type what you heard..."
            disabled={submitted}
            rows={3}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '16px',
              fontFamily: 'inherit',
              resize: 'vertical',
              outline: 'none'
            }}
            onFocus={e => e.target.style.borderColor = '#007bff'}
            onBlur={e => e.target.style.borderColor = '#e0e0e0'}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && !submitted) { e.preventDefault(); handleSubmit() } }}
          />
        </div>

        {/* Submit / Next */}
        {!submitted ? (
          <button
            className="btn btn-success"
            onClick={handleSubmit}
            disabled={!userInput.trim() || playCount === 0}
            style={{ width: '100%' }}
          >
            Check Answer
          </button>
        ) : (
          <div>
            {/* Score */}
            <div style={{
              textAlign: 'center',
              padding: '12px',
              marginBottom: '16px',
              borderRadius: '8px',
              backgroundColor: currentScore >= 90 ? '#d4edda' : currentScore >= 60 ? '#fff3cd' : '#f8d7da',
              color: currentScore >= 90 ? '#155724' : currentScore >= 60 ? '#856404' : '#721c24'
            }}>
              <strong>{currentScore}%</strong> correct
            </div>

            {/* Word diff */}
            <div style={{
              padding: '16px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              marginBottom: '16px'
            }}>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Correct text:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {result?.map((r, i) => (
                  <span key={i} style={{
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '15px',
                    backgroundColor: r.correct ? '#d4edda' : '#f8d7da',
                    color: r.correct ? '#155724' : '#721c24',
                    fontWeight: r.correct ? 'normal' : 700
                  }}>
                    {r.word}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: '13px', color: '#666', marginTop: '10px', marginBottom: '4px' }}>Your text:</p>
              <p style={{ fontSize: '15px', color: '#333', margin: 0 }}>"{userInput}"</p>
            </div>

            <button className="btn btn-primary" onClick={handleNext} style={{ width: '100%' }}>
              {currentIndex + 1 >= EXERCISES_PER_SESSION ? 'See Results' : 'Next Sentence'}
            </button>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div style={{
        height: '6px',
        backgroundColor: '#e0e0e0',
        borderRadius: '3px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${((currentIndex + (submitted ? 1 : 0)) / EXERCISES_PER_SESSION) * 100}%`,
          backgroundColor: '#007bff',
          transition: 'width 0.3s'
        }} />
      </div>
    </div>
  )
}
