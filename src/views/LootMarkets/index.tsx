import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Heading, Flex, Text } from '@pancakeswap/uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { useTranslation } from 'contexts/Localization'
import usePersistState from 'hooks/usePersistState'
import { useLootMarkets, useFetchPublicLootMarketsData, usePollFarmsData } from 'state/hooks'
import { latinise } from 'utils/latinise'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import { LootMarket } from 'state/types'
import LootMarketsCard from './components/LootMarketsCard'
import LootMarketTabButtons from './components/LootMarketTabButtons'
// import HelpButton from './components/HelpButton'
import LootMarketsTable from './components/LootMarketsTable/LootMarketsTable'
import { ViewMode } from './components/ToggleView/ToggleView'

const CardLayout = styled(FlexLayout)`
  justify-content: center;
`

const PoolControls = styled(Flex)`
  flex-direction: column;
  margin-bottom: 24px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const SearchSortContainer = styled(Flex)`
  gap: 10px;
  justify-content: space-between;
`

const ControlStretch = styled(Flex)`
  > div {
    flex: 1;
  }
`
const TextStyled = styled(Text)`
  text-align: center;
  background-color: ${({ theme }) => theme.card.background};
  padding-bottom: 0px;
  margin-bottom: 32px;
  padding: 5px;
  border-radius: 5px;
`

const NUMBER_OF_LOOT_MARKETS_VISIBLE = 12

const LootMarkets: React.FC = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { lootmarkets: poolsWithoutAutoVault, userDataLoaded } = useLootMarkets(account)
  const [stakedOnly, setStakedOnly] = usePersistState(false, { localStorageKey: 'loot_market_staked' })
  const [numberOfLootMarketsVisible, setNumberOfLootMarketsVisible] = useState(NUMBER_OF_LOOT_MARKETS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, { localStorageKey: 'lootswap_farm_view' })
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')

  const lootMarkets = useMemo(() => {
    return [...poolsWithoutAutoVault]
  }, [poolsWithoutAutoVault])

  // TODO aren't arrays in dep array checked just by reference, i.e. it will rerender every time reference changes?
  const [finishedLootMarkets, openLootMarkets] = useMemo(
    () => partition(lootMarkets, (market) => market.isFinished),
    [lootMarkets],
  )
  const stakedOnlyFinishedLootMarkets = useMemo(
    () =>
      finishedLootMarkets.filter((lootmarket) => {
        return lootmarket.userData && new BigNumber(lootmarket.userData.stakedBalance).isGreaterThan(0)
      }),
    [finishedLootMarkets],
  )
  const stakedOnlyOpenLootMarkets = useMemo(
    () =>
      openLootMarkets.filter((lootmarket) => {
        return lootmarket.userData && new BigNumber(lootmarket.userData.stakedBalance).isGreaterThan(0)
      }),
    [openLootMarkets],
  )
  const hasStakeInFinishedLootMarkets = stakedOnlyFinishedLootMarkets.length > 0

  usePollFarmsData()
  useFetchPublicLootMarketsData()

  useEffect(() => {
    const showMoreLootMarkets = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfLootMarketsVisible((poolsCurrentlyVisible) => poolsCurrentlyVisible + NUMBER_OF_LOOT_MARKETS_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreLootMarkets, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [observerIsSet])

  const showFinishedLootMarkets = location.pathname.includes('history')

  const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  const sortLootMarkets = (poolsToSort: LootMarket[]) => {
    switch (sortOption) {
      case 'apr':
        // Ternary is needed to prevent pools without APR (like MIX) getting top spot
        return orderBy(poolsToSort, (lootmarket: LootMarket) => (lootmarket.apr ? lootmarket.apr : 0), 'desc')
      case 'earned':
        return orderBy(
          poolsToSort,
          (lootmarket: LootMarket) => {
            if (!lootmarket.userData || !lootmarket.earningTokenPrice) {
              return 0
            }
            return lootmarket.userData.pendingReward.times(lootmarket.earningTokenPrice).toNumber()
          },
          'desc',
        )
      case 'totalStaked':
        return orderBy(poolsToSort, (lootmarket: LootMarket) => lootmarket.totalStaked.toNumber(), 'desc')
      default:
        return poolsToSort
    }
  }

  const lootMarketsToShow = () => {
    let chosenLootMarkets = []
    if (showFinishedLootMarkets) {
      chosenLootMarkets = stakedOnly ? stakedOnlyFinishedLootMarkets : finishedLootMarkets
    } else {
      chosenLootMarkets = stakedOnly ? stakedOnlyOpenLootMarkets : openLootMarkets
    }

    if (searchQuery) {
      const lowercaseQuery = latinise(searchQuery.toLowerCase())
      chosenLootMarkets = chosenLootMarkets.filter((lootmarket) =>
        latinise(lootmarket.earningToken.symbol.toLowerCase()).includes(lowercaseQuery),
      )
    }

    return sortLootMarkets(chosenLootMarkets).slice(0, numberOfLootMarketsVisible)
  }

  const cardLayout = (
    <CardLayout>
      {lootMarketsToShow().map((lootmarket) => (
        <LootMarketsCard key={lootmarket.pid} lootmarket={lootmarket} account={account} />
      ))}
    </CardLayout>
  )

  const tableLayout = (
    <LootMarketsTable lootmarkets={lootMarketsToShow()} account={account} userDataLoaded={userDataLoaded} />
  )

  return (
    <>
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
              {t('Loot Markets')}
            </Heading>
            <Heading scale="md" color="text">
              {t('Just stake some tokens to earn.')}
            </Heading>
            <Heading scale="md" color="text">
              {t('High APR, low risk.')}
            </Heading>
          </Flex>
          <Flex flex="1" height="fit-content" justifyContent="center" alignItems="center" mt={['24px', null, '0']}>
            {/* <HelpButton /> */}
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        <PoolControls justifyContent="space-between">
          <LootMarketTabButtons
            stakedOnly={stakedOnly}
            setStakedOnly={setStakedOnly}
            hasStakeInFinishedLootMarkets={hasStakeInFinishedLootMarkets}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          <SearchSortContainer>
            <Flex flexDirection="column" width="50%">
              <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase">
                {t('Sort by')}
              </Text>
              <ControlStretch>
                <Select
                  options={[
                    {
                      label: t('Hot'),
                      value: 'hot',
                    },
                    {
                      label: t('APR'),
                      value: 'apr',
                    },
                    {
                      label: t('Earned'),
                      value: 'earned',
                    },
                    {
                      label: t('Total staked'),
                      value: 'totalStaked',
                    },
                  ]}
                  onChange={handleSortOptionChange}
                />
              </ControlStretch>
            </Flex>
            <Flex flexDirection="column" width="50%">
              <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase">
                {t('Search')}
              </Text>
              <ControlStretch>
                <SearchInput onChange={handleChangeSearchQuery} placeholder="Search Markets" />
              </ControlStretch>
            </Flex>
          </SearchSortContainer>
        </PoolControls>
        {showFinishedLootMarkets && (
          <TextStyled fontSize="20px" color="failure" pb="32px">
            {t('These quest are no longer distributing rewards. Please unstake your tokens.')}
          </TextStyled>
        )}
        {viewMode === ViewMode.CARD ? cardLayout : tableLayout}
        <div ref={loadMoreRef} />
      </Page>
    </>
  )
}

export default LootMarkets
