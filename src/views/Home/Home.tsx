import React from 'react'
import styled from 'styled-components'
import { BaseLayout } from '@pancakeswap/uikit'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import CakeStats from 'views/Home/components/CakeStats'

const CardImage = styled.img`
  padding: 0px;
  padding-bottom: 25px;
  border-radius: 25px;
  ${({ theme }) => theme.mediaQueries.xs} {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`

const Hero = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 24px;
  grid-gap: 24px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
    grid-gap: 32px;

    & > div {
      grid-column: span 6;
    }
  }
`

const Home: React.FC = () => {
  return (
    <Page>
      <Hero>
        <CardImage src="/images/decorations/background/lootswap-banner.jpeg" alt="LootSwap" />
      </Hero>
      <div>
        <Cards>
          <FarmStakingCard />
          <CakeStats />
        </Cards>
      </div>
    </Page>
  )
}

export default Home
