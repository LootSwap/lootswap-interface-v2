import React, { lazy } from 'react'
import styled from 'styled-components'
// import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { Router, Route, Switch } from 'react-router-dom'
import { ProposalIcon, ResetCSS } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import { usePollCoreFarmData, usePollBlockNumber } from 'state/hooks'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
// import EasterEgg from './components/EasterEgg'
import history from './routerHistory'
import Guilds from './views/Guilds'

// Route-based code splitting
// Only do not include lazy() for other pages and only include them in the main bundle IF you expect it to be the  most visited page
// EX: Home, Farms and NotFound are all imported "lazyily" because they will be the least likely for page visits
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const LootMarket = lazy(() => import('./views/LootMarkets'))
const NotFound = lazy(() => import('./views/NotFound'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const WarningBanner = styled.div`
  width: 100%;
  text-align: center;
  display: block;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  position: absolute;
  top: 0;
  z-index: 10000;
  padding-bottom: 2px;
  padding-top: 2px;
`
const HeaderWrapper = styled.div`
  width: 100%;
  justify-content: space-between;
`

const App: React.FC = () => {
  usePollBlockNumber()
  useEagerConnect()
  usePollCoreFarmData()

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <HeaderWrapper>
        {true && (
          <WarningBanner>
            Prefer legacy? visit{' '}
            <a href="https://legacy.lootswap.finance">
              <u>Legacy Lootswap</u>
            </a>
          </WarningBanner>
        )}
      </HeaderWrapper>
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/questlog">
              <Farms />
            </Route>
            <Route path="/market">
              <LootMarket />
            </Route>
            <Route path="/guilds/:slug" component={Guilds} />
            {/* Redirect 
            <Route path="/staking">
              <Redirect to="/pools" />
            </Route>
            <Route path="/syrup">
              <Redirect to="/pools" />
            </Route> */}
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      {/* <EasterEgg iterations={2} /> */} {/* TODO want to modify EasterEgg to something fun */}
      <ToastListener />
    </Router>
  )
}

export default React.memo(App)
