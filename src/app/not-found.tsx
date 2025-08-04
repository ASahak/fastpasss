'use client'

import { useRouter } from 'next/navigation'
import { Text, Heading, VStack, Button } from '@chakra-ui/react'

export default function NotFound() {
  const router = useRouter()

  return (
    <VStack
      spacing={8}
      h="full"
      w="full"
      justifyContent="center"
      alignItems="center"
    >
      <Heading fontSize="4rem">404</Heading>
      <Text fontSize="1.8rem">
        Sorry, we couldn’t find the page you’re looking for. It might have been
        moved, deleted, or maybe it never existed.
      </Text>
      <Button onClick={() => router.back()} variant="magenta">
        Go back
      </Button>
    </VStack>
  )
}
