import { Box, Button, Typography, Stack } from '@mui/material'
import { useState } from 'react'

/**
 * PrototypeCanvas Component
 * 
 * Fills the available space inside the phone frame
 * Contains placeholder interaction to verify events
 * Built with Material UI for easy component expansion
 */
export default function PrototypeCanvas() {
  const [clickCount, setClickCount] = useState(0)
  const [lastClicked, setLastClicked] = useState<string | null>(null)

  const handleInteraction = (name: string) => {
    setClickCount((prev) => prev + 1)
    setLastClicked(name)
    console.log(`[Interaction] ${name} clicked - Total: ${clickCount + 1}`)
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        overflow: 'auto',
      }}
    >
      <Stack spacing={2} alignItems="center" textAlign="center">
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: '#000',
            marginBottom: 2,
          }}
        >
          Prototype Canvas
        </Typography>

        <Typography variant="body2" sx={{ color: '#666', maxWidth: '280px' }}>
          This is your prototype space. Click the buttons below to verify interactions are working.
        </Typography>

        {/* Interaction Counter Display */}
        <Box
          sx={{
            marginTop: 2,
            padding: 2,
            backgroundColor: '#f5f5f5',
            borderRadius: '12px',
            minWidth: '200px',
          }}
        >
          <Typography variant="body2" sx={{ color: '#666', marginBottom: 1 }}>
            Interactions: <strong>{clickCount}</strong>
          </Typography>
          {lastClicked && (
            <Typography variant="caption" sx={{ color: '#999' }}>
              Last clicked: <strong>{lastClicked}</strong>
            </Typography>
          )}
        </Box>
      </Stack>

      {/* Demo Buttons */}
      <Stack spacing={2} sx={{ width: '100%', maxWidth: '280px' }}>
        <Button
          variant="contained"
          onClick={() => handleInteraction('Primary')}
          fullWidth
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 600,
            padding: '10px 16px',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Primary Action
        </Button>

        <Button
          variant="outlined"
          onClick={() => handleInteraction('Secondary')}
          fullWidth
          sx={{
            borderColor: '#1976d2',
            color: '#1976d2',
            textTransform: 'none',
            fontWeight: 600,
            padding: '10px 16px',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          Secondary Action
        </Button>

        <Button
          variant="text"
          onClick={() => handleInteraction('Tertiary')}
          fullWidth
          sx={{
            color: '#1976d2',
            textTransform: 'none',
            fontWeight: 600,
            padding: '10px 16px',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          Tertiary Action
        </Button>
      </Stack>

      {/* Usage Instructions */}
      <Box
        sx={{
          marginTop: 'auto',
          paddingTop: 2,
          borderTop: '1px solid #f0f0f0',
          textAlign: 'center',
        }}
      >
        <Typography variant="caption" sx={{ color: '#999' }}>
          Open browser console to see interaction events
        </Typography>
      </Box>
    </Box>
  )
}
