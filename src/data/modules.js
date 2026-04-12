// ─── Catálogo de módulos y actividades ───────────────────────────────────────
// Aquí se define TODA la estructura de contenido de MathKids.
// Agregar un nuevo módulo o actividad = añadir un objeto a este archivo.

import { title } from "framer-motion/client"

export const MODULES = [
  {
    id: 'sumas',
    title: 'Sumas',
    emoji: '➕',
    description: 'Aprende a sumar números poco a poco.',
    color: 'coral',
    bgClass: 'bg-coral',
    shadowClass: 'shadow-[0_4px_0_#E05A28]',
    borderClass: 'border-coral',
    activities: [
      {
        id: 'suma-basica',
        title: 'Suma básica',
        type: 'direct-answer',   // tipos: 'direct-answer' | 'multiple-choice' | 'drag-drop' | 'speed'
        difficulty: 1,
      },
    ],
  },
  {
    id: 'restas',
    title: 'Restas',
    emoji: '➖',
    description: 'Practica las restas con ejemplos divertidos.',
    color: 'teal',
    bgClass: 'bg-teal',
    shadowClass: 'shadow-[0_4px_0_#00A88C]',
    borderClass: 'border-teal',
    activities: [
      {
        id: 'resta-basica',
        title: 'Resta básica',
        type: 'direct-answer',
        difficulty: 1,
      },
    ],
  },
  {
    id: 'multiplicacion',
    title: 'Multiplicación',
    emoji: '✖️',
    description: 'Las tablas de multiplicar de forma divertida.',
    color: 'violet',
    bgClass: 'bg-violet',
    shadowClass: 'shadow-[0_4px_0_#634AA3]',
    borderClass: 'border-violet',
    activities: [
      {
        id: 'tablas',
        title: 'Tablas de multiplicar',
        type: 'multiple-choice',
        difficulty: 2,
      },
    ],
  },
  {
    id: 'Division',
    title: 'Divisiones',
    emoji: '🍕',
    description: 'Entiende las Divisiones con visualizaciones.',
    color: 'sun',
    bgClass: 'bg-sun',
    shadowClass: 'shadow-[0_4px_0_#F0C730]',
    borderClass: 'border-sun',
    activities: [
      {
        id: 'identificacion',
        title: '¿Qué division es?',
        type: 'multiple-choice',
        difficulty: 2,
      },
    ],
  },
  {
  id: 'Problemas',
    title: 'Problemas Matematicos',
    emoji: '🍕',
    description: 'Entiende las Matematicas con Problemas mas Elaborados.',
    color: 'sun',
    bgClass: 'bg-sun',
    shadowClass: 'shadow-[0_4px_0_#F0C730]',
    borderClass: 'border-sun',
    activities: [
      {
        id: 'identificacion',
        title: '¿Como resolver problemas matematicos?',
        type: 'multiple-choice',
        difficulty: 2,
      },
    ],  
  },
]

// Devuelve un módulo por su id
export const getModule = (moduleId) =>
  MODULES.find((m) => m.id === moduleId) ?? null

// Devuelve una actividad dentro de un módulo
export const getActivity = (moduleId, activityId) => {
  const mod = getModule(moduleId)
  return mod?.activities.find((a) => a.id === activityId) ?? null
}
