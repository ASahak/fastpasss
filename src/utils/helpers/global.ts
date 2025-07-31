import BigNumber from 'bignumber.js'
import { isMobile, isSafari } from 'react-device-detect';
import { METAMASK_DOWNLOAD_URL } from '@/common/constants/global';
import { METAMASK_ERRORS } from '@/common/constants/errors';
import { toBig } from '@/utils/helpers/bignumber'
import { formatUnits, parseUnits } from 'viem';

export const isClient = typeof window !== 'undefined';

export const getDAppUrl = () => {
  if (!isClient) return '';

  const { host, pathname, search } = window.location
  const pageUrlWithoutProtocol = encodeURI(host + pathname + search)

  const dappURl = isSafari && !isMobile ? METAMASK_DOWNLOAD_URL : 'dapp://'

  return `${dappURl}${pageUrlWithoutProtocol}`
}

export const userRejectedTx = (err: any) => {
  if (err.cause && err.cause.walk) {
    const { code } = err.cause.walk()
    if (code === METAMASK_ERRORS.userRejectedRequest.code) {
      return true
    }
  }

  return err.code === METAMASK_ERRORS.userRejectedRequest.code
}

export const sleep = (time?: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, time ?? 1000)
  })
}

export const trimString = (
  str: string,
  startCount: number = 5,
  endCount: number = 4
) => {
  const start = str.slice(0, startCount)
  const end = str.slice(str.length - endCount, str.length)
  return `${start}...${end}`
}

export const normalizeNumber = (
  number: string | number | BigNumber,
  precision = 4,
  isString = false
): string | number => {
  const fn = () => {
    try {
      let isNegative = false
      let bigNumber = new BigNumber(number)

      if (bigNumber.isNegative()) {
        bigNumber = bigNumber.abs()
        isNegative = true
      }

      if (
        toBig('0.' + '0'.repeat(precision - 1) + '1').isGreaterThan(bigNumber)
      ) {
        return !isString ? 0 : '0'
      }
      if (isNegative) {
        const floatNum = bigNumber
          .abs()
          .times(10 ** precision)
          .integerValue(BigNumber.ROUND_FLOOR)
          .dividedBy(10 ** precision)
        return !isString ? -floatNum.toNumber() : -floatNum.toString()
      }
      const floatNum = toBig(bigNumber.times(10 ** precision))
        .integerValue(BigNumber.ROUND_FLOOR)
        .dividedBy(10 ** precision)
      return !isString ? floatNum.toNumber() : floatNum.toString()
    } catch (error) {
      console.log(error)
    }
    if (number instanceof BigNumber) {
      return toBig(number).toString()
    }

    return number
  }

  const result = fn()
  if (result === 0 && number !== 0) {
    if (number instanceof BigNumber) {
      return toBig(number).toString()
    }

    return number
  }

  return result
}

export function parseUnitValue(
  value: string | number | bigint = 9,
  decimal: number | bigint | string
): bigint {
  decimal = Number(decimal) || 9
  if (typeof value === 'string' && !isNaN(Number(value))) {
    return parseUnits(value, decimal)
  }
  if (typeof value === 'number' && !isNaN(value)) {
    return parseUnits(value.toString(), decimal)
  }
  if (typeof value === 'bigint' && !isNaN(Number(value))) {
    return parseUnits(value.toString(), decimal)
  }
  return parseUnits(value.toString(), decimal)
}

export function formatUnitValue(
  value: string | number | bigint,
  decimal: number | bigint | string = 9
): string {
  try {
    if (typeof value !== 'bigint' && isNaN(Number(value))) {
      throw new Error(`Not a number: ${value}`)
    }

    return formatUnits(BigInt(value!), Number(decimal) || 9)
  } catch (err) {
    console.error(err)
    return ''
  }
}