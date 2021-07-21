import React from 'react'
import { Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { usePriceGuildBusd } from 'state/hooks'
import styled from 'styled-components'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import useGuildsAllEarnings from '../hooks/useGuildsAllEarnings'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 24px;
`

const GuildHarvestBalance = (guildSettings) => {
  const { guildSlug, lootFarmOverride } = guildSettings
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const allEarnings = useGuildsAllEarnings(guildSlug)
  const earningsSum = allEarnings.reduce((accum, earning) => {
    const earningNumber = new BigNumber(earning)
    if (earningNumber.eq(0)) {
      return accum
    }
    return accum + earningNumber.div(DEFAULT_TOKEN_DECIMAL).toNumber()
  }, 0)
  const guildPriceBusd = usePriceGuildBusd(
    guildSlug,
    lootFarmOverride?.useLootFarm || false,
    lootFarmOverride?.pid || 0,
  )
  const earningsBusd = new BigNumber(earningsSum).multipliedBy(guildPriceBusd).toNumber()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '76px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <CardValue value={earningsSum} lineHeight="1.5" />
      {guildPriceBusd.gt(0) && <CardBusdValue value={earningsBusd} />}
    </Block>
  )
}

export default GuildHarvestBalance
