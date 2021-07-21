import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getGuildsMasterLooterAddress } from 'utils/addressHelpers'
import masterLooterABI from 'config/abi/masterlooter.json'
import { guildsConfig } from 'config/constants'
import { GuildConfig } from 'config/constants/types'
import useRefresh from 'hooks/useRefresh'

export interface FarmWithBalance extends GuildConfig {
  balance: BigNumber
}

// calls current user rewards for farm
const useGuildsQuestWithBalance = () => {
  const [farmsWithBalances, setFarmsWithBalances] = useState<FarmWithBalance[]>([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalances = async () => {
      const calls = guildsConfig.map((farm) => ({
        address: getGuildsMasterLooterAddress(farm.guildSlug),
        name: 'pendingReward',
        params: [farm.pid, account],
      }))

      const rawResults = await multicall(masterLooterABI, calls)
      const results = guildsConfig.map((farm, index) => ({ ...farm, balance: new BigNumber(rawResults[index]) }))

      setFarmsWithBalances(results)
    }

    if (account) {
      fetchBalances()
    }
  }, [account, fastRefresh])

  return farmsWithBalances
}

export default useGuildsQuestWithBalance
