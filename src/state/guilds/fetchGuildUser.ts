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

export const fetchGuildUserInfo = async (account: string, guildsToFetch: GuildConfig[]) => {
  const calls = guildsToFetch.map((guild) => {
    const guildContractAddress = getGuildsMasterLooterAddress(guild.guildSlug)
    return {
      address: guildContractAddress,
      name: 'userInfo',
      params: [guild.pid, account],
    }
  })

  const userInfo = await multicall(masterLooterABI, calls)
  const userInfoObject = userInfo.map((user) => {
    return {
      blockdelta: user.blockdelta.toNumber(),
      lastWithdrawBlock: user.lastWithdrawBlock.toNumber(),
      firstDepositBlock: user.firstDepositBlock.toNumber(),
      lastDepositBlock: user.lastDepositBlock.toNumber(),
    }
  })
  return userInfoObject
}

export const fetchBlockDeltaStartStages = async (guildsToFetch: GuildConfig[]) => {
  const defaultStageIndexes = guildsToFetch.map((guild) => {
    return [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
      const guildContractAddress = getGuildsMasterLooterAddress(guild.guildSlug)
      return {
        address: guildContractAddress,
        name: 'blockDeltaStartStage',
        params: [i],
      }
    })
  })
  const stageIndexes = defaultStageIndexes.map((contracts) => multicall(masterLooterABI, contracts))
  return Promise.all(stageIndexes)
}

export const fetchBlockDeltaEndStages = async (guildsToFetch: GuildConfig[]) => {
  const defaultEndIndexes = guildsToFetch.map((guild) => {
    return [0, 1, 2, 3, 4, 5].map((i) => {
      const guildContractAddress = getGuildsMasterLooterAddress(guild.guildSlug)
      return {
        address: guildContractAddress,
        name: 'blockDeltaEndStage',
        params: [i],
      }
    })
  })
  const endIndexes = defaultEndIndexes.map((contracts) => multicall(masterLooterABI, contracts))
  return Promise.all(endIndexes)
}

export const fetchDevFeeStages = async (guildsToFetch: GuildConfig[]) => {
  const defaultStageIndexes = guildsToFetch.map((guild) => {
    return [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
      const guildContractAddress = getGuildsMasterLooterAddress(guild.guildSlug)
      return {
        address: guildContractAddress,
        name: 'devFeeStage',
        params: [i],
      }
    })
  })
  const stageIndexes = defaultStageIndexes.map((contracts) => multicall(masterLooterABI, contracts))
  return Promise.all(stageIndexes)
}
