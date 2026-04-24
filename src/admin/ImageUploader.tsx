import { useState } from 'react'
import { Upload, Loader2, ImageIcon } from 'lucide-react'
import { uploadImage } from '../lib/menuService'

interface Props {
  value: string
  categoryId: string
  onChange: (url: string) => void
}

export default function ImageUploader({ value, categoryId, onChange }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Máx 5 MB')
      return
    }
    setUploading(true)
    setError(null)
    try {
      const url = await uploadImage(file, categoryId || 'misc')
      onChange(url)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label
        className="relative flex items-center justify-center rounded-xl cursor-pointer overflow-hidden"
        style={{
          aspectRatio: '4/3',
          backgroundColor: '#0F0F0F',
          border: '1px dashed rgba(255,255,255,0.1)',
        }}
      >
        {value ? (
          <img
            src={value}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2" style={{ color: '#4A3E34' }}>
            <ImageIcon size={28} />
            <span className="text-xs">Sin imagen</span>
          </div>
        )}

        {uploading && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
          >
            <Loader2 size={24} className="animate-spin" style={{ color: '#E87722' }} />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploading}
          onChange={e => {
            const f = e.target.files?.[0]
            if (f) handleFile(f)
            e.target.value = ''
          }}
        />
      </label>

      <label
        className="flex items-center justify-center gap-2 py-2.5 rounded-xl cursor-pointer font-semibold text-sm"
        style={{ backgroundColor: '#1A1A1A', color: '#E87722' }}
      >
        <Upload size={14} />
        {value ? 'Cambiar imagen' : 'Subir imagen'}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploading}
          onChange={e => {
            const f = e.target.files?.[0]
            if (f) handleFile(f)
            e.target.value = ''
          }}
        />
      </label>

      {error && <p style={{ color: '#ff6b6b', fontSize: 12 }}>{error}</p>}
    </div>
  )
}
