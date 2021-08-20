import { ThunkAction } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'
import { FarmConfig, LootMarketConfig, GuildConfig } from 'config/constants/types'
import BigNumber from 'bignumber.js'

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, State, unknown, AnyAction>

export type TranslatableText =
  | string
  | {
      key: string
      data?: {
        [key: string]: string | number
      }
    }

export type SerializedBigNumber = string

export interface Farm extends FarmConfig {
  tokenAmountMc?: SerializedBigNumber
  quoteTokenAmountMc?: SerializedBigNumber
  tokenAmountTotal?: SerializedBigNumber
  quoteTokenAmountTotal?: SerializedBigNumber
  lpTotalInQuoteToken?: SerializedBigNumber
  lpTotalSupply?: SerializedBigNumber
  percentLockupBonus?: number
  percentUnlockedBonus?: number
  tokenPriceVsQuote?: SerializedBigNumber
  poolWeight?: SerializedBigNumber
  baseEmissionRate?: SerializedBigNumber
  userDepositFee?: SerializedBigNumber
  poolRewardsPerBlock?: SerializedBigNumber
  userData?: {
    allowance: string
    tokenBalance: string
    stakedBalance: string
    earnings: string
  }
}

// Slices states
export interface MasterLooterState {
  nextHalving: number
  currentMultiplier: number
}

export interface FarmsState {
  data: Farm[]
  loadArchivedFarmsData: boolean
  userDataLoaded: boolean
  additionalInfo: MasterLooterState
}

// Block

export interface BlockState {
  currentBlock: number
  initialBlock: number
}

// Loot Market
export interface LootMarket extends LootMarketConfig {
  totalStaked?: BigNumber
  startBlock?: number
  endBlock?: number
  apr?: number
  stakingTokenPrice?: number
  earningTokenPrice?: number
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
  }
}
// Loot Market
export interface LootMarketState {
  data: LootMarket[]
  userDataLoaded: boolean
}

// Guilds
export interface Guild extends GuildConfig {
  tokenAmountMc?: SerializedBigNumber
  quoteTokenAmountMc?: SerializedBigNumber
  tokenAmountTotal?: SerializedBigNumber
  quoteTokenAmountTotal?: SerializedBigNumber
  lpTotalInQuoteToken?: SerializedBigNumber
  lpTotalSupply?: SerializedBigNumber
  tokenPriceVsQuote?: SerializedBigNumber
  poolWeight?: SerializedBigNumber
  percentLockupBonus?: number
  percentUnlockedBonus?: number
  baseEmissionRate?: SerializedBigNumber
  userDepositFee?: SerializedBigNumber
  poolRewardsPerBlock?: SerializedBigNumber
  allocPoint?: SerializedBigNumber
  userData?: {
    allowance: string
    tokenBalance: string
    stakedBalance: string
    earnings: string
  }
}

export interface GuildMasterLooterState {
  nextHalving: number
  currentMultiplier: number
}

// Slices states

export interface GuildState {
  data: Guild[]
  loadArchivedGuildsData: boolean
  userDataLoaded: boolean
  additionalInfo: GuildMasterLooterState
}

// Global state

export interface State {
  block: BlockState
  farms: FarmsState
  lootmarkets: LootMarketState
  guilds: GuildState
}
