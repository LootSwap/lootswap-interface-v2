import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import { useHarvestAll } from 'hooks/useHarvest'
import useToast from 'hooks/useToast'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import LootLockBalance from './LootLockedBalance'
import LootUnlockBalance from './LootUnlockedBalance'

const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/decorations/background/loot-bg.svg');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { toastSuccess } = useToast()
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((i) => i.balance.toNumber() > 0)
  const pids = balancesWithValue.map((i) => i.pid)
  const { onReward } = useHarvestAll(pids)
  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      if (account) {
        setPendingTx(true)
        await onReward()
        setPendingTx(false)
        toastSuccess(
          `${t('Harvested')}!`,
          t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'LOOT' }),
        )
      }
    } catch (error) {
      setPendingTx(false)
    }
    setPendingTx(false)
  }, [account, onReward, toastSuccess, t])

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('LOOT Questing Rewards')}
        </Heading>
        <CardImage src="/images/loot.svg" alt="loot logo" width={64} height={64} />
        <Block>
          <Label>{t('LOOT to Harvest')}:</Label>
          <CakeHarvestBalance />
        </Block>
        <Block>
          <Label>{t('LOOT in Wallet')}:</Label>
          <CakeWalletBalance />
        </Block>
        <LootLockBalance />
        <LootUnlockBalance />
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length && pendingTx}
              onClick={harvestAllFarms}
              width="100%"
            >
              {pendingTx ? t('Collecting LOOT') : 'Harvest All'}
            </Button>
          ) : (
            <UnlockButton width="100%" />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
