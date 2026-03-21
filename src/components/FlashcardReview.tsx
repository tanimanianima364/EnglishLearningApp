import React, { useState, useMemo, useCallback } from 'react'
import { useSRS } from '../hooks/useSRS'
import { useWordPacks } from '../hooks/useWordPacks'
import { FlashcardItem, ResponseQuality, SessionMode } from '../types/srs'
import { previewIntervals, formatInterval } from '../utils/srsAlgorithm'
import { getFrequencyBandDisplay } from '../utils/frequencyUtils'

interface FlashcardReviewProps {
  onComplete?: (stats: { reviewed: number; correct: number; duration: number }) => void
}

function speakWord(word: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(word)
    u.lang = 'en-US'
    u.rate = 0.85
    window.speechSynthesis.speak(u)
  }
}

export const FlashcardReview: React.FC<FlashcardReviewProps> = ({ onComplete }) => {
  const { buildQueue, processReview, getSRSStats, getDueCount, getNewCount } = useSRS()
  const { getActivePacks } = useWordPacks()

  const [queue, setQueue] = useState<FlashcardItem[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [reviewed, setReviewed] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [sessionActive, setSessionActive] = useState(false)
  const [sessionStart, setSessionStart] = useState(0)
  const [selectedMode, setSelectedMode] = useState<SessionMode>('all_due')

  const stats = getSRSStats()
  const card = queue[currentIdx]

  const startSession = useCallback((mode: SessionMode) => {
    const activePacks = getActivePacks()
    const q = buildQueue(mode, activePacks)
    setQueue(q)
    setCurrentIdx(0)
    setIsFlipped(false)
    setReviewed(0)
    setCorrectCount(0)
    setStreak(0)
    setBestStreak(0)
    setSessionActive(true)
    setSessionStart(Date.now())
    setSelectedMode(mode)
  }, [buildQueue, getActivePacks])

  const handleAnswer = (quality: ResponseQuality) => {
    if (!card) return
    processReview(card.word, quality)

    const isCorrect = quality >= 2
    setReviewed(r => r + 1)
    if (isCorrect) {
      setCorrectCount(c => c + 1)
      setStreak(s => {
        const next = s + 1
        setBestStreak(b => Math.max(b, next))
        return next
      })
    } else {
      setStreak(0)
    }

    if (currentIdx + 1 >= queue.length) {
      // Session complete
      setSessionActive(false)
      if (onComplete) {
        onComplete({
          reviewed: reviewed + 1,
          correct: correctCount + (isCorrect ? 1 : 0),
          duration: Date.now() - sessionStart
        })
      }
      return
    }

    setCurrentIdx(i => i + 1)
    setIsFlipped(false)
  }

  // Session complete screen
  if (sessionActive === false && reviewed > 0) {
    const accuracy = Math.round((correctCount / reviewed) * 100)
    const duration = Math.round((Date.now() - sessionStart) / 60000)
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '20px' }}>Session Complete</h3>
        <div className={`score ${accuracy >= 90 ? 'excellent' : accuracy >= 75 ? 'good' : accuracy >= 60 ? 'fair' : 'poor'}`}>
          {accuracy}%
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', margin: '20px 0', maxWidth: '300px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div><div style={{ fontSize: '24px', fontWeight: 700, color: '#007bff' }}>{reviewed}</div><div style={{ color: '#666', fontSize: '13px' }}>Reviewed</div></div>
          <div><div style={{ fontSize: '24px', fontWeight: 700, color: '#28a745' }}>{correctCount}</div><div style={{ color: '#666', fontSize: '13px' }}>Correct</div></div>
          <div><div style={{ fontSize: '24px', fontWeight: 700, color: '#ffc107' }}>{bestStreak}</div><div style={{ color: '#666', fontSize: '13px' }}>Best Streak</div></div>
          <div><div style={{ fontSize: '24px', fontWeight: 700, color: '#6c757d' }}>{duration}m</div><div style={{ color: '#666', fontSize: '13px' }}>Duration</div></div>
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => startSession(selectedMode)}>Review More</button>
          <button className="btn btn-secondary" onClick={() => { setReviewed(0); setSessionActive(false) }}>Back</button>
        </div>
      </div>
    )
  }

  // Card review screen
  if (sessionActive && card) {
    const intervals = previewIntervals(card.srs)
    const bandDisplay = getFrequencyBandDisplay(card.frequencyBand)
    return (
      <div>
        {/* Header */}
        <div className="card" style={{ padding: '12px 20px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button onClick={() => { setSessionActive(false) }} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>←</button>
              <span style={{ fontSize: '14px', color: '#666' }}>
                {currentIdx + 1} / {queue.length}
              </span>
              {card.isNew && <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '10px', backgroundColor: '#cce5ff', color: '#004085' }}>New</span>}
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#888' }}>
              <span>Streak: {streak}</span>
              <span>{correctCount}/{reviewed} correct</span>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="card" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '32px' }}>
          {!isFlipped ? (
            /* Front */
            <div style={{ textAlign: 'center', width: '100%' }}>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#333', marginBottom: '16px' }}>{card.word}</div>
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
                <span style={{ fontSize: '12px', padding: '2px 10px', borderRadius: '10px', backgroundColor: bandDisplay.bg, color: bandDisplay.color }}>{bandDisplay.label}</span>
                {card.isAcademic && <span style={{ fontSize: '12px', padding: '2px 10px', borderRadius: '10px', backgroundColor: '#e8d5f5', color: '#553c9a' }}>Academic</span>}
                {card.isBusiness && <span style={{ fontSize: '12px', padding: '2px 10px', borderRadius: '10px', backgroundColor: '#bee3f8', color: '#2c5282' }}>Business</span>}
              </div>
              <button className="btn btn-primary" onClick={() => { setIsFlipped(true); speakWord(card.word) }} style={{ fontSize: '16px', padding: '12px 32px' }}>
                Show Answer
              </button>
            </div>
          ) : (
            /* Back */
            <div style={{ textAlign: 'center', width: '100%' }}>
              <div style={{ fontSize: '22px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>{card.word}</div>
              <button onClick={() => speakWord(card.word)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', marginBottom: '16px' }}>🔊</button>
              <div style={{ fontSize: '20px', color: '#007bff', fontWeight: 600, marginBottom: '12px' }}>{card.meaning || 'No meaning available'}</div>
              {card.exampleContext && (
                <div style={{ padding: '12px 16px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', color: '#555', fontStyle: 'italic' }}>
                  "{card.exampleContext}"
                </div>
              )}
              {/* Answer buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {([
                  { q: 0 as ResponseQuality, label: 'Again', cls: 'btn-danger' },
                  { q: 1 as ResponseQuality, label: 'Hard', cls: 'btn-secondary' },
                  { q: 2 as ResponseQuality, label: 'Good', cls: 'btn-primary' },
                  { q: 3 as ResponseQuality, label: 'Easy', cls: 'btn-success' }
                ]).map(btn => (
                  <button key={btn.q} className={`btn ${btn.cls}`} onClick={() => handleAnswer(btn.q)}
                    style={{ fontSize: '14px', padding: '10px 4px' }}>
                    <div>{btn.label}</div>
                    <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '2px' }}>{formatInterval(intervals[btn.q])}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div style={{ height: '6px', backgroundColor: '#e0e0e0', borderRadius: '3px', overflow: 'hidden', marginTop: '12px' }}>
          <div style={{ height: '100%', width: `${((currentIdx + 1) / queue.length) * 100}%`, backgroundColor: '#007bff', transition: 'width 0.3s' }} />
        </div>
      </div>
    )
  }

  // Start screen
  return (
    <div>
      <div className="card" style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h2 style={{ marginBottom: '8px' }}>🔁 Flashcard Review</h2>
        <p style={{ color: '#666' }}>Review vocabulary using spaced repetition</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#dc3545' }}>{stats.dueToday}</div>
          <div style={{ color: '#666', fontSize: '13px' }}>Due Today</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#007bff' }}>{stats.newAvailable}</div>
          <div style={{ color: '#666', fontSize: '13px' }}>New Cards</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#28a745' }}>{stats.totalInSRS}</div>
          <div style={{ color: '#666', fontSize: '13px' }}>In Rotation</div>
        </div>
      </div>

      {/* Session modes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        {([
          { mode: 'all_due' as SessionMode, title: 'All Due', desc: 'Reviews + new cards (mixed)', icon: '📚', count: stats.dueToday + Math.min(stats.newAvailable, 20) },
          { mode: 'review_only' as SessionMode, title: 'Review Only', desc: 'Only due review cards', icon: '🔄', count: stats.dueToday },
          { mode: 'new_only' as SessionMode, title: 'New Only', desc: 'Learn new words', icon: '✨', count: Math.min(stats.newAvailable, 20) }
        ]).map(opt => (
          <div key={opt.mode} className="card" style={{ textAlign: 'center', cursor: opt.count > 0 ? 'pointer' : 'default', opacity: opt.count > 0 ? 1 : 0.5 }}
            onClick={() => opt.count > 0 && startSession(opt.mode)}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{opt.icon}</div>
            <h4 style={{ margin: '0 0 4px 0' }}>{opt.title}</h4>
            <p style={{ color: '#666', fontSize: '13px', margin: '0 0 8px 0' }}>{opt.desc}</p>
            <span style={{ fontSize: '14px', fontWeight: 700, color: opt.count > 0 ? '#007bff' : '#ccc' }}>{opt.count} cards</span>
          </div>
        ))}
      </div>

      {stats.dueToday === 0 && stats.newAvailable === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '32px', marginTop: '16px' }}>
          <h3>All caught up!</h3>
          <p style={{ color: '#666' }}>Complete exercises to add words, or activate a word pack for more vocabulary.</p>
        </div>
      )}
    </div>
  )
}
