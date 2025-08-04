import type { IAddress } from '@/common/types/global'
import type { UseReadContractProps } from '@/common/types/contract'
import { type IEventABI } from '@/services/abiService'
import { EVENT_CONTRACT_SERVICES_MAP } from '@/common/constants/events'

export const useEventABI = () => {
  const readEvent = async (contractProps: ContractProps) => {
    console.log()
    const _service =
      EVENT_CONTRACT_SERVICES_MAP[contractProps.address.toLowerCase()]

    if (!_service) throw new Error('ContractService not found!')

    return await _service.extendedReadContract({
      address: contractProps.address,
      args: contractProps.args,
      functionName: contractProps.functionName as never
    })
  }

  return { readEvent }
}

type ContractProps = UseReadContractProps<IEventABI, IAddress>
