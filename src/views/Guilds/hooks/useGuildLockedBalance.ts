import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getGuildTokenContract } from 'utils/contractHelpers'
import BigNumber from 'bignumber.js'
import useRefresh from 'hooks/useRefresh'

const useGuildLockedBalance = (guildSlug) => {
  const [balances, setBalance] = useState<BigNumber>()
  const { account } = useWeb3React()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchLockedBalance = async () => {
      const contract = getGuildTokenContract(guildSlug)
      const res = await contract.methods.lockOf(account).call()
      setBalance(res)
    }

    if (account) {
      fetchLockedBalance()
    }
  }, [account, slowRefresh, guildSlug])

  return balances
}

export default useGuildLockedBalance
