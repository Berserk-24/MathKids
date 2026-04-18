import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Home      from './pages/Home'
import Modules   from './pages/Modules'
import Activity  from './pages/Activity'
import NotFound  from './pages/NotFound'
import menuTheme from './assets/menu-modulesTheme.mp3'

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
      <MusicPlayer />
      <Routes>
        {/* Pantalla de bienvenida */}
        <Route path="/"                         element={<Home />} />

        {/* Selector de módulos */}
        <Route path="/modules"                  element={<Modules />} />

        {/* Actividad dinámica: /activity/:moduleId/:activityId */}
        <Route path="/activity/:moduleId/:activityId" element={<Activity />} />

        {/* 404 */}
        <Route path="*"                         element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
