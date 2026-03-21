import React, { useState, useRef, useEffect, useMemo } from 'react'
import { useEssayFeedback, EssayPrompt } from '../hooks/useEssayFeedback'
import { AIFeedbackPanel, AIFeedbackCategory } from './AIFeedbackPanel'
import { isAIAvailable } from '../services/aiService'
import { EssayPromptType } from '../types/ai'

interface EssayWritingProps {
  onComplete?: (score: number) => void
}

const typeLabels: Record<EssayPromptType, { label: string; color: string; bg: string }> = {
  opinion: { label: 'Opinion', color: '#004085', bg: '#cce5ff' },
  formal_letter: { label: 'Formal Letter', color: '#856404', bg: '#fff3cd' },
  report: { label: 'Report', color: '#155724', bg: '#d4edda' },
  academic: { label: 'Academic', color: '#721c24', bg: '#f8d7da' },
  creative: { label: 'Creative', color: '#383d41', bg: '#e2e3e5' }
}

const typeOrder: EssayPromptType[] = ['opinion', 'formal_letter', 'report', 'academic', 'creative']

export const EssayWriting: React.FC<EssayWritingProps> = ({ onComplete }) => {
  const {
    prompts,
    selectedPrompt,
    selectPrompt,
    essay,
    setEssay,
    feedback,
    isAnalyzing,
    analyzeEssay,
    getOfflineFeedback,
    resetEssay
  } = useEssayFeedback()

  const [offlineResult, setOfflineResult] = useState<ReturnType<typeof getOfflineFeedback> | null>(null)
  const [showRewrite, setShowRewrite] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = Math.max(el.scrollHeight, 200) + 'px'
    }
  }, [essay])

  const wordCount = useMemo(() => {
    return essay.trim().split(/\s+/).filter(w => w.length > 0).length
  }, [essay])

  const wordCountColor = useMemo(() => {
    if (!selectedPrompt) return '#999'
    if (wordCount === 0) return '#999'
    if (wordCount >= selectedPrompt.wordCountTarget * 2) return '#fd7e14'
    if (wordCount >= selectedPrompt.wordCountTarget) return '#28a745'
    return '#999'
  }, [wordCount, selectedPrompt])

  const aiAvailable = isAIAvailable()

  const promptsByType = useMemo(() => {
    const grouped: Record<string, EssayPrompt[]> = {}
    for (const type of typeOrder) {
      grouped[type] = prompts.filter(p => p.type === type)
    }
    return grouped
  }, [prompts])

  const handleBasicAnalysis = () => {
    if (!essay.trim()) return
    const result = getOfflineFeedback(essay)
    setOfflineResult(result)
  }

  const handleAnalyzeEssay = async () => {
    setOfflineResult(null)
    await analyzeEssay()
    if (feedback && onComplete) {
      onComplete(feedback.overallScore)
    }
  }

  // Call onComplete when feedback arrives from analyzeEssay
  useEffect(() => {
    if (feedback && onComplete) {
      onComplete(feedback.overallScore)
    }
  }, [feedback, onComplete])

  const handleWriteAgain = () => {
    resetEssay()
    setOfflineResult(null)
    setShowRewrite(false)
  }

  const handleChooseNewPrompt = () => {
    selectPrompt(null as any)
    resetEssay()
    setOfflineResult(null)
    setShowRewrite(false)
  }

  // ──────────────────────────────────────────────
  // Prompt Selection Screen
  // ──────────────────────────────────────────────
  if (!selectedPrompt) {
    return (
      <div>
        <div className="card" style={{ marginBottom: '16px' }}>
          <h2 style={{ margin: '0 0 4px 0' }}>Essay Writing</h2>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Choose a prompt to start writing</p>
        </div>

        {typeOrder.map(type => {
          const typeConfig = typeLabels[type]
          const typePrompts = promptsByType[type]
          if (!typePrompts || typePrompts.length === 0) return null

          return (
            <div key={type} style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '12px', color: '#555' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '2px 10px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  backgroundColor: typeConfig.bg,
                  color: typeConfig.color,
                  marginRight: '8px'
                }}>
                  {typeConfig.label}
                </span>
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '12px'
              }}>
                {typePrompts.map(p => (
                  <div
                    key={p.id}
                    className="card"
                    style={{
                      cursor: 'pointer',
                      padding: '16px',
                      marginBottom: 0,
                      borderLeft: `4px solid ${typeConfig.color}`,
                      transition: 'transform 0.2s'
                    }}
                    onClick={() => selectPrompt(p)}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                  >
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px' }}>{p.title}</h4>
                    <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#888' }}>{p.titleJa}</p>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        backgroundColor: typeConfig.bg,
                        color: typeConfig.color
                      }}>
                        {typeConfig.label}
                      </span>
                      <span style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        backgroundColor: '#e7f3ff',
                        color: '#004085'
                      }}>
                        {p.targetLevel}
                      </span>
                      <span style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        backgroundColor: '#f0f0f0',
                        color: '#666'
                      }}>
                        {p.wordCountTarget} words
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // ──────────────────────────────────────────────
  // Feedback Display
  // ──────────────────────────────────────────────
  if (feedback) {
    const categoryEntries: AIFeedbackCategory[] = [
      {
        name: 'Grammar',
        score: feedback.categories.grammar.score,
        summary: feedback.categories.grammar.summary,
        details: feedback.categories.grammar.errors.map(e => `"${e.original}" -> "${e.corrected}" (${e.explanation})`)
      },
      {
        name: 'Vocabulary',
        score: feedback.categories.vocabulary.score,
        summary: feedback.categories.vocabulary.summary,
        details: feedback.categories.vocabulary.suggestions
      },
      {
        name: 'Coherence',
        score: feedback.categories.coherence.score,
        summary: feedback.categories.coherence.summary,
        details: feedback.categories.coherence.missingTransitions.length > 0
          ? [`Missing transitions: ${feedback.categories.coherence.missingTransitions.join(', ')}`]
          : undefined
      },
      {
        name: 'Structure',
        score: feedback.categories.structure.score,
        summary: feedback.categories.structure.summary,
        details: feedback.categories.structure.suggestions
      },
      {
        name: 'Register',
        score: feedback.categories.register.score,
        summary: feedback.categories.register.summary,
        details: feedback.categories.register.consistency ? [`Consistency: ${feedback.categories.register.consistency}`] : undefined
      },
      {
        name: 'Task Achievement',
        score: feedback.categories.taskAchievement.score,
        summary: feedback.categories.taskAchievement.summary
      }
    ]

    return (
      <div>
        {/* Header */}
        <div className="card" style={{ padding: '16px 20px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleChooseNewPrompt}
              style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', padding: '4px' }}
            >
              ←
            </button>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px' }}>Essay Feedback</h3>
              <span style={{ fontSize: '12px', color: '#666' }}>{selectedPrompt.title}</span>
            </div>
          </div>
        </div>

        {/* AI Feedback Panel */}
        <div className="card" style={{ marginBottom: '12px' }}>
          <AIFeedbackPanel
            score={feedback.overallScore}
            cefrLevel={feedback.cefrLevel}
            categories={categoryEntries}
            strengths={feedback.strengths}
            improvements={feedback.areasToImprove}
          />
        </div>

        {/* Rewrite Suggestion */}
        {feedback.rewriteSuggestion && (
          <div className="card" style={{ marginBottom: '12px' }}>
            <details open={showRewrite} onToggle={e => setShowRewrite((e.target as HTMLDetailsElement).open)}>
              <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>
                Rewrite Suggestion
              </summary>
              <div style={{
                marginTop: '10px',
                padding: '12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#333',
                lineHeight: '1.7',
                whiteSpace: 'pre-wrap'
              }}>
                {feedback.rewriteSuggestion}
              </div>
            </details>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px' }}>
          <button className="btn btn-secondary" onClick={handleChooseNewPrompt}>
            Choose New Prompt
          </button>
          <button className="btn btn-primary" onClick={handleWriteAgain}>
            Write Again
          </button>
        </div>
      </div>
    )
  }

  // ──────────────────────────────────────────────
  // Writing Screen
  // ──────────────────────────────────────────────
  const typeConfig = typeLabels[selectedPrompt.type]

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleChooseNewPrompt}
              style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', padding: '4px' }}
            >
              ←
            </button>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px' }}>{selectedPrompt.title}</h3>
              <span style={{ fontSize: '12px', color: '#666' }}>{selectedPrompt.titleJa}</span>
            </div>
          </div>
          <span style={{
            fontSize: '12px',
            padding: '4px 10px',
            borderRadius: '10px',
            backgroundColor: '#f0f0f0',
            color: '#666'
          }}>
            Target: {selectedPrompt.wordCountTarget} words
          </span>
        </div>
      </div>

      {/* Prompt Text */}
      <div className="card" style={{
        padding: '14px 20px',
        marginBottom: '12px',
        backgroundColor: '#e7f3ff',
        borderLeft: `4px solid ${typeConfig.color}`
      }}>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
          <span style={{
            fontSize: '11px',
            padding: '2px 8px',
            borderRadius: '10px',
            backgroundColor: typeConfig.bg,
            color: typeConfig.color,
            fontWeight: 600
          }}>
            {typeConfig.label}
          </span>
          <span style={{
            fontSize: '11px',
            padding: '2px 8px',
            borderRadius: '10px',
            backgroundColor: 'white',
            color: '#004085',
            fontWeight: 600
          }}>
            {selectedPrompt.targetLevel}
          </span>
        </div>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
          {selectedPrompt.prompt}
        </p>
      </div>

      {/* Textarea */}
      <div className="card" style={{ marginBottom: '12px' }}>
        <textarea
          ref={textareaRef}
          value={essay}
          onChange={e => setEssay(e.target.value)}
          placeholder="Start writing your essay here..."
          disabled={isAnalyzing}
          style={{
            width: '100%',
            minHeight: '200px',
            padding: '14px 16px',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '15px',
            lineHeight: '1.8',
            outline: 'none',
            resize: 'none',
            fontFamily: 'inherit',
            boxSizing: 'border-box'
          }}
          onFocus={e => (e.target.style.borderColor = '#007bff')}
          onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
        />

        {/* Word count */}
        <div style={{ textAlign: 'right', marginTop: '8px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: 600,
            color: wordCountColor
          }}>
            {wordCount} / {selectedPrompt.wordCountTarget} words
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
        <button
          className="btn btn-primary"
          onClick={handleAnalyzeEssay}
          disabled={!aiAvailable || wordCount < 50 || isAnalyzing}
          style={{ flex: 1 }}
        >
          {isAnalyzing ? 'Analyzing...' : 'Get AI Feedback'}
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleBasicAnalysis}
          disabled={wordCount < 1 || isAnalyzing}
          style={{ flex: 1 }}
        >
          Basic Analysis
        </button>
      </div>

      {/* Disabled AI hint */}
      {!aiAvailable && wordCount >= 50 && (
        <p style={{ fontSize: '12px', color: '#999', textAlign: 'center', margin: '0 0 12px 0' }}>
          Configure an API key in AI Settings to enable AI feedback.
        </p>
      )}

      {/* Loading state */}
      {isAnalyzing && (
        <div className="card" style={{ textAlign: 'center', padding: '32px 20px' }}>
          <div style={{
            display: 'inline-block',
            width: '32px',
            height: '32px',
            border: '3px solid #e0e0e0',
            borderTopColor: '#007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '12px'
          }} />
          <p style={{ color: '#666', margin: 0 }}>Analyzing your essay...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Offline Analysis Result */}
      {offlineResult && !feedback && (
        <div className="card">
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Basic Analysis</h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '10px',
            marginBottom: '16px'
          }}>
            <div style={{
              padding: '12px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#333' }}>
                {offlineResult.wordCount}
              </div>
              <div style={{ fontSize: '12px', color: '#888' }}>Words</div>
            </div>
            <div style={{
              padding: '12px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#333' }}>
                {offlineResult.sentenceCount}
              </div>
              <div style={{ fontSize: '12px', color: '#888' }}>Sentences</div>
            </div>
            <div style={{
              padding: '12px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#333' }}>
                {offlineResult.paragraphCount}
              </div>
              <div style={{ fontSize: '12px', color: '#888' }}>Paragraphs</div>
            </div>
            <div style={{
              padding: '12px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#333' }}>
                {offlineResult.averageSentenceLength}
              </div>
              <div style={{ fontSize: '12px', color: '#888' }}>Avg Words/Sentence</div>
            </div>
          </div>

          {/* Vocabulary Analysis */}
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#e7f3ff',
            borderRadius: '8px',
            marginBottom: '12px'
          }}>
            <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px', color: '#004085' }}>
              Vocabulary Level
            </div>
            <div style={{ fontSize: '13px', color: '#333' }}>
              Frequency band: <strong style={{ textTransform: 'capitalize' }}>{offlineResult.vocabularyBand}</strong>
              {' '} (average rank: {offlineResult.vocabularyFrequencyScore})
            </div>
          </div>

          {/* Word count progress */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#888', marginBottom: '4px' }}>
              <span>Word count progress</span>
              <span>{wordCount} / {selectedPrompt.wordCountTarget}</span>
            </div>
            <div style={{
              height: '6px',
              backgroundColor: '#e0e0e0',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${Math.min((wordCount / selectedPrompt.wordCountTarget) * 100, 100)}%`,
                backgroundColor: wordCount >= selectedPrompt.wordCountTarget ? '#28a745' : '#007bff',
                borderRadius: '3px',
                transition: 'width 0.3s'
              }} />
            </div>
          </div>

          <p style={{ fontSize: '12px', color: '#999', margin: '12px 0 0 0', textAlign: 'center' }}>
            For detailed grammar, coherence, and register analysis, use AI Feedback.
          </p>
        </div>
      )}
    </div>
  )
}
