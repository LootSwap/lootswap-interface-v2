import React from 'react'
import { Card, CardBody, Heading, Text, useTooltip, HelpIcon } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useUnlockTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { useGetStats } from 'hooks/api'
import { usePriceLootBusd } from 'state/hooks'
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
const ReferenceElement = styled.div`
  display: inline-block;
`

// TODO change name of component
const CakeStats = () => {
  const { t } = useTranslation()

  // #region ToolTips
  const tooltipTotalSupplyContent = <div>{t('Includes 95% of locked rewards and total burn.')}</div>
  const {
    targetRef: targetRefTotalSupply,
    tooltip: toolTipTotalSupply,
    tooltipVisible: tooltipVisibleTotalSupply,
  } = useTooltip(tooltipTotalSupplyContent, {
    placement: 'top-end',
    tooltipOffset: [20, 10],
  })

  const tooltipTotalCirc = <div>{t('Includes Total Supply minus Total Burned.')}</div>
  const {
    targetRef: targetRefTotalCirc,
    tooltip: toolTipTotalCirc,
    tooltipVisible: tooltipVisibleTotalCirc,
  } = useTooltip(tooltipTotalCirc, {
    placement: 'top-end',
    tooltipOffset: [20, 10],
  })
  // #endregion
  // TODO: Below think about pulling logic from graph instead of smart contract or
  // The very least make this info default in case graph is unavailable
  const totalSupply = useTotalSupply()
  const unlockTotalSupply = useUnlockTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))
  const lootPrice = usePriceLootBusd().toNumber()

  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) : 0
  const lootBalance = lootPrice || 0
  const circulationSupply = unlockTotalSupply ? getBalanceNumber(unlockTotalSupply) - burnedBalance : 0
  const circulationMrkCap =
    lootPrice && unlockTotalSupply ? (getBalanceNumber(unlockTotalSupply) - burnedBalance) * lootPrice : 0
  // const totalMrkCap = lootPrice && totalSupply ? (getBalanceNumber(totalSupply) - burnedBalance) * lootPrice : 0
  const data = useGetStats()
  const tvl = data ? data.tvl.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading scale="xl" mb="24px" color="primary">
          {t('LOOT Stats')}
        </Heading>
        <Row>
          <Text fontSize="24px">
            {t('Total LOOT Supply')}
            <ReferenceElement ref={targetRefTotalSupply}>
              <HelpIcon color="textSubtle" />
            </ReferenceElement>
            {tooltipVisibleTotalSupply && toolTipTotalSupply}
          </Text>
          {cakeSupply && <CardValue fontSize="24px" value={cakeSupply} />}
        </Row>
        <Row>
          <Text fontSize="24px">{t('Total LOOT Burned')}</Text>
          <CardValue fontSize="24px" decimals={0} value={burnedBalance} />
        </Row>
        <Row>
          <Text fontSize="24px">
            {t('LOOT in Circ.')}
            <ReferenceElement ref={targetRefTotalCirc}>
              <HelpIcon color="textSubtle" />
            </ReferenceElement>
            {tooltipVisibleTotalCirc && toolTipTotalCirc}
          </Text>
          {circulationSupply && <CardValue fontSize="24px" value={circulationSupply} />}
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
        <Border />
        <Row>
          <Text fontSize="24px">{`${t('Total Value Locked (TVL)')} - ${t('Across All LPs')}`}</Text>
          {Number(tvl) > 0 ? <CardValue fontSize="24px" decimals={0} value={Number(tvl)} /> : t('Coming Soon')}
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
