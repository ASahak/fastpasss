import { AddressType } from 'typechain';

export type IEventMedia = {
  media_path: string
  media_type?: number
}

export type IEvent = {
  description: string
  event_id: string
  contractAddress: AddressType
  media_paths: string[]
  price: string,
  organization_name: string,
  title: string,
  placeName: string,
  start_date: string
}

export type IEventTicketType = {
  id: number,
  category_key: number,
  limit: number,
  price: number,
  title: string,
}

export type IEventSold = {
  count: number
  type_id: number
}

export type IEventAddress = {
  latitude: number,
  longitude: number,
  location: string,
  name: string,
}

export type IEventPerformance = {
  id: number
  sold_data: IEventSold[]
  start_date: string
  ticket_types: IEventTicketType[]
}

export type IEventDetails = {
  address: IEventAddress,
  age_restriction: number,
  all_ticket_types: IEventTicketType[],
  category_id: number
  description: string
  discount_description: string
  details: string
  event_id: number
  event_type: number
  media_paths: IEventMedia[]
  min_price: string,
  organization_name: string,
  performances: IEventPerformance[]
  title: string,
}

