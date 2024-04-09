import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Footer, Navbar } from '@/components'
import { AuthorizationProvider } from '@/context'
import '@/styles/index.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ITRice'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <AuthorizationProvider>
        <body className={`${inter.className} bg-green-900`}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </AuthorizationProvider>
    </html>
  )
}
