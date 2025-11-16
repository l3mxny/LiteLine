import React, { useState } from 'react'
import OpeningPage from './OpeningPage'
import MapPage from './MapPage'
import ChatbotPage from '../../chat-ai/ChatbotPage'
import PoliceContacts from '../../contacts/PoliceContacts'

const App: React.FC = () => {
  const [view, setView] = useState<'opening' | 'map' | 'chat' | 'contacts'>('opening')

  if (view === 'chat') {
    return <ChatbotPage onBack={() => setView('map')} />
  }

  if (view === 'contacts') {
    return <PoliceContacts onBack={() => setView('map')} />
  }

  if (view === 'map') {
    return (
      <MapPage
        onOpenChat={() => setView('chat')}
        onOpenContacts={() => setView('contacts')}
      />
    )
  }

  return <OpeningPage onContinue={() => setView('map')} />
}

export default App

