import { AddressType } from 'typechain'

export type ITicket = {
  id: string
  eventId: string
  checkedIn: boolean
  eventAddress: AddressType
  imageUrl: string
  eventDescription: string
  eventName: string
  eventPlaceName: string
  eventDate: string
}
