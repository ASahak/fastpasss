import {
  Arevod__factory,
  AddressRegistry__factory
} from '@/abis/factories'
import ContractService from '@/services/contractService'

export type IEvent1ABI = typeof Arevod__factory.abi
export const Event1Service = new ContractService<IEvent1ABI>(
  Arevod__factory.abi
)

export type IEventABI = IEvent1ABI

export type IAddressRegistryABI = typeof AddressRegistry__factory.abi
export const AddressRegistryService = new ContractService<IAddressRegistryABI>(
  AddressRegistry__factory.abi
)

