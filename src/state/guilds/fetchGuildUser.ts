import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterLooterABI from 'config/abi/masterlooter.json'
import multicall from 'utils/multicall'
import { getAddress, getGuildsMasterLooterAddress } from 'utils/addressHelpers'
import { GuildConfig } from 'config/constants/types'

export const fetchGuildUserAllowances = async (account: string, guildsToFetch: GuildConfig[]) => {
  const calls = guildsToFetch.map((guild) => {
    const guildContractAddress = getGuildsMasterLooterAddress(guild.guildSlug)
    const lpContractAddress = getAddress(guild.lpAddresses)
    return { address: lpContractAddress, name: 'allowance', params: [account, guildContractAddress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchGuildUserTokenBalances = async (account: string, guildsToFetch: GuildConfig[]) => {
  const calls = guildsToFetch.map((guild) => {
    const lpContractAddress = getAddress(guild.lpAddresses)
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchGuildUserStakedBalances = async (account: string, guildsToFetch: GuildConfig[]) => {
  const calls = guildsToFetch.map((guild) => {
    const guildContractAddress = getGuildsMasterLooterAddress(guild.guildSlug)
    return {
      address: guildContractAddress,
      name: 'userInfo',
      params: [guild.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterLooterABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchGuildUserEarnings = async (account: string, guildsToFetch: GuildConfig[]) => {
  const calls = guildsToFetch.map((guild) => {
    const guildContractAddress = getGuildsMasterLooterAddress(guild.guildSlug)
    return {
      address: guildContractAddress,
      name: 'pendingReward',
      params: [guild.pid, account],
    }
  })

  const rawEarnings = await multicall(masterLooterABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
