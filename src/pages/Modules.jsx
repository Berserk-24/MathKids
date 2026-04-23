import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MODULES } from '../data/modules';
import ModuleCard from '../components/ModuleCard';
import SoundButton from '../components/SoundButton';

// Formas decorativas de fondo
const SHAPES = [
  { emoji: '🔢', top: '10%', left: '15%',  size: 'text-8xl', delay: -10 },
  { emoji: '➕', top: '20%', right: '15%', size: 'text-7xl', delay: 0.5 },
  { emoji: '➖', bottom: '25%', left: '18%', size: 'text-7xl', delay: 1 },
  { emoji: '✖️', top: '60%', right: '14%', size: 'text-8xl', delay: 0.3 },
  { emoji: '⭐', top: '40%', left: '12%', size: 'text-6xl', delay: 0.8 },
  { emoji: '🔷', bottom: '12%', right: '18%', size: 'text-7xl', delay: 0.2 },
]

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
    <div className="relative min-h-screen bg-blue-100 overflow-hidden">
      {/* Fondo decorativo con gradiente suave */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal/10 rounded-full translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-200/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
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

      {/* Header */}
      <header className="relative z-10 sticky top-0 bg-[#EDE9FE]/90 backdrop-blur-sm border-b-2 border-[#C4B5FD]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="text-3xl text-[#4C1D95] hover:text-[#4338CA] transition-colors duration-200"
            aria-label="Volver al inicio"
          >
            ←
          </button>
          <div className="flex items-center gap-3">
            <h1 className="font-caveat text-4xl sm:text-6xl text-[#4C1D95] font-extrabold tracking-tight">
              Elige un módulo
            </h1>
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-3xl bg-[#E9D5FF] text-[#4C1D95] text-3xl shadow-sm border-2 border-[#C4B5FD]">
              📘
            </span>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <motion.p
          className="font-caveat text-xl sm:text-4xl mb-8 text-[#4C1D95] font-semibold drop-shadow-md animate-bounce"
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

      {/* Nubes decorativas en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0">
        <div className="flex justify-around items-end pb-8">
          <motion.span
            className="text-[144px] opacity-30"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            ☁️
          </motion.span>
          <motion.span
            className="text-[256px] opacity-25"
            animate={{ x: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            ☁️
          </motion.span>
          <motion.span
            className="text-[192px] opacity-35"
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            ☁️
          </motion.span>
        </div>
      </div>
    </div>
  )
}

