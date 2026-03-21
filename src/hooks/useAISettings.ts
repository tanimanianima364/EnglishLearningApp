import { useState, useEffect, useCallback } from 'react'
import { AISettings, AIModel } from '../types/ai'
import { testConnection, getTokenUsageToday } from '../services/aiService'

const SETTINGS_KEY = 'claude_ai_settings'

const defaultSettings: AISettings = {
  apiKey: null,
  model: 'claude-sonnet-4-20250514',
  isEnabled: true,
  tokenBudgetDaily: 100000,
  tokensUsedToday: 0,
  lastResetDate: ''
}

export const useAISettings = () => {
  const [settings, setSettings] = useState<AISettings>(defaultSettings)
  const [connectionStatus, setConnectionStatus] = useState<'untested' | 'testing' | 'success' | 'failed'>('untested')
  const [connectionError, setConnectionError] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      setSettings({ ...defaultSettings, ...parsed })
    }
  }, [])

  const save = (s: AISettings) => {
    setSettings(s)
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s))
  }

  const updateApiKey = useCallback((key: string) => {
    save({ ...settings, apiKey: key || null })
    setConnectionStatus('untested')
  }, [settings])

  const setModel = useCallback((model: AIModel) => {
    save({ ...settings, model })
  }, [settings])

  const toggleAI = useCallback(() => {
    save({ ...settings, isEnabled: !settings.isEnabled })
  }, [settings])

  const runTestConnection = useCallback(async () => {
    setConnectionStatus('testing')
    setConnectionError(null)
    const result = await testConnection()
    if (result.success) {
      setConnectionStatus('success')
    } else {
      setConnectionStatus('failed')
      setConnectionError(result.error || 'Unknown error')
    }
  }, [])

  const isAIReady = settings.apiKey !== null && settings.isEnabled
  const tokenUsage = getTokenUsageToday()

  return {
    settings,
    isAIReady,
    connectionStatus,
    connectionError,
    tokenUsage,
    updateApiKey,
    setModel,
    toggleAI,
    testConnection: runTestConnection
  }
}
