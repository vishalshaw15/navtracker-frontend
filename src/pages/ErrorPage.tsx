import { Box, Heading, Text, VStack } from '@chakra-ui/react';

export const ErrorPage = () => {

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={6} textAlign="center" p={8}>
        <Heading size="lg" color="red.500">
          Connection Error
        </Heading>
        <Text fontSize="lg">
          There seems to be an error with the connection with GHL. Please re-install the application and try again.
        </Text>
      </VStack>
    </Box>
  );
}; 