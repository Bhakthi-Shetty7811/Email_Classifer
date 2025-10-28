import './globals.css'
import Navbar from './components/Navbar'
import SessionProvider from './providers/SessionProvider'

export const metadata = { title: 'Email Classifier' }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <SessionProvider>
        <Navbar />
        <main className="max-w-6xl mx-auto p-6">{children}</main>
        </SessionProvider>
      </body>
    </html>
  )
}
