import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'
import { lootMarketConfig } from 'config/constants'

// Addresses
import { getCakeAddress, getMasterChefAddress, getAddress } from 'utils/addressHelpers'

// ABI
import bep20Abi from 'config/abi/erc20.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import cakeAbi from 'config/abi/governancetoken.json'
import masterChefAbi from 'config/abi/masterchef.json'
import lootMarketAbi from 'config/abi/lootmarket.json'

import { DEFAULT_GAS_PRICE } from 'config'
import { getSettings, getGasPriceInWei } from './settings'

const getContract = (abi: any, address: string, web3?: Web3, account?: string) => {
  const _web3 = web3 ?? web3NoAccount
  const gasPrice = account ? getSettings(account).gasPrice : DEFAULT_GAS_PRICE

  return new _web3.eth.Contract(abi as unknown as AbiItem, address, {
    gasPrice: getGasPriceInWei(gasPrice).toString(),
  })
}

// TODO refactor name of the function getBep20Contract -> getErc20Contract
export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi, address, web3)
}
export const getLpContract = (address: string, web3?: Web3) => {
  return getContract(lpTokenAbi, address, web3)
}

// TODO refactor name of the function getCakeContract -> getLootContract
export const getCakeContract = (web3?: Web3) => {
  return getContract(cakeAbi, getCakeAddress(), web3)
}

// TODO refactor name of the function getMasterchefContract -> getMasterLooterContract
export const getMasterchefContract = (web3?: Web3) => {
  return getContract(masterChefAbi, getMasterChefAddress(), web3)
}

export const getLootMarketContract = (id: number, web3?: Web3) => {
  const config = lootMarketConfig.find((m) => m.pid === id)
  return getContract(lootMarketAbi, getAddress(config.contractAddress), web3)
}
