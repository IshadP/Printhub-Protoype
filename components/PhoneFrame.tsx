'use client'

import { Box } from '@/node_modules/@mui/material/index'
import { useEffect, useState } from 'react'
import PrototypeCanvas from './PrototypeCanvas'

/**
 * PhoneFrame Component
 * 
 * Renders a responsive phone frame that:
 * - Maintains a consistent mobile aspect ratio (9:20)
 * - Scales smoothly based on viewport width
 * - Centers on the page
 * - Has rounded corners and shadow
 * - Contains the PrototypeCanvas component
 */
export default function PhoneFrame() {
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const calculateFrameSize = () => {
      const maxWidth = 375
      const aspectRatio = 9 / 20
      const padding = 16

      // Calculate available width
      const availableWidth = window.innerWidth - padding * 2

      // Determine frame width (max 375px or available width)
      const frameWidth = Math.min(availableWidth, maxWidth)

      // Calculate height based on aspect ratio
      const frameHeight = frameWidth / aspectRatio

      setFrameSize({ width: frameWidth, height: frameHeight })
    }

    calculateFrameSize()

    // Recalculate on window resize
    window.addEventListener('resize', calculateFrameSize)
    return () => window.removeEventListener('resize', calculateFrameSize)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <Box
      sx={{
        width: frameSize.width,
        height: frameSize.height,
        borderRadius: '48px',
        backgroundColor: '#000',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        border: '12px solid #000',
        position: 'relative',
        transition: 'all 0.2s ease-out',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '150px',
          height: '25px',
          background: '#000',
          borderRadius: '0 0 20px 20px',
          zIndex: 10,
        },
      }}
    >
      {/* Status Bar */}
      <Box
        sx={{
          height: '28px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          paddingX: 2,
          fontSize: '12px',
          fontWeight: 600,
          color: '#000',
        }}
      >
        <span>9:41</span>
      </Box>

      {/* Screen Content */}
      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
          backgroundColor: '#fff',
          display: 'flex',
        }}
      >
        <PrototypeCanvas />
      </Box>
    </Box>
  )
}
