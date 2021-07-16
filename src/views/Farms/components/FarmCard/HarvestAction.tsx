import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWeb3React } from '@web3-react/core'
import { usePriceLootBusd } from 'state/hooks'
import { DISPLAY_DECIMAL_FORMAT_PREF } from 'config'
import CardBusdValue from '../../../Home/components/CardBusdValue'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const cakePrice = usePriceLootBusd()
  const dispatch = useAppDispatch()
  const rawEarningsBalance = account ? getBalanceNumber(earnings) : 0
  const displayBalance =
    rawEarningsBalance === 0
      ? rawEarningsBalance.toLocaleString()
      : rawEarningsBalance.toFixed(DISPLAY_DECIMAL_FORMAT_PREF).toString()
  const earningsBusd = rawEarningsBalance ? new BigNumber(rawEarningsBalance).multipliedBy(cakePrice).toNumber() : 0
  // TODO change cake name and also see if dispatch(fetchFarmUserDataAsync)/useHarvest(pid) runs correctly.. maybe add more UI interaction
  // ** (notes) this is effecting the cards not farm rows
  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>
        {displayBalance}
        {earningsBusd > 0 && <CardBusdValue value={earningsBusd} />}
      </Heading>
      <Button
        disabled={rawEarningsBalance === 0 || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))

          setPendingTx(false)
        }}
      >
        {t('Harvest')}
      </Button>
    </Flex>
  )
}

export default HarvestAction
