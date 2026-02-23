// ─── useMathQuestion ─────────────────────────────────────────────────────────
// Hook que genera preguntas matemáticas según el módulo activo.
// Fácilmente extensible para nuevos tipos de operaciones.

import { useState, useCallback } from 'react'

// Número aleatorio entre min y max (inclusive)
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// Generadores por tipo de módulo
const GENERATORS = {
  sumas: () => {
    const a = rand(1, 20)
    const b = rand(1, 20)
    return { question: `${a} + ${b}`, answer: a + b, a, b, op: '+' }
  },
  restas: () => {
    const a = rand(5, 20)
    const b = rand(1, a)
    return { question: `${a} − ${b}`, answer: a - b, a, b, op: '−' }
  },
  multiplicacion: () => {
    const a = rand(1, 10)
    const b = rand(1, 10)
    return { question: `${a} × ${b}`, answer: a * b, a, b, op: '×' }
  },
  fracciones: () => {
    const denominators = [2, 3, 4, 5, 8]
    const den = denominators[rand(0, denominators.length - 1)]
    const num = rand(1, den - 1)
    return { question: `${num}/${den}`, answer: num, a: num, b: den, op: '/' }
  },
}

// Genera opciones de selección múltiple alrededor de la respuesta correcta
const generateChoices = (correct, count = 4) => {
  const choices = new Set([correct])
  while (choices.size < count) {
    const offset = rand(-5, 5)
    const candidate = correct + offset
    if (candidate > 0 && candidate !== correct) choices.add(candidate)
  }
  return [...choices].sort(() => Math.random() - 0.5)
}

export function useMathQuestion(moduleId) {
  const generate = useCallback(() => {
    const gen = GENERATORS[moduleId] ?? GENERATORS.sumas
    const q = gen()
    q.choices = generateChoices(q.answer)
    return q
  }, [moduleId])

  const [question, setQuestion] = useState(generate)

  const next = useCallback(() => setQuestion(generate()), [generate])

  return { question, next }
}
