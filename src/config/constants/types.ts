export interface Address {
  1666700000?: string
  1666600000?: string
  97?: string
  56?: string
}

export interface Token {
  symbol: string
  address?: Address
  decimals?: number
  projectLink?: string
  busdPrice?: string
}

export interface FarmConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  token: Token
  quoteToken: Token
  multiplier?: string
  isCommunity?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface GuildConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  token: Token
  quoteToken: Token
  multiplier?: string
  isCommunity?: boolean
  guildSlug: string
  startBlock?: number
  lastRewardBlock?: string
  helperId?: number
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export type Images = {
  lg: string
  md: string
  sm: string
  ipfs?: string
}

export type PageMeta = {
  title: string
  description?: string
  image?: string
}

export enum LootMarketCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
  'AUTO' = 'Auto',
}

export interface LootMarketConfig {
  pid: number
  earningToken: Token
  stakingToken: Token
  contractAddress: Address
  lootMarketCategory: LootMarketCategory
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  enableEmergencyWithdraw?: boolean
}
