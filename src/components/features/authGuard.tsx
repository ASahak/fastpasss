'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { ROUTES } from '@/common/constants/routes'
import { Spinner, Center } from '@chakra-ui/react'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { address, isConnecting, isReconnecting, status } = useAccount()

  const isLoading = status === 'connecting' || isReconnecting || isConnecting

  useEffect(() => {
    if (!isLoading && !address) {
      router.replace(ROUTES.EVENTS)
    }
  }, [address, isLoading, router])

  if (isLoading || !address) {
    return (
      <Center h="100%" w="100%">
        <Spinner
          w="22px"
          h="22px"
          size="4px"
          color="var(--chakra-colors-blue-300)"
        />
      </Center>
    )
  }

  return <>{children}</>
}

export default AuthGuard
