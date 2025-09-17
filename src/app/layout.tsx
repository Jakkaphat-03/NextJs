import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Link from 'next/link'

const prompt = localFont({
  src: '../../public/fonts/Prompt-Regular.ttf',
  variable: '--font-prompt',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TCAS69 Portfolio',
  description: 'ระบบจัดการ Portfolio สำหรับสมัคร TCAS69',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className={prompt.variable}>
      <body className="font-sans bg-white text-gray-800">
        <nav className="w-full bg-gray-100 border-b border-gray-300 px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">TCAS69 Portfolio</h1>
          <div className="space-x-4">
            <Link href="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
            <span className="text-gray-400">About</span>
            <span className="text-gray-400">Contact</span>
            <Link href="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  )
}
