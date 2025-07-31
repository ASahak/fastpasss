import { defineConfig } from '@wagmi/cli'
import { actions, react } from '@wagmi/cli/plugins'

import {
  Arevod__factory
} from './src/abis'

const capitalize = (s: string) =>
  String(s[0]).toUpperCase() + String(s).slice(1)


const contracts = [
  {
    name: Arevod__factory.name,
    abi: Arevod__factory.abi
  } as const
]

export default defineConfig({
  out: 'src/hooks/generated/abiHooks.ts',
  contracts,
  plugins: [
    actions({
      getActionName({ type, contractName, itemName }) {
        return `${capitalize(type)}${contractName?.replace('Factory', '')}${itemName || ''}`
      },
      overridePackageName: '@wagmi/core'
    }),
    react({
      getHookName({ contractName, type, itemName }) {
        return `use${capitalize(type)}${contractName?.replace('Factory', '')}${itemName || ''}`
      }
    })
  ]
})
