import React from 'react'
import { Text, useTooltip, HelpIcon } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { BIG_ZERO } from 'utils/bigNumber'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { usePriceLootBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import useLockedBalance from 'hooks/useLockedBalance'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 24px;
`
const ReferenceElement = styled.div`
  display: inline-block;
`
const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const LockedDisplay = styled.div
`
  font-size: 24px;
  line-height: 36px;
  font-weight: bold;
`

const CakeHarvestBalance = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const lootPriceBusd = usePriceLootBusd() // TODO rename variable

  // #region ToolTip
  const tooltipLockedContent = (
    <div>
      {t(
        'Your locked balance will remain locked until 00:00:00 December 25th, 2021 (UTC). Your locked tokens will thereafter gradually unlock until December 25th, 2022.',
      )}
    </div>
  )
  const {
    targetRef: targetRefLocked,
    tooltip: toolTipLocked,
    tooltipVisible: tooltipVisibleLocked,
  } = useTooltip(tooltipLockedContent, {
    placement: 'top-end',
    tooltipOffset: [20, 10],
  })
  // #endregion

  const userLockedBalance = useLockedBalance() ?? BIG_ZERO
  const lockedBalanceDisplay = getBalanceNumber(userLockedBalance)
  const lockedBalanceBUSD = lockedBalanceDisplay * lootPriceBusd.toNumber()
  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '76px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <Label>
        {t('Locked Balance')}:
        <ReferenceElement ref={targetRefLocked}>
          <HelpIcon color="textSubtle" width="12px" />
        </ReferenceElement>
        {tooltipVisibleLocked && toolTipLocked}
      </Label>
      <LockedDisplay>{lockedBalanceDisplay.toFixed(2)}</LockedDisplay>
      {lootPriceBusd.gt(0) && <CardBusdValue value={lockedBalanceBUSD} />}
    </Block>
  )
}

export default CakeHarvestBalance
