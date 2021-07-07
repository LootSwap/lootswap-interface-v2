import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getMasterLooterAddress } from 'utils/addressHelpers'
import masterLooterABI from 'config/abi/masterlooter.json'
import { farmsConfig } from 'config/constants'
import useRefresh from './useRefresh'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchAllBalances = async () => {
      const calls = farmsConfig.map((farm) => ({
        address: getMasterLooterAddress(),
        name: 'pendingReward',
        params: [farm.pid, account],
      }))

      const res = await multicall(masterLooterABI, calls)

      setBalance(res)
    }

    if (account) {
      fetchAllBalances()
    }
  }, [account, fastRefresh])

  return balances
}

export default useAllEarnings
