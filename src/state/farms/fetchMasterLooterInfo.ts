import BigNumber from 'bignumber.js'
import masterLooterABI from 'config/abi/masterlooter.json'
import { getMasterLooterAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'

export const fetchMultiplier = async (currentBlock) => {
  if (currentBlock <= 0) {
    return 0
  }

  const [multiplier] = await multicall(masterLooterABI, [
    {
      address: getMasterLooterAddress(),
      name: 'getMultiplier',
      params: [currentBlock, currentBlock + 1],
    },
  ])

  return Number(new BigNumber(multiplier).toJSON())
}

export const fetchNextHalving = async () => {
  const [halvingBlock0, halvingBlock1] = await multicall(masterLooterABI, [
    {
      address: getMasterLooterAddress(),
      name: 'HALVING_AT_BLOCK',
      params: [0],
    },
    {
      address: getMasterLooterAddress(),
      name: 'HALVING_AT_BLOCK',
      params: [1],
    },
  ])

  return Number(new BigNumber(halvingBlock1).minus(new BigNumber(halvingBlock0).toJSON()))
}
