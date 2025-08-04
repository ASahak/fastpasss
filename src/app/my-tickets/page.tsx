'use client'

import dynamic from 'next/dynamic'
import { VStack } from '@chakra-ui/react'
import { AuthGuard } from '@/components/features'

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

const MyTickets = dynamic(
  () => import('@/containers/myTickets').then((m) => m.default),
  {
    ssr: true
  }
)

export default function Page() {
  return (
    <VStack spacing={0} h="full" w="full">
      {/*<FilterTags/>*/}
      <AuthGuard>
        <MyTickets />
      </AuthGuard>
    </VStack>
  )
}
