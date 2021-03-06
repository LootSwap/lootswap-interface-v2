import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { unstake, lootMarketUnstake, lootMarketEmergencyUnstake, unstakeGuild } from 'utils/callHelpers'
import { updateUserStakedBalance, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { useAppDispatch } from 'state'
import { useMasterchef, useLootMarketContract, useMasterGuildLooter } from './useContract'

const useUnstake = (pid: number) => {
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.info(txHash)
    },
    [account, masterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

// Loot Market
export const useLootMarketsUnstake = (pid, enableEmergencyWithdraw = false) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const lootMarketContract = useLootMarketContract(pid)
  const handleUnstake = useCallback(
    async (amount: string) => {
      if (enableEmergencyWithdraw) {
        const txHash = await lootMarketEmergencyUnstake(lootMarketContract, account)
        console.info(txHash)
      } else {
        const txHash = await lootMarketUnstake(lootMarketContract, amount, account)
        console.info(txHash)
      }
      dispatch(updateUserStakedBalance(pid, account))
      dispatch(updateUserBalance(pid, account))
      dispatch(updateUserPendingReward(pid, account))
    },
    [account, dispatch, enableEmergencyWithdraw, lootMarketContract, pid],
  )

  return { onUnstake: handleUnstake }
}

// Guilds
export const useGuildUnstake = (pid: number, guildSlug: string) => {
  const { account } = useWeb3React()
  const masterGuildContract = useMasterGuildLooter(guildSlug)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstakeGuild(masterGuildContract, pid, amount, account)
      console.info(txHash)
    },
    [account, masterGuildContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
