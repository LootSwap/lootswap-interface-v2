import React from 'react'
import { useParams } from 'react-router-dom'
import { Text, Skeleton } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { useGuildMasterLooterInfo } from 'state/hooks'
import useGuildSettings from '../hooks/useGuildSettings'

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

const GuildCurrentMultiplier = () => {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const guildSettings = useGuildSettings(slug)
  const { currentMultiplier, initialBlock } = useGuildMasterLooterInfo(slug)
  const emissionRate = currentMultiplier * guildSettings.guildTokenPerBlock
  if (initialBlock <= 0) {
    return <SkeletonStyled width={75} height={25} />
  }
  return (
    <EmissionsStyled fontSize="12px">
      {t('The base emission rate is currently %e% %sym% per block.', {
        e: emissionRate % 1 === 0 ? emissionRate : emissionRate.toFixed(2),
        sym: slug.toUpperCase(),
      })}
    </EmissionsStyled>
  )
}

export default GuildCurrentMultiplier
