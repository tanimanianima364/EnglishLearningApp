import React, { useState } from 'react'
import { useVocabulary } from '../hooks/useVocabulary'
import { AcquisitionLevel, VocabularyEntry } from '../types/vocabulary'

type FilterLevel = AcquisitionLevel | 'all'

const LEVEL_CONFIG: Record<AcquisitionLevel, { label: string; color: string; bg: string }> = {
  mastered: { label: '取得済み', color: '#155724', bg: '#d4edda' },
  learning: { label: '習得中', color: '#856404', bg: '#fff3cd' },
  not_acquired: { label: '未取得', color: '#721c24', bg: '#f8d7da' }
}

export const VocabularyManager: React.FC = () => {
  const { getWordsByLevel, getAllWords, searchWords, getStats, resetVocabulary } = useVocabulary()
  const [selectedLevel, setSelectedLevel] = useState<FilterLevel>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedWord, setExpandedWord] = useState<string | null>(null)

  const stats = getStats()

  const getFilteredWords = (): VocabularyEntry[] => {
    if (searchQuery.trim()) {
      const results = searchWords(searchQuery)
      if (selectedLevel === 'all') return results
      return results.filter(w => w.level === selectedLevel)
    }
    if (selectedLevel === 'all') return getAllWords()
    return getWordsByLevel(selectedLevel)
  }

  const filteredWords = getFilteredWords()

  const StatCard: React.FC<{ title: string; value: number; color: string; icon: string }> = ({
    title, value, color, icon
  }) => (
    <div className="card" style={{ textAlign: 'center', minHeight: '120px' }}>
      <div style={{ fontSize: '24px', marginBottom: '10px' }}>{icon}</div>
      <h4 style={{ color, fontSize: '28px', margin: '10px 0' }}>{value}</h4>
      <p style={{ color: '#666', margin: 0 }}>{title}</p>
    </div>
  )

  const LevelBadge: React.FC<{ level: AcquisitionLevel }> = ({ level }) => {
    const config = LEVEL_CONFIG[level]
    return (
      <span style={{
        display: 'inline-block',
        fontSize: '12px',
        padding: '2px 10px',
        borderRadius: '10px',
        backgroundColor: config.bg,
        color: config.color,
        fontWeight: 600
      }}>
        {config.label}
      </span>
    )
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-'
    return dateStr
  }

  const renderWordCard = (entry: VocabularyEntry) => {
    const isExpanded = expandedWord === entry.word
    const ratio = entry.totalCount > 0
      ? Math.round((entry.correctCount / entry.totalCount) * 100)
      : 0

    return (
      <div
        key={entry.word}
        className="card"
        style={{ marginBottom: '8px', padding: '16px', cursor: 'pointer' }}
        onClick={() => setExpandedWord(isExpanded ? null : entry.word)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#333' }}>
              {entry.word}
            </span>
            <LevelBadge level={entry.level} />
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#888' }}>
            <span title="Total encounters">x{entry.totalCount}</span>
            <span title="Correct usage rate">{ratio}%</span>
            <span style={{ fontSize: '16px' }}>{isExpanded ? '▲' : '▼'}</span>
          </div>
        </div>

        {entry.meaning && (
          <p style={{ margin: '6px 0 0 0', fontSize: '14px', color: '#666' }}>
            {entry.meaning}
          </p>
        )}

        {isExpanded && (
          <div style={{ marginTop: '12px', borderTop: '1px solid #eee', paddingTop: '12px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '8px',
              marginBottom: '12px',
              fontSize: '13px'
            }}>
              <div>
                <span style={{ color: '#888' }}>Encounters: </span>
                <strong>{entry.totalCount}</strong>
              </div>
              <div>
                <span style={{ color: '#888' }}>Correct usage: </span>
                <strong>{entry.correctCount}</strong>
              </div>
              <div>
                <span style={{ color: '#888' }}>Usage rate: </span>
                <strong style={{ color: ratio >= 80 ? '#28a745' : ratio >= 50 ? '#ffc107' : '#dc3545' }}>
                  {ratio}%
                </strong>
              </div>
              <div>
                <span style={{ color: '#888' }}>First seen: </span>
                <strong>{formatDate(entry.firstSeen)}</strong>
              </div>
              <div>
                <span style={{ color: '#888' }}>Last seen: </span>
                <strong>{formatDate(entry.lastSeen)}</strong>
              </div>
              <div>
                <span style={{ color: '#888' }}>Unique days: </span>
                <strong>{new Set(entry.encounters.map(e => e.date)).size}</strong>
              </div>
            </div>

            {entry.encounters.length > 0 && (
              <div>
                <h4 style={{ fontSize: '13px', color: '#666', marginBottom: '6px' }}>
                  Recent contexts:
                </h4>
                <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                  {entry.encounters.slice(-5).reverse().map((enc, i) => (
                    <div key={i} style={{
                      padding: '6px 10px',
                      marginBottom: '4px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '6px',
                      fontSize: '13px',
                      borderLeft: `3px solid ${enc.wasCorrectUsage ? '#28a745' : '#dee2e6'}`
                    }}>
                      <div style={{ color: '#333' }}>"{enc.context}"</div>
                      <div style={{ display: 'flex', gap: '12px', marginTop: '2px', color: '#999', fontSize: '11px' }}>
                        <span>{enc.date}</span>
                        <span>{enc.source}</span>
                        <span>{enc.wasCorrectUsage ? 'Active use' : 'Passive'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>📚 Vocabulary</h2>
        <button
          className="btn btn-secondary"
          onClick={resetVocabulary}
          style={{ fontSize: '14px', padding: '8px 16px' }}
        >
          Reset Vocabulary
        </button>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
      }}>
        <StatCard title="Not Acquired" value={stats.notAcquired} color="#dc3545" icon="📕" />
        <StatCard title="Learning" value={stats.learning} color="#ffc107" icon="📒" />
        <StatCard title="Mastered" value={stats.mastered} color="#28a745" icon="📗" />
      </div>

      {/* Search + Filters */}
      <div className="card" style={{ padding: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search words..."
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '10px 16px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '15px',
              outline: 'none'
            }}
            onFocus={e => e.target.style.borderColor = '#007bff'}
            onBlur={e => e.target.style.borderColor = '#e0e0e0'}
          />
          <div style={{ display: 'flex', gap: '4px' }}>
            {([
              { key: 'all' as FilterLevel, label: `All (${stats.total})` },
              { key: 'not_acquired' as FilterLevel, label: `未取得 (${stats.notAcquired})` },
              { key: 'learning' as FilterLevel, label: `習得中 (${stats.learning})` },
              { key: 'mastered' as FilterLevel, label: `取得済み (${stats.mastered})` }
            ]).map(tab => (
              <button
                key={tab.key}
                className={`btn ${selectedLevel === tab.key ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '13px', padding: '8px 12px' }}
                onClick={() => setSelectedLevel(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Criteria info */}
      <div className="card" style={{ padding: '14px 20px', marginBottom: '16px', fontSize: '13px', color: '#666' }}>
        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#333' }}>
            Level criteria
          </summary>
          <div style={{ marginTop: '10px', lineHeight: '1.8' }}>
            <p><strong style={{ color: '#dc3545' }}>未取得:</strong> 遭遇3回未満 / 自ら使用0回 / 1日のみ遭遇</p>
            <p><strong style={{ color: '#e0a800' }}>習得中:</strong> 遭遇3回以上 + 自ら使用1回以上 + 2日以上遭遇</p>
            <p><strong style={{ color: '#28a745' }}>取得済み:</strong> 遭遇5回以上 + 使用率80%以上 + 5日以上遭遇 + 30日以内に遭遇</p>
          </div>
        </details>
      </div>

      {/* Word list */}
      {filteredWords.length > 0 ? (
        <div>
          <p style={{ fontSize: '14px', color: '#888', marginBottom: '12px' }}>
            {filteredWords.length} word{filteredWords.length !== 1 ? 's' : ''}
          </p>
          {filteredWords.map(entry => renderWordCard(entry))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          {stats.total === 0 ? (
            <>
              <h3>🌟 Start Learning!</h3>
              <p style={{ color: '#666', fontSize: '16px', margin: '20px 0' }}>
                Complete exercises to start building your vocabulary. Words are automatically collected from all exercises.
              </p>
            </>
          ) : (
            <p style={{ color: '#666', fontSize: '16px' }}>
              No words match your search or filter.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
