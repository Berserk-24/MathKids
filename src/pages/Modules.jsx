import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MODULES } from '../data/modules'
import ModuleCard from '../components/ModuleCard'
import SoundButton from '../components/SoundButton'

export default function Modules() {
  const navigate = useNavigate()

  const handleSelectModule = (mod) => {
    // Por ahora, navegar a la primera actividad del módulo
    const firstActivity = mod.activities[0]
    if (firstActivity) {
      navigate(`/activity/${mod.id}/${firstActivity.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-cream/80 backdrop-blur-sm border-b-2 border-cream-dark">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="text-2xl hover:scale-110 transition-transform"
            aria-label="Volver al inicio"
          >
            ←
          </button>
          <h1 className="font-display text-3xl text-ink">
            Elige un módulo 📚
          </h1>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.p
          className="font-body text-ink/50 text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          ¿Qué quieres practicar hoy?
        </motion.p>

        {/* Grid de módulos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {MODULES.map((mod, i) => (
            <SoundButton
              key={mod.id}
              className="text-left"
              style={{ all: 'unset', cursor: 'pointer', display: 'block' }}
              onClick={() => handleSelectModule(mod)}
            >
              <ModuleCard
                module={mod}
                index={i}
              />
            </SoundButton>
          ))}
        </div>
      </main>
    </div>
  )
}
