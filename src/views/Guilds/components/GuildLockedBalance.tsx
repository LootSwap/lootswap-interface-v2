import React from 'react'
import { Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { BIG_ZERO } from 'utils/bigNumber'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { usePriceGuildBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import useGuildLockedBalance from '../hooks/useGuildLockedBalance'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 24px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const GuildLockedBalance = (guildSettings) => {
  const { guildSlug, lootFarmOverride } = guildSettings
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
  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '76px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <Label>{t('Locked Balance')}:</Label>
      <CardValue value={lockedBalanceDisplay} fontSize="24px" lineHeight="36px" />
      {guildPriceBusd.gt(0) && <CardBusdValue value={lockedBalanceBUSD} />}
    </Block>
  )
}

export default GuildLockedBalance
