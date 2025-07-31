import { providers } from 'ethers';


declare global {
  interface Window {
    ReactNativeWebView?: any
    yoWallet: {
      tokenList?: string[]
      isYoWallet: boolean
      address: string
      themeMode: 'dark' | 'light'
    }
    ethereum?: providers.EIP1193Provider;
  }
}
