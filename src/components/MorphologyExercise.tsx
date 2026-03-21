import React, { useState, useMemo } from 'react'
import { useMorphology } from '../hooks/useMorphology'
import {
  MorphologyLesson, MorphologyExerciseItem,
  DecomposeExercise, BuildExercise, PredictMeaningExercise, MatchExercise, Morpheme
} from '../types/morphology'

import {
  prefixes, roots, suffixes, morphologyLessons
} from '../data/morphologyData'

interface MorphologyExerciseProps {
  onComplete?: (score: number, lessonId: string) => void
}

type Difficulty = 'beginner' | 'intermediate' | 'advanced'
type ExplorerTab = 'prefixes' | 'roots' | 'suffixes'

const COLORS = {
  prefix: { bg: '#e7f3ff', border: '#b8daff', text: '#004085' },
  root: { bg: '#e8f5e9', border: '#a5d6a7', text: '#1b5e20' },
  suffix: { bg: '#f3e8ff', border: '#ce93d8', text: '#4a148c' }
}

export const MorphologyExercise: React.FC<MorphologyExerciseProps> = ({ onComplete }) => {
  const { submitLessonScore, updateMorphemeMastery, getLessonBestScore, isLessonCompleted } = useMorphology()

  const [activeLesson, setActiveLesson] = useState<MorphologyLesson | null>(null)
  const [currentExIdx, setCurrentExIdx] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [showFinal, setShowFinal] = useState(false)
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'all'>('all')
  const [explorerTab, setExplorerTab] = useState<ExplorerTab>('prefixes')
  const [expandedMorpheme, setExpandedMorpheme] = useState<string | null>(null)

  // Exercise-specific state
  const [selectedParts, setSelectedParts] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [matchState, setMatchState] = useState<{ selected: string | null; matched: Record<string, string> }>({ selected: null, matched: {} })

  const filteredLessons = useMemo(() => {
    if (filterDifficulty === 'all') return morphologyLessons
    return morphologyLessons.filter(l => l.difficulty === filterDifficulty)
  }, [filterDifficulty])

  const currentExercise = activeLesson?.exercises[currentExIdx]

  const resetExerciseState = () => {
    setSelectedParts([])
    setSelectedAnswer('')
    setMatchState({ selected: null, matched: {} })
    setShowFeedback(false)
  }

  const handleStartLesson = (lesson: MorphologyLesson) => {
    setActiveLesson(lesson)
    setCurrentExIdx(0)
    setCorrectCount(0)
    setShowFinal(false)
    resetExerciseState()
  }

  const handleBack = () => {
    setActiveLesson(null)
    setShowFinal(false)
    resetExerciseState()
  }

  const isCurrentCorrect = (): boolean => {
    if (!currentExercise) return false
    switch (currentExercise.type) {
      case 'decompose':
        return JSON.stringify(selectedParts) === JSON.stringify(currentExercise.correctParts)
      case 'build':
        return JSON.stringify(selectedParts) === JSON.stringify(currentExercise.correctMorphemeIds)
      case 'predict_meaning':
        return selectedAnswer === currentExercise.correctAnswer
      case 'match': {
        const ex = currentExercise as MatchExercise
        return ex.pairs.every(p => matchState.matched[p.morpheme] === p.meaning)
      }
      default:
        return false
    }
  }

  const handleCheck = () => {
    if (!currentExercise) return
    setShowFeedback(true)
    const correct = isCurrentCorrect()
    if (correct) setCorrectCount(c => c + 1)

    // Update morpheme mastery
    if (activeLesson) {
      updateMorphemeMastery(activeLesson.morphemeIds, correct)
    }
  }

  const handleNext = () => {
    if (!activeLesson) return
    if (currentExIdx + 1 >= activeLesson.exercises.length) {
      const score = Math.round((correctCount / activeLesson.exercises.length) * 100)
      setShowFinal(true)
      submitLessonScore(activeLesson.id, score)
      if (onComplete) onComplete(score, activeLesson.id)
      return
    }
    setCurrentExIdx(i => i + 1)
    resetExerciseState()
  }

  const canCheck = (): boolean => {
    if (!currentExercise) return false
    switch (currentExercise.type) {
      case 'decompose':
      case 'build':
        return selectedParts.length > 0
      case 'predict_meaning':
        return selectedAnswer !== ''
      case 'match': {
        const ex = currentExercise as MatchExercise
        return Object.keys(matchState.matched).length === ex.pairs.length
      }
      default:
        return false
    }
  }

  // === Morpheme chip component ===
  const MorphemeChip: React.FC<{ morpheme: Morpheme; compact?: boolean }> = ({ morpheme, compact }) => {
    const color = COLORS[morpheme.type]
    const isExpanded = expandedMorpheme === morpheme.id
    return (
      <div
        onClick={() => setExpandedMorpheme(isExpanded ? null : morpheme.id)}
        style={{
          display: 'inline-block',
          padding: compact ? '4px 10px' : '6px 14px',
          margin: '3px',
          borderRadius: '16px',
          backgroundColor: color.bg,
          border: `1px solid ${color.border}`,
          color: color.text,
          fontSize: compact ? '13px' : '14px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        <span>{morpheme.form}</span>
        {!compact && <span style={{ fontWeight: 400, marginLeft: '6px' }}>({morpheme.meaningJa})</span>}
        {isExpanded && !compact && (
          <div style={{ marginTop: '8px', fontWeight: 400, fontSize: '13px' }}>
            <div style={{ color: '#555' }}>{morpheme.meaning}</div>
            {morpheme.origin && <div style={{ color: '#888', fontSize: '12px' }}>Origin: {morpheme.origin}</div>}
            {morpheme.partOfSpeechEffect && <div style={{ color: '#888', fontSize: '12px' }}>{morpheme.partOfSpeechEffect}</div>}
            <div style={{ marginTop: '4px' }}>
              {morpheme.examples.map((ex, i) => (
                <span key={i} style={{
                  display: 'inline-block', padding: '1px 8px', margin: '2px',
                  borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.7)', fontSize: '12px'
                }}>{ex}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // === Exercise renderers ===

  const renderDecompose = (ex: DecomposeExercise) => (
    <div>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <span style={{ fontSize: '28px', fontWeight: 700, color: '#333' }}>{ex.word}</span>
        <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>Break this word into its morpheme parts</p>
      </div>
      {/* Selected parts */}
      <div style={{ minHeight: '50px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {selectedParts.length === 0 && <span style={{ color: '#ccc' }}>Click morphemes below...</span>}
        {selectedParts.map((id, i) => {
          const opt = ex.options.find(o => o.morphemeId === id)
          return opt && (
            <button key={i} onClick={() => !showFeedback && setSelectedParts(p => p.filter((_, idx) => idx !== i))}
              style={{ padding: '6px 14px', borderRadius: '16px', border: '2px solid #007bff', backgroundColor: '#e7f3ff', color: '#004085', fontWeight: 600, fontSize: '15px', cursor: showFeedback ? 'default' : 'pointer' }}>
              {opt.label}
            </button>
          )
        })}
      </div>
      {/* Options pool */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {ex.options.map(opt => {
          const isUsed = selectedParts.includes(opt.morphemeId)
          return (
            <button key={opt.morphemeId} disabled={isUsed || showFeedback}
              onClick={() => setSelectedParts(p => [...p, opt.morphemeId])}
              style={{
                padding: '8px 18px', borderRadius: '16px', fontSize: '15px', fontWeight: 600, cursor: isUsed || showFeedback ? 'default' : 'pointer',
                border: '2px solid #dee2e6', backgroundColor: isUsed ? '#f0f0f0' : 'white', color: isUsed ? '#ccc' : '#333',
                opacity: isUsed ? 0.4 : 1, transition: 'all 0.2s'
              }}>
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )

  const renderBuild = (ex: BuildExercise) => (
    <div>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <p style={{ fontSize: '16px', color: '#333' }}>Build a word that means:</p>
        <span style={{ fontSize: '22px', fontWeight: 700, color: '#007bff' }}>{ex.targetMeaning}</span>
      </div>
      {/* Assembled word preview */}
      <div style={{ textAlign: 'center', minHeight: '50px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '16px' }}>
        {selectedParts.length === 0 ? (
          <span style={{ color: '#ccc', fontSize: '18px' }}>?</span>
        ) : (
          <span style={{ fontSize: '24px', fontWeight: 700, color: '#333' }}>
            {selectedParts.map(id => ex.availableMorphemes.find(m => m.morphemeId === id)?.label || '').join('')}
          </span>
        )}
      </div>
      {/* Morpheme pool */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {ex.availableMorphemes.map(m => {
          const isUsed = selectedParts.includes(m.morphemeId)
          return (
            <button key={m.morphemeId} disabled={isUsed || showFeedback}
              onClick={() => setSelectedParts(p => [...p, m.morphemeId])}
              style={{
                padding: '8px 18px', borderRadius: '16px', fontSize: '15px', fontWeight: 600, cursor: isUsed || showFeedback ? 'default' : 'pointer',
                border: '2px solid #dee2e6', backgroundColor: isUsed ? '#f0f0f0' : 'white', color: isUsed ? '#ccc' : '#333',
                opacity: isUsed ? 0.4 : 1, transition: 'all 0.2s'
              }}>
              {m.label}
            </button>
          )
        })}
      </div>
      {selectedParts.length > 0 && !showFeedback && (
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <button onClick={() => setSelectedParts([])} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: '13px' }}>Clear</button>
        </div>
      )}
    </div>
  )

  const renderPredictMeaning = (ex: PredictMeaningExercise) => (
    <div>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <span style={{ fontSize: '28px', fontWeight: 700, color: '#333' }}>{ex.word}</span>
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginTop: '12px', flexWrap: 'wrap' }}>
          {ex.parts.map((p, i) => (
            <span key={i} style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '14px', fontWeight: 600, backgroundColor: '#f0f0f0', color: '#555' }}>
              {p.form} <span style={{ fontWeight: 400 }}>({p.meaning})</span>
            </span>
          ))}
        </div>
        <p style={{ color: '#666', fontSize: '14px', marginTop: '12px' }}>What does this word mean?</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {ex.options.map((opt, i) => {
          let bg = selectedAnswer === opt ? '#e7f3ff' : 'white'
          let border = selectedAnswer === opt ? '2px solid #007bff' : '2px solid #e0e0e0'
          if (showFeedback) {
            if (opt === ex.correctAnswer) { bg = '#d4edda'; border = '2px solid #28a745' }
            else if (opt === selectedAnswer) { bg = '#f8d7da'; border = '2px solid #dc3545' }
          }
          return (
            <button key={i} onClick={() => !showFeedback && setSelectedAnswer(opt)} disabled={showFeedback}
              style={{ padding: '12px 16px', backgroundColor: bg, border, borderRadius: '8px', fontSize: '15px', textAlign: 'left', cursor: showFeedback ? 'default' : 'pointer', transition: 'all 0.2s' }}>
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )

  const renderMatch = (ex: MatchExercise) => {
    const { selected, matched } = matchState
    const matchedMeanings = new Set(Object.values(matched))
    return (
      <div>
        <p style={{ textAlign: 'center', color: '#666', margin: '16px 0' }}>
          Click a morpheme, then click its meaning to match them.
        </p>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
          {/* Left: morphemes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ex.pairs.map(p => {
              const isMatched = p.morpheme in matched
              const isSelected = selected === p.morpheme
              let bg = 'white'
              if (isMatched) bg = '#d4edda'
              else if (isSelected) bg = '#e7f3ff'
              return (
                <button key={p.morpheme} disabled={isMatched || showFeedback}
                  onClick={() => setMatchState(s => ({ ...s, selected: p.morpheme }))}
                  style={{
                    padding: '10px 20px', borderRadius: '8px', fontWeight: 700, fontSize: '16px',
                    border: isSelected ? '2px solid #007bff' : '2px solid #dee2e6',
                    backgroundColor: bg, cursor: isMatched || showFeedback ? 'default' : 'pointer', minWidth: '120px',
                    transition: 'all 0.2s'
                  }}>
                  {p.morpheme}
                </button>
              )
            })}
          </div>
          {/* Right: meanings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[...ex.pairs].sort(() => 0.5 - Math.random()).map(p => {
              const isMatched = matchedMeanings.has(p.meaning)
              return (
                <button key={p.meaning} disabled={isMatched || !selected || showFeedback}
                  onClick={() => {
                    if (selected && !isMatched) {
                      setMatchState(s => ({
                        selected: null,
                        matched: { ...s.matched, [selected]: p.meaning }
                      }))
                    }
                  }}
                  style={{
                    padding: '10px 20px', borderRadius: '8px', fontSize: '14px',
                    border: isMatched ? '2px solid #28a745' : '2px solid #dee2e6',
                    backgroundColor: isMatched ? '#d4edda' : 'white',
                    cursor: isMatched || !selected || showFeedback ? 'default' : 'pointer', minWidth: '120px',
                    transition: 'all 0.2s'
                  }}>
                  {p.meaning}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // === Final results ===
  if (showFinal && activeLesson) {
    const score = Math.round((correctCount / activeLesson.exercises.length) * 100)
    return (
      <div className="card">
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>{activeLesson.title}</h3>
        <div className={`score ${score >= 90 ? 'excellent' : score >= 75 ? 'good' : score >= 60 ? 'fair' : 'poor'}`}>
          {score}/100
        </div>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '24px' }}>
          {correctCount} / {activeLesson.exercises.length} correct
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={handleBack}>All Lessons</button>
          <button className="btn btn-primary" onClick={() => handleStartLesson(activeLesson)}>Try Again</button>
        </div>
      </div>
    )
  }

  // === Exercise screen ===
  if (activeLesson && currentExercise) {
    const correct = showFeedback && isCurrentCorrect()
    return (
      <div>
        {/* Header */}
        <div className="card" style={{ padding: '16px 20px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>←</button>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px' }}>{activeLesson.title}</h3>
                <span style={{ fontSize: '12px', color: '#666' }}>{activeLesson.titleJa}</span>
              </div>
            </div>
            <span style={{ fontSize: '14px', color: '#666' }}>{currentExIdx + 1} / {activeLesson.exercises.length}</span>
          </div>
        </div>

        {/* Exercise body */}
        <div className="card">
          <div style={{
            display: 'inline-block', padding: '3px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, marginBottom: '12px',
            backgroundColor: currentExercise.type === 'decompose' ? '#e7f3ff' : currentExercise.type === 'build' ? '#e8f5e9' : currentExercise.type === 'predict_meaning' ? '#fff3cd' : '#f3e8ff',
            color: currentExercise.type === 'decompose' ? '#004085' : currentExercise.type === 'build' ? '#1b5e20' : currentExercise.type === 'predict_meaning' ? '#856404' : '#4a148c'
          }}>
            {currentExercise.type === 'decompose' ? 'Decompose' : currentExercise.type === 'build' ? 'Build' : currentExercise.type === 'predict_meaning' ? 'Predict Meaning' : 'Match'}
          </div>

          {currentExercise.type === 'decompose' && renderDecompose(currentExercise)}
          {currentExercise.type === 'build' && renderBuild(currentExercise)}
          {currentExercise.type === 'predict_meaning' && renderPredictMeaning(currentExercise)}
          {currentExercise.type === 'match' && renderMatch(currentExercise)}

          {/* Check / Feedback */}
          <div style={{ marginTop: '20px' }}>
            {!showFeedback ? (
              <button className="btn btn-success" onClick={handleCheck} disabled={!canCheck()} style={{ width: '100%' }}>
                Check Answer
              </button>
            ) : (
              <div>
                <div style={{
                  padding: '12px 16px', borderRadius: '8px', marginBottom: '12px',
                  backgroundColor: correct ? '#d4edda' : '#f8d7da', color: correct ? '#155724' : '#721c24'
                }}>
                  <strong>{correct ? 'Correct!' : 'Incorrect'}</strong>
                </div>
                <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', backgroundColor: '#f8f9fa', fontSize: '14px', color: '#555' }}>
                  {currentExercise.explanation}
                </div>
                <button className="btn btn-primary" onClick={handleNext} style={{ width: '100%' }}>
                  {currentExIdx + 1 >= activeLesson.exercises.length ? 'See Results' : 'Next'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: '6px', backgroundColor: '#e0e0e0', borderRadius: '3px', overflow: 'hidden', marginTop: '12px' }}>
          <div style={{ height: '100%', width: `${((currentExIdx + (showFeedback ? 1 : 0)) / activeLesson.exercises.length) * 100}%`, backgroundColor: '#007bff', transition: 'width 0.3s' }} />
        </div>
      </div>
    )
  }

  // === Lesson selection + Explorer ===
  const allMorphemes = explorerTab === 'prefixes' ? prefixes : explorerTab === 'roots' ? roots : suffixes

  return (
    <div>
      {/* Morpheme Explorer */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <h3 style={{ marginBottom: '12px' }}>🧬 Morpheme Explorer</h3>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
          {(['prefixes', 'roots', 'suffixes'] as ExplorerTab[]).map(tab => (
            <button key={tab} className={`btn ${explorerTab === tab ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '13px', padding: '6px 16px' }}
              onClick={() => { setExplorerTab(tab); setExpandedMorpheme(null) }}>
              {tab === 'prefixes' ? 'Prefixes (接頭辞)' : tab === 'roots' ? 'Roots (語根)' : 'Suffixes (接尾辞)'}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
          {allMorphemes.map(m => <MorphemeChip key={m.id} morpheme={m} />)}
        </div>
        {allMorphemes.length === 0 && (
          <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>Loading morpheme data...</p>
        )}
      </div>

      {/* Lesson grid */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0 }}>Lessons</h3>
          <div style={{ display: 'flex', gap: '6px' }}>
            {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(d => (
              <button key={d} className={`btn ${filterDifficulty === d ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '12px', padding: '4px 12px' }}
                onClick={() => setFilterDifficulty(d)}>
                {d === 'all' ? 'All' : d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {filteredLessons.map(lesson => {
            const bestScore = getLessonBestScore(lesson.id)
            const completed = isLessonCompleted(lesson.id)
            const catColor = lesson.category === 'prefixes' ? COLORS.prefix : lesson.category === 'roots' ? COLORS.root : lesson.category === 'suffixes' ? COLORS.suffix : { bg: '#fff3cd', border: '#ffc107', text: '#856404' }
            return (
              <div key={lesson.id} className="card"
                style={{ cursor: 'pointer', padding: '16px', marginBottom: 0, borderLeft: `4px solid ${completed ? '#28a745' : '#e0e0e0'}`, transition: 'transform 0.2s' }}
                onClick={() => handleStartLesson(lesson)}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px' }}>{lesson.title}</h4>
                    <span style={{ fontSize: '11px', color: '#666' }}>{lesson.titleJa}</span>
                    <div style={{ marginTop: '6px', display: 'flex', gap: '4px' }}>
                      <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '10px', backgroundColor: catColor.bg, color: catColor.text }}>
                        {lesson.category}
                      </span>
                      <span style={{
                        fontSize: '11px', padding: '2px 8px', borderRadius: '10px',
                        backgroundColor: lesson.difficulty === 'beginner' ? '#d4edda' : lesson.difficulty === 'intermediate' ? '#fff3cd' : '#f8d7da',
                        color: lesson.difficulty === 'beginner' ? '#155724' : lesson.difficulty === 'intermediate' ? '#856404' : '#721c24'
                      }}>
                        {lesson.difficulty}
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {bestScore !== null && (
                      <span style={{ fontSize: '13px', fontWeight: 700, color: bestScore >= 80 ? '#28a745' : bestScore >= 60 ? '#ffc107' : '#dc3545' }}>
                        {bestScore}%
                      </span>
                    )}
                    {completed && <div style={{ fontSize: '11px', color: '#28a745' }}>Completed</div>}
                  </div>
                </div>
                <p style={{ fontSize: '12px', color: '#888', margin: '6px 0 0 0' }}>{lesson.exercises.length} exercises</p>
              </div>
            )
          })}
        </div>

        {filteredLessons.length === 0 && (
          <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>No lessons available.</p>
        )}
      </div>
    </div>
  )
}
