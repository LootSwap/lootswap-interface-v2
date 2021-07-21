import React from 'react'
import { Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getGuildsTokenAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceGuildBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const GuildWalletBalance = (guildSettings) => {
  const { guildSlug, lootFarmOverride } = guildSettings
  const { t } = useTranslation()
  const { balance: guildBalance } = useTokenBalance(getGuildsTokenAddress(guildSlug))
  const guildPriceBusd = usePriceGuildBusd(
    guildSlug,
    lootFarmOverride?.useLootFarm || false,
    lootFarmOverride?.pid || 0,
  )
  const busdBalance = new BigNumber(getBalanceNumber(guildBalance)).multipliedBy(guildPriceBusd).toNumber()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '54px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={getBalanceNumber(guildBalance)} decimals={4} fontSize="24px" lineHeight="36px" />
      {guildPriceBusd.gt(0) ? <CardBusdValue value={busdBalance} /> : <br />}
    </>
  )
}

export default GuildWalletBalance
