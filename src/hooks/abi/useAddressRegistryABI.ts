import type { UseReadContractProps } from '@/common/types/contract'
import {
  type IAddressRegistryABI,
  AddressRegistryService
} from '@/services/abiService'
import { ADDRESS_REGISTRY } from '@/common/constants/events';

export const useAddressRegistry = () => {
  const readAddressRegistry = async (contractProps: ContractProps) => {
    return await AddressRegistryService.extendedReadContract({
      address: ADDRESS_REGISTRY,
      args: contractProps.args,
      functionName: contractProps.functionName
    })
  }

  return { readAddressRegistry }
}

type ContractProps = UseReadContractProps<IAddressRegistryABI>
