'use client'

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  Connector,
  useAccount,
  useConfig,
  useConnect,
  useDisconnect,
  useSwitchChain
} from 'wagmi'
import { isMobile } from 'react-device-detect'
import { hexToNumber, numberToHex } from 'viem'
import { bahamut } from 'wagmi/chains'

import { useToast } from '@chakra-ui/react'
import { StorageUtil } from '@reown/appkit-controllers/utils'
import { useQueryClient } from '@tanstack/react-query'

import {
  ErrorCodes,
  Errors,
  METAMASK_ERRORS,
} from '@/common/constants/errors'
import {
  BAHAMUT_CHAIN_ID,
  METAMASK_DOWNLOAD_URL,
  ZERO_ADDRESS
} from '@/common/constants/global'
import { ConnectStatus } from '@/common/enums/connect'
import { ConnectChangeEvent } from '@/common/types/connect'
import {
  useLiveStates,
  useWallets
} from '@/hooks'
import { getDAppUrl, userRejectedTx } from '@/utils/helpers/global'
import { isMetaMaskAvailable } from '@/utils/helpers/connect'
import { errorToUserReadable } from '@/utils/helpers/errors'
import {
  deleteQueryCaches,
  reFetchQueryCalls
} from '@/utils/helpers/query'

export interface WalletConnectContextType {
  providerName: string
  connectStatus: ConnectStatus
  disconnect: () => Promise<void>
  setIsBahamutNetwork: (isBahamut: boolean) => void
  isBahamutNetwork: boolean
  connectWithEVMWallet: (
    connector: Connector,
  ) => Promise<void>
  addOrSwitchBahamutToMetamask: () => Promise<void>
}

export const WalletConnectContext = createContext<
  WalletConnectContextType | undefined
>(undefined)

export const useWalletConnect = (): WalletConnectContextType => {
  const context = useContext(WalletConnectContext)

  if (context === undefined) {
    throw new Error(
      'useWalletConnect must be used within a WalletConnectProvider'
    )
  }

  return context
}

export const WalletConnectProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const wallets = useWallets()
  const queryClient = useQueryClient()
  const [isBahamutNetwork, setIsBahamutNetwork] = useState(false)
  const [connectStatus, setConnectStatus] = useState(ConnectStatus.IDLE)
  const { chainId, address, isConnected, connector } = useAccount()
  const { connectAsync } = useConnect()
  const config = useConfig()
  const { switchChainAsync, chains } = useSwitchChain()
  const { disconnectAsync: disconnectWagmi } = useDisconnect()
  const liveStates = useLiveStates({
    address: address,
    wallets,
  })

  const toast = useToast()

  const addOrSwitchBahamutToMetamask = async () => {
    if (!address && window.ethereum) {
      const chain = chains.find((x) => x.id === BAHAMUT_CHAIN_ID)
      if (!chain) throw new Error('Not configured chain!')

      const providerChainId = await window.ethereum.request({
        method: 'eth_chainId'
      })
      if (BAHAMUT_CHAIN_ID === hexToNumber(providerChainId)) {
        throw { type: Errors.ALREADY_CONNECTED }
      }

      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: numberToHex(BAHAMUT_CHAIN_ID) }]
        })
      } catch (error: any) {
        if (error.code === ErrorCodes.UNRECOGNIZED_CHAIN_ERROR_CODE) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: numberToHex(BAHAMUT_CHAIN_ID),
                  chainName: bahamut.name,
                  nativeCurrency: bahamut.nativeCurrency,
                  rpcUrls: bahamut.rpcUrls.default.http,
                  blockExplorerUrls: [bahamut.blockExplorers.default]
                }
              ]
            })
          } catch (err: any) {
            if (userRejectedTx(err)) {
              throw {
                type: METAMASK_ERRORS.userRejectedRequest.code,
                message: METAMASK_ERRORS.userRejectedRequest.message
              }
            }
            console.log(`Failed to add network due to: ${err.message}`)
          }
        } else if (userRejectedTx(error)) {
          throw {
            type: METAMASK_ERRORS.userRejectedRequest.code,
            message: METAMASK_ERRORS.userRejectedRequest.message
          }
        }
      }

      return
    }

    await switchChainAsync({ chainId: BAHAMUT_CHAIN_ID })
  }

  const connectWithEVMWallet = async (
    connector: Connector,
  ) => {
    try {
      setConnectStatus(ConnectStatus.STARTED)
      await disconnect(connector)
      if (!isMetaMaskAvailable()) {
        if (!isMobile) {
          window.open(METAMASK_DOWNLOAD_URL, '_blank', 'noopener,noreferrer')
        } else {
          window.location.href = getDAppUrl()
        }
      } else {
        await connectAsync({ connector })
      }
    } catch (error: any) {
      console.log(error)
      if (userRejectedTx(error)) {
          toast({
            title: METAMASK_ERRORS.userRejectedRequest.message,
            status: 'error'
          })
        } else {
          await disconnect(connector)
          const errorMessage = errorToUserReadable(error)
          toast({
            status: 'error',
            title: errorMessage
          })
        }

    } finally {
      setConnectStatus(ConnectStatus.FINISHED)
    }
  }

  const handleChainChanged = async (chainId: number) => {
    setIsBahamutNetwork(chainId === BAHAMUT_CHAIN_ID)
  }

  const handleAccountChanged = async (newAddress: string) => {
    if (
      newAddress.toLowerCase() !==
      (liveStates.current.address || ZERO_ADDRESS).toLowerCase()
    ) {
      await deleteQueryCaches(queryClient)
      reFetchQueryCalls(queryClient)
    }
  }

  const disconnect = async (_connector?: Connector) => {
    try {
      await disconnectWagmi({ connector: _connector || connector })

      /*REOWN_ISSUE: We have to clear appkit storage because wagmi doesn't handle it: BUG*/
      StorageUtil.deleteActiveCaipNetworkId()

      // We have to be make sure that all the connections terminated
      // We have injected case and sometimes there show up multiple connections
      // That is why we have to remove by custom way as well
      // This code belongs to wagmi
      config.setState((x) => ({
        ...x,
        connections: new Map(),
        current: null,
        status: 'disconnected'
      }))
      // ----

      setConnectStatus(ConnectStatus.IDLE)
      await deleteQueryCaches(queryClient)
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    const handleConnectorUpdate = (data: ConnectChangeEvent) => {
      if (data?.accounts?.length) {
        handleAccountChanged(data?.accounts[0])
      } else if (data?.chainId && isConnected) {
        handleChainChanged(data.chainId)
      }
    }

    connector?.emitter?.on?.('change', handleConnectorUpdate)
    return () => connector?.emitter?.off?.('change', handleConnectorUpdate)
  }, [connector, isConnected, chainId])

  useEffect(() => {
    setIsBahamutNetwork(chainId === BAHAMUT_CHAIN_ID)
  }, [chainId])

  return (
    <WalletConnectContext.Provider
      value={{
        providerName: bahamut.name,
        isBahamutNetwork,
        connectStatus,
        setIsBahamutNetwork,
        disconnect,
        connectWithEVMWallet,
        addOrSwitchBahamutToMetamask,
      }}
    >
      {children}
    </WalletConnectContext.Provider>
  )
}
