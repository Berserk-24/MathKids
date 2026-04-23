import { motion } from 'framer-motion'

const moduleColors = {
  sumas: '#FF6B35',
  restas: '#FF6B35',
  multiplicacion: '#7C5CBF',
  division: '#FFD93D',
  problemas: '#0EA5E9',
  fracciones: '#22C55E',
}

export default function ScoreBar({ score, total, streak, moduleId = 'sumas' }) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0
  const moduleColor = moduleColors[moduleId] || '#FF6B35'

  return (
    <div className="flex items-center gap-4 mb-6">
      {/* Puntuación */}
      <div className="card py-2 px-4 flex items-center gap-2 min-w-[100px]" style={{ borderColor: moduleColor, borderWidth: '2px' }}>
        <span className="text-2xl">⭐</span>
        <div>
          <div className="font-display text-xl leading-none" style={{ color: moduleColor }}>{score}</div>
          <div className="text-xs text-ink/40 font-body">puntos</div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="flex-1 card py-3 px-4" style={{ borderColor: moduleColor, borderWidth: '2px' }}>
        <div className="flex justify-between text-xs text-ink/40 font-body mb-1">
          <span>Progreso</span>
          <span>{pct}%</span>
        </div>
        <div className="w-full h-3 bg-cream-dark rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: moduleColor }}
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
          style={{ borderColor: moduleColor, borderWidth: '2px' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          key={streak}
        >
          <div className="text-xl">🔥</div>
          <div className="font-display text-lg leading-none" style={{ color: moduleColor }}>{streak}</div>
        </motion.div>
      )}
    </div>
  )
}
