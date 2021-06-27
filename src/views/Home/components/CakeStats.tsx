import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useUnlockTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { useGetStats } from 'hooks/api'
import { usePriceCakeBusd } from 'state/hooks'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const StyledCakeStats = styled(Card)`
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

// TODO change name of component
const CakeStats = () => {
  const { t } = useTranslation()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  // TODO: Below think about pulling logic from graph instead of smart contract or
  // The very least make this info default in case graph is unavailable
  const lootPrice = usePriceCakeBusd().toNumber()
  const lootBalance = lootPrice || 0
  const unlockTotalSupply = useUnlockTotalSupply()
  const circulationMrkCap =
    lootPrice && unlockTotalSupply ? (getBalanceNumber(unlockTotalSupply) - burnedBalance) * lootPrice : 0
  const totalMrkCap = lootPrice && totalSupply ? (getBalanceNumber(totalSupply) - burnedBalance) * lootPrice : 0

  const data = useGetStats()
  const tvl = data ? data.tvl.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading scale="xl" mb="24px" color="primary">
          {t('LOOT Stats')}
        </Heading>
        <Row>
          <Text fontSize="24px">{t('Total LOOT Supply')}</Text>
          {cakeSupply && <CardValue fontSize="24px" value={cakeSupply} />}
        </Row>
        <Row>
          <Text fontSize="24px">{t('Total LOOT Burned')}</Text>
          <CardValue fontSize="24px" decimals={0} value={burnedBalance} />
        </Row>
        <Border />
        <Row>
          <Text fontSize="24px">{t('LOOT Price')}</Text>
          <CardValue fontSize="24px" decimals={3} color="primary" value={lootBalance} prefixOverride="$" />
        </Row>
        <Row>
          <Text fontSize="24px">{t('LOOT Circ. Market Cap')}</Text>
          <CardBusdValue
            fontSize="24px"
            decimals={0}
            color={`${({ theme }) => theme.colors.text}`}
            value={circulationMrkCap}
            prefixOverride="$"
          />
        </Row>
        <Row>
          <Text fontSize="24px">{t('LOOT Total Market Cap')}</Text>
          <CardBusdValue
            fontSize="24px"
            decimals={0}
            color={`${({ theme }) => theme.colors.text}`}
            value={totalMrkCap}
            prefixOverride="$"
          />
        </Row>
        <Border />
        <Row>
          <Text fontSize="24px">{`${t('Total Value Locked (TVL)')} - ${t('Across All LPs')}`}</Text>
          <CardValue fontSize="24px" decimals={0} value={Number(tvl)} />
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
