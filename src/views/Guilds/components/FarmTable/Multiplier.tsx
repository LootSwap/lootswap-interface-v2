import React from 'react'
import styled from 'styled-components'
import { HelpIcon, Skeleton, useTooltip } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useParams } from 'react-router-dom'
import useGuildSettings from 'views/Guilds/hooks/useGuildSettings'

const ReferenceElement = styled.div`
  display: inline-block;
`

export interface MultiplierProps {
  multiplier: string
}

const MultiplierWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  width: 36px;
  text-align: right;
  margin-right: 14px;

  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: left;
    margin-right: 0;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Multiplier: React.FunctionComponent<MultiplierProps> = ({ multiplier }) => {
  const { slug } = useParams<{ slug: string }>()
  const { symbol } = useGuildSettings(slug)
  const displayMultiplier = multiplier ? multiplier.toLowerCase() : <Skeleton width={30} />
  const { t } = useTranslation()
  const tooltipContent = (
    <div>
      {t('The multiplier represents the amount of %symbolName% rewards each quest gets', { symbolName: symbol })}
      <br />
      <br />
      {t(
        'For example, if a 1x quest was getting 1 %symbolName% per block, a 40x quest would be getting 40 %symbolName% per block.',
        { symbolName: symbol },
      )}
    </div>
  )
  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, {
    placement: 'top-end',
    tooltipOffset: [20, 10],
  })

  return (
    <Container>
      <MultiplierWrapper>{displayMultiplier}</MultiplierWrapper>
      <ReferenceElement ref={targetRef}>
        <HelpIcon color="textSubtle" />
      </ReferenceElement>
      {tooltipVisible && tooltip}
    </Container>
  )
}

export default Multiplier
