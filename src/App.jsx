import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home      from './pages/Home'
import Modules   from './pages/Modules'
import Activity  from './pages/Activity'
import NotFound  from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
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
