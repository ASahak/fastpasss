import { memo } from 'react';
import { Flex, Heading, VStack } from '@chakra-ui/react';
import Pagination from './pagination'
import StatusFilters from './statusFilters'

const MyTickets = () => {
  return (
    <VStack spacing="1.8rem" pb="2.4rem" w="full">
      <Flex justifyContent="space-between" w="full">
        <Heading fontSize="2.4rem" color="white">My Tickets</Heading>
        <Pagination maxPages={3} />
      </Flex>
      <Flex w="full">
        <StatusFilters />
      </Flex>
    </VStack>
  )
}
export default memo(MyTickets)