'use client'

import {
  Config,
  createConfig,
  createStorage,
  deserialize,
  http,
  serialize
} from 'wagmi'
import { bahamut } from 'viem/chains'
import { injected, metaMask } from 'wagmi/connectors'
import { isClient } from '@/utils/helpers/global';


export const bahamutChain = {
  ...bahamut,
  hexId: '0x142d',
  api: {
    blockchainServiceProvider: 'Sahara'
  },
} as const

export const horizonChain = {
  id: 2552,
  network: 'horizon',
  name: 'Bahamut Horizon',
  nativeCurrency: { name: 'Fasttoken', symbol: 'FTN', decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        'https://rpc1-horizon.bahamut.io',
      ],
      webSocket: [
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'Ftnscan',
      url: 'https://www.horizon.ftnscan.com',
      apiUrl: 'https://www.dep.horizon.ftnscan.com/api',
    },
  },
  hexId: '0x9f8',
  api: {
    blockchainServiceProvider: 'Sahara'
  },
} as const

const transports = {
  [horizonChain.id]: http(horizonChain.rpcUrls.default.http[0])
} as const

const connectors = [injected(), metaMask()]

export const wagmiConfig: Config = createConfig({
  transports,
  chains: [horizonChain],
  cacheTime: 0,
  syncConnectedChain: true,
  storage: createStorage({
    storage: isClient ? window.localStorage : undefined,
    key: 'fastpass-wagmi-storage_',
    serialize,
    deserialize
  }),
  connectors
})

export const blockExplorerUrls = bahamut.blockExplorers

export const iconUrls = [
  'https://imgkub.com/images/2022/11/02/ftn-icon-m.png',
  'https://docs.fasttoken.com/ftn.svg'
]
export const BASE_CHAIN = horizonChain
