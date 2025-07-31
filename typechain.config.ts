import { join } from 'path'

export default {
  outDir: './src/utils/types/_generated/',
  target: 'ethers-v6',
  contracts: [join(__dirname, './src/services/abi/**/*.json')]
}
