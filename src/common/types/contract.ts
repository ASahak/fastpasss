// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AbiType } from 'abitype/dist/types/utils'

import { AddressType } from '@/common/types/global'

type IsFunction<T> = T extends {
  type: 'function'
  name: string
  outputs: Array<{ internalType: 'bytes32' }>
}
  ? false
  : T extends { type: 'function'; name: string }
    ? true
    : false

type args =
  | readonly [`0x${string}`, `0x${string}`]
  | readonly [`0x${string}`]
  | readonly [`0x${string}`, bigint, bigint]
  | readonly [`0x${string}`, `0x${string}`, bigint]
  | readonly [`0x${string}`, `0x${string}`, `0x${string}`]
  | readonly [`0x${string}`, `0x${string}`, `0x${string}`, bigint]
  | readonly any[]
  | any[]

type ExtractFunctionNames<T extends args> = {
  [K in keyof T]: T[K] extends { type: 'function'; name: infer N }
    ? IsFunction<T[K]> extends true
      ? N extends string // Ensure N is a string
        ? N
        : never
      : never
    : never
}[number]

export type UseReadContractProps<Abi extends AbiType, Address = object> = {
  args?: args
  chainId?: number
  address?: AddressType
  functionName: ExtractFunctionNames<Abi>
} & Address

export type UseWriteContractProps<Abi extends AbiType, Address = object> = {
  args?: args
  chainId?: number | string | null | undefined
  functionName: ExtractFunctionNames<Abi>
} & Address
