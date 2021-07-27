import BigNumber from 'bignumber.js'
import masterLooterABI from 'config/abi/masterlooter.json'
import { getGuildsMasterLooterAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'

export const fetchGuildMultiplier = async (guildSlug, currentBlock) => {
  if (currentBlock <= 0) {
    return 0
  }

  const [multiplier] = await multicall(masterLooterABI, [
    {
      address: getGuildsMasterLooterAddress(guildSlug),
      name: 'getMultiplier',
      params: [currentBlock, currentBlock + 1],
    },
  ])

  return Number(new BigNumber(multiplier).toJSON())
}

export const fetchGuildNextHalving = async (guildSlug) => {
  const [halvingBlock0, halvingBlock1] = await multicall(masterLooterABI, [
    {
      address: getGuildsMasterLooterAddress(guildSlug),
      name: 'HALVING_AT_BLOCK',
      params: [0],
    },
    {
      address: getGuildsMasterLooterAddress(guildSlug),
      name: 'HALVING_AT_BLOCK',
      params: [1],
    },
  ])

  return Number(new BigNumber(halvingBlock1).minus(new BigNumber(halvingBlock0).toJSON()))
}
