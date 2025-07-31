"use client";

import { PropsWithChildren } from 'react'
import { WagmiProvider as Wagmi } from 'wagmi'

import { wagmiConfig } from '@/config/wagmi'

export const WagmiProvider = ({ children }: PropsWithChildren) => {
  return (
    <Wagmi config={wagmiConfig} reconnectOnMount>
      {children}
    </Wagmi>
  )
}
