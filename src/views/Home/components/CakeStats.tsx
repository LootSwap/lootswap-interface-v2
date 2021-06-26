import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { useGetStats } from 'hooks/api'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

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
// TODO change name of component
const CakeStats = () => {
  const { t } = useTranslation()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  // TVL
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
        <Row>
          <Text fontSize="24px">{`${t('Total Value Locked (TVL)')} - ${t('Across All LPs')}`}</Text>
          <CardValue fontSize="24px" decimals={0} value={Number(tvl)} />
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
