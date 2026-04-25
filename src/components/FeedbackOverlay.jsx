import { motion, AnimatePresence } from 'framer-motion'

const FEEDBACK = {
  correct: {
    emoji: '⭐',
    messages: ['¡Correcto!', '¡Genial!', '¡Excelente!', '¡Muy bien!', '¡Eso es!'],
    bg: 'bg-yellow-400',
    text: 'text-white',
  },
  incorrect: {
    emoji: '🔄',
    messages: ['¡Casi!', 'Inténtalo de nuevo', 'No te rindas', '¡Sigue intentando!'],
    bg: 'bg-orange-200',
    text: 'text-orange-800',
  },
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export default function FeedbackOverlay({ type, visible }) {
  const f = FEEDBACK[type] ?? FEEDBACK.correct

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={type}
          className={`${f.bg} ${f.text} rounded-3xl px-6 py-4 text-center mt-4`}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <span className="text-4xl block mb-1">{f.emoji}</span>
          <p className="font-display text-2xl">{pick(f.messages)}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
