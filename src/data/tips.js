// ─── Videos de tip por módulo ─────────────────────────────────────────────
// Para cambiar un video, reemplaza el valor de `videoId` con el ID de YouTube.
// El ID es la parte después de ?v= en la URL. Ejemplo:
// https://www.youtube.com/watch?v=dQw4w9WgXcQ → videoId: 'dQw4w9WgXcQ'

export const TIPS = {
  sumas: {
    videoId: '4y-4Tctgq6Y',
    title:   'Cómo sumar fácil',
  },
  restas: {
    videoId: '4y-4Tctgq6Y',
    title:   'Cómo restar fácil',
  },
  multiplicacion: {
    videoId: '4y-4Tctgq6Y',
    title:   'Las tablas de multiplicar',
  },
    division: {
    videoId: '4y-4Tctgq6Y',
    title:   'Cómo dividir fácil',
  },
  fracciones: {
    videoId: '4y-4Tctgq6Y',
    title:   'Qué son las fracciones',
  },
}

export const getTip = (moduleId) => TIPS[moduleId] ?? null