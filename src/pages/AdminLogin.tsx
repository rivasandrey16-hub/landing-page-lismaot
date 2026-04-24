import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function AdminLogin() {
  const { session, signInWithOtp, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!loading && session) return <Navigate to="/admin" replace />

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitting(true)
    setError(null)
    try {
      await signInWithOtp(email.trim())
      setSent(true)
    } catch (err) {
      setError((err as Error).message ?? 'Error enviando el enlace')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#0D0D0D',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 400,
          width: '100%',
          backgroundColor: '#1A1A1A',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 24,
          padding: 32,
        }}
      >
        <div className="flex items-center gap-2.5 mb-6">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(232,119,34,0.15)' }}
          >
            <Lock size={18} style={{ color: '#E87722' }} />
          </div>
          <div>
            <h1
              style={{
                fontFamily: "'DM Serif Display', serif",
                color: '#F5F0E8',
                fontSize: 22,
                lineHeight: 1,
              }}
            >
              Panel Lismaot
            </h1>
            <p style={{ color: '#6A5E52', fontSize: 12, marginTop: 2 }}>
              Acceso solo para administradores
            </p>
          </div>
        </div>

        {sent ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <CheckCircle2 size={40} style={{ color: '#25D366' }} />
            <p style={{ color: '#F5F0E8', textAlign: 'center', fontSize: 15 }}>
              ¡Enlace enviado!
            </p>
            <p style={{ color: '#8A7E72', textAlign: 'center', fontSize: 13 }}>
              Revisa tu email <strong style={{ color: '#E87722' }}>{email}</strong> y haz clic en el
              enlace para entrar.
            </p>
            <button
              onClick={() => {
                setSent(false)
                setEmail('')
              }}
              style={{ color: '#E87722', fontSize: 13, marginTop: 8 }}
            >
              Enviar a otro email
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <label style={{ color: '#999080', fontSize: 13 }}>
              Email de administrador
              <div
                className="flex items-center gap-2 mt-1.5 px-3 py-3 rounded-xl"
                style={{ backgroundColor: '#0F0F0F', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <Mail size={16} style={{ color: '#6A5E52' }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    outline: 'none',
                    color: '#F5F0E8',
                    fontSize: 14,
                  }}
                />
              </div>
            </label>

            {error && (
              <p style={{ color: '#ff6b6b', fontSize: 12 }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold active:scale-[0.98] transition-transform"
              style={{
                backgroundColor: submitting ? '#4A3E34' : '#E87722',
                color: '#0D0D0D',
                fontSize: 15,
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? 'Enviando…' : 'Enviar enlace mágico'}
              {!submitting && <ArrowRight size={16} />}
            </button>

            <p style={{ color: '#4A3E34', fontSize: 11, textAlign: 'center' }}>
              Te enviaremos un enlace seguro para entrar sin contraseña.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
