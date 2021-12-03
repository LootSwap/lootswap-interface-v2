import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { useGuildHarvestAll } from 'hooks/useHarvest'
import UnlockButton from 'components/UnlockButton'
import useGuildsQuestWithBalance from '../hooks/useGuildsQuestWithBalance'
import GuildHarvestBalance from './GuildHarvestBalance'
import GuildWalletBalance from './GuildWalletBalance'
import GuildLockedBalance from './GuildLockedBalance'

interface IStyledFarmStakingCard {
  src: string
}

const StyledFarmStakingCard: React.FunctionComponent<IStyledFarmStakingCard> = styled(Card)<{ src: string }>`
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: right;
  min-height: 20px;
  background-size: 220px;
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

const FarmedStakingCard = (guildSettings) => {
  const { symbol, lockupconfig, footerImg, guildSlug, hasLockUp } = guildSettings
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const farmsWithBalance = useGuildsQuestWithBalance()
  const balancesWithValue = farmsWithBalance.filter((i) => i.guildSlug === guildSlug && i.balance.toNumber() > 0)
  const pids = balancesWithValue.map((i) => i.pid)
  const { onReward } = useGuildHarvestAll(guildSlug, pids)
  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      if (account) {
        await onReward()
      }
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    }
    setPendingTx(false)
  }, [account, onReward])

  return (
    <StyledFarmStakingCard src={footerImg.src}>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('%sym% Questing Rewards', { sym: symbol })}
        </Heading>
        <CardImage
          src={lockupconfig.guildIcon ? lockupconfig.guildIcon : '/images/loot.svg'}
          alt="loot logo"
          width={64}
          height={64}
        />
        <Block>
          <Label>{t('%sym% to Harvest', { sym: symbol })}:</Label>
          <GuildHarvestBalance {...guildSettings} />
        </Block>
        <Block>
          <Label>{t('%sym% in Wallet', { sym: symbol })}:</Label>
          <GuildWalletBalance {...guildSettings} />
        </Block>
        {hasLockUp && <GuildLockedBalance {...guildSettings} />}
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              width="100%"
            >
              {pendingTx ? t('Collecting %sym%', { sym: symbol }) : 'Harvest All'}
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
