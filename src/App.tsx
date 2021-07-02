import React, { lazy } from 'react'
// import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { Router, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@pancakeswap/uikit'
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

const App: React.FC = () => {
  usePollBlockNumber()
  useEagerConnect()
  usePollCoreFarmData()

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
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
