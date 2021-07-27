import React from 'react'
import { Text, Skeleton } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { LOOT_PER_BLOCK } from 'config'
import { useTranslation } from 'contexts/Localization'
import { useMasterLooterInfo } from 'state/hooks'
import CardValue from './CardValue'

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CurrentMultiplier = () => {
  const { t } = useTranslation()
  const { currentMultiplier, initialBlock } = useMasterLooterInfo()
  const emissionRateWithLoot = currentMultiplier * Number(new BigNumber(LOOT_PER_BLOCK))
  if (initialBlock <= 0) {
    return <Skeleton width={75} height={25} />
  }
  return (
    <>
      <Row>
        <Text fontSize="24px">{t('%sym% Base Emission', { sym: 'LOOT' })}</Text>
        {emissionRateWithLoot ? (
          <CardValue fontSize="24px" value={Number(LOOT_PER_BLOCK)} decimals={0} />
        ) : (
          <Skeleton width={75} height={25} />
        )}
      </Row>
      <Row>
        <Text fontSize="24px">{t('Emission multiplier')}</Text>
        {currentMultiplier ? (
          <CardValue fontSize="24px" value={currentMultiplier} prefix="x" decimals={0} />
        ) : (
          <Skeleton width={75} height={25} />
        )}
      </Row>
    </>
  )
}

export default CurrentMultiplier
