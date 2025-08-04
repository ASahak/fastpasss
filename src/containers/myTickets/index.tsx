import { memo, ReactNode } from 'react'
import { Flex, Grid, Heading, VStack } from '@chakra-ui/react'
import Pagination from './pagination'
import StatusFilters from './statusFilters'
import { useFetchTickets } from '@/hooks/queries/useFetchTikets'
import { useFetchEvents } from '@/hooks/queries/useFetchEvents'
import { Empty, Spinner } from '@/components/ui'
import CardTicket from '@/containers/myTickets/card'

const MyTickets = () => {
  const { data: eventsData } = useFetchEvents('')
  const { data, isLoading } = useFetchTickets(eventsData)
  console.log('tickets  -> ', data?.tickets)

  if (isLoading)
    return (
      <Flex justifyContent="center" alignItems="center" w="full" h="full">
        <Spinner
          w="40px"
          h="40px"
          size="4px"
          color="var(--chakra-colors-blue-300)"
        />
      </Flex>
    )

  if (!data) return <Empty />

  return (
    <VStack spacing="1.8rem" pb="2.4rem" w="full">
      <Flex justifyContent="space-between" w="full">
        <Heading fontSize="2.4rem" color="white">
          My Tickets
        </Heading>
        {/*<Pagination maxPages={ 3 }/>*/}
      </Flex>
      <Flex w="full">
        <StatusFilters />
      </Flex>
      <Grid
        w="full"
        templateColumns={{
          lg: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)',
          base: 'repeat(1, 1fr)'
        }}
        gap={4}
      >
        {data?.tickets.map(
          (ticket) =>
            (<CardTicket key={ticket.id} data={ticket} />) as ReactNode
        )}
      </Grid>
    </VStack>
  )
}
export default memo(MyTickets)
