import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getCakeContract } from 'utils/contractHelpers'
import BigNumber from 'bignumber.js'
import useRefresh from './useRefresh'

const useLockedBalance = () => {
  const [balances, setBalance] = useState<BigNumber>()
  const { account } = useWeb3React()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchLockedBalance = async () => {
      const contract = getCakeContract()
      const res = await contract.methods.lockOf(account).call()
      setBalance(res)
    }

    if (account) {
      fetchLockedBalance()
    }
  }, [account, slowRefresh])

  return balances
}

export default useLockedBalance
