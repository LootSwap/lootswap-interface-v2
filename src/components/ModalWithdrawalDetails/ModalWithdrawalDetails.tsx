import { Heading } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { useBlock } from 'state/hooks'
import styled from 'styled-components'

export interface WithdrawlDetailsProps {
  blockDeltaEndStages?: any
  blockDeltaStartStages?: any
  lastWithdrawBlock?: number
  lastDepositBlock?: number
  firstDepositBlock?: number
  devFeeStage?: any
}

const ModalWithdrawalDetails: React.FC<WithdrawlDetailsProps> = ({
  blockDeltaEndStages,
  blockDeltaStartStages,
  lastWithdrawBlock,
  lastDepositBlock,
  firstDepositBlock,
  devFeeStage,
}) => {
  const { t } = useTranslation()
  const { currentBlock } = useBlock()
  let lastActionBlock
  let currentBlockDelta
  let withdrawalFee

  if (
    lastWithdrawBlock &&
    lastWithdrawBlock > 0 &&
    blockDeltaStartStages.length > 0 &&
    blockDeltaEndStages.length > 0 &&
    devFeeStage.length > 0
  ) {
    lastActionBlock = lastWithdrawBlock
    currentBlockDelta = currentBlock - lastWithdrawBlock
  } else {
    lastActionBlock = firstDepositBlock
    currentBlockDelta = currentBlock - lastDepositBlock
  }
  if (!currentBlockDelta) {
    currentBlockDelta = 0
  }

  // The code below matches the smart contract implementation
  if (currentBlockDelta === blockDeltaStartStages[0] || currentBlockDelta === currentBlock) {
    // 25% fee for withdrawals of LP tokens in the same block this is to prevent abuse from flashloans
    withdrawalFee = (devFeeStage[0] / 100) * 100
  } else if (currentBlockDelta >= blockDeltaStartStages[1] && currentBlockDelta <= blockDeltaEndStages[0]) {
    // 8% fee if a user deposits and withdraws in between same block and 59 minutes.
    withdrawalFee = (devFeeStage[1] / 100) * 100
  } else if (currentBlockDelta >= blockDeltaStartStages[2] && currentBlockDelta <= blockDeltaEndStages[1]) {
    // 4% fee if a user deposits and withdraws after 1 hour but before 1 day.
    withdrawalFee = (devFeeStage[2] / 100) * 100
  } else if (currentBlockDelta >= blockDeltaStartStages[3] && currentBlockDelta <= blockDeltaEndStages[2]) {
    // 2% fee if a user deposits and withdraws between after 1 day but before 3 days.
    withdrawalFee = (devFeeStage[3] / 100) * 100
  } else if (currentBlockDelta >= blockDeltaStartStages[4] && currentBlockDelta <= blockDeltaEndStages[3]) {
    // 1% fee if a user deposits and withdraws after 3 days but before 5 days.
    withdrawalFee = (devFeeStage[4] / 100) * 100
  } else if (currentBlockDelta >= blockDeltaStartStages[5] && currentBlockDelta <= blockDeltaEndStages[4]) {
    // 0.5% fee if a user deposits and withdraws if the user withdraws after 5 days but before 2 weeks.
    withdrawalFee = (devFeeStage[5] / 1000) * 100
  } else if (currentBlockDelta >= blockDeltaStartStages[6] && currentBlockDelta <= blockDeltaEndStages[5]) {
    // 0.25% fee if a user deposits and withdraws after 2 weeks.
    withdrawalFee = (devFeeStage[6] / 10000) * 100
  } else if (currentBlockDelta > blockDeltaStartStages[7]) {
    // 0.1% fee if a user deposits and withdraws after 4 weeks.
    // Note: it's actually 0.01% and not 0.1%
    withdrawalFee = (devFeeStage[7] / 10000) * 100
  }

  return (
    <StyledModalWithdrawalDetails>
      <StyledModalWithdrawalDetailsNotes>
        {t('Important: Quests utilizes LP withdrawal fees to disincentivize short term farming and selling.')}
      </StyledModalWithdrawalDetailsNotes>
      <StyledModalWithdrawalDetailsNotes>
        {t('Your current withdrawal fee:')}
        <Heading as="h1" scale="xxl" color="#fff" mb="24px">{`${withdrawalFee ?? '...'}%`}</Heading>
        {t('Your first deposited funds or last withdrew funds at block %block%.', { block: lastActionBlock })}
      </StyledModalWithdrawalDetailsNotes>
    </StyledModalWithdrawalDetails>
  )
}

const StyledModalWithdrawalDetails = styled.div`
  align-items: center;
  background-color: rgb(0, 174, 233);
  margin: 0;
  padding: ${(props) => props.theme.spacing[4]}px 0;
  margin-bottom: 15px;
  color: #fff;
`
const StyledModalWithdrawalDetailsNotes = styled.div`
  padding: 5px;
  max-width: 350px;
  line-height: 1.5;
  text-align: center;
  margin: 0 auto;
`
export default ModalWithdrawalDetails
