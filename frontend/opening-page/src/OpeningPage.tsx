import React, { useState, useEffect } from 'react'
import './OpeningPage.css'

const APP_LOAD_DURATION = 2200

const OpeningPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)

    const timer = setTimeout(() => {
      setIsLoading(false)
      setIsLoaded(true)
    }, APP_LOAD_DURATION)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className={`opening-page ${isLoading ? 'is-loading' : ''} ${isLoaded ? 'is-loaded' : ''}`}>
      <div className="left-figure" aria-hidden="true">
        <div className="blue-light-station">
          <div className="station-pole"></div>
          <div className="station-light">
            <div className="light-glow"></div>
          </div>
          <div className="station-panel">
            <div className="panel-button"></div>
            <div className="panel-text">EMERGENCY</div>
          </div>
        </div>
      </div>

      <section className="hero">
        <div className="logo-wrapper">
          <div 
            className={`logo-outer glow ${isLoading ? 'loading' : ''}`}
            aria-busy={isLoading}
          >
            <div className="logo-icon">
              <svg viewBox="0 0 100 100" className="hand-icon" xmlns="http://www.w3.org/2000/svg">
                {/* Hand outline - palm facing up */}
                <path
                  d="M25 55 Q20 50 20 45 Q20 35 25 30 Q30 25 40 25 Q45 25 50 30 Q55 25 60 25 Q65 25 70 30 Q75 35 75 45 Q75 50 70 55 L65 65 L60 75 L55 80 L45 80 L40 75 L35 65 L30 60 Z"
                  fill="none"
                  stroke="#53c0ff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Antenna base - vertical line from palm center */}
                <line x1="50" y1="55" x2="50" y2="40" stroke="#53c0ff" strokeWidth="2.5" strokeLinecap="round" />
                {/* Antenna column - rectangular base */}
                <rect x="46" y="40" width="8" height="12" fill="#53c0ff" rx="1" />
                {/* Antenna top circle */}
                <circle cx="50" cy="35" r="3.5" fill="#53c0ff" />
                {/* Signal waves - concentric arcs emanating upward */}
                <path
                  d="M50 35 Q55 30 60 35"
                  fill="none"
                  stroke="#53c0ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.85"
                />
                <path
                  d="M50 35 Q58 25 66 35"
                  fill="none"
                  stroke="#53c0ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.65"
                />
                <path
                  d="M50 35 Q62 20 74 35"
                  fill="none"
                  stroke="#53c0ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.45"
                />
              </svg>
            </div>
          </div>
        </div>
        <h1 className="app-title">LiteLine</h1>
        <p className="tagline">Follow the light</p>
      </section>
    </main>
  )
}

export default OpeningPage

