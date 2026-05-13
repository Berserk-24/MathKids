import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getModule, getActivity } from '../data/modules'
import { useMathQuestion }         from '../hooks/useMathQuestion'
import FeedbackOverlay             from '../components/FeedbackOverlay'
import ScoreBar                    from '../components/ScoreBar'

// Mapa de colores por módulo
const moduleColors = {
  sumas: '#FF6B35',
  restas: '#FF6B35',
  multiplicacion: '#7C5CBF',
  division: '#FFD93D',
  problemas: '#0EA5E9',
  fracciones: '#22C55E',
}

// Figuras decorativas por módulo
const getShapes = (moduleId) => {
  const baseShapes = [
    { top: '10%', left: '15%',  size: 'text-8xl', delay: -10 },
    { top: '20%', right: '15%', size: 'text-7xl', delay: 0.5 },
    { bottom: '25%', left: '18%', size: 'text-7xl', delay: 1 },
    { top: '60%', right: '14%', size: 'text-8xl', delay: 0.3 },
    { top: '40%', left: '12%', size: 'text-6xl', delay: 0.8 },
    { bottom: '12%', right: '18%', size: 'text-7xl', delay: 0.2 },
  ]

  switch (moduleId) {
    case 'sumas':
      return baseShapes.map(s => ({ ...s, emoji: ['➕', '1', '2', '3', '+'][Math.floor(Math.random() * 5)] }))
    case 'restas':
      return baseShapes.map(s => ({ ...s, emoji: ['➖', '4', '5', '6', '-'][Math.floor(Math.random() * 5)] }))
    case 'multiplicacion':
      return baseShapes.map(s => ({ ...s, emoji: ['✖️', '×', '7', '8', '9'][Math.floor(Math.random() * 5)] }))
    case 'division':
      return baseShapes.map(s => ({ ...s, emoji: ['➗', '÷', '10', '2', '5'][Math.floor(Math.random() * 5)] }))
    case 'problemas':
      return baseShapes.map(s => ({ ...s, emoji: ['🔢', '📚', '🧠', '💡', '?'][Math.floor(Math.random() * 5)] }))
    case 'fracciones':
      return baseShapes.map(s => ({ ...s, emoji: ['🔷', '△', '⬜', '1/2', '🍕'][Math.floor(Math.random() * 5)] }))
    default:
      return baseShapes.map(s => ({ ...s, emoji: '⭐' }))
  }
}

// ─── Actividad: Respuesta Directa ────────────────────────────────────────────
function DirectAnswerActivity({ question, onAnswer, moduleId }) {
  const [input, setInput] = useState('')

  const submit = () => {
    if (input === '') return
    onAnswer(Number(input) === question.answer)
    setInput('')
  }

  // Estilos especiales solo para el módulo de problemas
  const isProblemas = moduleId === 'problemas'
  const preguntaClass = isProblemas
    ? 'font-display text-2xl md:text-3xl text-ink tracking-tight font-bold'
    : 'font-display text-4xl md:text-5xl text-ink tracking-tight font-bold'
  const cardClass = isProblemas
    ? 'card text-center py-12 px-8 w-full max-w-2xl'
    : 'card text-center py-10 px-16 w-full max-w-sm'

  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-[60vh]">
      {/* Pregunta */}
      <motion.div
        key={question.question}
        className={cardClass}
        style={{ borderColor: moduleColors[moduleId], borderWidth: '2px' }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <p className={preguntaClass}>
          {question.question} <span style={{ color: moduleColors[moduleId] }}>=</span> ?
        </p>
      </motion.div>

      {/* Input y botón - Vertical */}
      <div className="flex flex-col gap-6 items-center w-full max-w-xs">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="?"
          className="
            w-full h-24 text-center font-display text-6xl text-ink
            border-2 rounded-3xl bg-white
            focus:outline-none transition-all duration-200
          "
          style={{
            borderColor: moduleColors[moduleId],
            borderWidth: '3px'
          }}
          autoFocus
        />
        <motion.button
          className="w-full h-20 font-display text-4xl rounded-3xl border-3 font-bold"
          style={{
            borderColor: moduleColors[moduleId],
            backgroundColor: moduleColors[moduleId],
            color: 'white'
          }}
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
function MultipleChoiceActivity({ question, onAnswer, moduleId }) {
  const [selected, setSelected] = useState(null)

  const choose = (choice) => {
    if (selected !== null) return
    setSelected(choice)
    setTimeout(() => {
      onAnswer(choice === question.answer)
      setSelected(null)
    }, 600)
  }

  // Estilos especiales para problemas y fracciones
  const isProblemas = moduleId === 'problemas'
  const isFracciones = moduleId === 'fracciones'
  const preguntaClass = (isProblemas || isFracciones)
    ? 'font-display text-xl md:text-2xl text-ink tracking-tight whitespace-pre-line'
    : 'font-display text-7xl text-ink tracking-tight'
  const cardClass = (isProblemas || isFracciones)
    ? 'card text-center py-12 px-8 w-full max-w-2xl'
    : 'card text-center py-10 px-16 w-full max-w-sm'
  const gridClass = (isProblemas || isFracciones)
    ? 'grid grid-cols-2 gap-3 w-full max-w-xl'
    : 'grid grid-cols-2 gap-3 w-full max-w-sm'

  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-[60vh]">
      <motion.div
        key={question.question}
        className={cardClass}
        style={{ borderColor: moduleColors[moduleId], borderWidth: '2px' }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <p className={preguntaClass}>
          {question.question} <span style={{ color: moduleColors[moduleId] }}>=</span> ?
        </p>
      </motion.div>

      <div className={gridClass}>
        {question.choices.map((choice) => {
          const isCorrect  = choice === question.answer
          const isSelected = choice === selected
          
          let borderColor = moduleColors[moduleId]
          let bgColor = 'white'
          let textColor = 'ink'
          let hoverBorder = moduleColors[moduleId]

          if (isSelected) {
            bgColor = isCorrect ? moduleColors[moduleId] : moduleColors[moduleId] + '20'
            textColor = isCorrect ? 'white' : moduleColors[moduleId]
            borderColor = moduleColors[moduleId]
          }

          return (
            <motion.button
              key={choice}
              className={`font-display text-3xl py-5 rounded-3xl border-2 transition-all duration-200`}
              style={{
                borderColor: borderColor,
                backgroundColor: bgColor,
                color: isSelected && !isCorrect ? moduleColors[moduleId] : (isSelected ? textColor : 'black')
              }}
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

// ─── Pantalla de resultados estándar ─────────────────────────────────────────
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

// ─── Resultados del modo Rapidez ─────────────────────────────────────────────
function SpeedResults({ score, total, duration, onRetry, onBack }) {
  const pct      = total > 0 ? Math.round((score / total) * 100) : 0
  const grade    = pct >= 80 ? '🏆' : pct >= 50 ? '⭐' : '📚'
  const perMin   = duration === '30s' ? score * 2 : null

  return (
    <motion.div
      className="flex flex-col items-center gap-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <span className="text-7xl">{grade}</span>
      <h2 className="font-display text-4xl text-ink">¡Tiempo! ⏱️</h2>

      <div className="card py-6 px-10 w-full max-w-sm">
        <p className="font-body text-ink/50 mb-1">Correctas en {duration}</p>
        <p className="font-display text-6xl text-teal">
          {score}
          <span className="text-2xl text-ink/30">/{total}</span>
        </p>
        <p className="font-body text-lg text-ink/60 mt-1">{pct}% de precisión</p>
        {perMin && (
          <p className="font-body text-sm text-ink/40 mt-2">≈ {perMin} correctas por minuto</p>
        )}
      </div>

      <div className="flex gap-3">
        <button className="btn-secondary" onClick={onRetry}>Repetir 🔄</button>
        <button className="btn-ghost"     onClick={onBack}>Módulos</button>
      </div>
    </motion.div>
  )
}

// ─── Actividad: Rapidez ──────────────────────────────────────────────────────
const TIME_LABELS = { 30: '30s', 60: '1m', 120: '2m', 180: '3m', 300: '5m' }

function SpeedActivity({ moduleId, totalSeconds, dificultad }) {
  const navigate              = useNavigate()
  const { question, next }    = useMathQuestion(moduleId, dificultad)
  const [score,  setScore]    = useState(0)
  const [total,  setTotal]    = useState(0)
  const [timeLeft, setTimeLeft] = useState(totalSeconds)
  const [done,   setDone]     = useState(false)
  const [feedback, setFeedback] = useState(null)
  const intervalRef           = useRef(null)

  // Temporizador
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current)
          setDone(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [])

  // Limpiar feedback rápido y pasar a siguiente pregunta
  useEffect(() => {
    if (!feedback) return
    const t = setTimeout(() => {
      setFeedback(null)
      next()
    }, 400)
    return () => clearTimeout(t)
  }, [feedback])

  const handleAnswer = useCallback((isCorrect) => {
    setTotal((t) => t + 1)
    if (isCorrect) setScore((s) => s + 1)
    setFeedback(isCorrect ? 'correct' : 'incorrect')
  }, [])

  // Formato mm:ss
  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const timeDisplay = mins > 0
    ? `${mins}:${String(secs).padStart(2, '0')}`
    : `${secs}s`

  // Color del temporizador según urgencia
  const timerColor = timeLeft <= 10
    ? 'text-coral'
    : timeLeft <= 30
    ? 'text-sun-dark'
    : 'text-teal'

  // Porcentaje para la barra del timer
  const timerPct = (timeLeft / totalSeconds) * 100

  if (done) return (
    <SpeedResults
      score={score}
      total={total}
      duration={TIME_LABELS[totalSeconds] ?? `${totalSeconds}s`}
      onRetry={() => navigate(0)}
      onBack={() => navigate('/modules')}
    />
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Barra de tiempo */}
      <div className="card py-3 px-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-body text-sm text-ink/40">Tiempo restante</span>
          <motion.span
            key={timeLeft}
            className={`font-display text-3xl ${timerColor}`}
            animate={timeLeft <= 10 ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {timeDisplay}
          </motion.span>
        </div>
        <div className="w-full h-3 bg-cream-dark rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full transition-colors duration-1000 ${
              timeLeft <= 10 ? 'bg-coral' : timeLeft <= 30 ? 'bg-sun' : 'bg-teal'
            }`}
            animate={{ width: `${timerPct}%` }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Marcador rápido */}
      <div className="flex gap-3">
        <div className="card flex-1 text-center py-2">
          <div className="font-display text-2xl text-teal">{score}</div>
          <div className="font-body text-xs text-ink/40">correctas</div>
        </div>
        <div className="card flex-1 text-center py-2">
          <div className="font-display text-2xl text-ink">{total}</div>
          <div className="font-body text-xs text-ink/40">respondidas</div>
        </div>
        <div className="card flex-1 text-center py-2">
          <div className="font-display text-2xl text-coral">{total - score}</div>
          <div className="font-body text-xs text-ink/40">incorrectas</div>
        </div>
      </div>

      {/* Pregunta — siempre selección múltiple en modo rapidez */}
      <MultipleChoiceActivity
        question={question}
        onAnswer={handleAnswer}
        moduleId={moduleId}
        disabled={!!feedback}
      />

      <FeedbackOverlay type={feedback} visible={!!feedback} />
    </div>
  )
}

// ─── Activity (orquestador) ───────────────────────────────────────────────────
const TOTAL_QUESTIONS = 10

export default function Activity() {
  const { moduleId, activityId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  // Detectar modo rapidez por la ruta
  const isSpeed = location.pathname.includes('/speed')
  const totalSeconds = isSpeed ? Number(searchParams.get('t') ?? 60) : null

  const mod      = getModule(moduleId)
  const activity = !isSpeed ? getActivity(moduleId, activityId) : null

  // Leer dificultad de la query string (usar siempre el query param)
  const dificultad = parseInt(searchParams.get('dificultad')) || 1

  const { question, next } = useMathQuestion(moduleId, dificultad)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [feedback, setFeedback] = useState(null)  // 'correct' | 'incorrect' | null
  const [streak, setStreak] = useState(0)
  const [done, setDone] = useState(false)

  // Limpiar feedback después de un momento (solo estándar)
  useEffect(() => {
    if (!feedback || isSpeed) return
    const t = setTimeout(() => {
      setFeedback(null)
      if (answered < TOTAL_QUESTIONS) next()
      else setDone(true)
    }, 2000)
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

  if (!mod || (!activity && !isSpeed)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-display text-2xl text-coral">Módulo no encontrado 😕</p>
      </div>
    )
  }

  const shapes = getShapes(moduleId)

  return (
    <div className="relative min-h-screen bg-blue-100 overflow-hidden">
      {/* Fondo decorativo con gradiente suave */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal/10 rounded-full translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-200/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Emojis flotantes */}
      {shapes.map((s, i) => (
        <motion.span
          key={i}
          className={`absolute ${s.size} select-none pointer-events-none opacity-30`}
          style={{ top: s.top, left: s.left, right: s.right, bottom: s.bottom }}
          animate={{opacity: [0.5, 1, 0.5], y: [0, -15, 0] }}
          transition={{ duration: 3, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {s.emoji}
        </motion.span>
      ))}

      {/* Header */}
      <header className="relative z-10 sticky top-0 bg-[#EDE9FE]/90 backdrop-blur-sm border-b-2 border-[#C4B5FD]">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate('/modules')}
            className="text-3xl hover:scale-110 transition-transform"
            aria-label="Volver a módulos"
          >
            ⬅
          </button>
          <span className="text-2xl">{mod.emoji}</span>
          <h1 className="font-display text-2xl text-ink">{activity ? activity.title : mod.title + ' · ⚡ Rapidez'}</h1>
          {!isSpeed && (
            <span className="ml-auto font-body text-sm text-ink/40">
              {answered}/{TOTAL_QUESTIONS}
            </span>
          )}
        </div>
      </header>

      <main className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* Modo Rapidez */}
        {isSpeed && (
          <SpeedActivity moduleId={moduleId} totalSeconds={totalSeconds} dificultad={dificultad} />
        )}

        {/* Modo Estándar */}
        {!isSpeed && (
          done ? (
            <ResultsScreen
              score={score}
              total={TOTAL_QUESTIONS}
              onRetry={handleRetry}
              onBack={() => navigate('/modules')}
            />
          ) : (
            <>
              <ScoreBar score={score} total={answered} streak={streak} moduleId={mod.id} />

              {/* Actividad según tipo */}
              {activity.type === 'direct-answer' && (
                <DirectAnswerActivity question={question} onAnswer={handleAnswer} moduleId={mod.id} />
              )}
              {activity.type === 'multiple-choice' && (
                <MultipleChoiceActivity question={question} onAnswer={handleAnswer} moduleId={mod.id} />
              )}

              {/* Feedback */}
              <FeedbackOverlay type={feedback} visible={!!feedback} />
            </>
          )
        )}
      </main>

      {/* Nubes decorativas en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0">
        <div className="flex justify-around items-end pb-8">
          <motion.span
            className="text-[144px] opacity-130"
            animate={{ x: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            ☁️
          </motion.span>
          <motion.span
            className="text-[256px] opacity-125"
            animate={{ x: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            ☁️
          </motion.span>
          <motion.span
            className="text-[192px] opacity-135"
            animate={{ x: [0, 28, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            ☁️
          </motion.span>
        </div>
      </div>
    </div>
  )
}
