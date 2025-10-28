'use client'
import { useSession, signIn } from 'next-auth/react'

export default function HomePage() {
  const { data: session } = useSession()

  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Email Classifier</h1>
      <p className="text-slate-600 mb-6">Log in with Google, fetch your last 15 emails, and classify them.</p>
      {!session ? (
        <div>
          <button onClick={() => signIn('google')} className="btn">Sign in with Google</button>
          <p className="text-sm text-slate-500 mt-3">Use a Google account that has email access.</p>
        </div>
      ) : (
        <div>
          <p className="mb-4">Signed in as <strong>{session.user.email}</strong></p>
          <a className="btn" href="/dashboard">Go to Dashboard</a>
        </div>
      )}
    </div>
  )
}
