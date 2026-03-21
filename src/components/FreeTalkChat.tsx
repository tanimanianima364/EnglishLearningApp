import React, { useState, useEffect, useRef } from 'react'
import { useChatAgent, AgentPersonality } from '../hooks/useChatAgent'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'

interface FreeTalkChatProps {
  onComplete?: (messageCount: number, duration: number) => void
}

const PERSONALITIES: { id: AgentPersonality; label: string; icon: string; desc: string }[] = [
  { id: 'friendly', label: 'Friendly Chat', icon: '😊', desc: 'Casual everyday conversation' },
  { id: 'teacher', label: 'English Teacher', icon: '👩‍🏫', desc: 'Get grammar feedback and corrections' },
  { id: 'interviewer', label: 'Interviewer', icon: '💼', desc: 'Practice formal English' },
  { id: 'debate', label: 'Debate Partner', icon: '🗣️', desc: 'Discuss topics and defend opinions' },
]

export const FreeTalkChat: React.FC<FreeTalkChatProps> = ({ onComplete }) => {
  const { messages, isTyping, isSpeaking, startChat, sendMessage, resetChat, speak, stopSpeaking } = useChatAgent()
  const { transcript, isListening, startListening, stopListening, resetTranscript } = useSpeechRecognition()

  const [inputText, setInputText] = useState('')
  const [autoSpeak, setAutoSpeak] = useState(true)
  const [started, setStarted] = useState(false)
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

  const handleStart = (personality: AgentPersonality) => {
    startChat(personality)
    setStarted(true)
  }

  const handleEnd = () => {
    if (onComplete) {
      onComplete(messages.filter(m => m.sender === 'user').length, Date.now() - startTime)
    }
    resetChat()
    setStarted(false)
  }

  // Personality selection
  if (!started) {
    return (
      <div>
        <div className="card" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ marginBottom: '8px' }}>🗣️ Free Talk</h2>
          <p style={{ color: '#666' }}>Choose a conversation partner and start chatting in English!</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {PERSONALITIES.map(p => (
            <div key={p.id} className="card" style={{ textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}
              onClick={() => handleStart(p.id)}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>{p.icon}</div>
              <h3 style={{ margin: '0 0 6px 0' }}>{p.label}</h3>
              <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Chat screen
  return (
    <div>
      {/* Header */}
      <div className="card" style={{ padding: '12px 20px', marginBottom: 0, borderRadius: '12px 12px 0 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={handleEnd} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>←</button>
            <h3 style={{ margin: 0, fontSize: '16px' }}>Free Talk</h3>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#666', cursor: 'pointer' }}>
            <input type="checkbox" checked={autoSpeak} onChange={e => setAutoSpeak(e.target.checked)} />
            Auto-speak
          </label>
        </div>
      </div>

      {/* Messages */}
      <div style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '400px', maxHeight: '500px', overflowY: 'auto', borderLeft: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0' }}>
        {messages.map(msg => (
          <div key={msg.id}>
            <div style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', marginBottom: msg.correction ? '4px' : '12px' }}>
              <div style={{
                maxWidth: '75%', padding: '12px 16px',
                borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                backgroundColor: msg.sender === 'user' ? '#007bff' : 'white',
                color: msg.sender === 'user' ? 'white' : '#333',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)', position: 'relative', whiteSpace: 'pre-wrap'
              }}>
                <p style={{ margin: 0, lineHeight: '1.5', fontSize: '15px' }}>{msg.text}</p>
                {msg.sender === 'agent' && (
                  <button onClick={() => isSpeaking ? stopSpeaking() : speak(msg.text)}
                    style={{ position: 'absolute', bottom: '4px', right: '8px', background: 'none', border: 'none', fontSize: '14px', cursor: 'pointer', opacity: 0.5 }}>
                    {isSpeaking ? '⏹️' : '🔊'}
                  </button>
                )}
              </div>
            </div>

            {/* Grammar correction */}
            {msg.correction && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
                <div style={{ maxWidth: '75%', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#fff8e1', border: '1px solid #ffe082', fontSize: '13px', color: '#6d4c00' }}>
                  <strong>Correction:</strong> {msg.correction}
                  {msg.suggestion && <div style={{ marginTop: '4px' }}><strong>Tip:</strong> {msg.suggestion}</div>}
                </div>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
            <div style={{ padding: '12px 20px', borderRadius: '16px 16px 16px 4px', backgroundColor: 'white', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
              <div className="typing-dots">
                <span style={{ display: 'inline-block', fontSize: '12px', color: '#999', animation: 'typingDot 1.4s infinite', animationDelay: '0s' }}>●</span>
                <span style={{ display: 'inline-block', fontSize: '12px', color: '#999', animation: 'typingDot 1.4s infinite', animationDelay: '0.2s' }}>●</span>
                <span style={{ display: 'inline-block', fontSize: '12px', color: '#999', animation: 'typingDot 1.4s infinite', animationDelay: '0.4s' }}>●</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ backgroundColor: 'white', padding: '16px 20px', borderRadius: '0 0 12px 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button onClick={() => isListening ? stopListening() : (resetTranscript(), setInputText(''), startListening())}
          className={`btn ${isListening ? 'btn-danger recording' : 'btn-secondary'}`}
          style={{ fontSize: '16px', padding: '10px 14px', flexShrink: 0 }}>
          🎤
        </button>
        <input ref={inputRef} type="text" value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
          placeholder={isListening ? 'Listening...' : 'Type in English...'}
          disabled={isListening}
          style={{ flex: 1, padding: '12px 16px', border: '2px solid #e0e0e0', borderRadius: '24px', fontSize: '15px', outline: 'none' }}
          onFocus={e => e.target.style.borderColor = '#007bff'}
          onBlur={e => e.target.style.borderColor = '#e0e0e0'}
        />
        <button onClick={handleSend} className="btn btn-primary"
          disabled={!inputText.trim() || isTyping}
          style={{ fontSize: '16px', padding: '10px 20px', flexShrink: 0 }}>
          Send
        </button>
      </div>
    </div>
  )
}
