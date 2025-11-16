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
<<<<<<< HEAD
    <div className="w-full rounded-3xl bg-white/5 p-1 shadow-[0_18px_45px_rgba(0,0,0,0.6)]">
=======
    <div className="w-full rounded-2xl bg-[#cfe0f5] text-[#0f172a] shadow-lg">
>>>>>>> emily
      <button
        onClick={handleCall}
        className="w-full rounded-2xl bg-gradient-to-r from-[#53c0ff] to-[#1f6d94] text-white px-6 py-5 text-left shadow-lg shadow-slate-900/60 focus:outline-none active:scale-[0.98] transition transform hover:brightness-110"
        aria-label={`Call ${label} at ${number}`}
      >
<<<<<<< HEAD
        <div className="flex flex-col space-y-2">
          <div className="text-2xl md:text-3xl font-extrabold tracking-wide">{label}</div>
          <div className="text-base md:text-lg font-semibold text-white/90">{number}</div>
=======
        <div className="text-left">
          <div className="text-2xl font-extrabold tracking-wide">{label}</div>
          <div className="text-sm font-semibold opacity-90">({number})</div>
        </div>
        <div
          className="flex-none h-14 w-14 rounded-full bg-white grid place-items-center text-[#0f172a]
                     shadow-lg ring-2 ring-[#0f172a]/15
                     active:scale-95 transition-transform duration-150
                     focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0f172a]/25"
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
            <path d="M15.2 16.1c.7.2 1.3.5 1.9.9.4.3.5.9.3 1.3l-.5.9c-.3.6-1 .9-1.7.8-2.6-.2-5.4-1.6-7.8-4.1S3 10.6 2.8 8c-.1-.7.2-1.4.8-1.7l.9-.5c.4-.2 1 0 1.3.3.4.6.7 1.2.9 1.9.1.3 0 .7-.2.9l-1.1 1.1c.7 1.5 1.8 2.9 3.1 4.2 1.3 1.3 2.7 2.4 4.2 3.1l1.1-1.1c.2-.2.6-.3.9-.2z" />
          </svg>
>>>>>>> emily
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
<<<<<<< HEAD
      <header className="sticky top-0 z-10 px-5 pt-9 pb-5 bg-[#07132c]">
        <div className="flex items-center justify-between gap-6">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-full border border-[#53c0ff]/40 bg-[#132a6b]/90 px-4 py-2 text-sm font-semibold text-[#e2f3ff] shadow-lg shadow-slate-900 hover:bg-[#132a6b] hover:border-[#53c0ff]/70 transition-colors"
=======
      <header className="sticky top-0 z-10 px-5 pt-5 pb-3 bg-[#07132c]">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 text-white px-4 py-2 shadow-inner ring-1 ring-white/20 hover:bg-white/20 transition-colors"
>>>>>>> emily
            aria-label="Back to map"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="14 18 8 12 14 6"></polyline>
            </svg>
<<<<<<< HEAD
            <span>Back to map</span>
=======
            <span className="text-sm font-semibold hidden xs:inline">Back</span>
>>>>>>> emily
          </button>

          <div className="flex items-center gap-3">
            <img src={logoImg} alt="LiteLine logo" className="h-11 w-11 object-contain" />
<<<<<<< HEAD
            <span className="text-white font-extrabold text-3xl tracking-wide">LiteLine</span>
          </div>
        </div>

        <h1 className="mt-8 text-5xl font-extrabold tracking-wide">UMPD</h1>
      </header>

      <section className="flex-1 px-5 space-y-10 mt-8">
        {/* Disclaimer first */}
=======
            <span className="text-white font-extrabold text-4xl md:text-5xl tracking-wide">LiteLine</span>
          </div>
        </div>
        <h1 className="mt-6 text-6xl md:text-7xl font-extrabold tracking-wide">UMPD</h1>
      </header>

      <section className="flex-1 px-5 space-y-16 mt-10">
        {/* Contacts first */}
        <CallCard label="Emergency" number={EMERGENCY_NUMBER} />
        <CallCard label="Request Walking Safety Escort" number={NON_EMERGENCY_NUMBER} />

        <hr className="border-white/20" />

        {/* Disclaimer below contacts */}
>>>>>>> emily
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
<<<<<<< HEAD

        <hr className="border-white/20" />

        {/* Contacts after disclaimer */}
        <div>
          <CallCard label="Emergency" number={EMERGENCY_NUMBER} />
          <div className="h-8" />
          <CallCard label="Request Walking Safety Escort" number={NON_EMERGENCY_NUMBER} />
        </div>
=======
>>>>>>> emily
      </section>
    </main>
  )
}

export default PoliceContacts


