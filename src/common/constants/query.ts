import { AddressType } from '@/common/types/global';

export const QUERY_KEYS_FACTORY = {
  FETCH_EVENTS: (filterBy: string) => ['fetch-events', filterBy],
  FETCH_EVENT: (eventAddress: AddressType) => ['fetch-event', eventAddress]
}

export const WHITE_LIST_OF_RESET_QUERY = []