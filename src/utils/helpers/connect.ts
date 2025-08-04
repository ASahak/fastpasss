import { isMobile, isMobileSafari, isSafari } from 'react-device-detect'

import { ConnectorsWithTypes } from '@/common/constants/connect'
import { IConnector } from '@/common/types/connect'
import { isClient } from '@/utils/helpers/global'

export const isWalletConnectConnector = (connectorId?: string) =>
  ConnectorsWithTypes.WALLET_CONNECT.indexOf(
    connectorId as ConnectorsWithTypes
  ) > -1

export const isMetaMaskConnector = (connectorId?: string) =>
  ConnectorsWithTypes.METAMASK.indexOf(connectorId as ConnectorsWithTypes) > -1

export const isInjectedConnector = (connectorId?: string) =>
  ConnectorsWithTypes.INJECTED.indexOf(connectorId as ConnectorsWithTypes) > -1

export const isOneKeyConnector = (connectorId?: string) =>
  ConnectorsWithTypes.ONE_KEY.indexOf(connectorId as ConnectorsWithTypes) > -1

export const isYoWalletConnector = (connectorId?: string) =>
  ConnectorsWithTypes.YO_WALLET.indexOf(connectorId as ConnectorsWithTypes) > -1

export const isMetaMaskAvailable = () =>
  isClient && !!window?.ethereum?.isMetaMask

export const isOneKeyAvailable = () =>
  isClient && Object.hasOwn(window.ethereum || {}, 'isOneKey')

export const isYoWalletBrowser: boolean =
  isClient &&
  isMobile &&
  isMetaMaskAvailable() &&
  Object.hasOwn(window, 'isYoWallet')

export const isOneKeyWalletBrowser: boolean =
  isClient && isMobile && isOneKeyAvailable()

export function getAvailableConnectors(wallets: IConnector[]): IConnector[] {
  if (!isClient) return []

  const isDesktopSafari = isSafari && !isMobileSafari

  return wallets.filter((wallet, _, self) => {
    if (isMetaMaskConnector(wallet.id)) {
      if (isDesktopSafari) return false
      if (
        isMobile &&
        self.some((w) => isYoWalletConnector(w.id) || isOneKeyConnector(w.id))
      )
        return !isYoWalletBrowser || !isOneKeyWalletBrowser

      return true
    } else if (isOneKeyConnector(wallet.id)) {
      return isMobile ? isOneKeyWalletBrowser : isOneKeyAvailable()
    } else if (isYoWalletConnector(wallet.id)) {
      return isYoWalletBrowser
    }

    return true
  })
}
