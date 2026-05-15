import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Home      from './pages/Home'
import Modules   from './pages/Modules'
import Activity  from './pages/Activity'
import ActivitySelector from './pages/ActivitySelector'
import NotFound  from './pages/NotFound'
import menuTheme from './assets/menu-modulesTheme.mp3'

// Componente para enviar pageview a Google Analytics en cada cambio de ruta
function GoogleAnalytics() {
  const location = useLocation();
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-EZZWE9568F', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
  return null;
}

function MusicPlayer() {
  const location = useLocation();
  const audioRef = useRef(null);

  useEffect(() => {
    const shouldPlay = location.pathname === '/' || location.pathname === '/modules';
    const audio = audioRef.current;
    if (audio) {
      if (shouldPlay) {
        audio.volume = 0.5;
        audio.play().catch(() => {});
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
    }
  }, [location]);

  return <audio ref={audioRef} src={menuTheme} loop />;
}

export default function App() {
  return (
    <BrowserRouter>
      <GoogleAnalytics />
      <MusicPlayer />
      <Routes>
        {/* Pantalla de bienvenida */}
        <Route path="/"                         element={<Home />} />

        {/* Selector de módulos */}
        <Route path="/modules"                  element={<Modules />} />

         {/* Selector de modo: estándar o rapidez */}
        <Route path="/activity/:moduleId"            element={<ActivitySelector />} />

        {/* Actividad estándar */}
        <Route path="/activity/:moduleId/standard"   element={<Activity />} />

        {/* Actividad de rapidez — el tiempo viene como query param ?t=30 */}
        <Route path="/activity/:moduleId/speed"      element={<Activity />} />

        {/* Actividad dinámica: /activity/:moduleId/:activityId */}
        <Route path="/activity/:moduleId/:activityId" element={<Activity />} />

        {/* 404 */}
        <Route path="*"                         element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
