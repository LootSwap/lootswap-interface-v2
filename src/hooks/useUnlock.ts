import { useCallback, useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useBlock } from 'state/hooks'
import { unlockGuild, unlock } from 'utils/callHelpers'
import { useGuildToken, useCake } from './useContract'
import useRefresh from './useRefresh'

export const useLockBlockLength = () => {
  const tokenContract = useCake()
  const { currentBlock } = useBlock()
  const [block, setBlock] = useState(currentBlock)

  useEffect(() => {
    async function fetchBlockLength() {
      const res = await tokenContract.methods.lockFromBlock().call()
      setBlock(res - currentBlock)
    }

    fetchBlockLength()
  }, [currentBlock, tokenContract])
  return block
}

export const useCanUnlockAmount = () => {
  const { account } = useWeb3React()
  const { slowRefresh } = useRefresh()
  const [balance, setBalance] = useState(new BigNumber(0))

  const tokenContract = useCake()
  useEffect(() => {
    async function fetchUnlockTotalSupply() {
      const balanceTotal = await tokenContract.methods.canUnlockAmount(account).call()
      setBalance(balanceTotal)
    }

    if (account) {
      fetchUnlockTotalSupply()
    }
  }, [slowRefresh, tokenContract, account])

  return balance
}

const useUnlock = () => {
  const { account } = useWeb3React()
  const tokenContract = useCake()

  const handleUnlock = useCallback(async () => {
    const txHash = await unlock(tokenContract, account)
    console.info(txHash)
    return txHash
  }, [account, tokenContract])

  return { onReward: handleUnlock }
}

// Guild
export const useGuildUnlock = (guildSlug: string) => {
  const { account } = useWeb3React()
  const tokenContract = useGuildToken(guildSlug)

  const handleUnlock = useCallback(async () => {
    const txHash = await unlockGuild(tokenContract, account)
    console.info(txHash)
    return txHash
  }, [account, tokenContract])

  return { onReward: handleUnlock }
}

export default useUnlock
