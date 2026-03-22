import React, { useState, useMemo, useCallback, useRef } from 'react'
import { listeningPassages, ListeningPassage, ListeningQuestion } from '../data/listeningComprehension'

interface ListeningComprehensionProps {
  onComplete?: (score: number, level: string) => void
}

type CefrLevel = 'B1' | 'B2' | 'C1' | 'C2'

function speakTranscript(text: string, rate: number = 0.95) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = rate
  window.speechSynthesis.speak(utterance)
}

function stopSpeaking() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
}

const TYPE_LABELS: Record<ListeningQuestion['type'], { label: string; color: string }> = {
  inference: { label: 'Inference', color: '#6f42c1' },
  main_idea: { label: 'Main Idea', color: '#007bff' },
  detail: { label: 'Detail', color: '#28a745' },
  attitude: { label: 'Attitude', color: '#fd7e14' },
  implication: { label: 'Implication', color: '#dc3545' },
}

const PASSAGE_TYPE_ICONS: Record<string, string> = {
  monologue: '🎤',
  dialogue: '💬',
  lecture: '🎓',
  debate: '🗣️',
}

export const ListeningComprehension: React.FC<ListeningComprehensionProps> = ({ onComplete }) => {
  const [selectedLevel, setSelectedLevel] = useState<CefrLevel>('B1')
  const [selectedPassage, setSelectedPassage] = useState<ListeningPassage | null>(null)
  const [phase, setPhase] = useState<'select' | 'listen' | 'questions' | 'results'>('select')
  const [playCount, setPlayCount] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const levelPassages = useMemo(
    () => listeningPassages.filter(p => p.cefrLevel === selectedLevel),
    [selectedLevel]
  )

  const maxPlays = selectedLevel === 'C2' ? 2 : selectedLevel === 'C1' ? 3 : 5

  // Check if pre-generated audio exists for this passage
  const hasAudioFile = selectedPassage?.audioUrl || (selectedPassage && document.querySelector(`link[href="/audio/${selectedPassage.id}.mp3"]`) !== null)
  const audioSrc = selectedPassage ? (selectedPassage.audioUrl || `/audio/${selectedPassage.id}.mp3`) : ''

  const handlePlay = useCallback(() => {
    if (!selectedPassage || playCount >= maxPlays) return
    setIsSpeaking(true)

    // Priority 1: Use pre-generated high-quality audio file
    const audioPath = selectedPassage.audioUrl || `/audio/${selectedPassage.id}.mp3`

    // Try to use audio element first
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    const audio = new Audio(audioPath)
    audioRef.current = audio
    audio.onended = () => setIsSpeaking(false)
    audio.onerror = () => {
      // Fallback to browser TTS if audio file not found
      console.log('Audio file not found, falling back to TTS')
      const rate = selectedLevel === 'C2' ? 1.05 : selectedLevel === 'C1' ? 1.0 : 0.9
      window.speechSynthesis.cancel()

      const isMultiSpeaker = selectedPassage.type === 'dialogue' || selectedPassage.type === 'debate'
      if (isMultiSpeaker) {
        const segments = selectedPassage.transcript.split(/(?=Speaker [A-Z] (?:says|responds|asks|replies|adds|counters|argues|continues|concludes):)/i)
        let idx = 0
        const speakNext = () => {
          if (idx >= segments.length) { setIsSpeaking(false); return }
          const seg = segments[idx].trim()
          if (!seg) { idx++; speakNext(); return }
          const u = new SpeechSynthesisUtterance(seg)
          u.lang = 'en-US'
          u.rate = rate
          u.pitch = seg.match(/^Speaker [Aa]/i) ? 0.85 : 1.2
          u.onend = () => { idx++; speakNext() }
          u.onerror = () => { setIsSpeaking(false) }
          window.speechSynthesis.speak(u)
        }
        speakNext()
      } else {
        const utterance = new SpeechSynthesisUtterance(selectedPassage.transcript)
        utterance.lang = 'en-US'
        utterance.rate = rate
        utterance.onend = () => setIsSpeaking(false)
        utterance.onerror = () => setIsSpeaking(false)
        window.speechSynthesis.speak(utterance)
      }
    }
    audio.play().catch(() => {
      // Trigger onerror fallback
      audio.onerror?.(new Event('error') as any)
    })

    setPlayCount(p => p + 1)
  }, [selectedPassage, playCount, maxPlays, selectedLevel])

  const handleSelectPassage = (passage: ListeningPassage) => {
    setSelectedPassage(passage)
    setPhase('listen')
    setPlayCount(0)
    setAnswers({})
    setShowResults(false)
  }

  const handleProceedToQuestions = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
    stopSpeaking()
    setIsSpeaking(false)
    setPhase('questions')
  }

  const handleAnswerChange = (questionId: string, optionIndex: number) => {
    if (showResults) return
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }))
  }

  const handleSubmit = () => {
    if (!selectedPassage) return
    setShowResults(true)
    setPhase('results')

    const correct = selectedPassage.questions.filter(q => answers[q.id] === q.correctAnswer).length
    const score = Math.round((correct / selectedPassage.questions.length) * 100)
    if (onComplete) onComplete(score, selectedLevel)
  }

  const handleBack = () => {
    stopSpeaking()
    setIsSpeaking(false)
    setSelectedPassage(null)
    setPhase('select')
    setPlayCount(0)
    setAnswers({})
    setShowResults(false)
  }

  const getScore = () => {
    if (!selectedPassage) return 0
    return selectedPassage.questions.filter(q => answers[q.id] === q.correctAnswer).length
  }

  const getScoreColor = (score: number, total: number) => {
    const pct = (score / total) * 100
    if (pct >= 80) return '#28a745'
    if (pct >= 60) return '#007bff'
    if (pct >= 40) return '#ffc107'
    return '#dc3545'
  }

  // Passage selection screen
  if (phase === 'select') {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ marginBottom: '8px' }}>🎧 Listening Comprehension</h2>
          <p style={{ color: '#666' }}>Listen to passages and answer comprehension questions. No transcript — use your ears!</p>
        </div>

        {/* Level tabs */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
          {(['B1', 'B2', 'C1', 'C2'] as CefrLevel[]).map(level => (
            <button key={level}
              className={`btn ${selectedLevel === level ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '14px', padding: '8px 16px' }}
              onClick={() => setSelectedLevel(level)}>
              {level} ({listeningPassages.filter(p => p.cefrLevel === level).length})
            </button>
          ))}
        </div>

        {/* Passage cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {levelPassages.map(passage => (
            <div key={passage.id} className="card"
              style={{ cursor: 'pointer', transition: 'transform 0.2s', borderLeft: `4px solid ${selectedLevel === 'C2' ? '#dc3545' : selectedLevel === 'C1' ? '#fd7e14' : '#007bff'}` }}
              onClick={() => handleSelectPassage(passage)}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'none')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px' }}>{PASSAGE_TYPE_ICONS[passage.type] || '🎧'}</span>
                <h4 style={{ margin: 0 }}>{passage.title}</h4>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '10px', backgroundColor: '#e7f3ff', color: '#004085' }}>
                  {passage.type}
                </span>
                <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '10px', backgroundColor: '#f0f0f0', color: '#666' }}>
                  {passage.questions.length} questions
                </span>
              </div>
            </div>
          ))}
        </div>

        {levelPassages.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            No passages available for this level yet.
          </div>
        )}
      </div>
    )
  }

  if (!selectedPassage) return null

  // Listening screen
  if (phase === 'listen') {
    return (
      <div className="container">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <button className="btn btn-secondary" style={{ fontSize: '14px', padding: '6px 14px' }} onClick={handleBack}>← Back</button>
            <h3 style={{ margin: 0 }}>{selectedPassage.title}</h3>
            <span style={{ fontSize: '13px', color: '#666' }}>{selectedPassage.cefrLevel} • {selectedPassage.type}</span>
          </div>

          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>{PASSAGE_TYPE_ICONS[selectedPassage.type] || '🎧'}</div>

            <p style={{ color: '#666', marginBottom: '20px', fontSize: '16px' }}>
              Listen carefully. You will answer questions about what you heard.
              {selectedLevel === 'C2' && <><br /><strong>C2 mode: Maximum 2 plays.</strong></>}
            </p>

            <button
              className={`btn ${isSpeaking ? 'btn-danger' : 'btn-primary'}`}
              style={{ fontSize: '18px', padding: '14px 32px', marginBottom: '16px' }}
              onClick={isSpeaking ? () => { stopSpeaking(); setIsSpeaking(false) } : handlePlay}
              disabled={playCount >= maxPlays && !isSpeaking}>
              {isSpeaking ? '⏹ Stop' : playCount === 0 ? '▶ Play Audio' : '▶ Play Again'}
            </button>

            <div style={{ color: '#888', fontSize: '14px', marginBottom: '24px' }}>
              Played {playCount} / {maxPlays} time{maxPlays !== 1 ? 's' : ''}
            </div>

            {playCount > 0 && (
              <button className="btn btn-success" style={{ fontSize: '16px', padding: '12px 28px' }}
                onClick={handleProceedToQuestions} disabled={isSpeaking}>
                Answer Questions →
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Questions + Results screen
  const allAnswered = selectedPassage.questions.every(q => answers[q.id] !== undefined)

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button className="btn btn-secondary" style={{ fontSize: '14px', padding: '6px 14px' }} onClick={handleBack}>← Back</button>
          <h3 style={{ margin: 0 }}>{selectedPassage.title}</h3>
          <span style={{ fontSize: '13px', color: '#666' }}>{selectedPassage.cefrLevel}</span>
        </div>

        {/* Score display for results */}
        {showResults && (
          <div style={{ textAlign: 'center', marginBottom: '24px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: getScoreColor(getScore(), selectedPassage.questions.length) }}>
              {getScore()} / {selectedPassage.questions.length}
            </div>
            <p style={{ color: '#666', margin: '5px 0 0' }}>
              {Math.round((getScore() / selectedPassage.questions.length) * 100)}% correct
            </p>
          </div>
        )}

        {/* Questions */}
        {selectedPassage.questions.map((question, qIdx) => {
          const typeInfo = TYPE_LABELS[question.type]
          const userAnswer = answers[question.id]
          const isCorrect = userAnswer === question.correctAnswer

          return (
            <div key={question.id} style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <h4 style={{ margin: 0, fontSize: '15px' }}>{qIdx + 1}. {question.question}</h4>
                <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '10px', backgroundColor: typeInfo.color + '20', color: typeInfo.color, fontWeight: 600 }}>
                  {typeInfo.label}
                </span>
              </div>

              <div style={{ paddingLeft: '16px' }}>
                {question.options.map((option, optIdx) => {
                  let bg = 'transparent'
                  if (showResults) {
                    if (optIdx === question.correctAnswer) bg = '#d4edda'
                    else if (userAnswer === optIdx && !isCorrect) bg = '#f8d7da'
                  } else if (userAnswer === optIdx) {
                    bg = '#e7f3ff'
                  }

                  return (
                    <label key={optIdx} style={{
                      display: 'block',
                      padding: '8px 12px',
                      margin: '4px 0',
                      borderRadius: '6px',
                      backgroundColor: bg,
                      cursor: showResults ? 'default' : 'pointer',
                      fontSize: '14px',
                      transition: 'background-color 0.2s',
                    }}>
                      <input type="radio" name={question.id}
                        checked={userAnswer === optIdx}
                        onChange={() => handleAnswerChange(question.id, optIdx)}
                        disabled={showResults}
                        style={{ marginRight: '8px' }} />
                      {option}
                      {showResults && optIdx === question.correctAnswer && <span style={{ marginLeft: '8px', color: '#28a745' }}>✓</span>}
                      {showResults && userAnswer === optIdx && !isCorrect && <span style={{ marginLeft: '8px', color: '#dc3545' }}>✗</span>}
                    </label>
                  )
                })}
              </div>

              {showResults && (
                <div style={{ marginTop: '8px', padding: '8px 12px', backgroundColor: '#fff8e1', borderRadius: '6px', fontSize: '13px', color: '#856404' }}>
                  <strong>Explanation:</strong> {question.explanation}
                </div>
              )}
            </div>
          )
        })}

        {/* Submit / Actions */}
        {!showResults ? (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button className="btn btn-primary" style={{ fontSize: '16px', padding: '12px 28px' }}
              onClick={handleSubmit} disabled={!allAnswered}>
              Submit Answers
            </button>
            {!allAnswered && <p style={{ color: '#888', fontSize: '13px', marginTop: '8px' }}>Answer all questions to submit</p>}
          </div>
        ) : (
          <div>
            {/* Transcript reveal */}
            <details style={{ marginTop: '20px' }}>
              <summary style={{ cursor: 'pointer', fontSize: '15px', fontWeight: 600, color: '#007bff' }}>
                Show Transcript (for review)
              </summary>
              <div style={{ marginTop: '10px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px', lineHeight: 1.8, fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                {selectedPassage.transcript}
              </div>
            </details>

            {/* Key vocabulary */}
            {selectedPassage.keyVocabulary.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ fontSize: '15px', marginBottom: '8px' }}>Key Vocabulary</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                  {selectedPassage.keyVocabulary.map((v, i) => (
                    <div key={i} style={{ padding: '8px 12px', backgroundColor: '#e7f3ff', borderRadius: '6px', fontSize: '13px' }}>
                      <strong>{v.word}</strong>: {v.definition}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={handleBack}>Choose Another</button>
              <button className="btn btn-primary" onClick={() => {
                setPhase('listen')
                setPlayCount(0)
                setAnswers({})
                setShowResults(false)
              }}>Try Again</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
