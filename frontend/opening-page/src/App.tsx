import React, { useState } from 'react'
import OpeningPage from './OpeningPage'
import MainPage from './MainPage'

const App: React.FC = () => {
  const [showMainPage, setShowMainPage] = useState(false)

  if (showMainPage) {
    return <MainPage onBack={() => setShowMainPage(false)} />
  }

  return <OpeningPage onContinue={() => setShowMainPage(true)} />
}

export default App

