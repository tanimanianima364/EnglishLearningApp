import React, { useState, useMemo, useCallback } from 'react'
import { minimalPairs, MinimalPair } from '../data/minimalPairs'
import { sortByFrequency } from '../utils/frequencyUtils'

interface MinimalPairDrillProps {
  onComplete?: (score: number) => void
}

type CategoryFilter = 'All' | 'Vowels' | 'Consonants' | 'Stress'

function speakWord(word: string) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(word)
  utterance.lang = 'en-US'
  utterance.rate = 0.8
  window.speechSynthesis.speak(utterance)
}

export const MinimalPairDrill: React.FC<MinimalPairDrillProps> = ({ onComplete }) => {
  const [category, setCategory] = useState<CategoryFilter>('All')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [targetIdx, setTargetIdx] = useState<0 | 1>(() => Math.random() < 0.5 ? 0 : 1)
  const [selected, setSelected] = useState<number | null>(null)
  const [results, setResults] = useState<boolean[]>([])
  const [showFinal, setShowFinal] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)

  const filtered = useMemo(
    () => sortByFrequency(
      category === 'All' ? minimalPairs : minimalPairs.filter(p => p.category === category),
      p => p.pair.join(' ')
    ),
    [category]
  )

  const EXERCISES_PER_SESSION = Math.min(10, filtered.length)
  const currentPair = filtered[currentIndex]

  const handlePlay = useCallback(() => {
    if (currentPair) {
      speakWord(currentPair.pair[targetIdx])
      setHasPlayed(true)
    }
  }, [currentPair, targetIdx])

  const handleSelect = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    const isCorrect = idx === targetIdx
    setResults(prev => [...prev, isCorrect])
  }

  const handleNext = () => {
    if (currentIndex + 1 >= EXERCISES_PER_SESSION) {
      setShowFinal(true)
      const correct = results.filter(Boolean).length
      const score = Math.round((correct / results.length) * 100)
      if (onComplete) onComplete(score)
      return
    }
    setCurrentIndex(i => i + 1)
    setTargetIdx(Math.random() < 0.5 ? 0 : 1)
    setSelected(null)
    setHasPlayed(false)
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setTargetIdx(Math.random() < 0.5 ? 0 : 1)
    setSelected(null)
    setResults([])
    setShowFinal(false)
    setHasPlayed(false)
  }

  // Final results
  if (showFinal) {
    const correct = results.filter(Boolean).length
    const score = Math.round((correct / results.length) * 100)
    return (
      <div className="card">
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Minimal Pair Results</h3>
        <div className={`score ${score >= 90 ? 'excellent' : score >= 75 ? 'good' : score >= 60 ? 'fair' : 'poor'}`}>
          {score}/100
        </div>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
          {correct} / {results.length} correct
        </p>
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
          {results.map((r, i) => (
            <span key={i} style={{
              width: '24px', height: '24px',
              borderRadius: '50%',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', color: 'white',
              backgroundColor: r ? '#28a745' : '#dc3545'
            }}>{r ? '✓' : '✗'}</span>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-primary" onClick={handleRestart}>Try Again</button>
        </div>
      </div>
    )
  }

  if (!currentPair) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <p>No pairs available for this category.</p>
        <button className="btn btn-primary" onClick={() => setCategory('All')}>Show All</button>
      </div>
    )
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3>👂 Minimal Pair Drill</h3>
          <span style={{ fontSize: '14px', color: '#666' }}>
            {currentIndex + 1} / {EXERCISES_PER_SESSION}
          </span>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
          {(['All', 'Vowels', 'Consonants', 'Stress'] as CategoryFilter[]).map(cat => (
            <button
              key={cat}
              className={`btn ${category === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '13px', padding: '6px 16px' }}
              onClick={() => { setCategory(cat); handleRestart() }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Instructions */}
        <div style={{
          textAlign: 'center',
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <p style={{ color: '#666', margin: '0 0 4px 0', fontSize: '15px' }}>
            Listen to the word, then choose which one you hear.
          </p>
          <p style={{ color: '#999', margin: 0, fontSize: '13px' }}>
            {currentPair.hint}
          </p>
        </div>

        {/* Play button */}
        <div style={{ textAlign: 'center', margin: '24px 0' }}>
          <button
            className="btn btn-primary"
            onClick={handlePlay}
            style={{ fontSize: '20px', padding: '16px 40px' }}
          >
            🔊 {hasPlayed ? 'Play Again' : 'Play'}
          </button>
        </div>

        {/* Choices */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', margin: '24px 0' }}>
          {currentPair.pair.map((word, idx) => {
            let bg = 'white'
            let border = '2px solid #e0e0e0'
            let color = '#333'

            if (selected !== null) {
              if (idx === targetIdx) {
                bg = '#d4edda'
                border = '2px solid #28a745'
                color = '#155724'
              } else if (idx === selected && selected !== targetIdx) {
                bg = '#f8d7da'
                border = '2px solid #dc3545'
                color = '#721c24'
              }
            } else if (!hasPlayed) {
              bg = '#f0f0f0'
            }

            return (
              <button
                key={idx}
                onClick={() => hasPlayed && handleSelect(idx)}
                disabled={!hasPlayed || selected !== null}
                style={{
                  flex: 1,
                  maxWidth: '200px',
                  padding: '20px',
                  backgroundColor: bg,
                  border,
                  borderRadius: '12px',
                  fontSize: '22px',
                  fontWeight: 700,
                  color,
                  cursor: hasPlayed && selected === null ? 'pointer' : 'default',
                  transition: 'all 0.2s'
                }}
              >
                {word}
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {selected !== null && (
          <div style={{
            textAlign: 'center',
            padding: '12px',
            marginBottom: '16px',
            borderRadius: '8px',
            backgroundColor: selected === targetIdx ? '#d4edda' : '#f8d7da',
            color: selected === targetIdx ? '#155724' : '#721c24'
          }}>
            {selected === targetIdx
              ? 'Correct! Well done!'
              : `The word was "${currentPair.pair[targetIdx]}".`
            }
          </div>
        )}

        {/* Listen to both */}
        {selected !== null && (
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '16px' }}>
            <button
              className="btn btn-secondary"
              style={{ fontSize: '13px', padding: '6px 14px' }}
              onClick={() => speakWord(currentPair.pair[0])}
            >
              🔊 {currentPair.pair[0]}
            </button>
            <button
              className="btn btn-secondary"
              style={{ fontSize: '13px', padding: '6px 14px' }}
              onClick={() => speakWord(currentPair.pair[1])}
            >
              🔊 {currentPair.pair[1]}
            </button>
          </div>
        )}

        {/* Next */}
        {selected !== null && (
          <button className="btn btn-primary" onClick={handleNext} style={{ width: '100%' }}>
            {currentIndex + 1 >= EXERCISES_PER_SESSION ? 'See Results' : 'Next Pair'}
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div style={{
        height: '6px',
        backgroundColor: '#e0e0e0',
        borderRadius: '3px',
        overflow: 'hidden',
        marginTop: '12px'
      }}>
        <div style={{
          height: '100%',
          width: `${((currentIndex + (selected !== null ? 1 : 0)) / EXERCISES_PER_SESSION) * 100}%`,
          backgroundColor: '#007bff',
          transition: 'width 0.3s'
        }} />
      </div>
    </div>
  )
}
