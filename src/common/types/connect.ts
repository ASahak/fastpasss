import { Connector } from 'wagmi'
import { AddressType } from '@/common/types/global';

export type IConnector = Connector & {
  name: string
  icon: string | React.ReactNode
}

export type ConnectChangeEvent = {
  accounts?: readonly AddressType[] | undefined
  chainId?: number | undefined
} & {
  uid: string
}
