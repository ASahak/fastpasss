import { memo, ReactNode, useState } from 'react'
import { Flex, Grid, Heading, VStack } from '@chakra-ui/react'
import Pagination from './pagination'
import StatusFilters from './statusFilters'
import { useFetchTickets } from '@/hooks/queries/useFetchTikets'
import { useFetchEvents } from '@/hooks/queries/useFetchEvents'
import { Empty, Spinner } from '@/components/ui'
import CardTicket from '@/containers/myTickets/card'
import { TicketStatus } from '@/common/enums/ticket'

const MyTickets = () => {
  const [status, setStatus] = useState(TicketStatus.ACTIVE)
  const { data: eventsData } = useFetchEvents('')
  const { data, isLoading } = useFetchTickets(eventsData)
  console.log('tickets  -> ', data?.activeTickets)
  console.log(' status= > ', status)
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
  const ticketsData =
    status === TicketStatus.ACTIVE
      ? data?.activeTickets
      : status === TicketStatus.USED
        ? data?.usedTickets
        : data?.expiredTickets

  return (
    <VStack spacing="1.8rem" pb="2.4rem" w="full" h="full">
      <Flex justifyContent="space-between" w="full">
        <Heading fontSize="2.4rem" color="white">
          My Tickets
        </Heading>
        {/*<Pagination maxPages={ 3 }/>*/}
      </Flex>
      <Flex w="full">
        <StatusFilters status={status} setStatus={setStatus} />
      </Flex>
      {!ticketsData?.length
        ? ((<Empty />) as ReactNode)
        : ((
            <Grid
              w="full"
              templateColumns={{
                lg: 'repeat(2, 1fr)',
                xl: 'repeat(3, 1fr)',
                base: 'repeat(1, 1fr)'
              }}
              gap={4}
            >
              {data?.activeTickets.map(
                (ticket) =>
                  (<CardTicket key={ticket.id} data={ticket} />) as ReactNode
              )}
            </Grid>
          ) as ReactNode)}
    </VStack>
  )
}
export default memo(MyTickets)
