import { errorCodes, getMessageFromCode } from '@metamask/rpc-errors'

export enum Errors {
  NO_METAMASK = 'NO_METAMASK',
  WRONG_NETWORK = 'WRONG_NETWORK',
  ALREADY_CONNECTED = 'ALREADY_CONNECTED',
  UNSUPPORTED = 'UNSUPPORTED',
  NO_EXIST_ARGUMENT = 'NO_EXIST_ARGUMENT',
  NO_VALID_ARGUMENT = 'NO_VALID_ARGUMENT',
  ARGUMENT_IS_EMPTY = 'ARGUMENT_IS_EMPTY',
  INVALID_LISTENER_KEY = 'INVALID_LISTENER_KEY',
  INVALID_LISTENER_CALLBACK = 'INVALID_LISTENER_CALLBACK',
  TIMEOUT = 'TIMEOUT',
  METAMASK_LOCKED = 'METAMASK_LOCKED',
  METAMASK_ALREADY_PROCESSING = 'METAMASK_ALREADY_PROCESSING',
  NETWORK_NOT_FOUND_FROM_CONFIG = 'NETWORK_NOT_FOUND_FROM_CONFIG',
  MISSING_NETWORK_PROPERTY_FROM_CONFIG = 'MISSING_NETWORK_PROPERTY_FROM_CONFIG',
  NOT_FOUND_ADDABLE_NETWORKS_FROM_CONFIG = 'NOT_FOUND_ADDABLE_NETWORKS_FROM_CONFIG',
  ACCOUNTS_NOT_FOUND = 'ACCOUNTS_NOT_FOUND',
  NOT_CONNECTED = 'NOT_CONNECTED',
  NOT_FOUND = 'NOT_FOUND',
  NO_ADDABLE_NETWORKS = 'NO_ADDABLE_NETWORKS',
  METAMASK_IS_PROCESSING = 'METAMASK_IS_PROCESSING'
}
export enum ErrorCodes {
  UNRECOGNIZED_CHAIN_ERROR_CODE = 4902
}

export const METAMASK_ERRORS = (() => {
  const store = { ...errorCodes.rpc, ...errorCodes.provider }
  const collectedErrors: { [key: string]: { code: number; message: string } } =
    {}

  Object.keys(store).forEach((key) => {
    const code = store[key as keyof typeof store]
    const errorValue = getMessageFromCode(code)
    if (errorValue) {
      collectedErrors[key] = {
        code: code,
        message: errorValue
      }
    }
  })

  return collectedErrors
})()

export const CUSTOM_MESSAGES = {
  UNKNOWN_ERROR: 'Something went wrong!',
  [ErrorCodes.UNRECOGNIZED_CHAIN_ERROR_CODE]: 'Network not found!'
} as const

if (typeof window !== 'undefined') {
  ;(window as any).CONNECTION_ERRORS = {
    METAMASK_ERRORS
  }
}
