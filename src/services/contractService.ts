import { BrowserProvider } from 'ethers'
import { type Abi, Account, Chain, Client, Transport } from 'viem'
import { encodeFunctionData } from 'viem'

import { getConnectorClient, type GetPublicClientReturnType } from '@wagmi/core'
import { getPublicClient, readContract, writeContract } from '@wagmi/core'

import type {
  AddressType,
  IAddress,
} from '@/common/types/global'
import type {
  UseReadContractProps,
  UseWriteContractProps
} from '@/common/types/contract'
import { BASE_CHAIN, wagmiConfig } from '@/config/wagmi'

type EstimateGasProps = {
  account: `0x${string}`
  to: `0x${string}`
  data: any
  value: bigint | number
}

type writeContractReturnType = Promise<
  { result: unknown; arrayLike: unknown[]; encodeABI: () => AddressType } & {
    estimateGas: (p: EstimateGasProps) => Promise<bigint>
  }
>

class ContractService<T extends Abi> {
  private readonly _abi: readonly unknown[]
  private readonly _publicClient: GetPublicClientReturnType

  constructor(abi: T | readonly unknown[]) {
    this._abi = abi
    this._publicClient = getPublicClient(wagmiConfig)
  }

  async getSigner() {
    const client: Client<Transport, Chain, Account> = await getConnectorClient(
      wagmiConfig,
      { chainId: BASE_CHAIN.id }
    ) // todo this must be dynamic when we support multichain

    const { account, chain, transport } = client
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address
    }
    const provider = new BrowserProvider(transport, network)
    return await provider.getSigner(account.address)
  }

  get getABI() {
    return this._abi
  }

  async extendedReadContract<A>(
    contractReadProps: UseReadContractProps<T, A>
  ): Promise<any> {
    const { address, functionName, args } =
      contractReadProps as UseReadContractProps<typeof this._abi, A> & IAddress

    try {
      const functionAbi = this._getFunctionAbi(functionName)
      if (!functionAbi) {
        throw new Error(`Function ${functionName} not found in ABI.`)
      }

      const result: Awaited<any> = await readContract(wagmiConfig, {
        address,
        abi: this._abi,
        functionName,
        args: args!
      })
      const transformedResult = this._transformResult(functionAbi, result)

      return {
        result: result,
        arrayLike: transformedResult
      }
    } catch (error) {
      console.error(`Error calling ${functionName}:`, error)
      throw error
    }
  }

  async extendedWriteContract<A extends Partial<IAddress>>(
    contractWriteProps: UseWriteContractProps<T, A>
  ): writeContractReturnType {
    const { address, functionName, args } = contractWriteProps

    try {
      const functionAbi = this._getFunctionAbi(functionName)

      if (!functionAbi) {
        throw new Error(`Function ${functionName} not found in ABI.`)
      }

      if (address) {
        const result: Awaited<any> = await writeContract(wagmiConfig, {
          address,
          abi: this._abi as any,
          functionName,
          args: args!,
          chainId: BASE_CHAIN.id
        })

        const transformedResult = this._transformResult(functionAbi, result)
        return {
          result: result,
          arrayLike: transformedResult,
          encodeABI: () => {
            return this._encodeABI<any>({ functionName, args })
          },
          estimateGas: this._estimateGas
        }
      } else {
        throw new Error(`Address not found in.`)
      }
    } catch (e) {
      console.error(`Error calling ${functionName}:`, e)
      throw e
    }
  }

  _encodeABI<A>(encodeABIProps: Partial<UseWriteContractProps<T, A>>) {
    const { functionName, args } = encodeABIProps

    return encodeFunctionData({
      abi: this._abi,
      functionName,
      args
    })
  }

  async _estimateGas({
    account,
    to,
    value,
    data
  }: EstimateGasProps): Promise<bigint> {
    return await this._publicClient!.estimateGas({
      account,
      to,
      value: BigInt(value),
      data
    })
  }

  // helpers
  _transformResult(functionAbi: any, result: unknown[] | object) {
    if (!Array.isArray(result)) return result

    if (functionAbi.outputs && functionAbi.outputs.length) {
      const keys = functionAbi.outputs.map(
        (output: any) => output.name || output.type
      )
      if (keys.every((key: string) => key)) {
        return keys.reduce((acc: any, key: string, idx: number) => {
          acc[idx] = result[idx]
          acc[key] = result[idx]
          return acc
        }, [])
      }
    }
    return result
  }

  _getFunctionAbi(functionName: string | any) {
    return (this._abi as []).find(
      (item: any) => item.type === 'function' && item.name === functionName
    )
  }
}

export default ContractService
