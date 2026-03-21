import React, { useState, useMemo } from 'react'
import { PronunciationPractice } from './components/PronunciationPractice'
import { ListeningExercise } from './components/ListeningExercise'
import { SpeakingExercise } from './components/SpeakingExercise'
import { ConversationPractice } from './components/ConversationPractice'
import { VocabularyManager } from './components/VocabularyManager'
import { GrammarExercise } from './components/GrammarExercise'
import { ReadingExercise } from './components/ReadingExercise'
import { SentenceBuilder } from './components/SentenceBuilder'
import { GapFillExercise } from './components/GapFillExercise'
import { DictationExercise } from './components/DictationExercise'
import { MinimalPairDrill } from './components/MinimalPairDrill'
import { MorphologyExercise } from './components/MorphologyExercise'
import { FreeTalkChat } from './components/FreeTalkChat'
import { FlashcardReview } from './components/FlashcardReview'
import { WordPackManager } from './components/WordPackManager'
import { EssayWriting } from './components/EssayWriting'
import { AISettings } from './components/AISettings'
import { ProgressDashboard } from './components/ProgressDashboard'
import { useProgress } from './hooks/useProgress'
import { useVocabulary } from './hooks/useVocabulary'

type ExerciseType = 'pronunciation' | 'listening' | 'speaking' | 'conversation'
  | 'grammar' | 'reading' | 'writing' | 'dictation' | 'minimal-pairs' | 'morphology'
  | 'free-talk' | 'flashcard' | 'word-packs' | 'essay' | 'ai-settings'
  | 'vocabulary' | 'progress' | 'home'

const App: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState<ExerciseType>('home')
  const {
    addPronunciationScore, addListeningScore, addSpeakingSession,
    addGrammarScore, addReadingScore, addWritingScore, addDictationScore, addMorphologyScore, addFlashcardScore, addEssayScore,
    updateStreak
  } = useProgress()
  const { recordPronunciation, recordListening, recordSpeaking, recordConversation } = useVocabulary()

  const [pronunciationKey, setPronunciationKey] = useState(0)
  const [speakingKey, setSpeakingKey] = useState(0)

  const pronunciationTexts = [
    "The quick brown fox jumps over the lazy dog",
    "She sells seashells by the seashore",
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
    "Peter Piper picked a peck of pickled peppers"
  ]

  const listeningQuestions = [
    { id: '1', text: 'What is the main topic of the conversation?', options: ['Weather', 'Travel plans', 'Work schedule', 'Restaurant review'], correctAnswer: 1 },
    { id: '2', text: 'When are they planning to meet?', options: ['Tomorrow morning', 'This afternoon', 'Next week', 'Friday evening'], correctAnswer: 3 },
    { id: '3', text: 'What did the speaker suggest?', options: ['Taking a taxi', 'Walking there', 'Using public transport', 'Driving'], correctAnswer: 2 }
  ]

  const speakingPrompts = [
    { id: '1', type: 'description' as const, prompt: 'Describe your daily routine. What do you usually do from morning to evening?', tips: ['Use time expressions (first, then, after that, finally)', 'Include specific times when possible', 'Describe activities in chronological order'], timeLimit: 60 },
    { id: '2', type: 'opinion' as const, prompt: 'What do you think about learning languages online? Share your thoughts and experiences.', tips: ['Express your opinion clearly (I think, I believe, In my opinion)', 'Give reasons for your opinion', 'Share personal experiences if relevant'], timeLimit: 90 },
    { id: '3', type: 'conversation' as const, prompt: 'Imagine you are ordering food at a restaurant. What would you say to the waiter?', tips: ['Be polite (please, thank you, excuse me)', 'Ask questions about the menu', 'Make specific requests'], timeLimit: 45 }
  ]

  const currentPronunciationText = useMemo(
    () => pronunciationTexts[Math.floor(Math.random() * pronunciationTexts.length)],
    [pronunciationKey]
  )

  const currentSpeakingPrompt = useMemo(
    () => speakingPrompts[Math.floor(Math.random() * speakingPrompts.length)],
    [speakingKey]
  )

  const navBtn = (type: ExerciseType, label: string, onClick?: () => void) => (
    <button
      className={`btn ${currentExercise === type ? 'btn-secondary' : 'btn-primary'}`}
      onClick={onClick || (() => setCurrentExercise(type))}
      style={{ fontSize: '13px', padding: '6px 14px' }}
    >
      {label}
    </button>
  )

  const homeCard = (type: ExerciseType, icon: string, title: string, desc: string, onClick?: () => void) => (
    <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }}
         onClick={onClick || (() => setCurrentExercise(type))}>
      <h3>{icon} {title}</h3>
      <p style={{ color: '#666', margin: '15px 0' }}>{desc}</p>
      <button className="btn btn-primary">Start</button>
    </div>
  )

  const renderHome = () => (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>English Learning App</h1>
        <p style={{ fontSize: '18px', color: '#666' }}>Master English reading, writing, speaking, and listening</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {homeCard('grammar', '📝', 'Grammar', 'Learn grammar rules with interactive exercises from A1 to B2.')}
        {homeCard('reading', '📖', 'Reading', 'Read graded passages and answer comprehension questions.')}
        {homeCard('writing', '✍️', 'Writing', 'Build sentences, fill gaps, and practice writing structure.')}
        {homeCard('dictation', '🎧', 'Dictation', 'Listen and type what you hear to improve spelling and listening.')}
        {homeCard('pronunciation', '🎯', 'Pronunciation', 'Practice pronouncing English phrases with instant feedback.',
          () => { setCurrentExercise('pronunciation'); setPronunciationKey(k => k + 1) })}
        {homeCard('minimal-pairs', '👂', 'Minimal Pairs', 'Train your ear to distinguish similar sounds like ship/sheep.')}
        {homeCard('speaking', '🗣️', 'Speaking', 'Practice speaking with guided prompts and record yourself.',
          () => { setCurrentExercise('speaking'); setSpeakingKey(k => k + 1) })}
        {homeCard('conversation', '💬', 'Conversation', 'Practice real-world conversations with an AI partner.')}
        {homeCard('free-talk', '🗣️', 'Free Talk', 'Chat freely in English with an AI conversation partner.')}
        {homeCard('morphology', '🧬', 'Word Parts', 'Learn prefixes, roots, and suffixes to unlock thousands of words.')}
        {homeCard('essay', '✍️', 'Essay Writing', 'Write essays and get AI feedback on grammar, structure, and style.')}
        {homeCard('flashcard', '🔁', 'Flashcards', 'Review vocabulary with spaced repetition (forgetting curve).')}
        {homeCard('word-packs', '📦', 'Word Packs', 'Expand vocabulary with specialized packs (Business, TOEIC, etc.).')}
        {homeCard('vocabulary', '📚', 'Vocabulary', 'Track words automatically collected from all exercises.')}
        {homeCard('ai-settings', '🤖', 'AI Settings', 'Configure Claude AI for advanced learning features.')}
        {homeCard('progress', '📊', 'Progress', 'View your learning progress and achievements.')}
      </div>
    </div>
  )

  const renderNavigation = () => (
    <nav style={{ backgroundColor: '#007bff', color: 'white', padding: '12px 20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ margin: 0, cursor: 'pointer', fontSize: '18px' }} onClick={() => setCurrentExercise('home')}>
          English Learning App
        </h2>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {navBtn('grammar', 'Grammar')}
          {navBtn('reading', 'Reading')}
          {navBtn('writing', 'Writing')}
          {navBtn('dictation', 'Dictation')}
          {navBtn('pronunciation', 'Pronunciation', () => { setCurrentExercise('pronunciation'); setPronunciationKey(k => k + 1) })}
          {navBtn('minimal-pairs', 'Ear Training')}
          {navBtn('speaking', 'Speaking', () => { setCurrentExercise('speaking'); setSpeakingKey(k => k + 1) })}
          {navBtn('conversation', 'Conversation')}
          {navBtn('free-talk', 'Free Talk')}
          {navBtn('morphology', 'Word Parts')}
          {navBtn('essay', 'Essay')}
          {navBtn('flashcard', 'Flashcards')}
          {navBtn('word-packs', 'Packs')}
          {navBtn('vocabulary', 'Vocabulary')}
          {navBtn('ai-settings', 'AI')}
          {navBtn('progress', 'Progress')}
        </div>
      </div>
    </nav>
  )

  return (
    <div>
      {currentExercise !== 'home' && renderNavigation()}
      {currentExercise === 'home' && renderHome()}

      {currentExercise === 'grammar' && (
        <div className="container">
          <GrammarExercise onComplete={(score) => { addGrammarScore(score); updateStreak() }} />
        </div>
      )}

      {currentExercise === 'reading' && (
        <div className="container">
          <ReadingExercise onComplete={(score) => { addReadingScore(score); updateStreak() }} />
        </div>
      )}

      {currentExercise === 'writing' && (
        <div className="container">
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ marginBottom: '16px' }}>✍️ Writing Exercises</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
              <div>
                <SentenceBuilder onComplete={(score) => { addWritingScore(score); updateStreak() }} />
              </div>
              <div>
                <GapFillExercise onComplete={(score) => { addWritingScore(score); updateStreak() }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {currentExercise === 'dictation' && (
        <div className="container">
          <DictationExercise onComplete={(score) => { addDictationScore(score); updateStreak() }} />
        </div>
      )}

      {currentExercise === 'pronunciation' && (
        <div className="container">
          <PronunciationPractice
            targetText={currentPronunciationText}
            onComplete={(score, transcript) => {
              addPronunciationScore(score)
              updateStreak()
              recordPronunciation(currentPronunciationText, transcript, score)
            }}
          />
        </div>
      )}

      {currentExercise === 'minimal-pairs' && (
        <div className="container">
          <MinimalPairDrill onComplete={(score) => { addListeningScore(score); updateStreak() }} />
        </div>
      )}

      {currentExercise === 'speaking' && (
        <div className="container">
          <SpeakingExercise
            prompt={currentSpeakingPrompt}
            onComplete={(transcript, duration) => {
              addSpeakingSession(duration)
              updateStreak()
              recordSpeaking(currentSpeakingPrompt.prompt, transcript)
            }}
          />
        </div>
      )}

      {currentExercise === 'listening' && (
        <div className="container">
          <ListeningExercise
            audioSrc="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIcCT+z4O3AbywGZ+zg6I9EEwPo7uHcnkUKDOzq4d2hSQwI3ua/gzQICmu7xKZQEAwk"
            questions={listeningQuestions}
            title="Listening Comprehension Exercise"
            onComplete={(score, answers) => {
              addListeningScore(score)
              updateStreak()
              recordListening(listeningQuestions, answers, score)
            }}
          />
        </div>
      )}

      {currentExercise === 'conversation' && (
        <div className="container">
          <ConversationPractice
            onComplete={(messageCount, duration, messages, scenarioVocabulary) => {
              addSpeakingSession(duration)
              updateStreak()
              recordConversation(messages, scenarioVocabulary)
            }}
          />
        </div>
      )}

      {currentExercise === 'free-talk' && (
        <div className="container">
          <FreeTalkChat onComplete={(messageCount, duration) => {
            addSpeakingSession(duration)
            updateStreak()
          }} />
        </div>
      )}

      {currentExercise === 'morphology' && (
        <div className="container">
          <MorphologyExercise onComplete={(score) => { addMorphologyScore(score); updateStreak() }} />
        </div>
      )}

      {currentExercise === 'flashcard' && (
        <div className="container">
          <FlashcardReview onComplete={({ correct, reviewed }) => {
            if (reviewed > 0) {
              addFlashcardScore(Math.round((correct / reviewed) * 100))
              updateStreak()
            }
          }} />
        </div>
      )}

      {currentExercise === 'word-packs' && (
        <div className="container">
          <WordPackManager />
        </div>
      )}

      {currentExercise === 'essay' && (
        <div className="container">
          <EssayWriting onComplete={(score) => { addEssayScore(score); updateStreak() }} />
        </div>
      )}

      {currentExercise === 'ai-settings' && (
        <div className="container">
          <AISettings />
        </div>
      )}

      {currentExercise === 'vocabulary' && <VocabularyManager />}
      {currentExercise === 'progress' && <ProgressDashboard />}
    </div>
  )
}

export default App
