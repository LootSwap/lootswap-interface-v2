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
  {
    pid: 3,
    stakingToken: tokens.loot,
    earningToken: tokens.loblox,
    contractAddress: {
      1666600000: '0x6C10302A1Fb02F2DD65182eaD6DcA090970Aa38C',
      1666700000: '',
    },
    lootMarketCategory: LootMarketCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '31301.2739896278000000',
    sortOrder: 1,
    isFinished: false,
  },
  {
    pid: 4,
    stakingToken: tokens.loot,
    earningToken: tokens.extralife,
    contractAddress: {
      1666600000: '0xcFcDcFFA3d872fc609fA84639005C23580ED0070',
      1666700000: '',
    },
    lootMarketCategory: LootMarketCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '0.4324419991032840',
    sortOrder: 1,
    isFinished: false,
  },
]

export default lootMarkets
