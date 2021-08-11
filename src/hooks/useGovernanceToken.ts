import { ChainId, Token } from '@lootswap/sdk'
import useActiveWeb3React from './useActiveWeb3React'

export const ZERO_ONE_ADDRESS = '0x0000000000000000000000000000000000000001'

const GOVERNANCE_TOKEN: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, ZERO_ONE_ADDRESS, 18, 'LOOT', 'Loot'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, ZERO_ONE_ADDRESS, 18, 'LOOT', 'Loot'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, ZERO_ONE_ADDRESS, 18, 'LOOT', 'Loot'),
  [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, ZERO_ONE_ADDRESS, 18, 'LOOT', 'Loot'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, ZERO_ONE_ADDRESS, 18, 'LOOT', 'Loot'),
  [ChainId.BSC_MAINNET]: new Token(ChainId.BSC_MAINNET, ZERO_ONE_ADDRESS, 18, 'LOOT', 'Loot'),
  [ChainId.BSC_TESTNET]: new Token(ChainId.BSC_TESTNET, ZERO_ONE_ADDRESS, 18, 'LOOT', 'Loot'),
  [ChainId.HARMONY_MAINNET]: new Token(
    ChainId.HARMONY_MAINNET,
    '0xbDa99C8695986B45a0dD3979cC6f3974D9753D30',
    18,
    'LOOT',
    'Loot',
  ),
  [ChainId.HARMONY_TESTNET]: new Token(ChainId.HARMONY_TESTNET, ZERO_ONE_ADDRESS, 18, 'LOOT', 'Loot'),
}

export default function useGovernanceToken(): Token | undefined {
  const { chainId } = useActiveWeb3React()
  return chainId ? GOVERNANCE_TOKEN[chainId] : undefined
}
