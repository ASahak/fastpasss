import { IEvent } from '@/common/types/events'
import { ITicket } from '@/common/types/tickets'

export const populateTicketStruct = (
  ticketData: any,
  eventData: IEvent
): ITicket => ({
  id: ticketData.id,
  eventId: eventData.event_id,
  checkedIn:
    ticketData.metadata.attributes[ticketData.metadata.attributes.length - 1]
      .value,
  eventAddress: ticketData.token.address,
  imageUrl: ticketData.image_url,
  eventDescription: ticketData.metadata.description,
  eventName: ticketData.metadata.name,
  eventPlaceName: eventData.placeName,
  eventDate: eventData.start_date
})
