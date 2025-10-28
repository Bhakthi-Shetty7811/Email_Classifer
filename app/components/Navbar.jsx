'use client'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/"><span className="font-semibold">Dashboard</span></Link>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <div className="text-sm text-slate-600">{session.user.email}</div>
              <button className="text-sm text-rose-600" onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <Link href="/">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
