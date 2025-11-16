// @ts-nocheck
import React from 'react'
import logoImg from '../chat-ai/logo-removebg-preview.png'

interface PoliceContactsProps {
  onBack?: () => void
}

const EMERGENCY_NUMBER = '301-405-3333'
const NON_EMERGENCY_NUMBER = '301-405-3555'

const CallCard: React.FC<{ label: string; number: string }> = ({ label, number }) => {
  const handleCall = () => {
    window.location.href = `tel:${number.replace(/[^0-9]/g, '')}`
  }

  return (
    <div className="w-full rounded-2xl bg-[#cfe6ff]/80 text-[#0f2c61] shadow-lg transition-shadow">
      <button
        onClick={handleCall}
        className="w-full flex items-center justify-between px-5 py-4 rounded-2xl focus:outline-none min-h-[96px]"
        aria-label={`Call ${label} at ${number}`}
      >
        <div className="text-left">
          <div className="text-2xl font-extrabold tracking-wide">{label}</div>
          <div className="text-sm font-semibold opacity-90">({number})</div>
        </div>
        <div
          className="flex-none h-14 w-14 rounded-full bg-white grid place-items-center text-[#0f2c61]
                     shadow-lg ring-2 ring-[#0f2c61]/25
                     active:scale-95 transition-transform duration-150
                     focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0f2c61]/35"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 16.92V21a1 1 0 0 1-1.1 1 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 3 3.1 1 1 0 0 1 4 2h4.09a1 1 0 0 1 1 .75l1 3.49a1 1 0 0 1-.27 1L8.91 9.91a16 16 0 0 0 6 6l2.67-1.9a1 1 0 0 1 1-.06l3.49 1a1 1 0 0 1 .65.97z" />
          </svg>
        </div>
      </button>
    </div>
  )
}

const PoliceContacts: React.FC<PoliceContactsProps> = ({ onBack }) => {
  const handleBack = () => {
    if (typeof onBack === 'function') {
      onBack()
      return
    }
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.assign('/')
    }
  }
  return (
    <main className="min-h-screen w-full bg-[#07132c] text-white flex flex-col">
      <header className="sticky top-0 z-10 px-5 pt-5 pb-1 bg-[#07132c] relative">
        <div className="absolute right-5 top-5 flex items-center gap-3">
          <img src={logoImg} alt="LiteLine logo" className="h-11 w-11 object-contain" />
          <span className="text-white font-extrabold text-3xl tracking-wide">LiteLine</span>
        </div>

        <div className="flex">
          <button
            onClick={handleBack}
            className="h-12 w-12 rounded-full bg-white/15 text-white grid place-items-center shadow-inner ring-1 ring-white/20 hover:bg-white/20 transition-colors"
            aria-label="Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="14 18 8 12 14 6"></polyline>
            </svg>
          </button>
        </div>
        <h1 className="mt-4 text-4xl font-extrabold tracking-wide">UMPD</h1>
      </header>

      <section className="flex-1 px-5 space-y-6 mt-6">
        {/* Disclaimer first */}
        <div className="rounded-2xl bg-white/15 border border-white/15 text-white px-6 py-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-extrabold">Disclaimer</h2>
            <span className="text-white/90">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 4a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 12 6zm1.25 12h-2.5v-8h2.5z" />
              </svg>
            </span>
          </div>
          <p className="text-[18px] md:text-[19px] leading-relaxed text-white/90">
            This feature provides quick access to campus police contact information. If you are in immediate danger,
            call emergency services right away. We cannot guarantee response times or user safety.
          </p>
        </div>

        <hr className="border-white/20" />

        {/* Contacts after disclaimer */}
        <CallCard label="Emergency" number={EMERGENCY_NUMBER} />
        <CallCard label="Request Walking Safety Escort" number={NON_EMERGENCY_NUMBER} />
      </section>
    </main>
  )
}

export default PoliceContacts


