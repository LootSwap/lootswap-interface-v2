import React from 'react'
import { Text, Skeleton } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { LOOT_PER_BLOCK } from 'config'
import { useTranslation } from 'contexts/Localization'
import { useMasterLooterInfo } from 'state/hooks'

const EmissionsStyled = styled(Text)`
  position: absolute;
  bottom: 15px;
  width: 100%;
  text-align: center;
`

const SkeletonStyled = styled(Skeleton)`
  position: absolute;
  bottom: 15px;
  width: 90%;
  text-align: center;
`

const CurrentMultiplier = () => {
  const { t } = useTranslation()
  const { currentMultiplier, initialBlock } = useMasterLooterInfo()
  const emissionRate = currentMultiplier * Number(new BigNumber(LOOT_PER_BLOCK))
  if (initialBlock <= 0) {
    return <SkeletonStyled width={75} height={25} />
  }
  return (
    <EmissionsStyled fontSize="12px">
      {t('The base emission rate is currently %e% %sym% per block.', {
        e: emissionRate % 1 === 0 ? emissionRate : emissionRate.toFixed(2),
        sym: 'LOOT',
      })}
    </EmissionsStyled>
  )
}

export default CurrentMultiplier
