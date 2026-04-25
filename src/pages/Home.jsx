import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SoundButton from '../components/SoundButton'

// Formas decorativas de fondo
const SHAPES = [
  { emoji: '➕', top: '10%', left: '5%',  size: 'text-8xl', delay: -10 },
  { emoji: '✖️', top: '20%', right: '8%', size: 'text-7xl', delay: 0.5 },
  { emoji: '➖', bottom: '25%', left: '8%', size: 'text-7xl', delay: 1 },
  { emoji: '🔢', top: '60%', right: '6%', size: 'text-8xl', delay: 0.3 },
  { emoji: '🌟', top: '40%', left: '3%', size: 'text-6xl', delay: 0.8 },
  { emoji: '🎮', bottom: '12%', right: '10%', size: 'text-7xl', delay: 0.2 },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen bg-blue-100 overflow-hidden flex flex-col items-center justify-center px-4">

      {/* Fondo decorativo con gradiente suave */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-coral/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal/10 rounded-full translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-sun/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Emojis flotantes */}
      {SHAPES.map((s, i) => (
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

      {/* Contenido principal */}
      <motion.div
        className="relative z-10 text-center max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Logo / nombre */}
        <motion.div
          className="mb-2 text-7xl"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          🧮
        </motion.div>

        <h1 className="text-6xl md:text-7xl text-ink mb-2 leading-none">
          Math<span className="text-coral">Kids</span>
        </h1>

        <p className="text-2xl font-body font-700 text-ink/60 mb-10">
          ¡Aprende matemáticas jugando!
        </p>

        {/* Estadísticas rápidas (placeholder) */}
        <div className="flex justify-center gap-6 mb-10">
          {[
            { label: 'Módulos', value: '6' },
            { label: 'Actividades', value: '8+' },
            { label: 'Diversión', value: '∞' },
          ].map(({ label, value }) => (
            <div key={label} className="card py-3 px-5 text-center min-w-[80px]">
              <div className="font-display text-3xl text-coral">{value}</div>
              <div className="text-sm font-body font-600 text-ink/50">{label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <SoundButton
            className="btn-primary text-2xl px-12 py-4"
            onClick={() => navigate('/modules')}
          >
            ¡Empezar!
          </SoundButton>
        </motion.div>
      </motion.div>

      {/* Nubes decorativas en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0">
        <div className="flex justify-around items-end pb-8">
          <motion.span
            className="text-[144px] opacity-150"
            animate={{ x: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            ☁️
          </motion.span>
          <motion.span
            className="text-[256px] opacity-125"
            animate={{ x: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            ☁️
          </motion.span>
          <motion.span
            className="text-[92px] opacity-135"
            animate={{ x: [0, 28, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            ☁️
          </motion.span>
        </div>
      </div>
    </div>
  )
}
