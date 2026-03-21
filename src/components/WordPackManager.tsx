import React, { useState } from 'react'
import { useWordPacks } from '../hooks/useWordPacks'
import { useSRS } from '../hooks/useSRS'
import { WordPackData, WordPackMeta } from '../types/wordPack'
import { PACK_REGISTRY, getPackById } from '../data/packs'

export const WordPackManager: React.FC = () => {
  const { getBaseMasteredCount, isPackUnlocked, isPackActive, getPackProgress, activatePack, deactivatePack, updatePackProgress } = useWordPacks()
  const { initializePackWords } = useSRS()
  const [selectedPack, setSelectedPack] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const masteredCount = getBaseMasteredCount()
  const unlockThreshold = 2000

  const handleActivate = (pack: WordPackData) => {
    initializePackWords(
      pack.words.map(w => ({ word: w.word, meaning: w.meaning, meaningJa: w.meaningJa })),
      pack.meta.id
    )
    activatePack(pack.meta.id)
    updatePackProgress(pack.meta.id, pack.words.length)
  }

  // Pack detail view
  if (selectedPack) {
    const pack = getPackById(selectedPack)
    if (!pack) return null
    const progress = getPackProgress(selectedPack)
    const active = isPackActive(selectedPack)
    const filteredWords = searchQuery
      ? pack.words.filter(w => w.word.includes(searchQuery.toLowerCase()) || w.meaningJa.includes(searchQuery))
      : pack.words

    return (
      <div>
        <div className="card" style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <button onClick={() => { setSelectedPack(null); setSearchQuery('') }} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>←</button>
            <span style={{ fontSize: '32px' }}>{pack.meta.icon}</span>
            <div>
              <h3 style={{ margin: 0 }}>{pack.meta.name}</h3>
              <span style={{ color: '#666', fontSize: '13px' }}>{pack.meta.nameJa}</span>
            </div>
          </div>
          <p style={{ color: '#555', marginBottom: '16px' }}>{pack.meta.description}</p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            {active ? (
              <button className="btn btn-secondary" onClick={() => deactivatePack(selectedPack)} style={{ fontSize: '14px', padding: '8px 16px' }}>
                Deactivate Pack
              </button>
            ) : (
              <button className="btn btn-success" onClick={() => handleActivate(pack)} style={{ fontSize: '14px', padding: '8px 16px' }}>
                Activate & Add to SRS
              </button>
            )}
            {active && <span style={{ fontSize: '13px', padding: '4px 12px', borderRadius: '10px', backgroundColor: '#d4edda', color: '#155724' }}>Active</span>}
            <span style={{ fontSize: '13px', color: '#888' }}>
              {progress.wordsMastered} / {pack.words.length} mastered
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="card" style={{ padding: '12px', marginBottom: '16px' }}>
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search words..." style={{ width: '100%', padding: '10px 16px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '15px', outline: 'none' }}
            onFocus={e => e.target.style.borderColor = '#007bff'} onBlur={e => e.target.style.borderColor = '#e0e0e0'} />
        </div>

        {/* Word list */}
        <div>
          {filteredWords.map((w, i) => (
            <div key={i} className="card" style={{ padding: '12px 16px', marginBottom: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#333' }}>{w.word}</span>
                  <span style={{ fontSize: '14px', color: '#666', marginLeft: '12px' }}>{w.meaningJa}</span>
                </div>
                {w.tags && w.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {w.tags.map(t => (
                      <span key={t} style={{ fontSize: '11px', padding: '1px 6px', borderRadius: '8px', backgroundColor: '#f0f0f0', color: '#888' }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <p style={{ fontSize: '13px', color: '#888', margin: '4px 0 0 0' }}>{w.meaning}</p>
              <p style={{ fontSize: '12px', color: '#aaa', margin: '2px 0 0 0', fontStyle: 'italic' }}>"{w.exampleSentence}"</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Pack grid
  return (
    <div>
      <div className="card" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '8px' }}>📦 Word Packs</h2>
        <p style={{ color: '#666' }}>Expand your vocabulary with specialized word collections</p>
      </div>

      {/* Unlock progress */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: 600 }}>Base Vocabulary Progress</span>
          <span style={{ color: '#666', fontSize: '14px' }}>{masteredCount} / {unlockThreshold} mastered</span>
        </div>
        <div style={{ height: '10px', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: '5px', transition: 'width 0.5s',
            width: `${Math.min(100, (masteredCount / unlockThreshold) * 100)}%`,
            backgroundColor: masteredCount >= unlockThreshold ? '#28a745' : '#007bff'
          }} />
        </div>
        {masteredCount < unlockThreshold && (
          <p style={{ fontSize: '13px', color: '#888', marginTop: '8px' }}>
            Master {unlockThreshold - masteredCount} more base words to unlock expansion packs
          </p>
        )}
        {masteredCount >= unlockThreshold && (
          <p style={{ fontSize: '13px', color: '#28a745', marginTop: '8px', fontWeight: 600 }}>
            All packs unlocked! Choose a pack to start learning.
          </p>
        )}
      </div>

      {/* Pack cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {PACK_REGISTRY.map(pack => {
          const unlocked = isPackUnlocked(pack.meta.id, pack.meta.unlockThreshold)
          const active = isPackActive(pack.meta.id)
          const progress = getPackProgress(pack.meta.id)

          return (
            <div key={pack.meta.id} className="card"
              style={{
                cursor: unlocked ? 'pointer' : 'default',
                opacity: unlocked ? 1 : 0.5,
                borderLeft: `4px solid ${active ? '#28a745' : unlocked ? pack.meta.color : '#ccc'}`,
                transition: 'transform 0.2s',
                position: 'relative'
              }}
              onClick={() => unlocked && setSelectedPack(pack.meta.id)}
              onMouseEnter={e => unlocked && ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)')}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)')}>

              {!unlocked && (
                <div style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '20px' }}>🔒</div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '32px' }}>{pack.meta.icon}</span>
                <div>
                  <h4 style={{ margin: 0 }}>{pack.meta.name}</h4>
                  <span style={{ fontSize: '12px', color: '#666' }}>{pack.meta.nameJa}</span>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#666', margin: '0 0 12px 0' }}>{pack.meta.descriptionJa}</p>

              <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '10px', backgroundColor: '#f0f0f0', color: '#666' }}>
                  {pack.meta.wordCount} words
                </span>
                <span style={{
                  fontSize: '11px', padding: '2px 8px', borderRadius: '10px',
                  backgroundColor: pack.meta.category === 'professional' ? '#e8d5f5' : pack.meta.category === 'test-prep' ? '#fff3cd' : '#e8f5e9',
                  color: pack.meta.category === 'professional' ? '#553c9a' : pack.meta.category === 'test-prep' ? '#856404' : '#276749'
                }}>
                  {pack.meta.category}
                </span>
                {active && <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '10px', backgroundColor: '#d4edda', color: '#155724' }}>Active</span>}
              </div>

              {progress.wordsAdded > 0 && (
                <div>
                  <div style={{ height: '4px', backgroundColor: '#e0e0e0', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(progress.wordsMastered / pack.meta.wordCount) * 100}%`, backgroundColor: '#28a745', transition: 'width 0.3s' }} />
                  </div>
                  <span style={{ fontSize: '11px', color: '#888' }}>{progress.wordsMastered} / {pack.meta.wordCount} mastered</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
