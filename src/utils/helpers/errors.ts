import { CUSTOM_MESSAGES, METAMASK_ERRORS } from '@/common/constants/errors'
import { CustomErrorType } from '@/common/types/global'

export const getErrorMessageFromConnector = (
  error: CustomErrorType
): string | undefined => {
  const { code, message } = error
  let result: string | undefined = Object.values(METAMASK_ERRORS).find(
    ({ code: _code }) => code === _code
  )?.message

  if (!result && message) {
    result = message
  }

  return result
}

export const errorToUserReadable = (error: CustomErrorType): string => {
  if (error?.code && error?.message) {
    if (CUSTOM_MESSAGES[error.code as never]) {
      return CUSTOM_MESSAGES[error.code as never]
    }
    return getErrorMessageFromConnector(error) ?? CUSTOM_MESSAGES.UNKNOWN_ERROR
  }

  return CUSTOM_MESSAGES.UNKNOWN_ERROR
}
