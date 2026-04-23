import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MODULES } from '../data/modules';
import ModuleCard from '../components/ModuleCard';
import SoundButton from '../components/SoundButton';

export default function Modules() {
  const navigate = useNavigate()
  // dificultadPorModulo: { [modId]: dificultad }
  const [dificultadPorModulo, setDificultadPorModulo] = useState({})

  const handleSelectModule = (mod) => {
    const dificultad = dificultadPorModulo[mod.id] || 1
    const firstActivity = mod.activities[0]
    if (firstActivity) {
      navigate(`/activity/${mod.id}/${firstActivity.id}?dificultad=${dificultad}`)
    }
  }

  // Toggle dificultad para un módulo
  const toggleDificultad = (modId) => {
    setDificultadPorModulo(prev => ({
      ...prev,
      [modId]: prev[modId] === 2 ? 1 : 2
    }))
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
          <h1 className="font-caveat text-4xl sm:text-6xl text-ink drop-shadow-lg font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
            Elige un módulo 📚
          </h1>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.p
          className="font-caveat text-xl sm:text-4xl mb-8 text-pink-600 font-semibold drop-shadow-md animate-bounce"
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
              style={{cursor: 'pointer', display: 'block' }}
              onClick={() => handleSelectModule(mod)}
            >
              <ModuleCard
                module={mod}
                index={i}
                dificultad={dificultadPorModulo[mod.id] || 1}
                toggleDificultad={() => toggleDificultad(mod.id)}
              />
            </SoundButton>
          ))}
        </div>
      </main>
    </div>
  )
}

