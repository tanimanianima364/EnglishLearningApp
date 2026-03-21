import React, { useState } from 'react'
import { useAISettings } from '../hooks/useAISettings'

export const AISettings: React.FC = () => {
  const { settings, isAIReady, connectionStatus, connectionError, tokenUsage, updateApiKey, setModel, toggleAI, testConnection } = useAISettings()
  const [keyInput, setKeyInput] = useState(settings.apiKey || '')
  const [showKey, setShowKey] = useState(false)

  const maskedKey = settings.apiKey
    ? '••••••••••••' + settings.apiKey.slice(-4)
    : 'Not configured'

  return (
    <div>
      <div className="card" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '8px' }}>AI Settings</h2>
        <p style={{ color: '#666' }}>Configure Claude AI to unlock advanced learning features</p>
      </div>

      {/* Status */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>AI Status</h3>
            <span style={{
              display: 'inline-block', padding: '3px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 600,
              backgroundColor: isAIReady ? '#d4edda' : '#f8d7da',
              color: isAIReady ? '#155724' : '#721c24'
            }}>
              {isAIReady ? 'AI Enabled' : 'Offline Mode'}
            </span>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>Enable AI</span>
            <input type="checkbox" checked={settings.isEnabled} onChange={toggleAI}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
          </label>
        </div>
      </div>

      {/* API Key */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>API Key</h3>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '12px' }}>
          Enter your Anthropic API key. It is stored locally in your browser only.
        </p>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <input
            type={showKey ? 'text' : 'password'}
            value={keyInput}
            onChange={e => setKeyInput(e.target.value)}
            placeholder="sk-ant-..."
            style={{ flex: 1, padding: '10px 16px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: 'monospace' }}
            onFocus={e => e.target.style.borderColor = '#007bff'}
            onBlur={e => e.target.style.borderColor = '#e0e0e0'}
          />
          <button className="btn btn-secondary" onClick={() => setShowKey(!showKey)} style={{ fontSize: '13px', padding: '8px 14px' }}>
            {showKey ? 'Hide' : 'Show'}
          </button>
          <button className="btn btn-primary" onClick={() => updateApiKey(keyInput)} style={{ fontSize: '13px', padding: '8px 14px' }}>
            Save
          </button>
        </div>
        <div style={{ fontSize: '13px', color: '#666' }}>
          Current: <code style={{ backgroundColor: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>{maskedKey}</code>
        </div>
      </div>

      {/* Model Selection */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Model</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          {([
            { id: 'claude-sonnet-4-20250514' as const, label: 'Sonnet 4', desc: 'Fast, cost-effective' },
            { id: 'claude-haiku-4-5-20251001' as const, label: 'Haiku 4.5', desc: 'Fastest, cheapest' },
          ]).map(m => (
            <button key={m.id}
              className={`btn ${settings.model === m.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setModel(m.id)}
              style={{ flex: 1, fontSize: '13px', padding: '10px' }}>
              <div style={{ fontWeight: 700 }}>{m.label}</div>
              <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '2px' }}>{m.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Connection Test */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Connection Test</h3>
        <button className="btn btn-primary" onClick={testConnection}
          disabled={!settings.apiKey || connectionStatus === 'testing'}
          style={{ marginBottom: '12px' }}>
          {connectionStatus === 'testing' ? 'Testing...' : 'Test Connection'}
        </button>
        {connectionStatus === 'success' && (
          <div style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#d4edda', color: '#155724', fontSize: '14px' }}>
            Connection successful!
          </div>
        )}
        {connectionStatus === 'failed' && (
          <div style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#f8d7da', color: '#721c24', fontSize: '14px' }}>
            Connection failed: {connectionError}
          </div>
        )}
      </div>

      {/* Token Usage */}
      <div className="card">
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Today's Token Usage</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
          <span>{tokenUsage.total.toLocaleString()} tokens used</span>
          <span style={{ color: '#666' }}>/ {settings.tokenBudgetDaily.toLocaleString()} budget</span>
        </div>
        <div style={{ height: '8px', backgroundColor: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: '4px', transition: 'width 0.3s',
            width: `${Math.min(100, (tokenUsage.total / settings.tokenBudgetDaily) * 100)}%`,
            backgroundColor: tokenUsage.total > settings.tokenBudgetDaily * 0.8 ? '#dc3545' : '#28a745'
          }} />
        </div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '12px', color: '#888' }}>
          <span>Input: {tokenUsage.input.toLocaleString()}</span>
          <span>Output: {tokenUsage.output.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
