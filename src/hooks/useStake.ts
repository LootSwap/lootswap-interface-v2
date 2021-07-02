import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { stake, lootMarketStakingStake } from 'utils/callHelpers'
import { updateUserStakedBalance, updateUserBalance } from 'state/actions'
import { useAppDispatch } from 'state'
import { useMasterchef, useLootMarketContract } from './useContract'

const useStake = (pid: number) => {
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account)
      console.info(txHash)
    },
    [account, masterChefContract, pid],
  )

  return { onStake: handleStake }
}

// Loot Market
export const useLootMarketStake = (pid: number) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const lootMarketContract = useLootMarketContract(pid)

  const handleStake = useCallback(
    async (amount: string) => {
      await lootMarketStakingStake(lootMarketContract, amount, account)
      dispatch(updateUserStakedBalance(pid, account))
      dispatch(updateUserBalance(pid, account))
    },
    [account, dispatch, lootMarketContract, pid],
  )

  return { onStake: handleStake }
}

export default useStake
