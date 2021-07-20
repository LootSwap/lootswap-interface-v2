import React from 'react'
import styled from 'styled-components'
import { HelpIcon, Text, Skeleton, useTooltip } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

const ReferenceElement = styled.div`
  display: inline-block;
`

export interface LockedProps {
  locked: number
  symbol: string
}

const LockedWrapper = styled.div`
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

const Locked: React.FunctionComponent<LockedProps> = ({ locked, symbol }) => {
  const displayLocked =
    locked && locked > 0 ? (
      `${Number(locked).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${symbol}`
    ) : (
      <Skeleton width={60} />
    )
  const { t } = useTranslation()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Amount of your earned total that is currently locked.'),
    { placement: 'top-end', tooltipOffset: [20, 10] },
  )

  return (
    <Container>
      <LockedWrapper>
        <Text>{displayLocked}</Text>
      </LockedWrapper>
      <ReferenceElement ref={targetRef}>
        <HelpIcon color="textSubtle" />
      </ReferenceElement>
      {tooltipVisible && tooltip}
    </Container>
  )
}

export default Locked
