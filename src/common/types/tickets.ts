import { AddressType } from 'typechain'

export type ITicket = {
  id: string
  eventId: string
  checkedIn: string
  eventAddress: AddressType
  imageUrl: string
  eventDescription: string
  eventName: string
  eventPlaceName: string
  eventDate: string
}
