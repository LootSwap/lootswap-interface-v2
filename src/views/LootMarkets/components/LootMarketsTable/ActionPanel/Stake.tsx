import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, IconButton, AddIcon, MinusIcon, Skeleton, Flex, Text } from '@pancakeswap/uikit'
import { useModal } from '@lootswap/uikit'
import UnlockButton from 'components/UnlockButton'
import { useWeb3React } from '@web3-react/core'
import { LootMarket } from 'state/types'
import Balance from 'components/Balance'
import { useTranslation } from 'contexts/Localization'
import { useLootMarketApprove } from 'hooks/useApprove'
import { getBalanceNumber } from 'utils/formatBalance'
import { LootMarketCategory } from 'config/constants/types'
import { BIG_ZERO } from 'utils/bigNumber'
import { getAddress } from 'utils/addressHelpers'
import { useERC20 } from 'hooks/useContract'
import { ActionContainer, ActionTitles, ActionContent } from './styles'
import NotEnoughTokensModal from '../../LootMarketsCard/Modals/NotEnoughTokensModal'
import StakeModal from '../../LootMarketsCard/Modals/StakeModal'

const IconButtonWrapper = styled.div`
  display: flex;
`

interface StackedActionProps {
  lootmarket: LootMarket
  userDataLoaded: boolean
}

const Staked: React.FunctionComponent<StackedActionProps> = ({ lootmarket, userDataLoaded }) => {
  const { pid, stakingToken, earningToken, isFinished, lootMarketCategory, userData, stakingTokenPrice } = lootmarket
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const stakingTokenContract = useERC20(stakingToken.address ? getAddress(stakingToken.address) : '')
  const { handleApprove: handlePoolApprove, requestedApproval: requestedPoolApproval } = useLootMarketApprove(
    stakingTokenContract,
    pid,
    earningToken.symbol,
  )

  const handleApprove = handlePoolApprove
  const requestedApproval = requestedPoolApproval

  const isStakingPool =
    lootMarketCategory === LootMarketCategory.CORE || lootMarketCategory === LootMarketCategory.COMMUNITY
  const allowance = userData?.allowance ? new BigNumber(userData.allowance) : BIG_ZERO
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const isNotVaultAndHasStake = stakedBalance.gt(0)

  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO

  const stakedTokenBalance = getBalanceNumber(stakedBalance, stakingToken.decimals)
  const stakedTokenDollarBalance = getBalanceNumber(
    stakedBalance.multipliedBy(stakingTokenPrice),
    stakingToken.decimals,
  )
  const needsApproval = !allowance.gt(0) && !isStakingPool

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

  const onStake = () => {
    onPresentStake()
  }

  const onUnstake = () => {
    onPresentUnstake()
  }

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
            {t('Start staking')}
          </Text>
        </ActionTitles>
        <ActionContent>
          <UnlockButton width="100%" />
        </ActionContent>
      </ActionContainer>
    )
  }

  if (!userDataLoaded) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
            {t('Start staking')}
          </Text>
        </ActionTitles>
        <ActionContent>
          <Skeleton width={180} height="32px" marginTop={14} />
        </ActionContent>
      </ActionContainer>
    )
  }

  if (needsApproval) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
            {t('Enable market')}
          </Text>
        </ActionTitles>
        <ActionContent>
          <Button width="100%" disabled={requestedApproval} onClick={handleApprove} variant="secondary">
            {t('Enable')}
          </Button>
        </ActionContent>
      </ActionContainer>
    )
  }

  // Wallet connected, user data loaded and approved
  if (isNotVaultAndHasStake) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text fontSize="12px" bold color="secondary" as="span" textTransform="uppercase">
            {stakingToken.symbol}{' '}
          </Text>
          <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
            {t('Staked')}
          </Text>
        </ActionTitles>
        <ActionContent>
          <Flex flex="1" pt="16px" flexDirection="column" alignSelf="flex-start">
            <Balance lineHeight="1" bold fontSize="20px" decimals={5} value={stakedTokenBalance} />
            <Balance
              fontSize="12px"
              display="inline"
              color="textSubtle"
              decimals={2}
              value={stakedTokenDollarBalance}
              unit=" USD"
              prefix="~"
            />
          </Flex>
          <IconButtonWrapper>
            <IconButton variant="secondary" onClick={onUnstake} mr="6px">
              <MinusIcon color="primary" width="14px" />
            </IconButton>
            <IconButton
              variant="secondary"
              onClick={stakingTokenBalance.gt(0) ? onStake : onPresentTokenRequired}
              disabled={isFinished}
            >
              <AddIcon color="primary" width="14px" />
            </IconButton>
          </IconButtonWrapper>
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <ActionTitles>
        <Text fontSize="12px" bold color="secondary" as="span" textTransform="uppercase">
          {t('Stake')}{' '}
        </Text>
        <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
          {stakingToken.symbol}
        </Text>
      </ActionTitles>
      <ActionContent>
        <Button
          width="100%"
          onClick={stakingTokenBalance.gt(0) ? onStake : onPresentTokenRequired}
          variant="secondary"
          disabled={isFinished}
        >
          {t('Stake')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default Staked
