import type { Metadata } from 'next'
import { Box } from '@mui/material'
import './globals.css'

export const metadata: Metadata = {
  title: 'Phone Frame Prototype',
  description: 'Responsive phone frame with prototype canvas',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f5f5f5' }}>
        {children}
      </body>
    </html>
  )
}
