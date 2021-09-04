import BigNumber from 'bignumber.js'
import React from 'react'
import { CardBody, Flex, Text, CardRibbon } from '@pancakeswap/uikit'
import UnlockButton from 'components/UnlockButton'
import { useTranslation } from 'contexts/Localization'
import { BIG_ZERO } from 'utils/bigNumber'
import { LootMarket } from 'state/types'
import AprRow from './AprRow'
import { StyledCard, StyledCardInner } from './StyledCard'
import CardFooter from './CardFooter'
import StyledCardHeader from './StyledCardHeader'
import CardActions from './CardActions'

const LootMarketsCard: React.FC<{ lootmarket: LootMarket; account: string }> = ({ lootmarket, account }) => {
  const { pid, stakingToken, earningToken, isFinished, userData } = lootmarket
  const { t } = useTranslation()
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const accountHasStakedBalance = stakedBalance.gt(0)

  return (
    <StyledCard
      isFinished={isFinished && pid !== 0}
      ribbon={isFinished && <CardRibbon variantColor="textDisabled" text={t('Finished')} />}
    >
      <StyledCardInner>
        <StyledCardHeader
          isStaking={accountHasStakedBalance}
          earningTokenSymbol={earningToken.symbol}
          stakingTokenSymbol={stakingToken.symbol}
          isFinished={isFinished && pid !== 0}
        />
        <CardBody>
          <AprRow lootmarket={lootmarket} />
          <Flex mt="24px" flexDirection="column">
            {account ? (
              <CardActions lootmarket={lootmarket} stakedBalance={stakedBalance} />
            ) : (
              <>
                <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
                  {t('Start earning')}
                </Text>
                <UnlockButton />
              </>
            )}
          </Flex>
        </CardBody>
        <CardFooter lootmarket={lootmarket} account={account} />
      </StyledCardInner>
    </StyledCard>
  )
}

export default LootMarketsCard
