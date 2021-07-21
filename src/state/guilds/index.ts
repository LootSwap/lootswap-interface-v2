/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import guildsConfig from 'config/constants/guilds'
import isArchivedPid from 'utils/guildHelpers'
import BigNumber from 'bignumber.js'
import fetchGuilds from './fetchGuilds'
import fetchGuildsPrices from './fetchGuildsPrices'
import {
  fetchGuildUserEarnings,
  fetchGuildUserAllowances,
  fetchGuildUserTokenBalances,
  fetchGuildUserStakedBalances,
  fetchGuildUserInfo,
  fetchBlockDeltaStartStages,
  fetchBlockDeltaEndStages,
  fetchDevFeeStages,
} from './fetchGuildUser'
import { GuildState, Guild } from '../types'

const noAccountGuildConfig = guildsConfig.map((guild) => ({
  ...guild,
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

const initialState: GuildState = { data: noAccountGuildConfig, loadArchivedGuildsData: false, userDataLoaded: false }

export const nonArchivedGuilds = guildsConfig.filter(({ pid, guildSlug }) => !isArchivedPid(pid, guildSlug))

// Async thunks
export const fetchGuildsPublicDataAsync = createAsyncThunk<Guild[], { pids: number[]; guildSlug: string }>(
  'guilds/fetchGuildsPublicDataAsync',
  async ({ pids, guildSlug }) => {
    const guildsToFetch = guildsConfig.filter(
      (guildConfig) => pids.includes(guildConfig.pid) && guildConfig.guildSlug === guildSlug,
    )
    const guilds = await fetchGuilds(guildsToFetch)
    const guildsWithPrices = await fetchGuildsPrices(guilds)
    return guildsWithPrices
  },
)

interface GuildUserDataResponse {
  pid: number
  guildSlug: string
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

export const fetchGuildUserDataAsync = createAsyncThunk<
  GuildUserDataResponse[],
  { account: string; pids: number[]; guildSlug: string }
>('guilds/fetchGuildUserDataAsync', async ({ account, pids, guildSlug }) => {
  const guildsToFetch = guildsConfig.filter(
    (guildConfig) => pids.includes(guildConfig.pid) && guildConfig.guildSlug === guildSlug,
  )
  const userGuildAllowances = await fetchGuildUserAllowances(account, guildsToFetch)
  const userGuildTokenBalances = await fetchGuildUserTokenBalances(account, guildsToFetch)
  const userStakedBalances = await fetchGuildUserStakedBalances(account, guildsToFetch)
  const userInfo = await fetchGuildUserInfo(account, guildsToFetch)
  const userGuildEarnings = await fetchGuildUserEarnings(account, guildsToFetch)
  // TODO: (three var below) these are getting called with every pid.
  // we might need to create another fetchDataAsync call that only needs to call this once per guild contract
  const blockDeltaStartStages = await fetchBlockDeltaStartStages(guildsToFetch)
  const blockDeltaEndStages = await fetchBlockDeltaEndStages(guildsToFetch)
  const devFeeStage = await fetchDevFeeStages(guildsToFetch)

  return userGuildAllowances.map((guildAllowance, index) => {
    return {
      pid: guildsToFetch[index].pid,
      allowance: userGuildAllowances[index],
      tokenBalance: userGuildTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userGuildEarnings[index],
      guildSlug,
      blockdelta: userInfo[index].blockdelta,
      firstDepositBlock: userInfo[index].firstDepositBlock,
      lastDepositBlock: userInfo[index].lastDepositBlock,
      lastWithdrawBlock: userInfo[index].lastWithdrawBlock,
      blockDeltaStartStages: blockDeltaStartStages[index].map((bdss) => new BigNumber(bdss).toNumber()),
      blockDeltaEndStages: blockDeltaEndStages[index].map((bdes) => new BigNumber(bdes).toNumber()),
      devFeeStage: devFeeStage[index].map((dfs) => new BigNumber(dfs).toNumber()),
    }
  })
})

export const guildsSlice = createSlice({
  name: 'Guilds',
  initialState,
  reducers: {
    setLoadArchivedGuildsData: (state, action) => {
      const loadArchivedGuildsData = action.payload
      state.loadArchivedGuildsData = loadArchivedGuildsData
    },
  },
  extraReducers: (builder) => {
    // Update guilds with live data
    builder.addCase(fetchGuildsPublicDataAsync.fulfilled, (state, action) => {
      state.data = state.data.map((guild) => {
        const liveGuildData = action.payload.find((guildData) => guildData.pid === guild.pid)
        return { ...guild, ...liveGuildData }
      })
    })

    // Update guilds with user data
    builder.addCase(fetchGuildUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { pid } = userDataEl
        const index = state.data.findIndex((guild) => guild.pid === pid)
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
      state.userDataLoaded = true
    })
  },
})

// Actions
export const { setLoadArchivedGuildsData } = guildsSlice.actions

export default guildsSlice.reducer
