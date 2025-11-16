import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'
import '../../chat-ai/src/index.css'

const GoogleMapsLoader: React.FC = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if ((window as any).google && (window as any).google.maps) {
      setLoaded(true)
      return
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      console.warn('VITE_GOOGLE_MAPS_API_KEY is not set')
      setLoaded(true)
      return
    }

    const existing = document.querySelector<HTMLScriptElement>('#google-maps-script')
    if (existing) {
      existing.addEventListener('load', () => setLoaded(true), { once: true })
      return
    }

    const script = document.createElement('script')
    script.id = 'google-maps-script'
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,directions`
    script.async = true
    script.defer = true
    script.onload = () => setLoaded(true)
    document.head.appendChild(script)
  }, [])

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020b25] text-slate-100">
        <p className="text-sm">Loading map…</p>
      </div>
    )
  }

  return <App />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="safe-area">
      <GoogleMapsLoader />
    </div>
  </React.StrictMode>,
)

