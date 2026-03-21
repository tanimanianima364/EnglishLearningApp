import Anthropic from '@anthropic-ai/sdk'
import { AIModel } from '../types/ai'

const SETTINGS_KEY = 'claude_ai_settings'
const USAGE_KEY = 'claude_token_usage'

let clientInstance: Anthropic | null = null
let currentApiKey: string | null = null

function getClient(apiKey: string): Anthropic {
  if (clientInstance && currentApiKey === apiKey) return clientInstance
  clientInstance = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
  currentApiKey = apiKey
  return clientInstance
}

function getApiKey(): string | null {
  try {
    const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}')
    return settings.apiKey || null
  } catch { return null }
}

function getModel(): AIModel {
  try {
    const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}')
    return settings.model || 'claude-sonnet-4-20250514'
  } catch { return 'claude-sonnet-4-20250514' }
}

function todayStr(): string {
  return new Date().toISOString().split('T')[0]
}

function trackTokens(inputTokens: number, outputTokens: number) {
  try {
    const today = todayStr()
    const usage = JSON.parse(localStorage.getItem(USAGE_KEY) || '{}')
    if (usage.date !== today) {
      usage.date = today
      usage.input = 0
      usage.output = 0
    }
    usage.input = (usage.input || 0) + inputTokens
    usage.output = (usage.output || 0) + outputTokens
    localStorage.setItem(USAGE_KEY, JSON.stringify(usage))
  } catch { /* ignore tracking errors */ }
}

export function getTokenUsageToday(): { input: number; output: number; total: number } {
  try {
    const today = todayStr()
    const usage = JSON.parse(localStorage.getItem(USAGE_KEY) || '{}')
    if (usage.date !== today) return { input: 0, output: 0, total: 0 }
    return { input: usage.input || 0, output: usage.output || 0, total: (usage.input || 0) + (usage.output || 0) }
  } catch { return { input: 0, output: 0, total: 0 } }
}

export function isAIAvailable(): boolean {
  return !!getApiKey()
}

function parseJSONResponse(text: string): any {
  // Strip markdown code fences if present
  let cleaned = text.trim()
  if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7)
  else if (cleaned.startsWith('```')) cleaned = cleaned.slice(3)
  if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3)
  return JSON.parse(cleaned.trim())
}

/**
 * Call Claude API (non-streaming).
 */
export async function callClaude(
  systemPrompt: string,
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  options?: { maxTokens?: number }
): Promise<string> {
  const apiKey = getApiKey()
  if (!apiKey) throw new Error('API key not configured')

  const client = getClient(apiKey)
  const model = getModel()

  const response = await client.messages.create({
    model,
    max_tokens: options?.maxTokens || 2048,
    system: systemPrompt,
    messages
  })

  const inputTokens = response.usage?.input_tokens || 0
  const outputTokens = response.usage?.output_tokens || 0
  trackTokens(inputTokens, outputTokens)

  const textBlock = response.content.find(b => b.type === 'text')
  return textBlock ? textBlock.text : ''
}

/**
 * Call Claude API and parse JSON response.
 */
export async function callClaudeJSON<T>(
  systemPrompt: string,
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  options?: { maxTokens?: number }
): Promise<T> {
  const text = await callClaude(systemPrompt, messages, options)
  return parseJSONResponse(text) as T
}

/**
 * Call Claude API with streaming.
 */
export async function streamClaude(
  systemPrompt: string,
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  onChunk: (text: string) => void,
  options?: { maxTokens?: number }
): Promise<string> {
  const apiKey = getApiKey()
  if (!apiKey) throw new Error('API key not configured')

  const client = getClient(apiKey)
  const model = getModel()

  let fullText = ''

  const stream = client.messages.stream({
    model,
    max_tokens: options?.maxTokens || 1024,
    system: systemPrompt,
    messages
  })

  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      fullText += event.delta.text
      onChunk(fullText)
    }
  }

  const finalMessage = await stream.finalMessage()
  trackTokens(finalMessage.usage?.input_tokens || 0, finalMessage.usage?.output_tokens || 0)

  return fullText
}

/**
 * Test API connection.
 */
export async function testConnection(): Promise<{ success: boolean; error?: string }> {
  try {
    const apiKey = getApiKey()
    if (!apiKey) return { success: false, error: 'No API key configured' }

    const client = getClient(apiKey)
    const model = getModel()

    await client.messages.create({
      model,
      max_tokens: 10,
      messages: [{ role: 'user', content: 'Hi' }]
    })

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error?.message || 'Connection failed' }
  }
}
