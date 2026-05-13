import { useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getModule, MODULES } from '../data/modules'

const TIME_OPTIONS = [
  { label: '30s', value: 30,  emoji: '⚡' },
  { label: '1m',  value: 60,  emoji: '👶' },
  { label: '2m',  value: 120, emoji: '👱' },
  { label: '3m',  value: 180, emoji: '👌' },
  { label: '5m',  value: 300, emoji: '💪' },
]

const colorMap = {
  coral:  { bg: 'bg-coral',  shadow: 'shadow-[0_4px_0_#E05A28]', text: 'text-coral',  border: 'border-coral'  },
  teal:   { bg: 'bg-teal',   shadow: 'shadow-[0_4px_0_#00A88C]', text: 'text-teal',   border: 'border-teal'   },
  violet: { bg: 'bg-violet', shadow: 'shadow-[0_4px_0_#634AA3]', text: 'text-violet', border: 'border-violet' },
  sun:    { bg: 'bg-sun',    shadow: 'shadow-[0_4px_0_#F0C730]', text: 'text-ink',    border: 'border-sun'    },
}


export default function ActivitySelector() {
  const { moduleId } = useParams();
  const navigate     = useNavigate();
  const location     = useLocation();
  const mod          = getModule(moduleId);

  // Leer dificultad del query param
  const searchParams = new URLSearchParams(location.search);
  const dificultad   = searchParams.get('dificultad') || 1;

  const [selectedTime, setSelectedTime] = useState(null);
  const [showSpeed,    setShowSpeed]    = useState(false);

  if (!mod) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="font-display text-2xl text-coral">Módulo no encontrado 😕</p>
    </div>
  )

  const c = colorMap[mod.color] ?? colorMap.coral


  // Buscar la primera actividad estándar (que no sea tipo 'speed')
  const firstStandardActivity = mod?.activities.find(a => a.type !== 'speed');

  const handleStandard = () => {
    if (firstStandardActivity) {
      navigate(`/activity/${moduleId}/${firstStandardActivity.id}?dificultad=${dificultad}`);
    }
  }

  const handleSpeed = () => {
    if (!selectedTime) return;
    navigate(`/activity/${moduleId}/speed?t=${selectedTime}&dificultad=${dificultad}`);
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-cream/80 backdrop-blur-sm border-b-2 border-cream-dark">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate('/modules')}
            className="text-2xl hover:scale-110 transition-transform"
          >
            ←
          </button>
          <span className="text-2xl">{mod.emoji}</span>
          <h1 className="font-display text-2xl text-ink">{mod.title}</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-5">
        <motion.p
          className="font-body text-ink/50 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ¿Cómo quieres practicar?
        </motion.p>

        {/* Card — Modo Estándar */}
        <motion.button
          className="card w-full text-left border-2 border-cream-dark hover:border-teal hover:-translate-y-1 transition-all duration-200"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={handleStandard}
        >
          <div className="w-12 h-12 rounded-2xl bg-teal flex items-center justify-center text-2xl mb-3">
            📚
          </div>
          <h2 className="font-display text-2xl text-teal mb-1">Modo Estándar</h2>
          <p className="font-body text-sm text-ink/50">
            10 preguntas a tu ritmo. Sin límite de tiempo.
          </p>
        </motion.button>

        {/* Card — Modo Rapidez */}
        <motion.div
          className={`card border-2 transition-all duration-200 ${
            showSpeed ? `${c.border}` : 'border-cream-dark'
          }`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Header de la card — clickeable para expandir */}
          <button
            className="w-full text-left"
            onClick={() => setShowSpeed(!showSpeed)}
          >
            <div className={`w-12 h-12 rounded-2xl ${c.bg} flex items-center justify-center text-2xl mb-3`}>
              ⚡
            </div>
            <h2 className={`font-display text-2xl ${c.text} mb-1`}>Modo Rapidez</h2>
            <p className="font-body text-sm text-ink/50">
              Responde la mayor cantidad posible antes de que se acabe el tiempo.
            </p>
          </button>

          {/* Chips de tiempo — aparecen al expandir */}
          <AnimatePresence>
            {showSpeed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-5 border-t border-cream-dark mt-4">
                  <p className="font-body text-sm text-ink/40 mb-3">Elige el tiempo:</p>

                  {/* Chips */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {TIME_OPTIONS.map((opt) => {
                      const isSelected = selectedTime === opt.value
                      return (
                        <motion.button
                          key={opt.value}
                          className={`
                            font-display text-lg px-4 py-2 rounded-2xl border-2 transition-all duration-150
                            ${isSelected
                              ? `${c.bg} text-white ${c.shadow} border-transparent`
                              : 'bg-white border-cream-dark text-ink hover:border-coral'}
                          `}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedTime(opt.value)}
                        >
                          {opt.emoji} {opt.label}
                        </motion.button>
                      )
                    })}
                  </div>

                  {/* Botón de arranque */}
                  <motion.button
                    className={`
                      w-full btn-primary text-xl py-3 transition-opacity duration-200
                      ${!selectedTime ? 'opacity-40 cursor-not-allowed' : ''}
                    `}
                    whileTap={selectedTime ? { scale: 0.97 } : {}}
                    onClick={handleSpeed}
                  >
                    {selectedTime
                      ? `¡Arrancar ${TIME_OPTIONS.find(o => o.value === selectedTime)?.label}! 🚀`
                      : 'Elige un tiempo primero'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  )
}