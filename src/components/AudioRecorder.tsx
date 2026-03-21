import React from 'react'
import { useAudioRecorder } from '../hooks/useAudioRecorder'

interface AudioRecorderProps {
  onRecordingComplete?: (audioBlob: Blob, duration: number) => void
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecordingComplete }) => {
  const { isRecording, audioURL, audioBlob, duration, startRecording, stopRecording, clearRecording } = useAudioRecorder()

  const handleStop = () => {
    stopRecording()
    if (audioBlob && onRecordingComplete) {
      onRecordingComplete(audioBlob, duration)
    }
  }

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`
  }

  return (
    <div className="card">
      <h3>Voice Recorder</h3>
      
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        {!isRecording ? (
          <button 
            className="btn btn-primary" 
            onClick={startRecording}
            style={{ marginRight: '10px' }}
          >
            🎤 Start Recording
          </button>
        ) : (
          <button 
            className="btn btn-danger recording" 
            onClick={handleStop}
            style={{ marginRight: '10px' }}
          >
            ⏹️ Stop Recording
          </button>
        )}
        
        {audioURL && (
          <button 
            className="btn btn-secondary" 
            onClick={clearRecording}
          >
            🗑️ Clear
          </button>
        )}
      </div>

      {isRecording && (
        <div className="audio-visualizer">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i} 
              className="bar" 
              style={{ 
                height: `${Math.random() * 30 + 5}px`,
                animationDelay: `${i * 0.1}s`
              }} 
            />
          ))}
        </div>
      )}

      {audioURL && (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <audio controls src={audioURL} style={{ width: '100%', maxWidth: '400px' }} />
          <p style={{ marginTop: '10px', color: '#666' }}>
            Duration: {formatDuration(duration)}
          </p>
        </div>
      )}
    </div>
  )
}