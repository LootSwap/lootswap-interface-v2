import lootMarketsConfig from 'config/constants/lootmarket'
import lootMarketABI from 'config/abi/lootmarket.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'

const lootStakingPools = lootMarketsConfig.filter((p) => p.stakingToken.symbol === 'LOOT')

export const fetchLootMarketsAllowance = async (account) => {
  const calls = lootStakingPools.map((p) => ({
    address: getAddress(p.stakingToken.address),
    name: 'allowance',
    params: [account, getAddress(p.stakingToken.address)],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return lootStakingPools.reduce(
    (acc, lootmarket, index) => ({ ...acc, [lootmarket.pid]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  const calls = lootStakingPools.map((p) => ({
    address: getAddress(p.stakingToken.address),
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalances = lootStakingPools.reduce(
    (acc, market, index) => ({ ...acc, [market.pid]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  return { ...tokenBalances }
}

export const fetchUserStakeBalances = async (account) => {
  try {
    const calls = lootStakingPools.map((p) => ({
      address: getAddress(p.contractAddress),
      name: 'userInfo',
      params: [account],
    }))
    const userInfo = await multicall(lootMarketABI, calls)
    const stakedBalances =
      userInfo &&
      lootStakingPools.reduce(
        (acc, market, index) => ({
          ...acc,
          [market.pid]: new BigNumber(userInfo[index].amount._hex).toJSON(),
        }),
        {},
      )

    return { ...stakedBalances }
  } catch (error) {
    console.info('fetchUserStakeBalances: block not yet sync')
    return () => ({})
  }
}

export const fetchUserPendingRewards = async (account) => {
  try {
    const calls = lootStakingPools.map((p) => ({
      address: getAddress(p.contractAddress),
      name: 'pendingReward',
      params: [account],
    }))

    const res = await multicall(lootMarketABI, calls)
    const pendingRewards = lootStakingPools.reduce(
      (acc, market, index) => ({
        ...acc,
        [market.pid]: new BigNumber(res[index]).toJSON(),
      }),
      {},
    )

    return { ...pendingRewards }
  } catch (error) {
    console.info('fetchUserPendingRewards: block not yet sync')
    return () => ({})
  }
}
