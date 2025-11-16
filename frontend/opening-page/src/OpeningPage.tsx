import React, { useEffect } from 'react'
import logo from '../logo-removebg-preview.png'
import poleImg from '../pole.png'

interface OpeningPageProps {
  onContinue: () => void
  leftImageSrc?: string
}

const OpeningPage: React.FC<OpeningPageProps> = ({ onContinue, leftImageSrc }) => {
  // Automatically advance to the map after a brief loading glow
  useEffect(() => {
    const t = setTimeout(() => {
      onContinue()
    }, 4000)
    return () => clearTimeout(t)
  }, [onContinue])

  return (
    <main
      className="relative min-h-screen w-full bg-[#08142F] text-white font-sans flex flex-col justify-between px-4 py-10 md:px-8 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-y-0 left-6 flex">
        <img
          src={leftImageSrc || poleImg}
          alt=""
          className="h-full w-24 rounded-t-3xl object-contain filter contrast-125"
          style={{ animation: 'slideUpReveal 2.2s ease-out forwards' }}
          draggable={false}
        />
      </div>

      <section className="flex flex-1 flex-col justify-center pl-32 md:pl-40">
        <div className="flex flex-col items-center text-center gap-8">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-white">LiteLine</h1>

          <div className="flex items-center justify-center">
            <div
              className="relative h-48 w-48 md:h-56 md:w-56 rounded-full border-[6px] border-[#53c0ff] bg-[#031025] flex items-center justify-center"
              style={{ animation: 'outerRingGlow 1.8s ease-in-out infinite' }}
            >
              <div
                className="h-36 w-36 md:h-40 md:w-40 rounded-full border-[3px] border-[#53c0ff] flex items-center justify-center overflow-hidden"
                style={{ animation: 'innerRingGlow 1.8s ease-in-out infinite' }}
              >
                <img src={logo} alt="LiteLine logo" className="h-full w-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full pl-32 md:pl-40 pr-6">
        <div className="flex justify-center">
          <p className="text-xl md:text-2xl font-semibold text-white">Follow the light</p>
        </div>
      </footer>

      {/* Local keyframes for glow and left figure slide-up */}
      <style>{`
        @keyframes slideUpReveal {
          0% { transform: translateY(25%); opacity: 0.0; }
          60% { opacity: 1; }
          100% { transform: translateY(0%); opacity: 1; }
        }
        @keyframes outerRingGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(83,192,255,0.0); }
          50% { box-shadow: 0 0 28px 6px rgba(83,192,255,0.75); }
        }
        @keyframes innerRingGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(83,192,255,0.0); }
          50% { box-shadow: 0 0 16px 3px rgba(83,192,255,0.6); }
        }
      `}</style>
    </main>
  )
}

export default OpeningPage


