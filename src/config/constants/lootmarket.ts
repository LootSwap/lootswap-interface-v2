import tokens from './tokens'
import { LootMarketConfig, LootMarketCategory } from './types'

const lootMarkets: LootMarketConfig[] = [
  {
    pid: 0,
    stakingToken: tokens.loot,
    earningToken: tokens.guest,
    contractAddress: {
      1666600000: '0xe1A7AC259128BD7b7cD40D7F8c323251bf945CDa',
      1666700000: '',
    },
    lootMarketCategory: LootMarketCategory.CORE,
    harvest: true,
    tokenPerBlock: '40',
    sortOrder: 1,
    isFinished: true,
  },
  {
    pid: 1,
    stakingToken: tokens.loot,
    earningToken: tokens.guest,
    contractAddress: {
      1666600000: '0x1bF93A0E8C84D8F9AFd87e78EaEF54C150Bf91C0',
      1666700000: '',
    },
    lootMarketCategory: LootMarketCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '40',
    sortOrder: 1,
    isFinished: false,
  },
]

export default lootMarkets
