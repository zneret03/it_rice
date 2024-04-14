'use client'

import { Inter } from 'next/font/google'
import { Footer, Navbar } from '@/components'
import { AuthorizationProvider } from '@/context'
import { useSearchParams } from 'next/navigation'
import '@/styles/index.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const params = useSearchParams()
  const email = params.get('email')

  return (
    <html lang='en' className='scroll-smooth'>
      <title>ITrice</title>
      <AuthorizationProvider>
        <body
          className={`${inter.className} ${!!email ? 'white' : 'bg-green-900'}`}
        >
          <Navbar />
          {children}
          <Footer />
        </body>
      </AuthorizationProvider>
    </html>
  )
}
