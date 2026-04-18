import { motion } from 'framer-motion'

// colorMap traduce el string de color del módulo a clases Tailwind concretas
const colorMap = {
  coral:  {
    bg:     'bg-coral',
    text:   'text-coral',
    border: 'border-coral',
    shadow: 'hover:shadow-[0_6px_0_#E05A28]',
    badge:  'bg-coral/10 text-coral',
  },
  teal:   {
    bg:     'bg-teal',
    text:   'text-teal',
    border: 'border-teal',
    shadow: 'hover:shadow-[0_6px_0_#00A88C]',
    badge:  'bg-teal/10 text-teal',
  },
  violet: {
    bg:     'bg-violet',
    text:   'text-violet',
    border: 'border-violet',
    shadow: 'hover:shadow-[0_6px_0_#634AA3]',
    badge:  'bg-violet/10 text-violet',
  },
  sun:    {
    bg:     'bg-sun',
    text:   'text-sun-dark',
    border: 'border-sun',
    shadow: 'hover:shadow-[0_6px_0_#F0C730]',
    badge:  'bg-sun/20 text-sun-dark',
  },
}

export default function ModuleCard({ module, index }) {
  const c = colorMap[module.color] ?? colorMap.coral

  return (
    <motion.div
      className={`
        card w-full text-left cursor-pointer border-2 ${c.border}
        transition-all duration-200 ${c.shadow}
        hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-offset-2
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      aria-label={`Ir al módulo ${module.title}`}
    >
      {/* Icono del módulo */}
      <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center text-3xl mb-4 shadow-sm`}>
        {module.emoji}
      </div>

      {/* Título y descripción */}
      <h3 className={`font-display text-2xl ${c.text} mb-1`}>{module.title}</h3>
      <p className="text-sm font-body text-ink/60 mb-4 leading-relaxed">{module.description}</p>

      {/* Badge de actividades */}
      <span className={`inline-block text-xs font-body font-700 px-3 py-1 rounded-full ${c.badge}`}>
        {module.activities.length} actividad{module.activities.length !== 1 ? 'es' : ''}
      </span>
    </motion.div>
  )
}
