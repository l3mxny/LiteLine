import React, { useState } from 'react'
import OpeningPage from './OpeningPage'
import MapPage from './MapPage'

const App: React.FC = () => {
  const [showMapPage, setShowMapPage] = useState(false)

  if (showMapPage) {
    return <MapPage />
  }

  return <OpeningPage onContinue={() => setShowMapPage(true)} />
}

export default App

