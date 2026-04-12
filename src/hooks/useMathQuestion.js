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
  Division: () => {
    const b = rand(1, 10)       
    const answer = rand(1, 10)  
    const a = b * answer        
    return { question: `${a} ÷ ${b}`, answer, a, b, op: '÷' }
  },
Problemas: () => {
  const nombres = ['Juan', 'María', 'Luis', 'Ana', 'Carlos', 'Sofía']
  const objetos = ['manzanas', 'dulces', 'galletas', 'lápices', 'pelotas', 'libros']

  const nombre = nombres[rand(0, nombres.length - 1)]
  const objeto = objetos[rand(0, objetos.length - 1)]

  const tipos = ['suma', 'resta', 'multiplicacion', 'division']
  const tipo = tipos[rand(0, tipos.length - 1)]

  let a, b, answer, question

  switch (tipo) {
    case 'suma': {
      a = rand(1, 20)
      b = rand(1, 20)
      answer = a + b

      const plantillas = [
        `${nombre} tiene ${a} ${objeto} y consigue ${b} más. ¿Cuántos tiene ahora?`,
        `En una caja hay ${a} ${objeto} y agregan ${b} más. ¿Cuántos hay en total?`,
        `${nombre} encontró ${a} ${objeto} y luego encontró ${b} más. ¿Cuántos encontró en total?`
      ]

      question = plantillas[rand(0, plantillas.length - 1)]
      break
    }

    case 'resta': {
      a = rand(10, 20)
      b = rand(1, a)
      answer = a - b

      const plantillas = [
        `${nombre} tenía ${a} ${objeto} y perdió ${b}. ¿Cuántos le quedan?`,
        `Había ${a} ${objeto} y se usaron ${b}. ¿Cuántos quedan?`,
        `${nombre} tenía ${a} ${objeto} y regaló ${b}. ¿Cuántos tiene ahora?`
      ]

      question = plantillas[rand(0, plantillas.length - 1)]
      break
    }

    case 'multiplicacion': {
      a = rand(1, 10)
      b = rand(1, 10)
      answer = a * b

      const plantillas = [
        `Hay ${a} cajas con ${b} ${objeto} cada una. ¿Cuántos hay en total?`,
        `${nombre} tiene ${a} bolsas con ${b} ${objeto} en cada una. ¿Cuántos tiene en total?`,
        `En ${a} filas hay ${b} ${objeto} en cada una. ¿Cuántos hay en total?`
      ]

      question = plantillas[rand(0, plantillas.length - 1)]
      break
    }

    case 'division': {
      b = rand(1, 10)
      answer = rand(1, 10)
      a = b * answer

      const plantillas = [
        `${nombre} tiene ${a} ${objeto} y los reparte en ${b} partes iguales. ¿Cuántos hay en cada parte?`,
        `Hay ${a} ${objeto} para repartir entre ${b} niños. ¿Cuántos recibe cada uno?`,
        `${a} ${objeto} se dividen en ${b} grupos iguales. ¿Cuántos hay en cada grupo?`
      ]

      question = plantillas[rand(0, plantillas.length - 1)]
      break
    }
  }

  return { question, answer, a, b, op: tipo }
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
