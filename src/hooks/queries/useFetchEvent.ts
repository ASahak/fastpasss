import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { QUERY_KEYS_FACTORY } from '@/common/constants/query'
import { useEventABI } from '@/hooks/abi'
import { AddressType } from '@/common/types/global'
import { IEvent } from '@/common/types/events'
import { populateEventStruct } from '@/utils/helpers/event'

export const useFetchEvent = (
  contractAddress: AddressType
): UseQueryResult<IEvent> => {
  const { readEvent } = useEventABI()

  return useQuery({
    queryKey: QUERY_KEYS_FACTORY.FETCH_EVENT(contractAddress),
    queryFn: async () => {
      const { arrayLike } = await readEvent({
        address: contractAddress,
        functionName: 'eventDetails' as never,
        args: []
      })

      return populateEventStruct(arrayLike)
    }
  })
}
