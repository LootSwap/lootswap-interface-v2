import React, { useState } from 'react'
import { Text, useTooltip, HelpIcon, Button } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import useUnlock, { useCanUnlockAmount, useLockBlockLength } from 'hooks/useUnlock'

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

const LockedDisplay = styled.div`
  font-size: 24px;
  line-height: 36px;
  font-weight: bold;
`
const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  margin-bottom: 8px;

  & button {
    margin-left: 15px;
  }
`

const LootUnlockedBalance = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const blockLength = useLockBlockLength()
  const { account } = useWeb3React()
  // #region ToolTip
  const tooltipLockedContent = <div>{t('Tokens will slowly release approximately Christmas 2021 over 1 year.')}</div>
  const {
    targetRef: targetRefLocked,
    tooltip: toolTipLocked,
    tooltipVisible: tooltipVisibleLocked,
  } = useTooltip(tooltipLockedContent, {
    placement: 'top-end',
    tooltipOffset: [20, 10],
  })
  // #endregion

  const unlockedBalanceDisplay = getBalanceNumber(useCanUnlockAmount())
  const { onReward } = useUnlock()
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
        {t('Unlocked Balance %msg%', { msg: blockLength > 0 ? `(block left till unlock: ${blockLength})` : '' })}:
        <ReferenceElement ref={targetRefLocked}>
          <HelpIcon color="textSubtle" width="12px" />
        </ReferenceElement>
        {tooltipVisibleLocked && toolTipLocked}
      </Label>
      <Row>
        <LockedDisplay>{unlockedBalanceDisplay.toFixed(6)}</LockedDisplay>
        <Button
          disabled={unlockedBalanceDisplay <= 0 || pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onReward()
            setPendingTx(false)
          }}
        >
          {t('Claim')}
        </Button>
      </Row>
    </Block>
  )
}

export default LootUnlockedBalance
