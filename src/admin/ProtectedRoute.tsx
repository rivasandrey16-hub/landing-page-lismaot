import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { ReactNode } from 'react'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: '#0D0D0D',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F5F0E8',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Verificando sesión…
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}
