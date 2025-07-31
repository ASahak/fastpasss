import { Event1Service } from '@/services/abiService';
import ContractService from '@/services/contractService';

export const ADDRESS_REGISTRY = '0xc136f61d4facf03294badf17380f2c7587fea3fa'

export const EVENT_CONTRACT_SERVICES_MAP: Record<string, ContractService<any>> = {
  '0x3238546f25770a3cb0166d443b04af5b9be7d49a': Event1Service
}