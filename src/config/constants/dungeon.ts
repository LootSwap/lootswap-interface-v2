import { Interface } from '@ethersproject/abi'
import { abi as DUNGEON_ABI } from '@lootswap/contracts/build/Quests.json'
import { ChainId, Token } from '@lootswap/sdk'
import { ZERO_ONE_ADDRESS } from 'config'

export const DUNGEON: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, ZERO_ONE_ADDRESS, 18, 'aLOOT', 'AutoLoot'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, ZERO_ONE_ADDRESS, 18, 'aLOOT', 'AutoLoot'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, ZERO_ONE_ADDRESS, 18, 'aLOOT', 'AutoLoot'),
  [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, ZERO_ONE_ADDRESS, 18, 'aLOOT', 'AutoLoot'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, ZERO_ONE_ADDRESS, 18, 'aLOOT', 'AutoLoot'),
  [ChainId.BSC_MAINNET]: new Token(ChainId.BSC_MAINNET, ZERO_ONE_ADDRESS, 18, 'aLOOT', 'AutoLoot'),
  [ChainId.BSC_TESTNET]: new Token(ChainId.BSC_TESTNET, ZERO_ONE_ADDRESS, 18, 'aLOOT', 'AutoLoot'),
  [ChainId.HARMONY_MAINNET]: new Token(
    ChainId.HARMONY_MAINNET,
    '0xA15C7828Ab22D182383A84F828Cd71Ac09Bb55E8',
    18,
    'aLOOT',
    'AutoLoot',
  ),
  [ChainId.HARMONY_TESTNET]: new Token(ChainId.HARMONY_TESTNET, ZERO_ONE_ADDRESS, 18, 'aLOOT', 'AutoLoot'),
}

export const DUNGEON_SETTINGS: { [chainId in ChainId]: Record<string, string> } = {
  [ChainId.MAINNET]: { name: '', path: '' },
  [ChainId.RINKEBY]: { name: '', path: '' },
  [ChainId.ROPSTEN]: { name: '', path: '' },
  [ChainId.GÖRLI]: { name: '', path: '' },
  [ChainId.KOVAN]: { name: '', path: '' },
  [ChainId.BSC_MAINNET]: { name: 'AutoLoot', path: '/autoLoot' },
  [ChainId.BSC_TESTNET]: { name: 'AutoLoot', path: '/autoLoot' },
  [ChainId.HARMONY_MAINNET]: { name: 'AutoLoot', path: '/autoLoot' },
  [ChainId.HARMONY_TESTNET]: { name: 'AutoLoot', path: '/autoLoot' },
}

export const DUNGEON_INTERFACE = new Interface(DUNGEON_ABI)
