import { useMemo } from 'react'
import { Fraction, Token, TokenAmount } from '@lootswap/sdk'

import { BigNumber, utils } from 'ethers'
import { DUNGEON } from 'config/constants/dungeon'
import useGovernanceToken from './useGovernanceToken'
import { useTokenAmount } from './useTokenAmount'
import { useTokenContract } from './useContract'
import useSingleCallResult from './useSingleCallResult'
import useActiveWeb3React from './useActiveWeb3React'

/** returns undefined if input token is undefined, or fails to get token contract,
/* or contract total supply cannot be fetched
*/
export function useTotalSupplyAmount(token?: Token): TokenAmount | undefined {
  const contract = useTokenContract(token?.address, false)

  const totalSupply: BigNumber = useSingleCallResult(contract, 'totalSupply')?.result?.[0]

  return token && totalSupply ? new TokenAmount(token, totalSupply.toString()) : undefined
}

export function useDungeonToken(): Token | undefined {
  const { chainId } = useActiveWeb3React()
  return chainId ? DUNGEON[chainId] : undefined
}

export default function useDungeonRatio(): Fraction | undefined {
  const govToken = useGovernanceToken()
  const dungeon = useDungeonToken()
  const dungeonTotalSupply = useTotalSupplyAmount(dungeon)
  const dungeonGovTokenBalance = useTokenAmount(dungeon?.address, govToken)
  const multiplier = utils.parseEther('1').toString()

  return useMemo(() => {
    return dungeonGovTokenBalance && dungeonTotalSupply
      ? dungeonGovTokenBalance?.divide(dungeonTotalSupply?.raw.toString()).multiply(multiplier)
      : undefined
  }, [dungeonGovTokenBalance, dungeonTotalSupply, multiplier])
}
