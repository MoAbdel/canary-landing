import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import './globals.css'

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Canary — Always First. Always Ready.',
  description: 'Systems + Objects for the modern creative workspace.',
  openGraph: {
    title: 'Canary — Always First. Always Ready.',
    description: 'Systems + Objects for the modern creative workspace.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spaceMono.variable}>
      <body>{children}</body>
    </html>
  )
}
