import { useState } from 'react'
import { useAccount } from 'wagmi'

import { Box, Button, Flex, Text, useToast, VStack } from '@chakra-ui/react'

import { IConnector } from '@/common/types/connect'
import { Spinner } from '@/components/ui'
import { useWallets } from '@/hooks'
import { usePopup } from '@/providers/popupProvider'
import { useWalletConnect } from '@/providers/walletConnectProvider'
import {
  getAvailableConnectors,
  isMetaMaskAvailable,
  isYoWalletConnector
} from '@/utils/helpers/connect'
import { METAMASK_ERRORS } from '@/common/constants/errors';

const Connect = () => {
  const { connectWithEVMWallet } = useWalletConnect()
  const [connectorLoading, setConnectorLoading] = useState<string>('')
  const { onClose } = usePopup()
  const wallets = useWallets()
  const { isConnecting, isConnected } = useAccount()
  const toast = useToast()

  const yoWalletConnect = async (connector: IConnector) => {
    if (!isMetaMaskAvailable()) {
      window.location.href = 'fastex-wallet://'
    } else {
      setConnectorLoading(connector.id)
      await connectWithEVMWallet(connector)
      onClose()
    }
  }

  const connectHandler = async (connector: IConnector) => {
    try {
      setConnectorLoading(connector.id)

      // YoWallet
      if (isYoWalletConnector(connector.id)) {
        await yoWalletConnect(connector)
        return
      }

      await connectWithEVMWallet(connector)
      onClose()
    } catch (err: any) {
      console.log(err)
      setConnectorLoading('')
      if (err.code === METAMASK_ERRORS.userRejectedRequest.code) {
        toast({
          title: METAMASK_ERRORS.userRejectedRequest.message,
          status: 'warning'
        })
      }
      onClose()
    }
  }

  return (
    <VStack
      spacing="1.6rem"
      mt={4}
      w={{ base: '25rem', md: '35.2rem' }}
    >
      {getAvailableConnectors(wallets).map((wallet) => (
        <Button
          key={wallet.id}
          title={wallet.name}
          aria-label={`Connect with wallet ${wallet.name}`}
          w="full"
          justifyContent="center"
          isLoading={connectorLoading === wallet.id || isConnecting}
          spinner={
            <Spinner
              w="22px"
              h="22px"
              size="4px"
              color="var(--chakra-colors-blue-300)"
            />
          }
          variant="connect"
          display="flex"
          alignItems="center"
          fontSize="1.6rem"
          onClick={() => connectHandler(wallet)}
          textAlign="center"
        >
          <Flex
            w="full"
            alignItems="center"
            justifyContent={'flex-start'}
            gap={4}
          >
            <Box
              height="4rem"
              width="4rem"
              transition=".1s"
              willChange="width, height"
            >
              {wallet.icon}
            </Box>
            <Text fontSize="1.4rem" fontWeight={400}>
              {wallet.name}
            </Text>
          </Flex>
        </Button>
      ))}
    </VStack>
  )
}

export default Connect
