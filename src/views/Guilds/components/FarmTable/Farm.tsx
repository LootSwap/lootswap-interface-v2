import React from 'react'
import styled from 'styled-components'
import { useGuildUser } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import { Text, Image } from '@pancakeswap/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
// import { useParams } from 'react-router-dom'

export interface FarmProps {
  label: string
  pid: number
  image: string
  guildSlug: string
}

const IconImage = styled(Image)`
  width: 24px;
  height: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 40px;
    height: 40px;
  }
`

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }
`

const Farm: React.FunctionComponent<FarmProps> = ({ image, label, pid, guildSlug }) => {
  const { stakedBalance } = useGuildUser(pid, guildSlug)
  const { t } = useTranslation()
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const handleRenderFarming = (): JSX.Element => {
    if (rawStakedBalance) {
      return (
        <Text color="secondary" fontSize="12px" bold textTransform="uppercase">
          {t('Questing')}
        </Text>
      )
    }

    return null
  }
  // const { slug } = useParams<{ slug: string }>()
  return (
    <Container>
      <IconImage src={`/images/questlog/${image}.svg`} alt="icon" width={40} height={40} mr="8px" />
      <div>
        {handleRenderFarming()}
        <Text bold>{label}</Text>
      </div>
    </Container>
  )
}

export default Farm
