import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { unstake } from 'utils/callHelpers'
import { useMasterchef } from './useContract'

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

export default useUnstake
