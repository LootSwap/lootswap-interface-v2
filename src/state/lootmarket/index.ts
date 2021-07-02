/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import lootMarketsConfig from 'config/constants/lootmarket'
import { LootMarketState, LootMarket, AppThunk } from 'state/types'
import { getLootMarketApr } from 'utils/apr'
import { getBalanceNumber } from 'utils/formatBalance'
import { getAddress } from 'utils/addressHelpers'
import { fetchLootMarketsBlockLimits, fetchLootMarketsTotalStaking } from './fetchLootMarkets'
import {
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
  fetchLootMarketsAllowance,
} from './fetchLootMarketsUser'
import { getTokenPricesFromFarm } from './helpers'

const initialState: LootMarketState = {
  data: [...lootMarketsConfig],
  userDataLoaded: false,
}

// Thunks
export const fetchLootMarketsPublicDataAsync = (currentBlock: number) => async (dispatch, getState) => {
  const blockLimits = await fetchLootMarketsBlockLimits()
  const totalStakings = await fetchLootMarketsTotalStaking()

  const prices = getTokenPricesFromFarm(getState().farms.data)

  const liveData = lootMarketsConfig.map((market) => {
    const blockLimit = blockLimits.find((entry) => entry.pid === market.pid)
    const totalStaking = totalStakings.find((entry) => entry.pid === market.pid)
    const isLootMarketEndBlockExceeded =
      currentBlock > 0 && blockLimit ? currentBlock > Number(blockLimit.endBlock) : false
    const isLootMarketFinished = market.isFinished || isLootMarketEndBlockExceeded

    const stakingTokenAddress = market.stakingToken.address
      ? getAddress(market.stakingToken.address).toLowerCase()
      : null
    const stakingTokenPrice = stakingTokenAddress ? prices[stakingTokenAddress] : 0

    const earningTokenAddress = market.earningToken.address
      ? getAddress(market.earningToken.address).toLowerCase()
      : null
    const earningTokenPrice = earningTokenAddress ? prices[earningTokenAddress] : 0

    const apr = !isLootMarketFinished
      ? getLootMarketApr(
          stakingTokenPrice,
          earningTokenPrice,
          getBalanceNumber(new BigNumber(totalStaking.totalStaked), market.stakingToken.decimals),
          parseFloat(market.tokenPerBlock),
        )
      : 0

    return {
      ...blockLimit,
      ...totalStaking,
      stakingTokenPrice,
      earningTokenPrice,
      apr,
      isFinished: isLootMarketFinished,
    }
  })

  dispatch(setLootMarketsPublicData(liveData))
}

export const fetchLootMarketsUserDataAsync =
  (account: string): AppThunk =>
  async (dispatch) => {
    const stakingTokenBalances = await fetchUserBalances(account)
    const stakedBalances = await fetchUserStakeBalances(account)
    const pendingRewards = await fetchUserPendingRewards(account)
    const allowances = await fetchLootMarketsAllowance(account)
    const userData = lootMarketsConfig.map((market) => ({
      pid: market.pid,
      allowance: allowances,
      stakingTokenBalance: stakingTokenBalances[market.pid],
      stakedBalance: stakedBalances[market.pid],
      pendingReward: pendingRewards[market.pid],
    }))

    dispatch(setLootMarketsUserData(userData))
  }

export const updateUserBalance =
  (pid: number, account: string): AppThunk =>
  async (dispatch) => {
    const tokenBalances = await fetchUserBalances(account)
    dispatch(updateLootMarketsUserData({ pid, field: 'stakingTokenBalance', value: tokenBalances[pid] }))
  }

export const updateUserAllowance =
  (pid: number, account: string): AppThunk =>
  async (dispatch) => {
    const allowances = await fetchLootMarketsAllowance(account)
    dispatch(updateLootMarketsUserData({ pid, field: 'allowance', value: allowances[pid] }))
  }

export const updateUserStakedBalance =
  (pid: number, account: string): AppThunk =>
  async (dispatch) => {
    const stakedBalances = await fetchUserStakeBalances(account)
    dispatch(updateLootMarketsUserData({ pid, field: 'stakedBalance', value: stakedBalances[pid] }))
  }

export const updateUserPendingReward =
  (pid: number, account: string): AppThunk =>
  async (dispatch) => {
    const pendingRewards = await fetchUserPendingRewards(account)
    dispatch(updateLootMarketsUserData({ pid, field: 'pendingReward', value: pendingRewards[pid] }))
  }

export const LootMarketsSlice = createSlice({
  name: 'Loot Markets',
  initialState,
  reducers: {
    setLootMarketsPublicData: (state, action) => {
      const liveLootMarketsData: LootMarket[] = action.payload
      state.data = state.data.map((market) => {
        const liveLootMarketData = liveLootMarketsData.find((entry) => entry.pid === market.pid)
        return { ...market, ...liveLootMarketData }
      })
    },
    setLootMarketsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((market) => {
        const userLootMarketData = userData.find((entry) => entry.pid === market.pid)
        return { ...market, userData: userLootMarketData }
      })
      state.userDataLoaded = true
    },
    updateLootMarketsUserData: (state, action) => {
      const { field, value, pid } = action.payload
      const index = state.data.findIndex((p) => p.pid === pid)

      if (index >= 0) {
        state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
      }
    },
  },
})

// Actions
export const { setLootMarketsPublicData, setLootMarketsUserData, updateLootMarketsUserData } = LootMarketsSlice.actions

export default LootMarketsSlice.reducer
