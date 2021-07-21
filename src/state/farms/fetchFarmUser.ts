import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterLooterABI from 'config/abi/masterlooter.json'
import multicall from 'utils/multicall'
import { getAddress, getMasterLooterAddress } from 'utils/addressHelpers'
import { FarmConfig } from 'config/constants/types'

export const fetchFarmUserAllowances = async (account: string, farmsToFetch: FarmConfig[]) => {
  const masterLooterAddress = getMasterLooterAddress()

  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses)
    return { address: lpContractAddress, name: 'allowance', params: [account, masterLooterAddress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account: string, farmsToFetch: FarmConfig[]) => {
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses)
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

export const fetchFarmUserStakedBalances = async (account: string, farmsToFetch: FarmConfig[]) => {
  const masterLooterAddress = getMasterLooterAddress()

  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterLooterAddress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterLooterABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account: string, farmsToFetch: FarmConfig[]) => {
  const masterLooterAddress = getMasterLooterAddress()

  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterLooterAddress,
      name: 'pendingReward',
      params: [farm.pid, account],
    }
  })

  const rawEarnings = await multicall(masterLooterABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}

export const fetchUserInfo = async (account: string, farmsToFetch: FarmConfig[]) => {
  const calls = farmsToFetch.map((f) => {
    const masterLooterAddress = getMasterLooterAddress()
    return {
      address: masterLooterAddress,
      name: 'userInfo',
      params: [f.pid, account],
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

export const fetchBlockDeltaStartStages = async (farmsToFetch: FarmConfig[]) => {
  const defaultStageIndexes = farmsToFetch.map(() => {
    return [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
      const masterLooterAddress = getMasterLooterAddress()
      return {
        address: masterLooterAddress,
        name: 'blockDeltaStartStage',
        params: [i],
      }
    })
  })
  const stageIndexes = defaultStageIndexes.map((contracts) => multicall(masterLooterABI, contracts))
  return Promise.all(stageIndexes)
}

export const fetchBlockDeltaEndStages = async (farmsToFetch: FarmConfig[]) => {
  const defaultEndIndexes = farmsToFetch.map(() => {
    return [0, 1, 2, 3, 4, 5].map((i) => {
      const masterLooterAddress = getMasterLooterAddress()
      return {
        address: masterLooterAddress,
        name: 'blockDeltaEndStage',
        params: [i],
      }
    })
  })
  const endIndexes = defaultEndIndexes.map((contracts) => multicall(masterLooterABI, contracts))
  return Promise.all(endIndexes)
}

export const fetchDevFeeStages = async (farmsToFetch: FarmConfig[]) => {
  const defaultStageIndexes = farmsToFetch.map(() => {
    return [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
      const masterLooterAddress = getMasterLooterAddress()
      return {
        address: masterLooterAddress,
        name: 'devFeeStage',
        params: [i],
      }
    })
  })
  const stageIndexes = defaultStageIndexes.map((contracts) => multicall(masterLooterABI, contracts))
  return Promise.all(stageIndexes)
}
