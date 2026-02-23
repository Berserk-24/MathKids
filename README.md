# 🧮 MathKids – Aprende Jugando

Plataforma educativa interactiva de matemáticas para niños de 7 a 11 años.

## Stack

- **React 18 + Vite** – Framework principal
- **Tailwind CSS** – Estilos utilitarios
- **Framer Motion** – Animaciones y microinteracciones
- **React Router v6** – Navegación entre páginas
- **Howler.js** – Audio (por integrar)

---

## Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en modo desarrollo
npm run dev

# 3. Build de producción
npm run build
```

---

## Estructura del proyecto

```
src/
├── pages/
│   ├── Home.jsx          # Pantalla de bienvenida
│   ├── Modules.jsx       # Selector de módulos
│   ├── Activity.jsx      # Motor de actividades
│   └── NotFound.jsx      # 404
│
├── components/
│   ├── ModuleCard.jsx    # Tarjeta de módulo reutilizable
│   ├── FeedbackOverlay.jsx  # Feedback correcto/incorrecto
│   └── ScoreBar.jsx      # Barra de progreso y puntuación
│
├── data/
│   └── modules.js        # todo el contenido
│
├── hooks/
│   └── useMathQuestion.js  # Generador de preguntas matemáticas
│
├── App.jsx               # Rutas principales
└── main.jsx              # Entry point
```

---

## Cómo agregar contenido nuevo (propuesta)

### Nuevo módulo

En `src/data/modules.js`, agrega un objeto al array `MODULES`:

```js
{
  id: 'division',
  title: 'División',
  emoji: '÷',
  description: 'Aprende a dividir en partes iguales.',
  color: 'coral',
  // ...
  activities: [
    { id: 'division-basica', title: 'División básica', type: 'direct-answer', difficulty: 2 }
  ]
}
```

### Nuevo tipo de actividad

1. Agrega un generador en `src/hooks/useMathQuestion.js`
2. Crea el componente en `src/pages/Activity.jsx`
3. Conéctalo al orquestador con `activity.type === 'tu-tipo'`

---

## 🗺️ Roadmap

- [ ] Sonidos con Howler.js
- [ ] Modo cronómetro (desafío de rapidez)
- [ ] Drag & drop para fracciones
- [ ] Perfiles de usuario (Supabase)
- [ ] Modo multijugador en tiempo real (WebSockets)
- [ ] PWA (offline support)
