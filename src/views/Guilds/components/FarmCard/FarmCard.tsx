import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton } from '@pancakeswap/uikit'
import { Guild } from 'state/types'
import { useBlock } from 'state/hooks'
import useGuildSettings from 'views/Guilds/hooks/useGuildSettings'
import { provider as ProviderType } from 'web3-core'
import { getHarmonyScanAddressUrl } from 'utils/harmonyscan'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'

export interface FarmWithStakedValue extends Guild {
  apr?: number
  liquidity?: BigNumber
}

const AccentGradient = keyframes`  
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
`

const StyledCardAccent = styled.div`
  background: ${({ theme }) => `linear-gradient(180deg, ${theme.colors.primaryBright}, ${theme.colors.secondary})`};
  background-size: 400% 400%;
  animation: ${AccentGradient} 2s linear infinite;
  border-radius: 32px;
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -3px;
  left: -1px;
  z-index: -1;
`

const FCard = styled.div<{ isPromotedFarm: boolean }>`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: ${({ theme, isPromotedFarm }) => (isPromotedFarm ? '31px' : theme.radii.card)};
  box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  guildTokenPrice?: BigNumber
  provider?: ProviderType
  account?: string
  locked?: number
  unlocked?: number
  guildSlug?: string
  emission?: string
}

const FarmCard: React.FC<FarmCardProps> = ({
  farm,
  removed,
  guildTokenPrice,
  account,
  locked,
  unlocked,
  guildSlug,
  emission,
}) => {
  const { t } = useTranslation()
  const { currentBlock } = useBlock()
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const guildSettings = useGuildSettings(guildSlug)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  const liq =
    Math.floor(Number(farm.liquidity)) > 0
      ? Number(farm.liquidity).toLocaleString(undefined, { maximumFractionDigits: 2 })
      : Number(farm.liquidity).toLocaleString(undefined, { maximumFractionDigits: 5 })
  const totalValueFormatted = farm.liquidity ? `$${liq}` : ''

  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const earnLabel = farm.dual ? farm.dual.earnLabel : guildSettings.symbol.toUpperCase()

  const farmAPR = farm.apr && farm.apr.toLocaleString('en-US', { maximumFractionDigits: 2 })

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: farm.quoteToken.address,
    tokenAddress: farm.token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  const isPromotedFarm = farm.token.symbol === guildSlug.toUpperCase()
  // eslint-disable-next-line
  const guildToUSDPrice = getBalanceNumber(new BigNumber(farm.userData.earnings).times(guildTokenPrice))

  // Calculating when questing starts
  const blocksRemaining = currentBlock > 0 ? Math.max(Number(farm.lastRewardBlock) - currentBlock, 0) : 0
  const blocksToDisplay = blocksRemaining > 0 ? blocksRemaining : 0
  return (
    <FCard isPromotedFarm={isPromotedFarm}>
      {isPromotedFarm && <StyledCardAccent />}
      <CardHeading
        lpLabel={lpLabel}
        multiplier={farm.multiplier}
        isCommunityFarm={farm.isCommunity}
        farmImage={farmImage}
        tokenSymbol={farm.token.symbol}
        startBlock={blocksToDisplay}
      />
      {!removed && (
        <Flex justifyContent="space-between" alignItems="center">
          <Text>{t('APR')}:</Text>
          <Text bold style={{ display: 'flex', alignItems: 'center' }}>
            {farm.apr ? <>{farmAPR}%</> : <Skeleton height={24} width={80} />}
          </Text>
        </Flex>
      )}
      <Flex justifyContent="space-between">
        <Text>{t('Earn')}:</Text>
        <Text bold>{`${
          farm.userData ? getBalanceNumber(new BigNumber(farm.userData.earnings)) : 0
        } ${earnLabel}`}</Text>
      </Flex>
      <CardActionsContainer farm={farm} account={account} addLiquidityUrl={addLiquidityUrl} />
      <Divider />
      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          removed={removed}
          harmonyScanAddress={getHarmonyScanAddressUrl(farm.lpAddresses[process.env.REACT_APP_CHAIN_ID])}
          infoAddress=""
          totalValueFormatted={totalValueFormatted}
          lpLabel={lpLabel}
          addLiquidityUrl={addLiquidityUrl}
          locked={locked}
          unlocked={unlocked}
          guildSlug={guildSlug}
          emission={emission}
        />
      </ExpandingWrapper>
    </FCard>
  )
}

export default FarmCard
