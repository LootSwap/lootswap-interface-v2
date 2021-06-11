import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { harvest } from 'utils/callHelpers'
import { useMasterchef } from './useContract'

export const useHarvest = (farmPid: number) => {
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefContract, farmPid, account)
    return txHash
  }, [account, farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

export default useHarvest
