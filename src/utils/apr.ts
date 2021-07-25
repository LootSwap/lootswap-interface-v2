import BigNumber from 'bignumber.js'
import { BLOCKS_PER_YEAR } from 'config'

/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param lootPriceUsd Loot price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
export const getFarmApr = (
  poolWeight: BigNumber,
  lootPriceUsd: BigNumber,
  poolLiquidityUsd: BigNumber,
  baseEmissionRate: BigNumber,
): number => {
  // 1 * baseEmissionRate * BLOCKS_PER_YEAR * poolWeight * lootPriceUsd / poolLiquidityUsd * 100
  const yearlyLootRewardAllocation = baseEmissionRate.times(BLOCKS_PER_YEAR).times(poolWeight)
  const apr = yearlyLootRewardAllocation.times(lootPriceUsd).div(poolLiquidityUsd).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new loot allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export const getLootMarketApr = (
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  tokenPerBlock: number,
): number => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR)
  const totalStakingTokenInLootMarket = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInLootMarket).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

/**
 * Get guild APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param guildPriceUsd guild price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @param guildTokenPerBlock guilds reward per block
 * @returns
 */
export const getGuildApr = (
  poolWeight: BigNumber,
  guildPriceUsd: BigNumber,
  poolLiquidityUsd: BigNumber,
  guildTokenPerBlock: number,
  baseEmissionRate: BigNumber,
): number => {
  // eslint-disable-next-line
  const tokenPerBlock = new BigNumber(guildTokenPerBlock)
  const yearlyGuildRewardAllocation = baseEmissionRate.times(BLOCKS_PER_YEAR).times(poolWeight)
  const apr = yearlyGuildRewardAllocation.times(guildPriceUsd).div(poolLiquidityUsd).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

export default null
