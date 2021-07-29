import React, { useState, useRef, useEffect } from 'react'
import { Button, Skeleton } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { getBalanceNumber } from 'utils/formatBalance'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { usePriceLootBusd } from 'state/hooks'
import { useHarvest } from 'hooks/useHarvest'
import { useTranslation } from 'contexts/Localization'
import { useCountUp } from 'react-countup'
import { DISPLAY_DECIMAL_FORMAT_PREF } from 'config'

import { ActionContainer, ActionTitles, Title, Subtle, ActionContent, Earned, Staked } from './styles'

interface HarvestActionProps extends FarmWithStakedValue {
  userDataReady: boolean
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({ pid, userData, userDataReady }) => {
  const earningsBigNumber = new BigNumber(userData.earnings)
  const cakePrice = usePriceLootBusd()
  let earnings = 0
  let earningsBusd = 0
  let displayBalance = userDataReady ? earnings.toLocaleString() : <Skeleton width={60} />

  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceNumber(earningsBigNumber)
    earningsBusd = new BigNumber(earnings).multipliedBy(cakePrice).toNumber()
    displayBalance = earnings.toFixed(DISPLAY_DECIMAL_FORMAT_PREF).toString()
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const { countUp, update } = useCountUp({
    start: 0,
    end: earningsBusd,
    duration: 1,
    separator: ',',
    decimals: 3,
  })
  const updateValue = useRef(update)

  useEffect(() => {
    let isUpdate = true
    if (isUpdate) {
      updateValue.current(earningsBusd)
    }
    isUpdate = false
  }, [earningsBusd, updateValue])

  return (
    <ActionContainer>
      <ActionTitles>
        <Title>{t('LOOT')} </Title>
        <Subtle>{t('Earned').toUpperCase()}</Subtle>
      </ActionTitles>
      <ActionContent>
        <div>
          <Earned>{displayBalance}</Earned>
          {countUp > 0 && <Staked>~{countUp}USD</Staked>}
        </div>
        <Button
          disabled={!earnings || pendingTx || !userDataReady}
          onClick={async () => {
            setPendingTx(true)
            await onReward()
            dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))

            setPendingTx(false)
          }}
          ml="4px"
        >
          {t('Harvest')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
