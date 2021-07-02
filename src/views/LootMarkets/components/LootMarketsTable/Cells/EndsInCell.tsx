import React from 'react'
import styled from 'styled-components'
import { Flex, Link, Skeleton, Text, TimerIcon } from '@pancakeswap/uikit'
import { getHarmonyScanBlockCountdownUrl } from 'utils/harmonyscan'
import { LootMarket } from 'state/types'
import { useBlock } from 'state/hooks'
import Balance from 'components/Balance'
import { useTranslation } from 'contexts/Localization'
import { getLootMarketBlockInfo } from 'views/LootMarkets/helpers'
import BaseCell, { CellContent } from './BaseCell'

interface FinishCellProps {
  lootmarket: LootMarket
}

const StyledCell = styled(BaseCell)`
  flex: 2 0 100px;
`

const EndsInCell: React.FC<FinishCellProps> = ({ lootmarket }) => {
  const { totalStaked, endBlock, isFinished } = lootmarket
  const { currentBlock } = useBlock()
  const { t } = useTranslation()

  const { shouldShowBlockCountdown, blocksUntilStart, blocksRemaining, hasPoolStarted, blocksToDisplay } =
    getLootMarketBlockInfo(lootmarket, currentBlock)

  const renderBlocks = shouldShowBlockCountdown ? (
    <Flex alignItems="center">
      <Flex flex="1.3">
        <Balance fontSize="16px" value={blocksToDisplay} decimals={0} />
        <Text ml="4px" textTransform="lowercase">
          {t('Blocks')}
        </Text>
      </Flex>
      <Flex flex="1">
        <Link external href={getHarmonyScanBlockCountdownUrl(endBlock)} onClick={(e) => e.stopPropagation()}>
          <TimerIcon ml="4px" />
        </Link>
      </Flex>
    </Flex>
  ) : (
    <Text>-</Text>
  )

  // A bit hacky way to determine if public data is loading relying on totalStaked
  // Opted to go for this since we don't really need a separate publicDataLoaded flag
  // anywhere else
  const isLoadingPublicData = !totalStaked.gt(0) || !currentBlock || (!blocksRemaining && !blocksUntilStart)
  const showLoading = isLoadingPublicData && !isFinished
  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="textSubtle" textAlign="left">
          {hasPoolStarted || !shouldShowBlockCountdown ? t('Ends in') : t('Starts in')}
        </Text>
        {showLoading ? <Skeleton width="80px" height="16px" /> : renderBlocks}
      </CellContent>
    </StyledCell>
  )
}

export default EndsInCell
