import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { lootMarketHarvestStaking, harvest } from 'utils/callHelpers'
import { updateUserBalance, updateUserPendingReward } from 'state/actions'
import { useMasterchef, useLootMarketContract } from './useContract'

export const useHarvest = (farmPid: number) => {
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefContract, farmPid, account)
    return txHash
  }, [account, farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

export const useLootMarketsHarvest = (pid) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const lootMarketContract = useLootMarketContract(pid)

  const handleHarvest = useCallback(async () => {
    await lootMarketHarvestStaking(lootMarketContract, account)
    dispatch(updateUserPendingReward(pid, account))
    dispatch(updateUserBalance(pid, account))
  }, [account, dispatch, lootMarketContract, pid])

  return { onReward: handleHarvest }
}
