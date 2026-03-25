import type { Metadata } from 'next'
import { Anton, Space_Mono } from 'next/font/google'
import './globals.css'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})

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
    <html lang="en" className={`${anton.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
