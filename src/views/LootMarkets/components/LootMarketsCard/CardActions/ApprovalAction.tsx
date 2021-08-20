import React, { useCallback, useState } from 'react'
import { Button, AutoRenewIcon, Skeleton } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useLootMarketApprove } from 'hooks/useApprove'
import { useTranslation } from 'contexts/Localization'
import { useERC20 } from 'hooks/useContract'
import { getAddress } from 'utils/addressHelpers'
import { useAppDispatch } from 'state'
import { LootMarket } from 'state/types'
import { updateUserAllowance } from 'state/actions'

interface ApprovalActionProps {
  lootmarket: LootMarket
  isLoading?: boolean
}

const ApprovalAction: React.FC<ApprovalActionProps> = ({ lootmarket, isLoading = false }) => {
  const { pid, stakingToken, earningToken } = lootmarket
  const { t } = useTranslation()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { account } = useWeb3React()

  const stakingTokenContract = useERC20(stakingToken.address ? getAddress(stakingToken.address) : '')
  const { onApprove } = useLootMarketApprove(stakingTokenContract, pid, earningToken.symbol)
  const dispatch = useAppDispatch()
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      dispatch(updateUserAllowance(pid, account))
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, dispatch, account, pid])
  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <Button
          isLoading={requestedApproval}
          endIcon={requestedApproval ? <AutoRenewIcon spin color="currentColor" /> : null}
          disabled={requestedApproval}
          onClick={handleApprove}
          width="100%"
        >
          {t('Enable')}
        </Button>
      )}
    </>
  )
}

export default ApprovalAction
