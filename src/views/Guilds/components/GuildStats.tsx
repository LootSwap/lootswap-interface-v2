import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardBody, Heading, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import { usePriceGuildBusd } from 'state/hooks'
import { getGuildsTokenAddress } from 'utils/addressHelpers'
import useGuildSettings from '../hooks/useGuildSettings'
import { useGuildTotalSupply, useGuildUnlockTotalSupply, useBurnedBalance } from '../hooks/useGuildTokenBalance'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const StyledGuildTokenStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const Border = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.text};
  opacity: 0.2;
  margin-top: 10px;
  margin-bottom: 10px;
`

const GuildStat = () => {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const guildSettings = useGuildSettings(slug)
  const totalSupply = useGuildTotalSupply(slug)
  const burnedBalance = getBalanceNumber(useBurnedBalance(getGuildsTokenAddress(slug)))
  const guildSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  // TODO: Below think about pulling logic from graph instead of smart contract or
  // The very least make this info default in case graph is unavailable
  const lootFarmOverride = guildSettings?.lootFarmOverride
  const guildTokenPrice = usePriceGuildBusd(slug, lootFarmOverride?.useLootFarm || false, lootFarmOverride?.pid || null)
  const guildPrice = guildTokenPrice.toNumber()
  const lootBalance = guildPrice || 0
  const unlockTotalSupply = useGuildUnlockTotalSupply(slug)
  const circulationSupply = unlockTotalSupply ? getBalanceNumber(unlockTotalSupply) : 0
  const circulationMrkCap =
    guildPrice && unlockTotalSupply ? (getBalanceNumber(unlockTotalSupply) - burnedBalance) * guildPrice : 0

  return (
    <StyledGuildTokenStats>
      <CardBody>
        <Heading scale="xl" mb="24px" color="primary">
          {t('%sym% Stats', { sym: guildSettings.symbol })}
        </Heading>
        <Row>
          <Text fontSize="24px">{t('%sym% in Circ.', { sym: guildSettings.symbol })}</Text>
          {circulationSupply && <CardValue fontSize="24px" value={circulationSupply} />}
        </Row>
        <Row>
          <Text fontSize="24px">{t('Total %sym% Supply', { sym: guildSettings.symbol })}</Text>
          {guildSupply && <CardValue fontSize="24px" value={guildSupply} />}
        </Row>
        <Row>
          <Text fontSize="24px">{t('Total %sym% Burned', { sym: guildSettings.symbol })}</Text>
          <CardValue fontSize="24px" decimals={0} value={burnedBalance} />
        </Row>
        <Border />
        <Row>
          <Text fontSize="24px">{t('%sym% Price', { sym: guildSettings.symbol })}</Text>
          <CardValue fontSize="24px" decimals={3} color="primary" value={lootBalance} prefixOverride="$" />
        </Row>
        <Row>
          <Text fontSize="24px">{t('%sym% Circ. Market Cap', { sym: guildSettings.symbol })}</Text>
          <CardBusdValue
            fontSize="24px"
            decimals={0}
            color={`${({ theme }) => theme.colors.text}`}
            value={circulationMrkCap}
            prefixOverride="$"
          />
        </Row>
      </CardBody>
    </StyledGuildTokenStats>
  )
}

export default GuildStat
