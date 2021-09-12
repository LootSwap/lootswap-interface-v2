import React from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap/uikit'
import { LootMarket } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import BaseCell, { CellContent } from './BaseCell'
import Apr from '../Apr'

interface AprCellProps {
  lootmarket: LootMarket
}

const StyledCell = styled(BaseCell)`
  flex: 1 0 50px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex: 0 0 120px;
  }
`

const AprCell: React.FC<AprCellProps> = ({ lootmarket }) => {
  const { t } = useTranslation()
  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="textSubtle" textAlign="left">
          {t('APR')}
        </Text>
        <Apr lootmarket={lootmarket} performanceFee={0} showIcon={false} alignItems="flex-start" />
      </CellContent>
    </StyledCell>
  )
}

export default AprCell
