import { useMemo } from 'react'
import { Connector, useConnectors } from 'wagmi'

import Image from 'next/image'

import metamaskIcon from '@/assets/metamask.svg'
import yoWalletIconSrc from '@/assets/yowallet.svg'
import { ConnectorsWithTypes } from '@/common/constants/connect'
import { IConnector } from '@/common/types/connect'
import { isClient } from '@/utils/helpers/global'

const supportedWallets: Partial<Record<ConnectorsWithTypes, any>> = {
  [ConnectorsWithTypes.METAMASK]: {
    name: 'Metamask',
    icon: (
      <Image width={40} height={40} alt="metamask connect" src={metamaskIcon} />
    )
  },
  [ConnectorsWithTypes.YO_WALLET]: {
    name: 'YoWallet',
    icon: (
      <Image
        width={40}
        height={40}
        alt="yowallet connect"
        src={yoWalletIconSrc}
      />
    )
  }
}
export const useWallets = (): IConnector[] => {
  const connectors = useConnectors()

  return useMemo(() => {
    if (!isClient) return []
    ;(window as any)._connectors_ = connectors //temp assignment for checking logs

    const _wallets: IConnector[] = connectors
      .map((connector: Connector) => {
        const availableWallet =
          supportedWallets[
            ConnectorsWithTypes.YO_WALLET
          ].name.toLowerCase() /* TODO temp check for our wallet because yoWallet's id is the same as onekey*/
        const walletId =
          connector.name.toLowerCase() === availableWallet
            ? ConnectorsWithTypes.YO_WALLET
            : Object.keys(supportedWallets).find(
                // where id is comma seperated list
                (id) =>
                  id
                    .split(',')
                    .map((i) => i.trim())
                    .indexOf(connector.id) !== -1
              )

        if (walletId) {
          return {
            ...connector,
            ...supportedWallets[walletId as ConnectorsWithTypes]
          }
        }
      })
      .filter(Boolean)

    ;(window as any)._wallets_ = _wallets //temp assignment for checking logs
    return _wallets
  }, [connectors])
}
