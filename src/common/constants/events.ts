import { Event1Service } from '@/services/abiService'
import ContractService from '@/services/contractService'

// export const ADDRESS_REGISTRY = '0xc136f61d4facf03294badf17380f2c7587fea3fa'
export const ADDRESS_REGISTRY = '0x226477833C2AB6306C047e5Bc2A85B93be3DAE8B'

export const EVENT_CONTRACT_SERVICES_MAP: Record<
  string,
  ContractService<any>
> = {
  '0x3238546f25770a3cb0166d443b04af5b9be7d49a': Event1Service,
  '0x1733a84089675a1c87d6e18de755308ce5f578cc': Event1Service,
  '0xb14b371ece9b9bb1ce9cf132c0b00efc63a1cde1': Event1Service
}
