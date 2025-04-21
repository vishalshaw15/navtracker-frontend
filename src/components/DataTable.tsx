import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Spinner,
  Text,
  useToast,
  Badge,
  Tooltip,
  Button,
  HStack,
  Select,
  Flex,
  IconButton,
  useClipboard,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, CopyIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { ErrorPage } from '../pages/ErrorPage';
import axiosInstance from '../interceptors/authInterceptor';

interface TableData {
  _id: string;
  userId: string;
  companyId: string;
  role: string;
  userName: string;
  email: string;
  url: string;
  timeSpent: number;
  metadata: {
    title: string;
    browser: {
      platform: string;
    };
    location: {
      timezone: string;
      country: string;
    };
  };
  processedAt: string;
}

interface ApiResponse {
  data: TableData[];
  total: number;
}

interface PaginationParams {
  page: number;
  limit: number;
}

interface FilterParams {
  startDate: string;
  endDate: string;
}

export const DataTable = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 10,
  });
  const [copyValue, setCopyValue] = useState<string>('');
  const { onCopy, hasCopied } = useClipboard(copyValue);
  const [filters, setFilters] = useState<FilterParams>({
    startDate: '',
    endDate: '',
  });
  const toast = useToast();

  const totalPages = Math.ceil(total / pagination.limit);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.post<ApiResponse>('/api/processed-events', {
          page: pagination.page,
          limit: pagination.limit,
          startDate: filters.startDate || undefined,
          endDate: filters.endDate || undefined,
        });
        setTableData(response.data.data);
        setTotal(response.data.total);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(true);
        toast({
          title: 'Error',
          description: 'Failed to fetch data. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pagination, filters, toast]);

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(event.target.value);
    setPagination({ page: 1, limit: newLimit });
  };

  const handleCopyUrl = (url: string) => {
    setCopyValue(url);
    setTimeout(() => {
      onCopy();
      toast({
        title: "URL Copied",
        description: "The URL has been copied to your clipboard",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }, 0);
  };

  const handleDateChange = (field: keyof FilterParams) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page when filters change
  };

  const formatTime = (milliseconds: number) => {
    // Convert milliseconds to seconds first
    const totalSeconds = Math.floor(milliseconds / 1000);
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    const parts = [];
    
    if (hours > 0) {
      parts.push(`${hours}h`);
    }
    if (minutes > 0 || hours > 0) {
      parts.push(`${minutes}m`);
    }
    parts.push(`${seconds}s`);
    
    return parts.join(' ');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const showPages = 7; // Number of page buttons to show
    let start = Math.max(1, pagination.page - Math.floor(showPages / 2));
    let end = Math.min(totalPages, start + showPages - 1);

    // Adjust start if we're near the end
    if (end === totalPages) {
      start = Math.max(1, end - showPages + 1);
    }

    // Always show first page
    if (start > 1) {
      pageNumbers.push(
        <Button
          key={1}
          size="sm"
          variant={1 === pagination.page ? 'solid' : 'outline'}
          onClick={() => handlePageChange(1)}
        >
          1
        </Button>
      );
      if (start > 2) {
        pageNumbers.push(<Text key="ellipsis-1">...</Text>);
      }
    }

    // Show page numbers
    for (let i = start; i <= end; i++) {
      pageNumbers.push(
        <Button
          key={i}
          size="sm"
          variant={i === pagination.page ? 'solid' : 'outline'}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    // Always show last page
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pageNumbers.push(<Text key="ellipsis-2">...</Text>);
      }
      pageNumbers.push(
        <Button
          key={totalPages}
          size="sm"
          variant={totalPages === pagination.page ? 'solid' : 'outline'}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }

    return pageNumbers;
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <Box 
      w="100%" 
      overflowX="auto"
      boxShadow="sm"
      borderRadius="lg"
      bg="white"
    >
      <Box p={4} borderBottom="1px" borderColor="gray.100">
        <Flex gap={4} align="flex-end">
          <FormControl>
            <FormLabel fontSize="sm">Start Date</FormLabel>
            <Input
              type="datetime-local"
              value={filters.startDate}
              onChange={handleDateChange('startDate')}
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm">End Date</FormLabel>
            <Input
              type="datetime-local"
              value={filters.endDate}
              onChange={handleDateChange('endDate')}
              size="sm"
            />
          </FormControl>
        </Flex>
      </Box>

      <TableContainer width="100%">
        <Table variant="simple" size="sm" width="100%">
          <Thead>
            <Tr>
              <Th width="25%">User Info</Th>
              <Th width="25%">Role & Location</Th>
              <Th width="30%">Page Details</Th>
              <Th width="20%">Time Info</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Tr>
                <Td colSpan={4}>
                  <Box display="flex" justifyContent="center" alignItems="center" p={4}>
                    <Spinner size="lg" />
                  </Box>
                </Td>
              </Tr>
            ) : tableData.length === 0 ? (
              <Tr>
                <Td colSpan={4}>
                  <Box textAlign="center" p={4}>
                    <Text fontSize="md" color="gray.500">No data available</Text>
                  </Box>
                </Td>
              </Tr>
            ) : (
              tableData.map((row) => (
                <Tr key={row._id ?? 'unknown'}>
                  <Td width="25%">
                    <Box>
                      <Text fontWeight="bold">{row.userName ?? 'Unknown User'}</Text>
                      <Text fontSize="sm" color="gray.600">{row.email ?? 'No email'}</Text>
                      <Text fontSize="xs" color="gray.500">ID: {row.userId ?? 'N/A'}</Text>
                    </Box>
                  </Td>
                  <Td width="25%">
                    <Box>
                      <Badge colorScheme={row.role === 'admin' ? 'green' : 'blue'}>
                        {row.role ?? 'user'}
                      </Badge>
                      <Text fontSize="sm" mt={1}>
                        {row.metadata?.location?.country ?? 'Unknown'} ({row.metadata?.location?.timezone ?? 'UTC'})
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        Platform: {row.metadata?.browser?.platform ?? 'Unknown'}
                      </Text>
                    </Box>
                  </Td>
                  <Td width="30%">
                    <Box>
                      <Text noOfLines={1} fontWeight="medium">
                        {row.metadata?.title ?? 'Untitled Page'}
                      </Text>
                      <Flex align="center" mt={1}>
                        <Text noOfLines={1} fontSize="xs" color="gray.600" flex="1">
                          {row.url ?? 'No URL available'}
                        </Text>
                        <Tooltip
                          label={hasCopied ? 'Copied!' : 'Copy URL'}
                          placement="top"
                        >
                          <IconButton
                            aria-label="Copy URL"
                            icon={<CopyIcon />}
                            size="xs"
                            ml={2}
                            onClick={() => handleCopyUrl(row.url)}
                            variant="ghost"
                            colorScheme={hasCopied ? 'green' : 'gray'}
                          />
                        </Tooltip>
                      </Flex>
                    </Box>
                  </Td>
                  <Td width="20%">
                    <Box>
                      <Text fontWeight="medium">{formatTime(row.timeSpent ?? 0)}</Text>
                      <Text fontSize="xs" color="gray.500">
                        Processed: {row.processedAt ? formatDate(row.processedAt) : 'Not available'}
                      </Text>
                    </Box>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Box 
        p={4} 
        borderTop="1px" 
        borderColor="gray.100"
      >
        <Flex justify="space-between" align="center">
          <HStack spacing={4}>
            <Text fontSize="sm" color="gray.600">
              Showing {tableData.length > 0 ? ((pagination.page - 1) * pagination.limit) + 1 : 0} to {Math.min(pagination.page * pagination.limit, total)} of {total} entries
            </Text>
            <Select
              size="sm"
              width="auto"
              value={pagination.limit}
              onChange={handleLimitChange}
            >
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
              <option value="100">100 per page</option>
            </Select>
          </HStack>
          <HStack spacing={2}>
            <IconButton
              aria-label="Previous page"
              icon={<ChevronLeftIcon />}
              size="sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              isDisabled={pagination.page === 1}
            />
            {renderPageNumbers()}
            <IconButton
              aria-label="Next page"
              icon={<ChevronRightIcon />}
              size="sm"
              onClick={() => handlePageChange(pagination.page + 1)}
              isDisabled={pagination.page === totalPages}
            />
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}; 