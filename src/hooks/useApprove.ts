import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { approve } from 'utils/callHelpers'
import { useTranslation } from 'contexts/Localization'
import { useMasterchef } from './useContract'
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

export default useApprove
