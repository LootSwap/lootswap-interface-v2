import React, { useState } from 'react'
import { Modal, Text, Button, Heading, Flex, AutoRenewIcon } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { useLootMarketsHarvest } from 'hooks/useHarvest'
import useToast from 'hooks/useToast'
import { Token } from 'config/constants/types'

interface CollectModalProps {
  formattedBalance: string
  fullBalance: string
  earningToken: Token
  earningsDollarValue: string
  pid: number
  isStakingPool: boolean
  onDismiss?: () => void
}

const CollectModal: React.FC<CollectModalProps> = ({
  formattedBalance,
  earningToken,
  earningsDollarValue,
  pid,
  onDismiss,
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { toastSuccess, toastError } = useToast()
  const { onReward } = useLootMarketsHarvest(pid)
  const [pendingTx, setPendingTx] = useState(false)

  const handleHarvestConfirm = async () => {
    setPendingTx(true)
    // harvesting
    try {
      await onReward()
      toastSuccess(
        `${t('Harvested')}!`,
        t('Your %symbol% earnings have been sent to your wallet!', { symbol: earningToken.symbol }),
      )
      setPendingTx(false)
      onDismiss()
    } catch (e) {
      console.error('handleHarvestConfirm() error', e)
      toastError(t('Canceled'), t('Please try again and confirm the transaction.'))
      setPendingTx(false)
    }
  }

  return (
    <Modal
      title={`${earningToken.symbol} ${t('Harvest')}`}
      onDismiss={onDismiss}
      headerBackground={theme.colors.gradients.lootswap}
    >
      <Flex justifyContent="space-between" alignItems="center" mb="24px">
        <Text>{t('Harvesting')}:</Text>
        <Flex flexDirection="column">
          <Heading>
            {formattedBalance} {earningToken.symbol}
          </Heading>
          <Text fontSize="12px" color="textSubtle">{`~${earningsDollarValue || 0} USD`}</Text>
        </Flex>
      </Flex>

      <Button
        mt="8px"
        onClick={handleHarvestConfirm}
        isLoading={pendingTx}
        endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
      >
        {pendingTx ? t('Confirming') : t('Confirm')}
      </Button>
      <Button variant="text" onClick={onDismiss} pb="0px">
        {t('Close Window')}
      </Button>
    </Modal>
  )
}

export default CollectModal
