import React from 'react'
import { useParams } from 'react-router-dom'
import { Text, Skeleton } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { useGuildMasterLooterInfo } from 'state/hooks'
import useGuildSettings from '../hooks/useGuildSettings'
import CardValue from './CardValue'

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const GuildCurrentMultiplier = () => {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const guildSettings = useGuildSettings(slug)
  const { currentMultiplier, initialBlock } = useGuildMasterLooterInfo(slug)
  const emissionRateWithGuild = currentMultiplier * guildSettings.guildTokenPerBlock
  if (initialBlock <= 0) {
    return <Skeleton width={75} height={25} />
  }
  return (
    <>
      <Row>
        <Text fontSize="24px">{t('%sym% Base Emission', { sym: guildSettings.symbol })}</Text>
        {emissionRateWithGuild ? (
          <CardValue fontSize="24px" value={guildSettings.guildTokenPerBlock} decimals={4} />
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

export default GuildCurrentMultiplier
