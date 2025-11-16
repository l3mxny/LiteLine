import React from 'react'

interface MainPageProps {
  onBack: () => void
}

const MainPage: React.FC<MainPageProps> = ({ onBack }) => {
  return (
    <div className="relative min-h-screen w-full bg-slate-900 text-white font-sans overflow-hidden">
      {/* Google Maps background (container where live map will be mounted) */}
      <div id="map" className="absolute inset-0 bg-slate-900">
        {/* TODO: initialize Google Maps JS API here to show live user location */}
      </div>

      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="absolute top-4 left-4 z-20 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow"
      >
        ← Back
      </button>

      {/* Bottom sheet UI */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-6">
        <div className="pointer-events-auto w-[92%] max-w-md rounded-3xl bg-white shadow-2xl px-4 pt-3 pb-5 space-y-3">
          {/* Search bar */}
          <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-3 py-2">
            <span className="text-slate-400 text-sm">Search Maps</span>
            <div className="ml-auto flex items-center gap-2 text-slate-400">
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              <span className="h-4 w-4 rounded-full border border-slate-400" />
            </div>
          </div>

          {/* Home / Work / New chips */}
          <div className="flex items-center gap-2">
            <button className="flex-1 rounded-2xl bg-[#e0edff] px-3 py-2 text-sm font-semibold text-[#1f3c86]">
              Home
            </button>
            <button className="flex-1 rounded-2xl bg-[#e0edff] px-3 py-2 text-sm font-semibold text-[#1f3c86]">
              Work
            </button>
            <button className="flex-1 rounded-2xl bg-[#e0edff] px-3 py-2 text-sm font-semibold text-[#1f3c86] flex items-center justify-center gap-1">
              <span className="text-base">+</span>
              <span className="text-sm font-semibold">New</span>
            </button>
          </div>

          {/* Primary action button */}
          <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#0f2c61] px-4 py-3 text-sm font-semibold text-white shadow-md">
            <span>Find Nearest Station</span>
            <span className="h-2.5 w-2.5 rounded-full border-[3px] border-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainPage


