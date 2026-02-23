import { motion } from 'framer-motion'

export default function ScoreBar({ score, total, streak }) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0

  return (
    <div className="flex items-center gap-4 mb-6">
      {/* Puntuación */}
      <div className="card py-2 px-4 flex items-center gap-2 min-w-[100px]">
        <span className="text-2xl">⭐</span>
        <div>
          <div className="font-display text-xl text-coral leading-none">{score}</div>
          <div className="text-xs text-ink/40 font-body">puntos</div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="flex-1 card py-3 px-4">
        <div className="flex justify-between text-xs text-ink/40 font-body mb-1">
          <span>Progreso</span>
          <span>{pct}%</span>
        </div>
        <div className="w-full h-3 bg-cream-dark rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-teal rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Racha */}
      {streak > 1 && (
        <motion.div
          className="card py-2 px-3 text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          key={streak}
        >
          <div className="text-xl">🔥</div>
          <div className="font-display text-lg text-coral leading-none">{streak}</div>
        </motion.div>
      )}
    </div>
  )
}
