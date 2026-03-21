import React, { useState } from 'react'

export interface AIFeedbackCategory {
  name: string
  score: number
  summary: string
  details?: string[]
}

export interface AIFeedbackPanelProps {
  score: number
  cefrLevel?: string
  categories: AIFeedbackCategory[]
  strengths?: string[]
  improvements?: string[]
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#28a745'
  if (score >= 60) return '#ffc107'
  if (score >= 40) return '#fd7e14'
  return '#dc3545'
}

function getScoreClass(score: number): string {
  if (score >= 90) return 'excellent'
  if (score >= 75) return 'good'
  if (score >= 60) return 'fair'
  return 'poor'
}

export const AIFeedbackPanel: React.FC<AIFeedbackPanelProps> = ({
  score,
  cefrLevel,
  categories,
  strengths,
  improvements
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  return (
    <div>
      {/* Overall Score + Level Badge */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div className={`score ${getScoreClass(score)}`}>
          {score}/100
        </div>
        {cefrLevel && (
          <span style={{
            display: 'inline-block',
            marginTop: '8px',
            padding: '4px 16px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 700,
            backgroundColor: '#e7f3ff',
            color: '#004085'
          }}>
            {cefrLevel}
          </span>
        )}
      </div>

      {/* Category Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '12px',
        marginBottom: '20px'
      }}>
        {categories.map(cat => {
          const isExpanded = expandedCategory === cat.name
          const barColor = getScoreColor(cat.score)
          return (
            <div
              key={cat.name}
              className="card"
              style={{
                padding: '14px 16px',
                marginBottom: 0,
                cursor: cat.details && cat.details.length > 0 ? 'pointer' : 'default',
                borderLeft: `4px solid ${barColor}`
              }}
              onClick={() => {
                if (cat.details && cat.details.length > 0) {
                  setExpandedCategory(isExpanded ? null : cat.name)
                }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, textTransform: 'capitalize' }}>
                  {cat.name}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: barColor }}>
                  {cat.score > 0 ? cat.score : '--'}
                </span>
              </div>

              {/* Score bar */}
              <div style={{
                height: '6px',
                backgroundColor: '#e0e0e0',
                borderRadius: '3px',
                overflow: 'hidden',
                marginBottom: '8px'
              }}>
                <div style={{
                  height: '100%',
                  width: `${cat.score}%`,
                  backgroundColor: barColor,
                  borderRadius: '3px',
                  transition: 'width 0.4s ease'
                }} />
              </div>

              <p style={{ fontSize: '13px', color: '#666', margin: 0, lineHeight: '1.5' }}>
                {cat.summary}
              </p>

              {/* Expandable details */}
              {isExpanded && cat.details && cat.details.length > 0 && (
                <div style={{
                  marginTop: '10px',
                  padding: '10px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '6px'
                }}>
                  {cat.details.map((detail, i) => (
                    <p key={i} style={{
                      fontSize: '12px',
                      color: '#555',
                      margin: i === cat.details!.length - 1 ? 0 : '0 0 6px 0',
                      lineHeight: '1.5'
                    }}>
                      {detail}
                    </p>
                  ))}
                </div>
              )}

              {cat.details && cat.details.length > 0 && (
                <div style={{ textAlign: 'right', marginTop: '4px' }}>
                  <span style={{ fontSize: '11px', color: '#999' }}>
                    {isExpanded ? 'Click to collapse' : 'Click for details'}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Strengths */}
      {strengths && strengths.length > 0 && (
        <div style={{
          padding: '14px 16px',
          backgroundColor: '#d4edda',
          borderRadius: '8px',
          marginBottom: '12px'
        }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#155724' }}>
            Strengths
          </h4>
          <ul style={{ margin: 0, paddingLeft: '18px' }}>
            {strengths.map((s, i) => (
              <li key={i} style={{ fontSize: '13px', color: '#155724', marginBottom: i === strengths.length - 1 ? 0 : '4px', lineHeight: '1.5' }}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Areas to Improve */}
      {improvements && improvements.length > 0 && (
        <div style={{
          padding: '14px 16px',
          backgroundColor: '#fff3cd',
          borderRadius: '8px'
        }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#856404' }}>
            Areas to Improve
          </h4>
          <ul style={{ margin: 0, paddingLeft: '18px' }}>
            {improvements.map((item, i) => (
              <li key={i} style={{ fontSize: '13px', color: '#856404', marginBottom: i === improvements.length - 1 ? 0 : '4px', lineHeight: '1.5' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
