import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text } from '@pancakeswap/uikit'
import { OrcCoinFlip } from '@lootswap/uikit'
import Page from 'components/layout/Page'
import { useTranslation } from 'contexts/Localization'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const StyledText = styled(Text)`
  background: #f9f9f9;
  padding: 2%;
`

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <StyledNotFound>
        <OrcCoinFlip />
        <Heading scale="xxl">404</Heading>
        <StyledText mb="16px">
          {t(
            '00110100 00110000 00110100 00100000 01110000 01100001 01100111 01100101 00100000 01101110 01101111 01110100 00100000 01100110 01101111 01110101 01101110 01100100',
          )}
        </StyledText>
        <Button as="a" href="/" scale="sm">
          {t('Back Home')}
        </Button>
      </StyledNotFound>
    </Page>
  )
}

export default NotFound
