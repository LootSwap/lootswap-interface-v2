import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/layout/Page'
import { baseColors } from './theme/colors'

interface ITroll {
  name: string
}

const PagedTheme = styled.div`
  background: #000;
`

const Hero = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  text-align: center;
`

const Troll: React.FC<ITroll> = (props) => {
  useEffect(() => {
    document.body.style.background = 'none'
    document.body.style.opacity = '1'
    return () => {
      document.body.style.background = ''
      document.body.style.opacity = ''
    }
  })

  const { t } = useTranslation()
  const { name } = props
  return (
    <PagedTheme>
      <Page>
        <Hero>
          <Heading as="h1" scale="xl" mb="24px" color={baseColors.primary}>
            {name.toUpperCase()} {t('Guild')}
          </Heading>
          <Text color={baseColors.tertiary}>{t('tagline here')}</Text>
        </Hero>
      </Page>
    </PagedTheme>
  )
}

export default Troll
