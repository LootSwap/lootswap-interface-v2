import React from 'react'
import styled from 'styled-components'
import { OrcCoinFlip } from '@lootswap/uikit'
import Page from './layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <OrcCoinFlip />
    </Wrapper>
  )
}

export default PageLoader
