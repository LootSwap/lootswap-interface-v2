import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getGuildsMasterLooterAddress } from 'utils/addressHelpers'
import masterLooterABI from 'config/abi/masterlooter.json'
import { guildsConfig } from 'config/constants'
import useRefresh from 'hooks/useRefresh'

const useAllEarnings = (guildSlug) => {
  const [balances, setBalance] = useState([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchAllBalances = async () => {
      const calls = guildsConfig
        .filter((f) => f.guildSlug === guildSlug)
        .map((farm) => ({
          address: getGuildsMasterLooterAddress(farm.guildSlug),
          name: 'pendingReward',
          params: [farm.pid, account],
        }))

      const res = await multicall(masterLooterABI, calls)

      setBalance(res)
    }

    if (account) {
      fetchAllBalances()
    }
  }, [account, fastRefresh, guildSlug])

  return balances
}

export default useAllEarnings
