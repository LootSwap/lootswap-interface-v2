import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getBep20Contract, getCakeContract } from 'utils/contractHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { ZERO_DEAD_ADDRESS } from 'config'
import useWeb3 from './useWeb3'
import useRefresh from './useRefresh'
import useLastUpdated from './useLastUpdated'

type UseTokenBalanceState = {
  balance: BigNumber
  fetchStatus: FetchStatus
}

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}

const useTokenBalance = (tokenAddress: string) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    balance: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  })
  const web3 = useWeb3()
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress, web3) // TODO change Bep20Contract name to be Erc20Contract
      try {
        const res = await contract.methods.balanceOf(account).call()
        setBalanceState({ balance: new BigNumber(res), fetchStatus: SUCCESS })
      } catch (e) {
        console.error(e)
        setBalanceState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }))
      }
    }

    if (account) {
      fetchBalance()
    }
  }, [account, tokenAddress, web3, fastRefresh, SUCCESS, FAILED])

  return balanceState
}

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getCakeContract() // TODO change getCakeContract -> getLootContract
      const supply = await cakeContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useUnlockTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [unlockTotalSupply, setUnlockTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchUnlockTotalSupply() {
      const cakeContract = getCakeContract() // TODO change getCakeContract -> getLootContract
      const unlockTotal = await cakeContract.methods.unlockedSupply().call()
      setUnlockTotalSupply(new BigNumber(unlockTotal))
    }

    fetchUnlockTotalSupply()
  }, [slowRefresh])

  return unlockTotalSupply
}

export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(BIG_ZERO)
  const { slowRefresh } = useRefresh()
  const web3 = useWeb3()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress, web3) // TODO rename getBep20Contract
      const res = await contract.methods.balanceOf(ZERO_DEAD_ADDRESS).call()
      setBalance(new BigNumber(res))
    }

    fetchBalance()
  }, [web3, tokenAddress, slowRefresh])

  return balance
}

export const useGetBnbBalance = () => {
  const [balance, setBalance] = useState(BIG_ZERO)
  const { account } = useWeb3React()
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  const web3 = useWeb3()

  useEffect(() => {
    const fetchBalance = async () => {
      const walletBalance = await web3.eth.getBalance(account)
      setBalance(new BigNumber(walletBalance))
    }

    if (account) {
      fetchBalance()
    }
  }, [account, web3, lastUpdated, setBalance])

  return { balance, refresh: setLastUpdated }
}

export default useTokenBalance
