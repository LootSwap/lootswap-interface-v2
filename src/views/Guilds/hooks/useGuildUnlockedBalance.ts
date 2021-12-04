import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getGuildTokenContract } from 'utils/contractHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { useBlock } from 'state/hooks'
import useWeb3 from '../../../hooks/useWeb3'
import useRefresh from '../../../hooks/useRefresh'

export const useLockupBlockLength = (guildSlug: string) => {
  const { currentBlock } = useBlock()
  const [blockLength, setBlockLength] = useState(currentBlock)
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    const fetchLockupBlockLength = async () => {
      const guildContract = getGuildTokenContract(guildSlug)
      const res = await guildContract.methods.lockFromBlock().call()
      setBlockLength(res)
    }
    fetchLockupBlockLength()
  }, [guildSlug, slowRefresh, currentBlock])

  return blockLength - currentBlock
}

export const useCheckUnlockBalance = (guildSlug: string) => {
  const [balance, setBalance] = useState(BIG_ZERO)
  const { account } = useWeb3React()
  const { slowRefresh } = useRefresh()
  const web3 = useWeb3()

  useEffect(() => {
    const fetchBalance = async () => {
      const guildContract = getGuildTokenContract(guildSlug)
      const res = await guildContract.methods.canUnlockAmount(account).call()
      setBalance(new BigNumber(res))
    }

    if (account) {
      fetchBalance()
    }
  }, [web3, guildSlug, slowRefresh, account])

  return balance
}
