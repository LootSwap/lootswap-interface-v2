import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { stake } from 'utils/callHelpers'
import { useMasterchef } from './useContract'

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

export default useStake
