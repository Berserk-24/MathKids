// ─── useMathQuestion ─────────────────────────────────────────────────────────
// Hook que genera preguntas matemáticas según el módulo activo.

import { useState, useCallback } from 'react'

// Número aleatorio entre min y max (inclusive)
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// Generadores por tipo de módulo
const GENERATORS = {

  sumas: (difficulty = 1) => {

    // Solo operaciones difíciles si difficulty === 2
    if (difficulty === 2) {
      
      const a = rand(1000, 9999)
      const b = rand(1000, 9999)
      return { question: `${a} + ${b}`, answer: a + b, a, b, op: '+' }
    }

    // Normal
    const a = rand(1, 99)
    const b = rand(1, 99)
    return { question: `${a} + ${b}`, answer: a + b, a, b, op: '+' }
  },
  restas: (difficulty = 1) => {

    if (difficulty === 2) {
      const a = rand(1000, 9999)
      const b = rand(1, a)
      return { question: `${a} − ${b}`, answer: a - b, a, b, op: '−' }
    }

    const a = rand(1, 99)
    const b = rand(1, a)
    return { question: `${a} − ${b}`, answer: a - b, a, b, op: '−' }
  },
  multiplicacion: (difficulty = 1) => {

    if (difficulty === 2) {
      const a = rand(100, 999)
      const b = rand(100, 999)
      return { question: `${a} × ${b}`, answer: a * b, a, b, op: '×' }
    }

    const a = rand(2, 20)
    const b = rand(2, 20)
    return { question: `${a} × ${b}`, answer: a * b, a, b, op: '×' }
  },

  division: (difficulty = 1) => {

    if (difficulty === 2) {
      const b = rand(22, 99)
      const answer = rand(22, 99)
      const a = b * answer
      return { question: `${a} ÷ ${b}`, answer, a, b, op: '÷' }
    }

    const b = rand(2, 9)
    const answer = rand(2, 9)
    const a = b * answer
    return { question: `${a} ÷ ${b}`, answer, a, b, op: '÷' }
  },

  problemas: (difficulty = 1) => {

    const nombres = ['Juan', 'María', 'Luis', 'Ana', 'Carlos', 'Sofía']
    const objetos = ['manzanas', 'dulces', 'galletas', 'lápices', 'pelotas', 'libros']

    const nombre = nombres[rand(0, nombres.length - 1)]
    const objeto = objetos[rand(0, objetos.length - 1)]

    const tipos = ['suma', 'resta', 'multiplicacion', 'division']
    const tipo = tipos[rand(0, tipos.length - 1)]

    let a, b, answer, question

    // Ajustar rangos según dificultad
    const ranges = [
      { min: 1, max: 10 },
      { min: 10, max: 50 },
      { min: 50, max: 200 }
    ]
    const { min, max } = ranges[difficulty - 1] || ranges[0]
    switch (tipo) {
      case 'suma': {
        a = rand(min, max)
        b = rand(min, max)
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
        a = rand(min, max)
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
        a = rand(min, max)
        b = rand(min, max)
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
        b = rand(min, max)
        answer = rand(min, max)
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
fracciones: (difficulty = 1) => {

  let denominadores, numRange

  if (difficulty === 1) {
    denominadores = [2, 3, 4, 5]
    numRange = [1, 5]
  } else if (difficulty === 2) {
    denominadores = [6, 7, 8, 9, 10, 11, 12]
    numRange = [3, 20]
  }

  const randDen = () => denominadores[rand(0, denominadores.length - 1)]

  const randNum = (den) =>
    rand(Math.max(1, numRange[0]), Math.min(den - 1, numRange[1]))

  // Todas las operaciones con la misma probabilidad
  const tipos = difficulty === 2
    ? [
        'suma_mismo',
        'suma_diferente',
        'resta_mismo',
        'resta_diferente',
        'multiplicacion',
        'division'
      ]
    : [
        'suma_mismo',
        'resta_mismo',
        'multiplicacion',
        'division'
      ]

  const tipo = tipos[rand(0, tipos.length - 1)]

  let n1, d1, n2, d2
  let resN, resD

  // MCD para simplificar
  const mcd = (a, b) => (b === 0 ? a : mcd(b, a % b))

  const simplificar = (n, d) => {
    const div = mcd(n, d)
    return [n / div, d / div]
  }

  switch (tipo) {

    // ======================
    // SUMA MISMO DENOMINADOR
    // ======================
    case 'suma_mismo':
      d1 = randDen()
      d2 = d1

      n1 = randNum(d1)
      n2 = randNum(d2)

      resN = n1 + n2
      resD = d1
      break

    // ==========================
    // SUMA DISTINTO DENOMINADOR
    // ==========================
    case 'suma_diferente':
      d1 = randDen()

      do {
        d2 = randDen()
      } while (d1 === d2)

      n1 = randNum(d1)
      n2 = randNum(d2)

      resN = (n1 * d2) + (n2 * d1)
      resD = d1 * d2
      break

    // =======================
    // RESTA MISMO DENOMINADOR
    // =======================
    case 'resta_mismo':
      d1 = randDen()
      d2 = d1

      n1 = randNum(d1)
      n2 = rand(1, n1)

      resN = n1 - n2
      resD = d1
      break

    // =========================
    // RESTA DISTINTO DENOMINADOR
    // =========================
    case 'resta_diferente':
      d1 = randDen()

      do {
        d2 = randDen()
      } while (d1 === d2)

      n1 = randNum(d1)
      n2 = randNum(d2)

      // Evitar negativos
      while ((n1 * d2) < (n2 * d1)) {
        n1 = randNum(d1)
        n2 = randNum(d2)
      }

      resN = (n1 * d2) - (n2 * d1)
      resD = d1 * d2
      break

    // ======================
    // MULTIPLICACIÓN
    // ======================
    case 'multiplicacion':
      d1 = randDen()
      d2 = randDen()

      n1 = randNum(d1)
      n2 = randNum(d2)

      resN = n1 * n2
      resD = d1 * d2
      break

    // ======================
    // DIVISIÓN
    // ======================
    case 'division':
      d1 = randDen()
      d2 = randDen()

      n1 = randNum(d1)
      n2 = randNum(d2)

      resN = n1 * d2
      resD = d1 * n2
      break
  }

  // Simplificar resultado
  ;[resN, resD] = simplificar(resN, resD)

  // Formato limpio de respuesta
  const formatFraction = (n, d) => {
    if (n === 0) return '0'
    if (d === 1) return `${n}`
    return `${n}/${d}`
  }

  const answer = formatFraction(resN, resD)

  const op =
    tipo.includes('suma')
      ? 'suma'
      : tipo.includes('resta')
      ? 'resta'
      : tipo

  const opChar =
    op === 'suma'
      ? '+'
      : op === 'resta'
      ? '−'
      : op === 'multiplicacion'
      ? '×'
      : '÷'

  const question = `${n1}/${d1} ${opChar} ${n2}/${d2}`

  // Opciones falsas prolijas
  const choices = new Set([answer])

  while (choices.size < 4) {

    let fakeN = resN + rand(-2, 2)
    let fakeD = resD + rand(-2, 2)

    if (fakeN <= 0 || fakeD <= 0) continue

    ;[fakeN, fakeD] = simplificar(fakeN, fakeD)

    choices.add(formatFraction(fakeN, fakeD))
  }

  return {
    question,
    answer,
    choices: [...choices].sort(() => Math.random() - 0.5),
    op
  }
},
}
