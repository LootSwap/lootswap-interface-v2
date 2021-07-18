import tokens from './tokens'
import { LootMarketConfig, LootMarketCategory } from './types'

const lootMarkets: LootMarketConfig[] = [
  {
    pid: 0,
    stakingToken: tokens.loot,
    earningToken: tokens.guest,
    contractAddress: {
      1666600000: '0xe1A7AC259128BD7b7cD40D7F8c323251bf945CDa',
      1666700000: '0x08DAFe21526DA06F74D1a9828Ac414505c0DceDf',
    },
    lootMarketCategory: LootMarketCategory.CORE,
    harvest: true,
    tokenPerBlock: '40',
    sortOrder: 1,
    isFinished: false,
  },
]

export default lootMarkets
