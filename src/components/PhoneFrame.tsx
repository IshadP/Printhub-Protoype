import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import PrototypeCanvas from './PrototypeCanvas'
import '../styles/phone-frame.css'

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

  useEffect(() => {
    const calculateFrameSize = () => {
      const maxWidth = 375
      const aspectRatio = 9 / 20
      const padding = 16

      // Calculate available width
      const availableWidth =
        typeof window !== 'undefined' ? window.innerWidth - padding * 2 : maxWidth

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

  return (
    <Box
      className="phone-frame"
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
