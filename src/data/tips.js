// ─── Videos de tip por módulo ─────────────────────────────────────────────
// Para cambiar un video, reemplaza el valor de `videoId` con el ID de YouTube.
// El ID es la parte después de ?v= en la URL. Ejemplo:
// https://www.youtube.com/watch?v=dQw4w9WgXcQ → videoId: 'dQw4w9WgXcQ'

export const TIPS = {
  sumas: {
    videoId: '6hd-gQod2QI',
    title:   'Descompón los números en partes más pequeñas para sumar de forma más fácil y entender mejor cada resultado. Aqui un video que te puede ecplicar esto de una manera sencilla.',
  },
  restas: {
    videoId: 'QkDl2jdoTXM',
    title:   'Aprende a restar paso a paso de una manera más clara y sencilla. Este método te ayudará a resolver operaciones con mayor facilidad y menos errores.',
  },
  multiplicacion: {
    videoId: 'MqDL4uLbFI8',
    title:   'Cuando multipliques números grandes usa el método de multiplicación por líneas, pero recuerda contar con cuidado los puntos donde se cruzan las líneas para obtener el resultado correcto.',
  },
    division: {
    videoId: 'yFjmoaakbxU',
    title:   'Para las divisiones te recomiendo el método ABN. Este metodo divide usando cantidades que conozcas fácilmente para avanzar paso a paso y entender mejor la operación. Aqui un video que te lo explica de manera sencilla.',
  },
  fracciones: {
    videoId: 'FUbla-rPt3M',
    title:   'Antes de sumar fracciones, asegúrate de que tengan el mismo denominador para que la operación sea mucho más sencilla. Cuando restes fracciones, trabaja primero con denominadores iguales para evitar confundirte en el resultado. En la multiplicación de fracciones, multiplica numerador con numerador y denominador con denominador sin cambiar los términos. Para dividir fracciones, invierte la segunda fracción y luego multiplica normalmente paso a paso.',
  },
}

export const getTip = (moduleId) => TIPS[moduleId] ?? null