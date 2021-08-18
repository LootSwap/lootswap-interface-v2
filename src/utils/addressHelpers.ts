import addresses from 'config/constants/contracts'
import tokens from 'config/constants/tokens'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const mainNetChainId = 1666600000
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

export const getCakeAddress = () => {
  return getAddress(tokens.loot.address)
}
export const getMasterLooterAddress = () => {
  return getAddress(addresses.masterLooter)
}
export const getGuildsMasterLooterAddress = (guildSlug: string) => {
  if (guildSlug === 'gg') {
    return getAddress(addresses.masterLooterGG)
  }
  if (guildSlug === 'troll') {
    return getAddress(addresses.masterLooterTROLL)
  }
  if (guildSlug === 'arb') {
    return getAddress(addresses.masterLooterARB)
  }
  if (guildSlug === 'bard') {
    return getAddress(addresses.masterLooterBARD)
  }
  if (guildSlug === 'cosmic') {
    return getAddress(addresses.masterLooterCOSMIC)
  }
  return null
}
export const getGuildsTokenAddress = (guildSlug: string) => {
  if (guildSlug === 'gg') {
    return getAddress(tokens.gg.address)
  }
  if (guildSlug === 'troll') {
    return getAddress(tokens.troll.address)
  }
  if (guildSlug === 'arb') {
    return getAddress(tokens.arb.address)
  }
  if (guildSlug === 'bard') {
    return getAddress(tokens.bard.address)
  }
  if (guildSlug === 'cosmic') {
    return getAddress(tokens.cosmic.address)
  }
  return null
}
export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}
export const getWbnbAddress = () => {
  return getAddress(tokens.wbnb.address)
}
export const getWoneAddress = () => {
  return getAddress(tokens.wone.address)
}
