import React from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { Text, Flex, LinkExternal, Skeleton } from '@pancakeswap/uikit'
import useGuildSettings from 'views/Guilds/hooks/useGuildSettings'

export interface ExpandableSectionProps {
  harmonyScanAddress?: string
  infoAddress?: string
  removed?: boolean
  totalValueFormatted?: string
  lpLabel?: string
  addLiquidityUrl?: string
  locked?: number
  unlocked?: number
  guildSlug?: string
  emission?: string
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  harmonyScanAddress,
  infoAddress,
  removed,
  totalValueFormatted,
  lpLabel,
  addLiquidityUrl,
  locked,
  unlocked,
  guildSlug,
  emission,
}) => {
  const { t } = useTranslation()
  const guildSettings = useGuildSettings(guildSlug)
  return (
    <Wrapper>
      <Flex justifyContent="space-between">
        <Text>{t('Emission Rate')}:</Text>
        {emission ? <Text>{Number(emission).toFixed(4)}</Text> : <Skeleton width={75} height={25} />}
      </Flex>
      <Flex justifyContent="space-between">
        <Text>{t('Total Liquidity')}:</Text>
        {totalValueFormatted ? <Text>{totalValueFormatted}</Text> : <Skeleton width={75} height={25} />}
      </Flex>
      {guildSettings.hasLockUp && (
        <Flex justifyContent="space-between">
          <Text>{t('Unlocked')}:</Text>
          {totalValueFormatted ? (
            <Text>{Number(unlocked).toLocaleString(undefined, { maximumFractionDigits: 2 }) ?? 0}</Text>
          ) : (
            <Skeleton width={75} height={25} />
          )}
        </Flex>
      )}
      {guildSettings.hasLockUp && (
        <Flex justifyContent="space-between">
          <Text>{t('Locked')}:</Text>
          {totalValueFormatted ? (
            <Text>{Number(locked).toLocaleString(undefined, { maximumFractionDigits: 2 }) ?? 0}</Text>
          ) : (
            <Skeleton width={75} height={25} />
          )}
        </Flex>
      )}
      {!removed && (
        <StyledLinkExternal href={addLiquidityUrl}>{t('Get %symbol%', { symbol: lpLabel })}</StyledLinkExternal>
      )}
      <StyledLinkExternal href={harmonyScanAddress}>{t('View Contract')}</StyledLinkExternal>
      {infoAddress && <StyledLinkExternal href={infoAddress}>{t('See Pair Info')}</StyledLinkExternal>}
    </Wrapper>
  )
}

export default DetailsSection
