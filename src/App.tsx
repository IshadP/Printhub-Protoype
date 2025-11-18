import { Box, Container } from '@mui/material'
import PhoneFrame from './components/PhoneFrame'
import './App.css'

export default function App() {
  return (
    <Box className="app-root">
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: { xs: 2, sm: 3 },
          }}
        >
          <PhoneFrame />
        </Box>
      </Container>
    </Box>
  )
}
