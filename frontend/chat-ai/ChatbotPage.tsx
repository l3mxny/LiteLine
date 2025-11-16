// @ts-nocheck
import React, { useMemo, useRef, useState } from 'react'
import logoImg from './logo-removebg-preview.png'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

interface ChatbotPageProps {
  onBack?: () => void
}

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS: string[] = [
  'I feel unsafe walking right now',
  'Where is the nearest blue light phone?',
  'How do I contact campus police?',
  'What should I do after a car accident?',
  'How can I help a friend in danger?',
]

const ChatbotPage: React.FC<ChatbotPageProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true)
  const [remainingSuggestions, setRemainingSuggestions] = useState<string[]>(SUGGESTIONS.slice(0, 3))

  const canSend = input.trim().length > 0

  const handleSend = (text?: string, fromSuggestion?: boolean, clickedIndex?: number) => {
    const content = (text ?? input).trim()
    if (!content) return
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', content }
    const assistantMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content:
        'If this is an emergency, call 911 or use the nearest blue light phone. I can also guide you step‑by‑step and share campus resources.',
    }
    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput('')
    inputRef.current?.focus()
    if (fromSuggestion) {
      if (typeof clickedIndex === 'number') {
        const next = remainingSuggestions.filter((_, idx) => idx !== clickedIndex)
        setRemainingSuggestions(next)
        if (next.length === 0) setShowSuggestions(false)
      } else {
        setShowSuggestions(false)
      }
    }
  }

  const Header = useMemo(() => {
    return (
      <header className="sticky top-0 z-20 grid grid-cols-3 items-center px-4 pt-4 pb-2 bg-[#07132c]">
        <div className="flex">
          <button
            type="button"
            onClick={onBack}
            className="h-12 w-12 rounded-full bg-white/15 text-white grid place-items-center shadow-inner ring-1 ring-white/20 hover:bg-white/20 transition-colors"
            aria-label="Back"
            title="Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="14 18 8 12 14 6"></polyline>
            </svg>
          </button>
        </div>
        <div />
        <div className="flex justify-end items-center gap-3">
          <img src={logoImg} alt="LiteLine logo" className="h-11 w-11 object-contain" />
          <span className="text-white font-extrabold text-3xl tracking-wide">LiteLine</span>
        </div>
      </header>
    )
  }, [onBack])

  return (
    <main className="min-h-screen w-full bg-[#07132c] text-white flex flex-col">
      {Header}

      {/* Messages */}
      <section className="flex-1 overflow-y-auto px-6 pb-44">
        {messages.length === 0 ? (
          <div className="mt-16 flex justify-center px-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white/5 border border-white/10 shadow-sm px-6 py-6 text-center backdrop-blur-sm">
              <h1 className="text-[34px] md:text-[36px] leading-tight font-extrabold text-white">
                TEST CHATBOT PAGE
              </h1>
              <p className="mt-3 mx-auto max-w-xl text-base md:text-[17px] leading-relaxed text-slate-200/90">
                Ask about safety steps, how to reach help, or where to find the nearest blue light phone.
              </p>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl space-y-4 pt-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                    m.role === 'user' ? 'bg-[#1f6d94] text-white' : 'bg-white/10 text-white'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Composer */}
      <div className="fixed inset-x-0 bottom-0 px-4 py-4 bg-gradient-to-t from-[#07132c] via-[#07132c]/95 to-transparent">
        {/* Minimal suggestion chips (3) just above the composer */}
        {showSuggestions && remainingSuggestions.length > 0 && (
          <div className="mx-auto max-w-2xl w-full mb-10">
            {remainingSuggestions.length >= 2 && (
              <div className="grid grid-cols-2 gap-3">
                {remainingSuggestions.slice(0, 2).map((q, idx) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q, true, idx)}
                    className="rounded-xl bg-white/10 hover:bg-white/15 text-slate-100 text-[14px] md:text-base px-4 py-2 text-left shadow-sm border border-white/10 flex items-center min-h-[60px]"
                  >
                    <span className="flex-1 leading-snug pr-2">{q}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 opacity-80">
                      <path d="M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ))}
              </div>
            )}
            {(remainingSuggestions.length === 3 || remainingSuggestions.length === 1) && (
              <div className="mt-3 flex justify-center">
                <button
                  onClick={() =>
                    handleSend(
                      remainingSuggestions.length === 3 ? remainingSuggestions[2] : remainingSuggestions[0],
                      true,
                      remainingSuggestions.length === 3 ? 2 : 0,
                    )
                  }
                  className="rounded-xl bg-white/10 hover:bg-white/15 text-slate-100 text-[14px] md:text-base px-5 py-2 text-center shadow-sm border border-white/10 w-[75%] md:w-[60%] flex items-center justify-center min-h-[60px]"
                >
                  <span className="leading-snug pr-2">
                    {remainingSuggestions.length === 3 ? remainingSuggestions[2] : remainingSuggestions[0]}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 opacity-80">
                    <path d="M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
        {/* Search pill composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="mx-auto max-w-2xl w-full"
        >
          <div className="flex items-center gap-2 rounded-full bg-[#dcedff]/20 px-3 py-2 border border-white/10">
            {/* Magnifying glass icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white/80 ml-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything"
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/80 px-2 py-3"
            />
            {/* Mic icon */}
            <div className="h-11 w-11 rounded-full bg-white/15 grid place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-white"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3z" />
                <path d="M19 11a1 1 0 1 0-2 0 5 5 0 0 1-10 0 1 1 0 1 0-2 0 7.002 7.002 0 0 0 6 6.92V20H8a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-3v-2.08A7.002 7.002 0 0 0 19 11z" />
              </svg>
            </div>
          </div>
          <p className="mt-2 text-center text-[11px] text-slate-400">
            If this is an emergency, call 911 or use the nearest blue light phone.
          </p>
        </form>
      </div>
    </main>
  )
}

export default ChatbotPage


