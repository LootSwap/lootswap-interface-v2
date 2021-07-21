import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const HARMONY_BLOCK_TIME = 2

// LOOT_PER_BLOCK details
export const LOOT_PER_BLOCK = new BigNumber(1) // TODO: Why is it that changing to 31.9141 is more accurate
export const BLOCKS_PER_YEAR = new BigNumber((60 / HARMONY_BLOCK_TIME) * 60 * 24 * 365)
export const LOOT_PER_YEAR = LOOT_PER_BLOCK.times(BLOCKS_PER_YEAR)

export const BASE_URL = 'https://lootswap.finance'
export const BASE_EXCHANGE_URL = 'https://legacy.lootswap.finance'
export const BASE_SWAP_URL = `${BASE_EXCHANGE_URL}/#/swap`
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`

export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 2000000000
export const DEFAULT_GAS_PRICE = 1

export const BASE_HARMONY_SCAN_URL = 'https://explorer.harmony.one'

// Additional
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const ZERO_ONE_ADDRESS = '0x0000000000000000000000000000000000000001'
export const ZERO_DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD'
export const DISPLAY_DECIMAL_FORMAT_PREF = 6
