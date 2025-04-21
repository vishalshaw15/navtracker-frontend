import { Box, Flex, Heading } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box minH="100vh" bg="gray.50">
      <Flex
        as="header"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={6}
        bg="white"
        color="gray.800"
        boxShadow="sm"
        width="100%"
      >
        <Heading as="h1" size="lg" letterSpacing={'tighter'}>
          NavTracker
        </Heading>
      </Flex>

      <Box width="100%" py={8}>
        {children}
      </Box>

      <Box as="footer" py={6} textAlign="center" width="100%">
        <p>© {new Date().getFullYear()} NavTracker. All rights reserved.</p>
      </Box>
    </Box>
  )
} 