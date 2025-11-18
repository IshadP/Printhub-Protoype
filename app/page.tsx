'use client'

import { Box, Container } from '@mui/material'
import PhoneFrame from '@/components/PhoneFrame'

export default function Page() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: { xs: 2, sm: 3 },
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
      }}
    >
      <PhoneFrame />
    </Box>
  )
}
