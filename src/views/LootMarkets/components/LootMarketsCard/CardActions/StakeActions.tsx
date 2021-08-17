import React from 'react'
import { Flex, Text, Button, IconButton, AddIcon, MinusIcon, Skeleton } from '@pancakeswap/uikit'
import { useModal } from '@lootswap/uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { LootMarket } from 'state/types'
import Balance from 'components/Balance'
import NotEnoughTokensModal from '../Modals/NotEnoughTokensModal'
import StakeModal from '../Modals/StakeModal'

interface StakeActionsProps {
  lootmarket: LootMarket
  stakingTokenBalance: BigNumber
  stakedBalance: BigNumber
  isStakingPool: boolean
  isStaked: ConstrainBoolean
  isLoading?: boolean
}

const StakeAction: React.FC<StakeActionsProps> = ({
  lootmarket,
  stakingTokenBalance,
  stakedBalance,
  isStakingPool,
  isStaked,
  isLoading = false,
}) => {
  const { stakingToken, stakingTokenPrice, isFinished } = lootmarket
  const { t } = useTranslation()
  const stakedTokenBalance = getBalanceNumber(stakedBalance, stakingToken.decimals)
  const stakedTokenDollarBalance = getBalanceNumber(
    stakedBalance.multipliedBy(stakingTokenPrice),
    stakingToken.decimals,
  )

  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)

  const [onPresentStake] = useModal(
    <StakeModal
      isStakingPool={isStakingPool}
      lootmarket={lootmarket}
      stakingTokenBalance={stakingTokenBalance}
      stakingTokenPrice={stakingTokenPrice}
    />,
  )

  const [onPresentUnstake] = useModal(
    <StakeModal
      stakingTokenBalance={stakingTokenBalance}
      isStakingPool={isStakingPool}
      lootmarket={lootmarket}
      stakingTokenPrice={stakingTokenPrice}
      isRemovingStake
    />,
  )

  const renderStakeAction = () => {
    return isStaked ? (
      <Flex justifyContent="space-between" alignItems="center">
        <Flex flexDirection="column">
          <>
            <Balance bold fontSize="20px" decimals={3} value={stakedTokenBalance} />
            {stakingTokenPrice !== 0 && (
              <Text fontSize="12px" color="textSubtle">
                <Balance
                  fontSize="12px"
                  color="textSubtle"
                  decimals={2}
                  value={stakedTokenDollarBalance}
                  prefix="~"
                  unit=" USD"
                />
              </Text>
            )}
          </>
        </Flex>
        <Flex>
          <IconButton variant="secondary" onClick={onPresentUnstake} mr="6px">
            <MinusIcon color="primary" width="24px" />
          </IconButton>
          <IconButton
            variant="secondary"
            onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}
            disabled={isFinished}
          >
            <AddIcon color="primary" width="24px" height="24px" />
          </IconButton>
        </Flex>
      </Flex>
    ) : (
      <Button disabled={isFinished} onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}>
        {t('Stake')}
      </Button>
    )
  }

  return <Flex flexDirection="column">{isLoading ? <Skeleton width="100%" height="52px" /> : renderStakeAction()}</Flex>
}

export default StakeAction
