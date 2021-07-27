/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import farmsConfig from 'config/constants/farms'
import isArchivedPid from 'utils/farmHelpers'
import BigNumber from 'bignumber.js'
import priceHelperLpsConfig from 'config/constants/priceHelperLps'
import fetchFarms from './fetchFarms'
import fetchFarmsPrices from './fetchFarmsPrices'
import {
  fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
  fetchUserInfo,
  fetchBlockDeltaStartStages,
  fetchBlockDeltaEndStages,
  fetchDevFeeStages,
} from './fetchFarmUser'
import { fetchMultiplier, fetchNextHalving } from './fetchMasterLooterInfo'
import { FarmsState, Farm } from '../types'

const noAccountFarmConfig = farmsConfig.map((farm) => ({
  ...farm,
  userData: {
    allowance: '0',
    tokenBalance: '0',
    stakedBalance: '0',
    earnings: '0',
    blockdelta: 0,
    firstDepositBlock: 0,
    lastDepositBlock: 0,
    lastWithdrawBlock: 0,
    blockDeltaStartStages: [],
    blockDeltaEndStages: [],
    devFeeStage: [],
  },
}))

const noMasterlooterInfo = {
  nextHalving: 0,
  currentMultiplier: 0,
}

const initialState: FarmsState = {
  data: noAccountFarmConfig,
  loadArchivedFarmsData: false,
  userDataLoaded: false,
  additionalInfo: noMasterlooterInfo,
}

export const nonArchivedFarms = farmsConfig.filter(({ pid }) => !isArchivedPid(pid))

// Async thunks
export const fetchFarmsPublicDataAsync = createAsyncThunk<Farm[], number[]>(
  'farms/fetchFarmsPublicDataAsync',
  async (pids) => {
    const farmsToFetch = farmsConfig.filter((farmConfig) => pids.includes(farmConfig.pid))

    // Add price helper farms
    const farmsWithPriceHelpers = farmsToFetch.concat(priceHelperLpsConfig)

    const farms = await fetchFarms(farmsWithPriceHelpers)
    const farmsWithPrices = await fetchFarmsPrices(farms)

    // Filter out price helper LP config farms
    const farmsWithoutHelperLps = farmsWithPrices.filter((farm: Farm) => {
      return farm.pid || farm.pid === 0
    })

    return farmsWithoutHelperLps
  },
)

interface FarmUserDataResponse {
  pid: number
  allowance: string
  tokenBalance: string
  stakedBalance: string
  earnings: string
  blockdelta: number
  firstDepositBlock: number
  lastDepositBlock: number
  lastWithdrawBlock: number
  blockDeltaStartStages: any
  blockDeltaEndStages: any
  devFeeStage: any
}

export const fetchFarmUserDataAsync = createAsyncThunk<FarmUserDataResponse[], { account: string; pids: number[] }>(
  'farms/fetchFarmUserDataAsync',
  async ({ account, pids }) => {
    const farmsToFetch = farmsConfig.filter((farmConfig) => pids.includes(farmConfig.pid))
    const userFarmAllowances = await fetchFarmUserAllowances(account, farmsToFetch)
    const userFarmTokenBalances = await fetchFarmUserTokenBalances(account, farmsToFetch)
    const userStakedBalances = await fetchFarmUserStakedBalances(account, farmsToFetch)
    const userFarmEarnings = await fetchFarmUserEarnings(account, farmsToFetch)
    const userInfo = await fetchUserInfo(account, farmsToFetch)
    // TODO: (three var below) these are getting called with every pid.
    // we might need to create another fetchDataAsync call that only needs to call this once per guild contract
    const blockDeltaStartStages = await fetchBlockDeltaStartStages(farmsToFetch)
    const blockDeltaEndStages = await fetchBlockDeltaEndStages(farmsToFetch)
    const devFeeStage = await fetchDevFeeStages(farmsToFetch)
    return userFarmAllowances.map((farmAllowance, index) => {
      return {
        pid: farmsToFetch[index].pid,
        allowance: userFarmAllowances[index],
        tokenBalance: userFarmTokenBalances[index],
        stakedBalance: userStakedBalances[index],
        earnings: userFarmEarnings[index],
        blockdelta: userInfo[index].blockdelta,
        firstDepositBlock: userInfo[index].firstDepositBlock,
        lastDepositBlock: userInfo[index].lastDepositBlock,
        lastWithdrawBlock: userInfo[index].lastWithdrawBlock,
        blockDeltaStartStages: blockDeltaStartStages[index].map((bdss) => new BigNumber(bdss).toNumber()),
        blockDeltaEndStages: blockDeltaEndStages[index].map((bdes) => new BigNumber(bdes).toNumber()),
        devFeeStage: devFeeStage[index].map((dfs) => new BigNumber(dfs).toNumber()),
      }
    })
  },
)

interface MasterLooterInfoDataResponse {
  nextHalving: number
  currentMultiplier: number
}

// Async thunks
export const fetchMasterLooterAsync = createAsyncThunk<MasterLooterInfoDataResponse, { currentBlock: number }>(
  'guilds/fetchMasterLooterAsync',
  async ({ currentBlock }) => {
    const currentMultiplier = await fetchMultiplier(currentBlock)
    const nextHalving = await fetchNextHalving()
    return {
      nextHalving,
      currentMultiplier,
    }
  },
)

export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setLoadArchivedFarmsData: (state, action) => {
      const loadArchivedFarmsData = action.payload
      state.loadArchivedFarmsData = loadArchivedFarmsData
    },
  },
  extraReducers: (builder) => {
    // Update farms with live data
    builder.addCase(fetchFarmsPublicDataAsync.fulfilled, (state, action) => {
      state.data = state.data.map((farm) => {
        const liveFarmData = action.payload.find((farmData) => farmData.pid === farm.pid)
        return { ...farm, ...liveFarmData }
      })
    })

    // Update farms with user data
    builder.addCase(fetchFarmUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { pid } = userDataEl
        const index = state.data.findIndex((farm) => farm.pid === pid)
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
      state.userDataLoaded = true
    })

    // Update guilds with multiplier data
    builder.addCase(fetchMasterLooterAsync.fulfilled, (state, action) => {
      const masterInfo = action.payload
      state.additionalInfo = { ...state.additionalInfo, ...masterInfo }
    })
  },
})

// Actions
export const { setLoadArchivedFarmsData } = farmsSlice.actions

export default farmsSlice.reducer
