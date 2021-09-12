// eslint-disable-next-line
import tokens from './tokens'
// eslint-disable-next-line
import { LootMarketConfig, LootMarketCategory } from './types'

const lootMarkets: LootMarketConfig[] = [
  {
    pid: 0,
    stakingToken: tokens.loot,
    earningToken: tokens.troll,
    contractAddress: {
      1666600000: '0x64D0396Eb1c81B8e148703d62e514c40f0E7d1cA',
      1666700000: '',
    },
    lootMarketCategory: LootMarketCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '0.200000752466949',
    sortOrder: 1,
    isFinished: false,
  },
  {
    pid: 1,
    stakingToken: tokens.loot,
    earningToken: tokens.arb,
    contractAddress: {
      1666600000: '0xF5f8494937b791F9301c03D064a124e1f4d47327',
      1666700000: '',
    },
    lootMarketCategory: LootMarketCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '0.176924370404237',
    sortOrder: 1,
    isFinished: false,
  },
  {
    pid: 2,
    stakingToken: tokens.loot,
    earningToken: tokens.bard,
    contractAddress: {
      1666600000: '0x78c81230a8C17d65D56fAeDD6E63f75ddD74ea5B',
      1666700000: '',
    },
    lootMarketCategory: LootMarketCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '0.18097306358822',
    sortOrder: 1,
    isFinished: false,
  },
]

export default lootMarkets
