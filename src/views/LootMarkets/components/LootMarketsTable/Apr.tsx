import React from 'react'
import { Flex, useModal, CalculateIcon, IconButton, Skeleton, FlexProps } from '@pancakeswap/uikit'
import { BASE_EXCHANGE_URL } from 'config'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import Balance from 'components/Balance'
import { LootMarket } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getAprData } from 'views/LootMarkets/helpers'

interface AprProps extends FlexProps {
  lootmarket: LootMarket
  showIcon: boolean
  performanceFee?: number
}

const Apr: React.FC<AprProps> = ({ lootmarket, showIcon, performanceFee = 0, ...props }) => {
  const { stakingToken, earningToken, isFinished, earningTokenPrice, apr } = lootmarket
  const { t } = useTranslation()

  const { apr: earningsPercentageToDisplay, roundingDecimals, compoundFrequency } = getAprData(lootmarket)

  const apyModalLink =
    stakingToken.address &&
    `${BASE_EXCHANGE_URL}/#/swap?outputCurrency=${stakingToken.address[process.env.REACT_APP_CHAIN_ID]}`

  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal
      tokenPrice={earningTokenPrice}
      apr={apr}
      linkLabel={t('Get %symbol%', { symbol: stakingToken.symbol })}
      linkHref={apyModalLink || BASE_EXCHANGE_URL}
      earningTokenSymbol={earningToken.symbol}
      roundingDecimals={roundingDecimals}
      compoundFrequency={compoundFrequency}
      performanceFee={performanceFee}
    />,
  )

  const openRoiModal = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return (
    <Flex alignItems="center" justifyContent="space-between" {...props}>
      {earningsPercentageToDisplay || isFinished ? (
        <>
          <Flex>
            <Balance
              onClick={openRoiModal}
              fontSize="16px"
              isDisabled={isFinished}
              value={isFinished ? 0 : earningsPercentageToDisplay}
              decimals={2}
              unit="%"
            />
          </Flex>
          {!isFinished && showIcon && (
            <Flex>
              <IconButton
                onClick={openRoiModal}
                variant="text"
                width="20px"
                height="20px"
                mr={['-14px', '-14px', '0px']}
              >
                <CalculateIcon color="textSubtle" width="20px" />
              </IconButton>
            </Flex>
          )}
        </>
      ) : (
        <Skeleton width="80px" height="16px" />
      )}
    </Flex>
  )
}

export default Apr
