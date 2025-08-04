'use client'

import { memo, useState, useEffect } from 'react'
import {
  Box,
  Button,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useDisclosure,
  Text
} from '@chakra-ui/react'
import Skeleton from 'react-skeleton-builder'
import { usePopup } from '@/providers/popupProvider'
import { POPUP_TYPES } from '@/common/constants/popup'
import { useAccount, useBalance } from 'wagmi'
import { RxExit, RxTriangleDown } from 'react-icons/rx'
import { normalizeNumber, trimString } from '@/utils/helpers/global'
import { useWalletConnect } from '@/providers/walletConnectProvider'

const ConnectWalletBtn = () => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const { openPopup } = usePopup()
  const { disconnect } = useWalletConnect()
  const { address } = useAccount()
  const balance = useBalance({
    address
  })

  // This state ensures client-side logic runs only after hydration
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  const openConnect = () => {
    openPopup(POPUP_TYPES.CONNECT_WALLET, 'Connect Your Wallet', {})
  }

  // By checking for `isClient`, we ensure the server and initial client render match.
  // The connected state will only show after the component has mounted on the client.
  return isClient && address ? (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      variant="base"
      placement="bottom-end"
    >
      <PopoverTrigger>
        <Button
          variant="popover-btn"
          aria-label="Open user dropdown"
          rightIcon={<Icon as={RxTriangleDown} fontSize="1.6rem" />}
        >
          {trimString(address, 4, 4)}
        </Button>
      </PopoverTrigger>
      <Portal appendToParentPortal={false}>
        <PopoverContent w="20rem">
          <Box bgColor="gray.750" rounded="1rem" p={6}>
            <Text fontSize="1.6rem" color="white" mb={2}>
              Wallet Balance
            </Text>
            {balance.isLoading && !balance.data ? (
              <Skeleton
                styles={{ width: '100%', height: '100%' }}
                grid={{ h: '2rem', skeletons: [{ r: '.6rem' }] }}
              />
            ) : (
              <Text lineHeight="2rem" fontSize="1.5rem" color="gray.300">
                {normalizeNumber(balance.data!.formatted || 0, 5)}{' '}
                {balance.data!.symbol}
              </Text>
            )}
          </Box>
          <Button
            onClick={() => disconnect()}
            variant="unstyled"
            display="flex"
            alignItems="center"
            fontSize="1.6rem"
            gap={3}
            justifyContent="flex-start"
            mt={6}
          >
            <Icon as={RxExit} />
            Disconnect
          </Button>
        </PopoverContent>
      </Portal>
    </Popover>
  ) : (
    <Button variant="magenta" onClick={openConnect}>
      Connect Wallet
    </Button>
  )
}

export default memo(ConnectWalletBtn)
