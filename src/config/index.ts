import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'

// TODO: needs to be refactored (rename)
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const BSC_BLOCK_TIME = 2

// CAKE_PER_BLOCK details
// 40 CAKE is minted per block
// 20 CAKE per block is sent to Burn pool (A farm just for burning cake)
// 10 CAKE per block goes to CAKE syrup pool
// 10 CAKE per block goes to Yield farms and lottery
// CAKE_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// CAKE/Block in src/views/Home/components/CakeStats.tsx = 20 (40 - Amount sent to burn pool)

export const CAKE_PER_BLOCK = new BigNumber(40)
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365) // 10512000
export const CAKE_PER_YEAR = CAKE_PER_BLOCK.times(BLOCKS_PER_YEAR)
export const BASE_URL = 'https://lootswap.finance'
export const BASE_EXCHANGE_URL = 'https://legacy.lootswap.finance'
export const BASE_SWAP_URL = `${BASE_EXCHANGE_URL}/#/swap`
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`
export const BASE_BSC_SCAN_URL = 'https://bscscan.com'
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 2000000000
export const DEFAULT_GAS_PRICE = 1

export const BASE_HARMONY_SCAN_URL = 'https://explorer.harmony.one'

// Additional
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const ZERO_ONE_ADDRESS = '0x0000000000000000000000000000000000000001'
export const ZERO_DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD'
export const DISPLAY_DECIMAL_FORMAT_PREF = 6
