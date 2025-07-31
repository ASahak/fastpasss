'use client'

import dynamic from 'next/dynamic';
import { VStack } from '@chakra-ui/react';
import { useEventsStore } from '@/store/events';
import { useFetchEvents } from '@/hooks/queries/useFetchEvents';

// const FilterTags = dynamic(() => import('@/containers/events/filterTags').then(m => m.default), {
//   loading: () => <Skeleton
//     styles={{ width: "100%", height: "100%", paddingBottom: '2.4rem' }}
//     grid={{
//       repeatCount: 7,
//       h: "3.6rem",
//       withOpacity: true,
//       skeletons: [{ r: "2.4rem" }]
//     }}
//   />,
//   ssr: true,
// }); /*todo temp hide*/

const Events = dynamic(() => import('@/containers/events').then(m => m.default), {
  ssr: true,
});

export default function Page() {
  const filterBy = useEventsStore(state => state.activeFilter)
  const data = useFetchEvents(filterBy)

  return (
    <VStack spacing={0} w="full">
      {/*<FilterTags/>*/}
      <Events loading={data.isLoading} data={data.data} />
    </VStack>
  );
}
