import BigNumber from 'bignumber.js'
import lootMarketsConfig from 'config/constants/lootmarket'
import lootMarketsABI from 'config/abi/lootmarket.json'
import lootABI from 'config/abi/governancetoken.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'

export const fetchLootMarketsBlockLimits = async () => {
  const callsStartBlock = lootMarketsConfig.map((market) => {
    return {
      address: getAddress(market.contractAddress),
      name: 'startBlock',
    }
  })
  const callsEndBlock = lootMarketsConfig.map((market) => {
    return {
      address: getAddress(market.contractAddress),
      name: 'bonusEndBlock',
    }
  })

  let starts
  let ends
  try {
    starts = await multicall(lootMarketsABI, callsStartBlock)
    ends = await multicall(lootMarketsABI, callsEndBlock)
  } catch (error) {
    console.info('fetchLootMarketsBlockLimits: query block not yet synced')
  }

  return lootMarketsConfig.map((lootPoolConfig, index) => {
    const startBlock = starts ? starts[index] : 0
    const endBlock = ends ? ends[index] : 0
    return {
      pid: lootPoolConfig.pid,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
    }
  })
}

export const fetchLootMarketsTotalStaking = async () => {
  try {
    const callsStakingPools = lootMarketsConfig.map((market) => {
      return {
        address: getAddress(market.stakingToken.address),
        name: 'balanceOf',
        params: [getAddress(market.contractAddress)],
      }
    })

    const callsRewardPools = lootMarketsConfig.map((market) => {
      return {
        address: getAddress(market.earningToken.address),
        name: 'balanceOf',
        params: [getAddress(market.contractAddress)],
      }
    })

    const nonStakedPoolTotalStaked = await multicall(lootABI, callsStakingPools)
    const lootRewardPoolTotalStaked = await multicall(erc20ABI, callsRewardPools)

    return [
      ...lootMarketsConfig.map((p, index) => ({
        pid: p.pid,
        totalStaked: new BigNumber(nonStakedPoolTotalStaked[index]).toJSON(),
      })),
      ...lootMarketsConfig.map((p, index) => ({
        pid: p.pid,
        totalStaked: new BigNumber(lootRewardPoolTotalStaked[index]).toJSON(),
      })),
    ]
  } catch (error) {
    return [
      ...lootMarketsConfig.map((p) => ({
        pid: p.pid,
        totalStaked: new BigNumber(0).toJSON(),
      })),
      ...lootMarketsConfig.map((p) => ({
        pid: p.pid,
        totalStaked: new BigNumber(0).toJSON(),
      })),
    ]
  }
}
