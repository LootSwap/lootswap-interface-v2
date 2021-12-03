import React, { useState } from 'react'
import { Text, Button } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { BIG_ZERO } from 'utils/bigNumber'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { usePriceGuildBusd } from 'state/hooks'
import useGuildUnlock from 'hooks/useUnlock'
import { getBalanceNumber } from 'utils/formatBalance'
import useGuildLockedBalance from '../hooks/useGuildLockedBalance'
import { useCheckUnlockBalance, useLockupBlockLength } from '../hooks/useGuildUnlockedBalance'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 24px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`
const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  margin-bottom: 8px;

  & button {
    margin-left: 5px;
  }
`

const GuildLockedBalance = (guildSettings) => {
  const { guildSlug, lootFarmOverride } = guildSettings
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const guildPriceBusd = usePriceGuildBusd(
    guildSlug,
    lootFarmOverride?.useLootFarm || false,
    lootFarmOverride?.pid || null,
  )

  const userLockedBalance = useGuildLockedBalance(guildSlug) ?? BIG_ZERO
  const lockedBalanceDisplay = getBalanceNumber(userLockedBalance)
  const lockedBalanceBUSD = lockedBalanceDisplay * guildPriceBusd.toNumber()
  const personalUnlockBalance = useCheckUnlockBalance(guildSlug)
  const lockFromBlock = useLockupBlockLength(guildSlug)
  const { onReward } = useGuildUnlock(guildSlug)
  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '76px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <>
      <Block>
        <Label>{t('Locked Balance')}:</Label>
        <CardValue value={lockedBalanceDisplay} fontSize="24px" lineHeight="36px" />
        {guildPriceBusd.gt(0) && <CardBusdValue value={lockedBalanceBUSD} />}
      </Block>
      <Block>
        <Label>
          {t('Unlocked Balance %msg%', { msg: lockFromBlock > 0 ? `(block left till unlock: ${lockFromBlock})` : '' })}
        </Label>
        <Row>
          <CardValue value={personalUnlockBalance.toNumber()} fontSize="24px" lineHeight="36px" />
          <Button
            disabled={personalUnlockBalance.gte(0) || pendingTx}
            onClick={async () => {
              setPendingTx(true)
              await onReward()
              setPendingTx(false)
            }}
          >
            {t('Claim')}
          </Button>
        </Row>
      </Block>
    </>
  )
}

export default GuildLockedBalance
