import React from 'react'
import styled from 'styled-components'
import { HelpIcon, Text, Skeleton, useTooltip } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

const ReferenceElement = styled.div`
  display: inline-block;
`

export interface UnlockedProps {
  unlocked: number
  symbol: string
}

const UnlockedWrapper = styled.div`
  min-width: 110px;
  font-weight: 600;
  text-align: right;
  margin-right: 14px;
  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: left;
    margin-right: 8;
    text-align: right;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Unlocked: React.FunctionComponent<UnlockedProps> = ({ unlocked, symbol }) => {
  const displayUnlocked =
    unlocked && unlocked > 0 ? (
      `${Number(unlocked).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${symbol}`
    ) : (
      <Skeleton width={60} />
    )
  const { t } = useTranslation()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Amount of your earned total that is currently available.'),
    { placement: 'top-end', tooltipOffset: [20, 10] },
  )

  return (
    <Container>
      <UnlockedWrapper>
        <Text>{displayUnlocked}</Text>
      </UnlockedWrapper>
      <ReferenceElement ref={targetRef}>
        <HelpIcon color="textSubtle" />
      </ReferenceElement>
      {tooltipVisible && tooltip}
    </Container>
  )
}

export default Unlocked
