import React, { useState, useEffect, useRef } from 'react'
import { useConversation, scenarios, ConversationScenario, Message } from '../hooks/useConversation'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'

interface ConversationPracticeProps {
  onComplete?: (messageCount: number, duration: number, messages: Message[], scenarioVocabulary: { word: string; meaning: string }[]) => void
}

export const ConversationPractice: React.FC<ConversationPracticeProps> = ({ onComplete }) => {
  const {
    messages,
    currentScenario,
    isTyping,
    isSpeaking,
    selectScenario,
    sendMessage,
    resetConversation,
    speak,
    stopSpeaking
  } = useConversation()

  const { transcript, isListening, startListening, stopListening, resetTranscript } = useSpeechRecognition()

  const [inputText, setInputText] = useState('')
  const [showHelper, setShowHelper] = useState(false)
  const [helperTab, setHelperTab] = useState<'phrases' | 'vocabulary'>('phrases')
  const [autoSpeak, setAutoSpeak] = useState(true)
  const [startTime] = useState(() => Date.now())
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    if (transcript && !isListening) {
      setInputText(transcript)
    }
  }, [transcript, isListening])

  const handleSend = () => {
    if (!inputText.trim()) return
    sendMessage(inputText, autoSpeak)
    setInputText('')
    resetTranscript()
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening()
    } else {
      resetTranscript()
      setInputText('')
      startListening()
    }
  }

  const handlePhraseClick = (phrase: string) => {
    setInputText(phrase)
    inputRef.current?.focus()
  }

  const handleEndConversation = () => {
    if (onComplete) {
      onComplete(
        messages.filter(m => m.sender === 'user').length,
        Date.now() - startTime,
        messages,
        currentScenario?.vocabulary || []
      )
    }
    resetConversation()
  }

  // Scenario selection screen
  if (!currentScenario) {
    return (
      <div>
        <div className="card" style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>💬 Conversation Practice</h2>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Choose a scenario and practice real-world English conversations with an AI partner.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {scenarios.map(scenario => (
            <div
              key={scenario.id}
              className="card"
              style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onClick={() => selectScenario(scenario.id)}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '32px' }}>{scenario.icon}</span>
                <div>
                  <h3 style={{ margin: 0 }}>{scenario.title}</h3>
                  <span style={{
                    display: 'inline-block',
                    fontSize: '12px',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    marginTop: '4px',
                    backgroundColor: scenario.difficulty === 'Beginner' ? '#d4edda' :
                      scenario.difficulty === 'Intermediate' ? '#fff3cd' : '#f8d7da',
                    color: scenario.difficulty === 'Beginner' ? '#155724' :
                      scenario.difficulty === 'Intermediate' ? '#856404' : '#721c24'
                  }}>
                    {scenario.difficulty}
                  </span>
                </div>
              </div>
              <p style={{ color: '#666', margin: '0 0 12px 0', fontSize: '14px' }}>
                {scenario.description}
              </p>
              <div style={{ fontSize: '13px', color: '#888' }}>
                Role: <strong>{scenario.aiRole}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Chat screen
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      {/* Main chat area */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Chat header */}
        <div className="card" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          marginBottom: '0',
          borderRadius: '12px 12px 0 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleEndConversation}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                padding: '4px'
              }}
              title="Back to scenarios"
            >
              ←
            </button>
            <span style={{ fontSize: '28px' }}>{currentScenario.icon}</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px' }}>{currentScenario.title}</h3>
              <span style={{ fontSize: '13px', color: '#666' }}>
                Talking with: {currentScenario.aiRole}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#666', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={autoSpeak}
                onChange={e => setAutoSpeak(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              Auto-speak
            </label>
            <button
              className="btn btn-secondary"
              onClick={() => setShowHelper(!showHelper)}
              style={{ fontSize: '13px', padding: '6px 12px' }}
            >
              {showHelper ? 'Hide Help' : 'Show Help'}
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div style={{
          backgroundColor: '#f0f2f5',
          padding: '20px',
          minHeight: '400px',
          maxHeight: '500px',
          overflowY: 'auto',
          borderLeft: '1px solid #e0e0e0',
          borderRight: '1px solid #e0e0e0'
        }}>
          {messages.map(message => (
            <div key={message.id}>
              <div style={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: message.grammarTip ? '4px' : '12px'
              }}>
                <div style={{
                  maxWidth: '75%',
                  padding: '12px 16px',
                  borderRadius: message.sender === 'user'
                    ? '16px 16px 4px 16px'
                    : '16px 16px 16px 4px',
                  backgroundColor: message.sender === 'user' ? '#007bff' : 'white',
                  color: message.sender === 'user' ? 'white' : '#333',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  position: 'relative'
                }}>
                  {message.sender === 'ai' && (
                    <div style={{
                      fontSize: '11px',
                      color: '#999',
                      marginBottom: '4px',
                      fontWeight: 600
                    }}>
                      {currentScenario.aiRole}
                    </div>
                  )}
                  <p style={{ margin: 0, lineHeight: '1.5', fontSize: '15px' }}>
                    {message.text}
                  </p>
                  {message.sender === 'ai' && (
                    <button
                      onClick={() => isSpeaking ? stopSpeaking() : speak(message.text)}
                      style={{
                        position: 'absolute',
                        bottom: '4px',
                        right: '8px',
                        background: 'none',
                        border: 'none',
                        fontSize: '14px',
                        cursor: 'pointer',
                        opacity: 0.5,
                        padding: '2px'
                      }}
                      title="Listen to this message"
                    >
                      {isSpeaking ? '⏹️' : '🔊'}
                    </button>
                  )}
                </div>
              </div>

              {/* Grammar tip */}
              {message.grammarTip && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    maxWidth: '75%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#fff8e1',
                    border: '1px solid #ffe082',
                    fontSize: '13px',
                    color: '#6d4c00'
                  }}>
                    💡 <strong>Grammar Tip:</strong> {message.grammarTip}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
              <div style={{
                padding: '12px 20px',
                borderRadius: '16px 16px 16px 4px',
                backgroundColor: 'white',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}>
                <div className="typing-dots">
                  <span style={dotStyle(0)}>●</span>
                  <span style={dotStyle(1)}>●</span>
                  <span style={dotStyle(2)}>●</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div style={{
          backgroundColor: 'white',
          padding: '16px 20px',
          borderRadius: '0 0 12px 12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          <button
            onClick={handleVoiceInput}
            className={`btn ${isListening ? 'btn-danger recording' : 'btn-secondary'}`}
            style={{ fontSize: '16px', padding: '10px 14px', flexShrink: 0 }}
            title={isListening ? 'Stop listening' : 'Voice input'}
          >
            🎤
          </button>
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? 'Listening... speak now' : 'Type your message in English...'}
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '2px solid #e0e0e0',
              borderRadius: '24px',
              fontSize: '15px',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = '#007bff'}
            onBlur={e => e.target.style.borderColor = '#e0e0e0'}
            disabled={isListening}
          />
          <button
            onClick={handleSend}
            className="btn btn-primary"
            style={{ fontSize: '16px', padding: '10px 20px', flexShrink: 0 }}
            disabled={!inputText.trim() || isTyping}
          >
            Send
          </button>
        </div>
      </div>

      {/* Helper panel */}
      {showHelper && (
        <div style={{ width: '280px', flexShrink: 0 }}>
          <div className="card" style={{ position: 'sticky', top: '80px' }}>
            {/* Tab buttons */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
              <button
                className={`btn ${helperTab === 'phrases' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, fontSize: '13px', padding: '8px' }}
                onClick={() => setHelperTab('phrases')}
              >
                Useful Phrases
              </button>
              <button
                className={`btn ${helperTab === 'vocabulary' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, fontSize: '13px', padding: '8px' }}
                onClick={() => setHelperTab('vocabulary')}
              >
                Vocabulary
              </button>
            </div>

            {/* Phrases tab */}
            {helperTab === 'phrases' && (
              <div>
                <p style={{ fontSize: '13px', color: '#666', margin: '0 0 12px 0' }}>
                  Click a phrase to use it:
                </p>
                {currentScenario.usefulPhrases.map((phrase, i) => (
                  <div
                    key={i}
                    onClick={() => handlePhraseClick(phrase)}
                    style={{
                      padding: '8px 12px',
                      marginBottom: '6px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'background-color 0.2s',
                      border: '1px solid #e9ecef'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e7f3ff')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                  >
                    "{phrase}"
                  </div>
                ))}
              </div>
            )}

            {/* Vocabulary tab */}
            {helperTab === 'vocabulary' && (
              <div>
                {currentScenario.vocabulary.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '10px 12px',
                      marginBottom: '8px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      border: '1px solid #e9ecef'
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#007bff' }}>
                      {item.word}
                    </div>
                    <div style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>
                      {item.meaning}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Typing animation dots
const dotStyle = (index: number): React.CSSProperties => ({
  display: 'inline-block',
  fontSize: '12px',
  color: '#999',
  animation: `typingDot 1.4s infinite`,
  animationDelay: `${index * 0.2}s`
})
