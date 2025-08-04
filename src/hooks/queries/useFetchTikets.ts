import { useAccount } from 'wagmi'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { QUERY_KEYS_FACTORY } from '@/common/constants/query'
import { populateTicketStruct } from '@/utils/helpers/tickets'
import { ITicket } from '@/common/types/tickets'
import { IEvent } from '@/common/types/events'

export const useFetchTickets = (
  eventsData: IEvent[] | undefined
): UseQueryResult<{
  activeTickets: ITicket[]
  usedTickets: ITicket[]
  expiredTickets: ITicket[]
  nextPageParams: any
}> => {
  const { address } = useAccount()
  const eventsAddressMap = {}
  console.log('eventsData -> ', eventsData)
  eventsData?.forEach((event) => {
    eventsAddressMap[event.contractAddress] = {
      start_date: event.start_date,
      placeName: event.placeName,
      event_id: event.event_id
    }
  })
  return useQuery({
    queryKey: QUERY_KEYS_FACTORY.FETCH_TICKETS(address!),
    queryFn: async () => {
      const userNfts = await fetch(
        `https://bck.ftnscan.com/api/v2/addresses/${address}/nft?type=ERC-721`
      )
      const ticketsData = await userNfts.json()
      const tickets: ITicket[] = []
      console.log('ticketsData ->', ticketsData)
      ticketsData.items.forEach((ticketData) => {
        if (eventsAddressMap[ticketData.token.address]) {
          tickets.push(
            populateTicketStruct(
              ticketData,
              eventsAddressMap[ticketData.token.address]
            )
          )
        }
      })
      const usedTickets = []
      const activeTickets = []

      tickets.forEach((ticket) => {
        if (ticket.checkedIn === 'true') {
          usedTickets.push(ticket)
        } else {
          activeTickets.push(ticket)
        }
      })
      console.log(' usedTickets - > ', usedTickets)
      return {
        activeTickets,
        usedTickets,
        nextPageParams: ticketsData.next_page_params
      }
    },
    enabled: !!address && !!eventsData
  })
}
