'use client'
import { useState } from 'react'

export default function OpenAIKeyInput() {
  const [key, setKey] = useState(typeof window !== 'undefined' ? (localStorage.getItem('ms_openai_key') || '') : '')

  function saveKey() {
    localStorage.setItem('ms_openai_key', key)
    alert('OpenAI key saved to localStorage (for assignment demo). Do not commit it.')
  }

  function clearKey() {
    localStorage.removeItem('ms_openai_key')
    setKey('')
    alert('OpenAI key cleared from localStorage.')
  }

  return (
    <div className="card">
      <h4 className="font-semibold mb-2">OpenAI API Key</h4>
      <p className="text-sm text-slate-600 mb-3">Enter your OpenAI key. If absent, the app will use a safe mock fallback for testing.</p>
      <div className="flex gap-2">
        <input className="input" value={key} onChange={(e) => setKey(e.target.value)} placeholder="sk-..." />
        <button onClick={saveKey} className="btn">Save</button>
        <button onClick={clearKey} className="btn !bg-rose-600">Clear</button>
      </div>
    </div>
  )
}
