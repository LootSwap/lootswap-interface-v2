import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { fetchGuildUserDataAsync } from 'state/guilds'
import { useGuildHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWeb3React } from '@web3-react/core'
import { usePriceLootBusd } from 'state/hooks'
import { DISPLAY_DECIMAL_FORMAT_PREF } from 'config'
import CardBusdValue from '../../../Home/components/CardBusdValue'

interface FarmCardActionsProps {
  guildSlug: string
  earnings?: BigNumber
  pid?: number
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid, guildSlug }) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useGuildHarvest(pid, guildSlug)
  const guildTokenPrice = usePriceLootBusd()
  const dispatch = useAppDispatch()
  const rawEarningsBalance = account ? getBalanceNumber(earnings) : 0
  const displayBalance =
    rawEarningsBalance === 0
      ? rawEarningsBalance.toLocaleString()
      : rawEarningsBalance.toFixed(DISPLAY_DECIMAL_FORMAT_PREF).toString()
  const earningsBusd = rawEarningsBalance
    ? new BigNumber(rawEarningsBalance).multipliedBy(guildTokenPrice).toNumber()
    : 0

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
          dispatch(fetchGuildUserDataAsync({ account, pids: [pid], guildSlug }))
          setPendingTx(false)
        }}
      >
        {t('Harvest')}
      </Button>
    </Flex>
  )
}

export default HarvestAction
