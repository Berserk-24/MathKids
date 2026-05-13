import { motion, AnimatePresence } from 'framer-motion'

const FEEDBACK = {
  correct: {
    emoji: '⭐',
    title: '¡BIEN HECHO!',
    subtitle: '¡Sigue así!',
    bg: 'from-yellow-300 via-orange-300 to-yellow-400',
    text: 'text-black-600',
    stars: true,
  },

  incorrect: {
    emoji: '😢',
    title: '¡INTÉNTALO DE NUEVO!',
    subtitle: 'Tú puedes lograrlo',
    bg: 'from-orange-200 via-yellow-100 to-orange-300',
    text: 'text-yellow-700',
    stars: false,
  },
}

export default function FeedbackOverlay({ type, visible }) {
  const f = FEEDBACK[type] ?? FEEDBACK.correct

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={type}
          className={`
            fixed inset-0 z-50
            flex flex-col items-center justify-center
            bg-gradient-to-br ${f.bg}
          `}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Estrellas decorativas */}
          {f.stars && (
            <>
              <motion.div
                className="absolute top-20 left-20 text-7xl"
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                ⭐
              </motion.div>

              <motion.div
                className="absolute top-24 right-20 text-7xl"
                animate={{ rotate: [10, -10, 10] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                ⭐
              </motion.div>

              <motion.div
                className="absolute bottom-24 left-32 text-6xl"
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ⭐
              </motion.div>

              <motion.div
                className="absolute bottom-24 right-32 text-6xl"
                animate={{ y: [5, -5, 5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ⭐
              </motion.div>
            </>
          )}

          {/* Emoji */}
          <motion.div
            className="text-9xl mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 12,
            }}
          >
            {f.emoji}
          </motion.div>

          {/* Texto principal */}
          <motion.h1
            className={`
              ${f.text}
              text-6xl md:text-7xl
              font-black
              text-center
              drop-shadow-lg
            `}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {f.title}
          </motion.h1>

          {/* Subtexto */}
          <motion.p
            className="text-2xl md:text-3xl mt-4 font-bold text-center text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {f.subtitle}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}