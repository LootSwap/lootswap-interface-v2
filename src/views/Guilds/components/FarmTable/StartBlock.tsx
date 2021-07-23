import React from 'react'
import styled from 'styled-components'
import { Skeleton, TimerIcon, useTooltip } from '@pancakeswap/uikit'
import { useBlock } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'

export interface IStartBlockProps {
  startBlock?: number
  lastRewardBlock?: string
}

const StartBlockWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  width: 36px;
  text-align: right;
  margin-right: 14px;

  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: left;
    margin-right: 22px;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const ReferenceElement = styled.div`
  display: inline-block;
`

const StartBlockProps: React.FunctionComponent<IStartBlockProps> = ({ startBlock, lastRewardBlock }) => {
  const { t } = useTranslation()
  const { currentBlock } = useBlock()
  const blocksUntilStart = Math.max(startBlock - currentBlock, 0)
  const blocksRemaining = Math.max(currentBlock - Number(lastRewardBlock), 0)
  const hasPoolStarted = blocksUntilStart === 0 && blocksRemaining > 0
  const blocksToDisplay = hasPoolStarted ? blocksRemaining : blocksUntilStart
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Questing starts in %num% Blocks', { num: blocksToDisplay }),
    { placement: 'top-end', tooltipOffset: [20, 10] },
  )
  const displayStartBlock = currentBlock ? blocksToDisplay : <Skeleton width={30} />
  return (
    <Container>
      <StartBlockWrapper>{displayStartBlock}</StartBlockWrapper>
      <ReferenceElement ref={targetRef}>
        <TimerIcon ml="4px" />
      </ReferenceElement>
      {tooltipVisible && tooltip}
    </Container>
  )
}

export default StartBlockProps
