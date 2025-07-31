export type AddressType = `0x${string}`

export type CustomErrorType = {
  code?: number
  message: string
} & Error

export type IAddress = {
  address: AddressType
}