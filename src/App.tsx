import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { theme } from './theme'
import { MainLayout } from './layouts/MainLayout'
import { HomePage } from './pages/HomePage'
import { GHL } from '../ghl';

// Create a client
const queryClient = new QueryClient()

// Initialize GHL
const ghl = new GHL();
(window as any).ghl = ghl;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MainLayout>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
