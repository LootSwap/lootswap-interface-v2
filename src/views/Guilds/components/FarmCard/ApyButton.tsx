import React from 'react'
import BigNumber from 'bignumber.js'
import { IconButton, useModal, CalculateIcon } from '@pancakeswap/uikit'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import { useTranslation } from 'contexts/Localization'

export interface ApyButtonProps {
  lpLabel?: string
  guildTokenPrice?: BigNumber
  apr?: number
  addLiquidityUrl?: string
}

const ApyButton: React.FC<ApyButtonProps> = ({ lpLabel, guildTokenPrice, apr, addLiquidityUrl }) => {
  const { t } = useTranslation()
  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal
      linkLabel={t('Get %symbol%', { symbol: lpLabel })}
      tokenPrice={guildTokenPrice.toNumber()}
      apr={apr}
      linkHref={addLiquidityUrl}
    />,
  )

  const handleClickButton = (event): void => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return (
    <IconButton onClick={handleClickButton} variant="text" scale="sm" ml="4px">
      <CalculateIcon width="18px" />
    </IconButton>
  )
}

export default ApyButton
