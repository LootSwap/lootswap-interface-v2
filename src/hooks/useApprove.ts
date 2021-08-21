import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { approve, approveGuild, approveLootMarket } from 'utils/callHelpers'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { updateUserAllowance } from 'state/actions'
import { useMasterchef, useLootMarketContract, useMasterGuildLooter } from './useContract'
import useToast from './useToast'

// Approve a Farm
export const useApprove = (lpContract: Contract) => {
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      if (tx) {
        toastSuccess(t('TX Success - Log'))
      }
      return tx
    } catch (e) {
      // user rejected tx or didn't go thru
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      return false
    }
  }, [account, lpContract, masterChefContract, t, toastSuccess, toastError])

  return { onApprove: handleApprove }
}

// Approve a LootMarket
export const useLootMarketApprove = (lpContract: Contract, pid, earningTokenSymbol) => {
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const lootMarketContract = useLootMarketContract(pid)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approveLootMarket(lpContract, lootMarketContract, account)
      dispatch(updateUserAllowance(pid, account))

      if (tx) {
        toastSuccess(
          t('Contract Enabled'),
          t('You can now stake in the %symbol% pool!', { symbol: earningTokenSymbol }),
        )
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), e?.message)
    }
  }, [account, lpContract, lootMarketContract, earningTokenSymbol, t, toastError, toastSuccess, dispatch, pid])

  return { onApprove: handleApprove }
}

// Approve a guild
export const useGuildApprove = (lpContract: Contract, guildSlug: string) => {
  const { account } = useWeb3React()
  const masterGuildContract = useMasterGuildLooter(guildSlug)
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approveGuild(lpContract, masterGuildContract, account)
      if (tx) {
        toastSuccess(t('TX Success - Log'))
      }
      return tx
    } catch (e) {
      // user rejected tx or didn't go thru
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      return false
    }
  }, [account, lpContract, masterGuildContract, t, toastSuccess, toastError])

  return { onApprove: handleApprove }
}

export default useApprove
