import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QUERY_KEYS_FACTORY } from '@/common/constants/query';
import { useAddressRegistry } from '@/hooks/abi/useAddressRegistryABI';
import { useEventABI } from '@/hooks/abi';
import { AddressType } from '@/common/types/global';
import { IEvent } from '@/common/types/events';
import { populateEventStruct } from '@/utils/helpers/event';

export const useFetchEvents = (filterBy: string): UseQueryResult<IEvent[]> => {
  const { readAddressRegistry } = useAddressRegistry();
  const { readEvent } = useEventABI();

  return useQuery({
    queryKey: QUERY_KEYS_FACTORY.FETCH_EVENTS(filterBy),
    queryFn: async () => {
      const { result: addresses } = await readAddressRegistry({
        functionName: 'getAll',
        args: [],
      });

      if (!addresses || addresses.length === 0) {
        return [];
      }

      const eventDetailPromises = addresses.map((address: AddressType) =>
        readEvent({
          address: address,
          functionName: 'eventDetails',
          args: [],
        })
      );

      const results = await Promise.allSettled(eventDetailPromises);

      return results
        .filter(result => {
          if (result.status === 'rejected') {
            console.error('Failed to fetch event details:', result.reason);
            return false;
          }
          return true;
        })
        .map(result => {
          return populateEventStruct((result as PromiseFulfilledResult<any>).value.arrayLike)
        })
    },
  });
};