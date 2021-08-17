import React from 'react'
import { Button, Text, Flex, Skeleton } from '@pancakeswap/uikit'
import { useModal } from '@lootswap/uikit'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { LootMarketCategory } from 'config/constants/types'
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { BIG_ZERO } from 'utils/bigNumber'
import { LootMarket } from 'state/types'
import { DISPLAY_DECIMAL_FORMAT_PREF } from 'config'

import { ActionContainer, ActionTitles, ActionContent } from './styles'
import CollectModal from '../../LootMarketsCard/Modals/CollectModal'

interface HarvestActionProps extends LootMarket {
  userDataLoaded: boolean
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({
  pid,
  lootMarketCategory,
  earningToken,
  userData,
  userDataLoaded,
  earningTokenPrice,
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO

  const earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals)
  const earningTokenDollarBalance = getBalanceNumber(earnings.multipliedBy(earningTokenPrice), earningToken.decimals)
  const hasEarnings = earnings.gt(0)

  let decimalFormatPrefer = 1
  if (hasEarnings) {
    decimalFormatPrefer = Number(earningTokenBalance.toFixed(15)) % 1 !== 0 ? 18 : DISPLAY_DECIMAL_FORMAT_PREF
  }

  const fullBalance = getFullDisplayBalance(earnings, earningToken.decimals)
  const formattedBalance = formatNumber(earningTokenBalance, decimalFormatPrefer, decimalFormatPrefer)
  const earningsDollarValue = formatNumber(earningTokenDollarBalance)
  const isStakingPool =
    lootMarketCategory === LootMarketCategory.CORE || lootMarketCategory === LootMarketCategory.COMMUNITY

  const displayBalance = hasEarnings ? earningTokenBalance : 0

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      fullBalance={fullBalance}
      earningToken={earningToken}
      earningsDollarValue={earningsDollarValue}
      pid={pid}
      isStakingPool={isStakingPool}
    />,
  )

  const actionTitle = (
    <>
      <Text fontSize="12px" bold color="secondary" as="span" textTransform="uppercase">
        {earningToken.symbol}{' '}
      </Text>
      <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
        {t('Earned')}
      </Text>
    </>
  )

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <ActionContent>
          <Balance pt="8px" lineHeight="1" bold fontSize="20px" decimals={5} value={0} />
          <Button disabled>{t('Harvest')}</Button>
        </ActionContent>
      </ActionContainer>
    )
  }

  if (!userDataLoaded) {
    return (
      <ActionContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <ActionContent>
          <Skeleton width={180} height="32px" marginTop={14} />
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <ActionTitles>{actionTitle}</ActionTitles>
      <ActionContent>
        <Flex flex="1" pt="16px" flexDirection="column" alignSelf="flex-start">
          <Balance lineHeight="1" bold fontSize="20px" decimals={decimalFormatPrefer} value={displayBalance} />
          {hasEarnings ? (
            <Balance
              display="inline"
              fontSize="12px"
              color={hasEarnings ? 'textSubtle' : 'textDisabled'}
              decimals={2}
              value={earningTokenDollarBalance}
              unit=" USD"
              prefix="~"
            />
          ) : (
            <Text fontSize="12px" color={hasEarnings ? 'textSubtle' : 'textDisabled'}>
              0 USD
            </Text>
          )}
        </Flex>
        <Button disabled={!hasEarnings} onClick={onPresentCollect}>
          {t('Harvest')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
