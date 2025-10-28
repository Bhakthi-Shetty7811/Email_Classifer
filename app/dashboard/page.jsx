'use client'
import { useEffect, useState } from 'react'
import OpenAIKeyInput from './components/OpenAIKeyInput'
import Sidebar from './components/Sidebar'
import EmailList from './components/EmailList'

export default function DashboardPage() {
  const [emails, setEmails] = useState([])
  const [filter, setFilter] = useState('All')
  const [loadingFetch, setLoadingFetch] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('ms_emails')
    if (stored) setEmails(JSON.parse(stored))
  }, [])

  async function fetchEmails() {
    setLoadingFetch(true)
    try {
      const res = await fetch('/api/gmail')
      if (!res.ok) throw new Error('Failed to fetch emails')
      const json = await res.json()
      setEmails(json.emails || [])
      localStorage.setItem('ms_emails', JSON.stringify(json.emails || []))
    } catch (err) {
      alert('Error fetching emails: ' + err.message)
    } finally {
      setLoadingFetch(false)
    }
  }

  async function classify() {
    const openaiKey = localStorage.getItem('ms_openai_key') || ''
    console.log('🧩 Key before classify:', openaiKey)
    console.log('📧 Emails count before classify:', emails.length)

    if (!openaiKey) {
      alert('⚠️ Please enter your OpenAI API key first.')
      return
    }

    if (!emails || emails.length === 0) {
      alert('⚠️ Please fetch your emails before classifying.')
      return
    }

    try {
      const res = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails, openaiKey }),
      })

      console.log('Response status:', res.status)
      const j = await res.json()
      console.log('Response JSON:', j)

      if (!res.ok) {
        alert('Classification failed: ' + (j.error || 'Unknown error'))
        return
      }

      if (j.emails && j.emails.length > 0) {
        setEmails(j.emails)
        localStorage.setItem('ms_emails', JSON.stringify(j.emails))
      } else {
        alert('No classifications received from API.')
      }
    } catch (err) {
      console.error('❌ Classification error:', err)
      alert('Error classifying emails: ' + err.message)
    }
  }

  const filtered = emails.filter(
    (e) => filter === 'All' || (e.category || 'Unclassified') === filter
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <Sidebar
          onFilter={setFilter}
          onFetch={fetchEmails}
          onClassify={classify}
          loadingFetch={loadingFetch}
        />
      </div>
      <div className="md:col-span-3 space-y-4">
        <OpenAIKeyInput />
        <EmailList emails={filtered} />
      </div>
    </div>
  )
}
