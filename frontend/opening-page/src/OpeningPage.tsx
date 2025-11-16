import React from 'react'

interface OpeningPageProps {
  onContinue: () => void
}

const OpeningPage: React.FC<OpeningPageProps> = ({ onContinue }) => {
  return (
    <main
      className="relative min-h-screen w-full bg-[#020b25] text-white font-sans flex flex-col justify-between px-4 py-10 md:px-8 overflow-hidden"
      onClick={onContinue}
    >
      <div className="pointer-events-none absolute inset-y-6 left-0 flex flex-col items-center">
        <div className="h-full w-20 rounded-t-3xl bg-[#1f6d94] relative overflow-hidden">
          {/* top white box */}
          <div className="absolute -top-6 left-0 right-0 mx-auto h-24 w-24 rounded-t-2xl rounded-b-xl bg-[#f2f4f7] flex items-center justify-center">
            <div className="h-12 w-6 rounded-sm bg-[#0f2c61]" />
          </div>

          {/* middle white bar */}
          <div className="absolute inset-x-0 top-1/2 flex justify-start pl-4">
            <div className="h-20 w-5 rounded-md bg-[#d7dde6]" />
          </div>
        </div>
      </div>

      <section className="flex flex-1 flex-col justify-center pl-32 md:pl-40">
        <div className="flex flex-col items-start gap-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-white">LiteLine</h1>

          <div className="flex items-center justify-center">
            <div className="relative h-40 w-40 rounded-full border-[6px] border-[#53c0ff] bg-[#031025] flex items-center justify-center">
              <div className="h-28 w-28 rounded-full border-[3px] border-[#53c0ff] flex items-center justify-center text-[#53c0ff]">
                <svg viewBox="0 0 100 100" className="h-20 w-20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M25 60 Q20 50 25 40 Q30 35 40 35 Q45 35 50 40 Q55 35 60 35 Q70 35 75 45 Q80 55 72 65 L65 75 L60 80 L50 82 L42 78 L35 70 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line x1="50" y1="52" x2="50" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <rect x="46" y="35" width="8" height="10" fill="currentColor" rx="1" />
                  <circle cx="50" cy="31" r="3" fill="currentColor" />
                  <path d="M50 30 Q56 25 62 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M50 27 Q60 20 70 27" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="flex justify-center">
        <p className="text-sm font-medium tracking-wide text-slate-100">Follow the light</p>
      </footer>
    </main>
  )
}

export default OpeningPage


