import React from 'react'
import { useProgress } from '../hooks/useProgress'

export const ProgressDashboard: React.FC = () => {
  const { 
    progress, 
    getAveragePronunciationScore, 
    getAverageListeningScore, 
    getTotalSessions,
    resetProgress 
  } = useProgress()

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000)
    const hours = Math.floor(minutes / 60)
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    }
    return `${minutes}m`
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#28a745'
    if (score >= 60) return '#007bff'
    if (score >= 40) return '#ffc107'
    return '#dc3545'
  }

  const StatCard: React.FC<{ title: string; value: string | number; color?: string; icon?: string }> = ({ 
    title, 
    value, 
    color = '#007bff',
    icon 
  }) => (
    <div className="card" style={{ textAlign: 'center', minHeight: '120px' }}>
      {icon && <div style={{ fontSize: '24px', marginBottom: '10px' }}>{icon}</div>}
      <h4 style={{ color, fontSize: '28px', margin: '10px 0' }}>{value}</h4>
      <p style={{ color: '#666', margin: 0 }}>{title}</p>
    </div>
  )

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>📊 Your Progress</h2>
        <button 
          className="btn btn-secondary" 
          onClick={resetProgress}
          style={{ fontSize: '14px', padding: '8px 16px' }}
        >
          Reset Progress
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <StatCard 
          title="Total Sessions" 
          value={getTotalSessions()} 
          icon="🎯"
          color="#007bff"
        />
        <StatCard 
          title="Current Streak" 
          value={`${progress.streakDays} days`} 
          icon="🔥"
          color="#ff6b6b"
        />
        <StatCard 
          title="Time Practiced" 
          value={formatTime(progress.totalTimeSpent)} 
          icon="⏱️"
          color="#28a745"
        />
        <StatCard 
          title="Speaking Sessions" 
          value={progress.speakingSessionsCompleted} 
          icon="🗣️"
          color="#ffc107"
        />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div className="card">
          <h3>🎯 Pronunciation Scores</h3>
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <div style={{ 
              fontSize: '36px', 
              fontWeight: 'bold',
              color: getScoreColor(getAveragePronunciationScore())
            }}>
              {getAveragePronunciationScore()}/100
            </div>
            <p style={{ color: '#666' }}>Average Score</p>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Based on {progress.pronunciationScores.length} sessions
            </p>
          </div>
          
          {progress.pronunciationScores.length > 0 && (
            <div>
              <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Recent Scores:</h4>
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {progress.pronunciationScores.slice(-10).map((score, index) => (
                  <span 
                    key={index}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: getScoreColor(score),
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  >
                    {score}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="card">
          <h3>👂 Listening Scores</h3>
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <div style={{ 
              fontSize: '36px', 
              fontWeight: 'bold',
              color: getScoreColor(getAverageListeningScore())
            }}>
              {getAverageListeningScore()}/100
            </div>
            <p style={{ color: '#666' }}>Average Score</p>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Based on {progress.listeningScores.length} sessions
            </p>
          </div>
          
          {progress.listeningScores.length > 0 && (
            <div>
              <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Recent Scores:</h4>
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {progress.listeningScores.slice(-10).map((score, index) => (
                  <span 
                    key={index}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: getScoreColor(score),
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  >
                    {score}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {getTotalSessions() === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <h3>🌟 Start Your Learning Journey!</h3>
          <p style={{ color: '#666', fontSize: '16px', margin: '20px 0' }}>
            Complete your first exercise to see your progress here.
          </p>
        </div>
      )}
    </div>
  )
}