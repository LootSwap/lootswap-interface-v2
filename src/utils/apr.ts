import BigNumber from 'bignumber.js'
import { CAKE_PER_YEAR } from 'config'

/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param cakePriceUsd Loot price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
export const getFarmApr = (poolWeight: BigNumber, cakePriceUsd: BigNumber, poolLiquidityUsd: BigNumber): number => {
  const yearlyCakeRewardAllocation = CAKE_PER_YEAR.times(poolWeight)
  const apr = yearlyCakeRewardAllocation.times(cakePriceUsd).div(poolLiquidityUsd).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

export default null
