import BigNumber from 'bignumber.js'

BigNumber.config({
  EXPONENTIAL_AT: 1e9,
  DECIMAL_PLACES: 30
})

if(typeof window !== 'undefined') {
  ;(window as any).BigNumber = BigNumber
}

export const formatNumberWithPrecision = (value: number | string): string => {
  const res = new BigNumber(value)

  return res.toFormat()
}

export const toBig = (
  value: string | number | BigNumber,
  handleEmptyValue?: boolean
): BigNumber => {
  if (
    handleEmptyValue &&
    (value === '' || (value instanceof BigNumber && value.toString() === ''))
  ) {
    return new BigNumber(0)
  }

  return new BigNumber(value)
}
