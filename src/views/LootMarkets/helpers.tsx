import BigNumber from 'bignumber.js'
import { LootMarket } from 'state/types'
import { getBalanceNumber, getFullDisplayBalance, getDecimalAmount } from 'utils/formatBalance'

export const convertSharesToLoot = (
  shares: BigNumber,
  lootPerFullShare: BigNumber,
  decimals = 18,
  decimalsToRound = 3,
) => {
  const sharePriceNumber = getBalanceNumber(lootPerFullShare, decimals)
  const amountInLoot = new BigNumber(shares.multipliedBy(sharePriceNumber))
  const lootAsNumberBalance = getBalanceNumber(amountInLoot, decimals)
  const lootAsBigNumber = getDecimalAmount(new BigNumber(lootAsNumberBalance), decimals)
  const lootAsDisplayBalance = getFullDisplayBalance(amountInLoot, decimals, decimalsToRound)
  return { lootAsNumberBalance, lootAsBigNumber, lootAsDisplayBalance }
}

export const convertLootToShares = (
  loot: BigNumber,
  lootPerFullShare: BigNumber,
  decimals = 18,
  decimalsToRound = 3,
) => {
  const sharePriceNumber = getBalanceNumber(lootPerFullShare, decimals)
  const amountInShares = new BigNumber(loot.dividedBy(sharePriceNumber))
  const sharesAsNumberBalance = getBalanceNumber(amountInShares, decimals)
  const sharesAsBigNumber = getDecimalAmount(new BigNumber(sharesAsNumberBalance), decimals)
  const sharesAsDisplayBalance = getFullDisplayBalance(amountInShares, decimals, decimalsToRound)
  return { sharesAsNumberBalance, sharesAsBigNumber, sharesAsDisplayBalance }
}

const MANUAL_POOL_COMPOUND_FREQUENCY = 1

export const getAprData = (lootmarket: LootMarket) => {
  const { earningTokenPrice, apr } = lootmarket
  // special handling for tokens like tBTC or BIFI where the daily token rewards for $1000 dollars will be less than 0.001 of that token
  const isHighValueToken = Math.round(earningTokenPrice / 1000) > 0
  const roundingDecimals = isHighValueToken ? 4 : 2

  //   Estimate & manual for now. 288 = once every 5 mins. We can change once we have a better sense of this
  const compoundFrequency = MANUAL_POOL_COMPOUND_FREQUENCY

  return { apr, isHighValueToken, roundingDecimals, compoundFrequency }
}

export const getLootMarketBlockInfo = (lootmarket: LootMarket, currentBlock: number) => {
  const { startBlock, endBlock, isFinished } = lootmarket
  const shouldShowBlockCountdown = Boolean(!isFinished && startBlock && endBlock)
  const blocksUntilStart = Math.max(startBlock - currentBlock, 0)
  const blocksRemaining = Math.max(endBlock - currentBlock, 0)
  const hasPoolStarted = blocksUntilStart === 0 && blocksRemaining > 0
  const blocksToDisplay = hasPoolStarted ? blocksRemaining : blocksUntilStart
  return { shouldShowBlockCountdown, blocksUntilStart, blocksRemaining, hasPoolStarted, blocksToDisplay }
}
