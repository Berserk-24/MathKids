import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getModule, getActivity } from '../data/modules'
import { useMathQuestion }         from '../hooks/useMathQuestion'
import FeedbackOverlay             from '../components/FeedbackOverlay'
import ScoreBar                    from '../components/ScoreBar'

// ─── Actividad: Respuesta Directa ────────────────────────────────────────────
function DirectAnswerActivity({ question, onAnswer }) {
  const [input, setInput] = useState('')

  const submit = () => {
    if (input === '') return
    onAnswer(Number(input) === question.answer)
    setInput('')
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Pregunta */}
      <motion.div
        key={question.question}
        className="card text-center py-10 px-16 w-full max-w-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <p className="font-display text-7xl text-ink tracking-tight">
          {question.question} <span className="text-coral">=</span> ?
        </p>
      </motion.div>

      {/* Input numérico */}
      <div className="flex gap-3 items-center">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="?"
          className="
            w-28 h-16 text-center font-display text-4xl text-ink
            border-2 border-cream-dark rounded-2xl bg-white
            focus:outline-none focus:border-coral transition-colors
          "
          autoFocus
        />
        <motion.button
          className="btn-primary"
          whileTap={{ scale: 0.95 }}
          onClick={submit}
        >
          ✓
        </motion.button>
      </div>

      <p className="text-sm text-ink/40 font-body">Escribe el resultado y presiona Enter</p>
    </div>
  )
}

// ─── Actividad: Selección Múltiple ───────────────────────────────────────────
function MultipleChoiceActivity({ question, onAnswer }) {
  const [selected, setSelected] = useState(null)

  const choose = (choice) => {
    if (selected !== null) return
    setSelected(choice)
    setTimeout(() => {
      onAnswer(choice === question.answer)
      setSelected(null)
    }, 600)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        key={question.question}
        className="card text-center py-10 px-16 w-full max-w-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <p className="font-display text-7xl text-ink tracking-tight">
          {question.question} <span className="text-coral">=</span> ?
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {question.choices.map((choice) => {
          const isCorrect  = choice === question.answer
          const isSelected = choice === selected
          let style = 'border-cream-dark bg-white text-ink hover:border-coral hover:text-coral'

          if (isSelected) {
            style = isCorrect
              ? 'border-teal bg-teal text-white'
              : 'border-coral bg-coral/10 text-coral'
          }

          return (
            <motion.button
              key={choice}
              className={`font-display text-3xl py-5 rounded-3xl border-2 transition-all duration-200 ${style}`}
              whileHover={{ scale: selected === null ? 1.03 : 1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => choose(choice)}
            >
              {choice}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Pantalla de resultados ───────────────────────────────────────────────────
function ResultsScreen({ score, total, onRetry, onBack }) {
  const pct = Math.round((score / total) * 100)
  const grade = pct >= 80 ? '🏆' : pct >= 50 ? '⭐' : '📚'

  return (
    <motion.div
      className="flex flex-col items-center gap-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <span className="text-7xl">{grade}</span>
      <h2 className="font-display text-4xl text-ink">¡Terminaste!</h2>
      <div className="card py-6 px-10">
        <p className="font-body text-ink/50 mb-1">Tu resultado</p>
        <p className="font-display text-6xl text-coral">{score}<span className="text-2xl text-ink/30">/{total}</span></p>
        <p className="font-body text-lg text-ink/60 mt-1">{pct}% correcto</p>
      </div>
      <div className="flex gap-3">
        <button className="btn-secondary" onClick={onRetry}>Intentar de nuevo 🔄</button>
        <button className="btn-ghost"     onClick={onBack}>Módulos</button>
      </div>
    </motion.div>
  )
}

// ─── Activity (orquestador) ───────────────────────────────────────────────────
const TOTAL_QUESTIONS = 10

export default function Activity() {
  const { moduleId, activityId } = useParams()
  const navigate = useNavigate()

  const mod      = getModule(moduleId)
  const activity = getActivity(moduleId, activityId)

  const { question, next }            = useMathQuestion(moduleId)
  const [score, setScore]             = useState(0)
  const [answered, setAnswered]       = useState(0)
  const [feedback, setFeedback]       = useState(null)  // 'correct' | 'incorrect' | null
  const [streak, setStreak]           = useState(0)
  const [done, setDone]               = useState(false)

  // Limpiar feedback después de un momento
  useEffect(() => {
    if (!feedback) return
    const t = setTimeout(() => {
      setFeedback(null)
      if (answered < TOTAL_QUESTIONS) next()
      else setDone(true)
    }, 900)
    return () => clearTimeout(t)
  }, [feedback])

  const handleAnswer = (isCorrect) => {
    const newAnswered = answered + 1
    setAnswered(newAnswered)

    if (isCorrect) {
      setScore((s) => s + 1)
      setStreak((s) => s + 1)
      setFeedback('correct')
    } else {
      setStreak(0)
      setFeedback('incorrect')
    }

    if (newAnswered >= TOTAL_QUESTIONS) {
      setTimeout(() => setDone(true), 1000)
    }
  }

  const handleRetry = () => {
    setScore(0)
    setAnswered(0)
    setFeedback(null)
    setStreak(0)
    setDone(false)
    next()
  }

  if (!mod || !activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-display text-2xl text-coral">Módulo no encontrado 😕</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-cream/80 backdrop-blur-sm border-b-2 border-cream-dark">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate('/modules')}
            className="text-2xl hover:scale-110 transition-transform"
          >
            ←
          </button>
          <span className="text-2xl">{mod.emoji}</span>
          <h1 className="font-display text-2xl text-ink">{activity.title}</h1>
          <span className="ml-auto font-body text-sm text-ink/40">
            {answered}/{TOTAL_QUESTIONS}
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {done ? (
          <ResultsScreen
            score={score}
            total={TOTAL_QUESTIONS}
            onRetry={handleRetry}
            onBack={() => navigate('/modules')}
          />
        ) : (
          <>
            <ScoreBar score={score} total={answered} streak={streak} />

            {/* Actividad según tipo */}
            {activity.type === 'direct-answer' && (
              <DirectAnswerActivity question={question} onAnswer={handleAnswer} />
            )}
            {activity.type === 'multiple-choice' && (
              <MultipleChoiceActivity question={question} onAnswer={handleAnswer} />
            )}

            {/* Feedback */}
            <FeedbackOverlay type={feedback} visible={!!feedback} />
          </>
        )}
      </main>
    </div>
  )
}
