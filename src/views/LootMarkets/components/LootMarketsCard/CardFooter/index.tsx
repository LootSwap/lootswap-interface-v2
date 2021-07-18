import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Flex, CardFooter, ExpandableLabel } from '@pancakeswap/uikit'
import { LootMarketCategory } from 'config/constants/types'
import { LootMarket } from 'state/types'
import { CoreTag, CommunityTag } from 'components/Tags'
import ExpandedFooter from './ExpandedFooter'

interface FooterProps {
  lootmarket: LootMarket
  account: string
  totalCakeInVault?: BigNumber
}

const ExpandableButtonWrapper = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  button {
    padding: 0;
  }
`

const Footer: React.FC<FooterProps> = ({ lootmarket, account }) => {
  const { lootMarketCategory } = lootmarket
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <CardFooter>
      <ExpandableButtonWrapper>
        <Flex alignItems="center">
          {lootMarketCategory && lootMarketCategory === LootMarketCategory.CORE && <CoreTag />}
          {lootMarketCategory && lootMarketCategory === LootMarketCategory.COMMUNITY && <CommunityTag />}
        </Flex>
        <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? t('Hide') : t('Details')}
        </ExpandableLabel>
      </ExpandableButtonWrapper>
      {isExpanded && <ExpandedFooter lootmarket={lootmarket} account={account} />}
    </CardFooter>
  )
}

export default Footer
