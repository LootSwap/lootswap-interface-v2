import { useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { farmsConfig, guildsConfig } from 'config/constants'
import { getWeb3NoAccount } from 'utils/web3'
import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import useRefresh from 'hooks/useRefresh'
import { filterFarmsByQuoteToken } from 'utils/farmsPriceHelpers'
import {
  fetchFarmsPublicDataAsync,
  fetchGuildsPublicDataAsync,
  fetchLootMarketsPublicDataAsync,
  fetchLootMarketsUserDataAsync,
  fetchGuildsMasterLooterAsync,
  fetchMasterLooterAsync,
  setBlock,
} from './actions'
import { State, Farm, FarmsState, LootMarket, GuildState, Guild } from './types'
import { fetchFarmUserDataAsync, nonArchivedFarms } from './farms'
import { fetchGuildUserDataAsync, nonArchivedGuilds } from './guilds'
import { transformLootMarket } from './lootmarket/helpers'

export const usePollFarmsData = (includeArchive = false) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const web3 = getWeb3NoAccount()
  const { account } = useWeb3React()

  useEffect(() => {
    const farmsToFetch = includeArchive ? farmsConfig : nonArchivedFarms
    const pids = farmsToFetch.map((farmToFetch) => farmToFetch.pid)

    dispatch(fetchFarmsPublicDataAsync(pids))

    if (account) {
      dispatch(fetchFarmUserDataAsync({ account, pids }))
    }
  }, [includeArchive, dispatch, slowRefresh, web3, account])
}

/**
 * Fetches the "core" farm data used globally
 * 9 = LOOT-BUSD LP
 */
export const usePollCoreFarmData = () => {
  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()
  const web3 = getWeb3NoAccount()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync([9])) // initially retrieve loot in busd amount and render information to home
  }, [dispatch, fastRefresh, web3])
}

export const usePollBlockNumber = () => {
  const dispatch = useAppDispatch()
  const web3 = getWeb3NoAccount()

  useEffect(() => {
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch, web3])
}

// Farms

export const useFarms = (): FarmsState => {
  const farms = useSelector((state: State) => state.farms)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromLpSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : BIG_ZERO,
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : BIG_ZERO,
  }
}

// Return a farm for a given token symbol. The farm is filtered based on attempting to return a farm with a quote token from an array of preferred quote tokens
export const useFarmFromTokenSymbol = (tokenSymbol: string, preferredQuoteTokens?: string[]): Farm => {
  const farms = useSelector((state: State) => state.farms.data.filter((farm) => farm.token.symbol === tokenSymbol))
  const filteredFarm = filterFarmsByQuoteToken(farms, preferredQuoteTokens)
  return filteredFarm
}

// Return the base token price for a farm, from a given pid
export const useBusdPriceFromPid = (pid: number): BigNumber => {
  const farm = useFarmFromPid(pid)
  return farm && new BigNumber(farm.token.busdPrice)
}

export const useBusdPriceFromToken = (tokenSymbol: string): BigNumber => {
  const tokenFarm = useFarmFromTokenSymbol(tokenSymbol)
  const tokenPrice = useBusdPriceFromPid(tokenFarm?.pid)
  return tokenPrice
}

export const useLpTokenPrice = (symbol: string) => {
  const farm = useFarmFromLpSymbol(symbol)
  const farmTokenPriceInUsd = useBusdPriceFromPid(farm.pid)
  let lpTokenPrice = BIG_ZERO

  if (farm.lpTotalSupply && farm.lpTotalInQuoteToken) {
    // Total value of base token in LP
    const valueOfBaseTokenInFarm = farmTokenPriceInUsd.times(farm.tokenAmountTotal)
    // Double it to get overall value in LP
    const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2)
    // Divide total value of all tokens, by the number of LP tokens
    const totalLpTokens = getBalanceAmount(new BigNumber(farm.lpTotalSupply))
    lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens)
  }

  return lpTokenPrice
}

export const useMasterLooterInfo = () => {
  const masterLooterInfo = useSelector((state: State) => state.farms.additionalInfo)
  const { initialBlock } = useSelector((state: State) => state.block)
  const dispatch = useAppDispatch()

  useEffect(() => {
    let isFetchingData = true
    if (isFetchingData && initialBlock > 0) {
      dispatch(fetchMasterLooterAsync({ currentBlock: initialBlock }))
    }

    isFetchingData = false
  }, [dispatch, initialBlock])

  return { ...masterLooterInfo, initialBlock }
}

// Pools

export const useFetchPublicLootMarketsData = () => {
  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()
  const web3 = getWeb3NoAccount()

  useEffect(() => {
    const fetchPoolsPublicData = async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      dispatch(fetchLootMarketsPublicDataAsync(blockNumber))
    }

    fetchPoolsPublicData()
  }, [dispatch, fastRefresh, web3])
}

export const useLootMarkets = (account): { lootmarkets: LootMarket[]; userDataLoaded: boolean } => {
  const { slowRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchLootMarketsUserDataAsync(account))
    }
  }, [account, dispatch, slowRefresh])

  const { lootmarkets, userDataLoaded } = useSelector((state: State) => ({
    lootmarkets: state.lootmarkets.data,
    userDataLoaded: state.lootmarkets.userDataLoaded,
  }))
  return { lootmarkets: lootmarkets.map(transformLootMarket), userDataLoaded }
}

export const usePoolFromPid = (pid: number): LootMarket => {
  const market = useSelector((state: State) => state.lootmarkets.data.find((p) => p.pid === pid))
  return transformLootMarket(market)
}

// Price

export const usePriceLootBusd = (): BigNumber => {
  // TODO rename function usePriceCakeBusd -> usePriceLootBusd
  const lootbusdFarm = useFarmFromPid(9) // loot <> busd
  return new BigNumber(lootbusdFarm.token.busdPrice)
}

// Block
export const useBlock = () => {
  return useSelector((state: State) => state.block)
}

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock)
}

// Guilds

export const usePriceGuildBusd = (guildSlug: string, useLootFarm: boolean, lootFarmPid?: number): BigNumber => {
  // UseLootFarm is set in the guildSettings config. if set to true it will use a specific loot farm to determine guild price
  // TODO: may need to refactor to take in more then one farm.
  const dispatch = useAppDispatch()

  useEffect(() => {
    let isBalance = true
    if (useLootFarm && isBalance) {
      dispatch(fetchFarmsPublicDataAsync([lootFarmPid]))
    }

    isBalance = false
  }, [dispatch, guildSlug, lootFarmPid, useLootFarm])

  let guildlootFarm = useGuildFromPid(0, guildSlug)
  const lootFarm = useFarmFromPid(lootFarmPid)
  if (lootFarm?.tokenPriceVsQuote) {
    guildlootFarm = { ...lootFarm, guildSlug }
  }

  const lootPriceBusd = usePriceLootBusd()
  const guildBusdPrice = guildlootFarm?.tokenPriceVsQuote
    ? lootPriceBusd.times(guildlootFarm.tokenPriceVsQuote)
    : BIG_ZERO
  return guildBusdPrice
}

export const usePollGuildsData = (includeArchive = false, guildSlug) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const web3 = getWeb3NoAccount()
  const { account } = useWeb3React()

  useEffect(() => {
    const guildToFetch = includeArchive ? guildsConfig : nonArchivedGuilds
    const guildSpecific = guildToFetch.filter((guild) => guild.guildSlug === guildSlug)
    const pids = guildSpecific.map((gtf) => gtf.pid)

    dispatch(fetchGuildsPublicDataAsync({ pids, guildSlug }))

    if (account) {
      dispatch(fetchGuildUserDataAsync({ account, pids, guildSlug }))
    }
  }, [includeArchive, dispatch, slowRefresh, web3, account, guildSlug])
}

export const useGuilds = (): GuildState => {
  const guilds = useSelector((state: State) => state.guilds)
  return guilds
}

export const useGuildFromPid = (pid, guildSlug): Guild => {
  const guild = useSelector((state: State) => state.guilds.data.find((f) => f.pid === pid && guildSlug === f.guildSlug))
  return guild
}

export const useGuildFromLpSymbol = (lpSymbol: string, guildSlug: string): Guild => {
  const guild = useSelector((state: State) =>
    state.guilds.data.find((f) => f.lpSymbol === lpSymbol && guildSlug === f.guildSlug),
  )
  return guild
}

export const useGuildMasterLooterInfo = (guildSlug) => {
  const masterLooterInfo = useSelector((state: State) => state.guilds.additionalInfo)
  const { initialBlock } = useSelector((state: State) => state.block)
  const dispatch = useAppDispatch()

  useEffect(() => {
    let isFetchingData = true
    if (isFetchingData && initialBlock > 0) {
      dispatch(fetchGuildsMasterLooterAsync({ guildSlug, currentBlock: initialBlock }))
    }

    isFetchingData = false
  }, [dispatch, guildSlug, initialBlock])

  return { ...masterLooterInfo, initialBlock }
}

export const useGuildUser = (pid, guildSlug) => {
  const guild = useGuildFromPid(pid, guildSlug)

  return {
    allowance: guild.userData ? new BigNumber(guild.userData.allowance) : BIG_ZERO,
    tokenBalance: guild.userData ? new BigNumber(guild.userData.tokenBalance) : BIG_ZERO,
    stakedBalance: guild.userData ? new BigNumber(guild.userData.stakedBalance) : BIG_ZERO,
    earnings: guild.userData ? new BigNumber(guild.userData.earnings) : BIG_ZERO,
  }
}

// Return the base token price for a farm, from a given pid
export const useBusdPriceFromPidGuild = (pid: number, guildSlug: string): BigNumber => {
  const guild = useGuildFromPid(pid, guildSlug)
  return guild && new BigNumber(guild.token.busdPrice)
}

export const useLpTokenPriceGuild = (symbol: string, guildSlug: string) => {
  const guild = useGuildFromLpSymbol(symbol, guildSlug)
  const guildTokenPriceInUsd = useBusdPriceFromPid(guild.pid)
  let lpTokenPrice = BIG_ZERO

  if (guild.lpTotalSupply && guild.lpTotalInQuoteToken) {
    // Total value of base token in LP
    const valueOfBaseTokenInGuild = guildTokenPriceInUsd.times(guild.tokenAmountTotal)
    // Double it to get overall value in LP
    const overallValueOfAllTokensInGuild = valueOfBaseTokenInGuild.times(2)
    // Divide total value of all tokens, by the number of LP tokens
    const totalLpTokens = getBalanceAmount(new BigNumber(guild.lpTotalSupply))
    lpTokenPrice = overallValueOfAllTokensInGuild.div(totalLpTokens)
  }

  return lpTokenPrice
}
