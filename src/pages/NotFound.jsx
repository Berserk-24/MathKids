import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6 text-center px-4">
      <motion.span
        className="text-8xl"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        🔍
      </motion.span>
      <h1 className="font-display text-5xl text-ink">¡Página no encontrada!</h1>
      <p className="font-body text-ink/50 text-lg">Este lugar no existe... todavía.</p>
      <button className="btn-primary" onClick={() => navigate('/')}>
        Volver al inicio
      </button>
    </div>
  )
}
