import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { ErrorPage } from './ErrorPage';
import { DataTable } from '../components/DataTable';

export const HomePage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await (window as any).ghl.getUserData();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data', error);
        setError(true);
      }
    };
    fetchUserData();
  }, []);

  if (error) {
    return <ErrorPage />;
  }

  if (!userData) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Text fontSize="lg">Loading...</Text>
      </Box>
    );
  }

  return (
    <Box width="100%" maxW="100vw" overflow="hidden">
      <VStack spacing={8} align="stretch" px={4}>
        <Box>
          <Heading as="h2" size="xl" mb={4}>
            User Information
          </Heading>
          <Text fontSize="lg">
            Welcome {userData.userName}
          </Text>
        </Box>

        <Box width="100%">
          <Heading as="h2" size="xl" mb={4}>
            Data Table
          </Heading>
          <DataTable />
        </Box>
      </VStack>
    </Box>
  )
} 