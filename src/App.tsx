import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useClickSound } from './hooks/useClickSound'
import LandingPage from './pages/LandingPage'
import './index.css'

// Lazy-load admin bundle so public visitors never download it
const AdminLogin    = lazy(() => import('./pages/AdminLogin'))
const AdminPanel    = lazy(() => import('./pages/AdminPanel'))
const ProtectedRoute = lazy(() => import('./admin/ProtectedRoute'))

export default function App() {
  /* ── global click sound ── */
  const { playChord } = useClickSound()
  useEffect(() => {
    document.addEventListener('click', playChord, { passive: true })
    return () => document.removeEventListener('click', playChord)
  }, [playChord])

  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ backgroundColor: '#0D0D0D', minHeight: '100vh' }} />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
