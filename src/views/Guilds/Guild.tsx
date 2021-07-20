import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Toggle, Text } from '@lootswap/uikit'
import { Image, RowType, Heading, BaseLayout } from '@pancakeswap/uikit'
import styled from 'styled-components'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useGuilds, usePollGuildsData, usePriceGuildBusd } from 'state/hooks'
import usePersistState from 'hooks/usePersistState'
import { Guild } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { getGuildApr } from 'utils/apr'
import { orderBy } from 'lodash'
import isArchivedPid from 'utils/farmHelpers'
import { latinise } from 'utils/latinise'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import AnimatedText from './components/GuildTitles/AnimatedText'
import GuildStat from './components/GuildStats'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import FarmTabButtons from './components/FarmTabButtons'
import { RowProps } from './components/FarmTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from './components/types'
import useGuildSettings from './hooks/useGuildSettings'
import WalkingSprite from './components/WalkingSprite/WalkingSprite'

interface IGuildPage {
  guildSlug: string
  footerImg: any
}

// #region Style
const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
`

const PageGuildTheme = styled.div`
  background: ${({ theme }) => (theme.colors.background ? theme.colors.background : 'white')};
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

// #endregion

// #region Component
const GuildPage: React.FC<IGuildPage> = (props) => {
  // Reset background
  useEffect(() => {
    document.body.style.background = 'none'
    document.body.style.opacity = '1'

    return () => {
      document.body.style.background = ''
      document.body.style.opacity = ''
    }
  })

  // #region Setup
  const { guildSlug, footerImg } = props
  const guildSettings = useGuildSettings(guildSlug)
  const numbersOfFarmsVisible = guildSettings?.numberOfFarmsVisible
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { t } = useTranslation()

  const { data: guildsLP, userDataLoaded } = useGuilds()

  // Idea stems from: https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
  const guildsLPUnique = guildsLP.filter(
    (v, i, a) => a.findIndex((glp) => glp.pid === v.pid && glp.guildSlug === v.guildSlug) === i, // Filters out duplicates
  )
  const lootFarmOverride = guildSettings?.lootFarmOverride
  const guildTokenPrice = usePriceGuildBusd(
    guildSlug,
    lootFarmOverride?.useLootFarm || false,
    lootFarmOverride?.pid || 0,
  )

  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, {
    localStorageKey: `${guildSlug}-lootswap_farm_view`,
  })
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  usePollGuildsData(isArchived, guildSlug)

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useState(!isActive)
  useEffect(() => {
    setStakedOnly(!isActive)
  }, [isActive])

  const activeGuildFarms = guildsLPUnique.filter(
    (g) => g.multiplier !== '0X' && !isArchivedPid(g.pid) && g.guildSlug === guildSlug,
  )
  const inactiveGuildFarms = guildsLPUnique.filter(
    (g) => g.multiplier === '0X' && !isArchivedPid(g.pid) && g.guildSlug === guildSlug,
  )
  const archivedGuildFarms = guildsLPUnique.filter((g) => isArchivedPid(g.pid) && g.guildSlug === guildSlug)

  const stakedOnlyFarms = activeGuildFarms.filter(
    (g) => g.userData && new BigNumber(g.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveGuildFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedArchivedFarms = archivedGuildFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const farmsList = useCallback(
    (farmsToDisplay: Guild[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay
        .filter((f) => f.guildSlug === guildSlug)
        .map((farm) => {
          if (!farm.lpTotalInQuoteToken || !farm.quoteToken.busdPrice) {
            return farm
          }
          const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
          const apr = isActive
            ? getGuildApr(
                new BigNumber(farm.poolWeight),
                guildTokenPrice,
                totalLiquidity,
                guildSettings.guildTokenPerBlock,
                new BigNumber(farm.baseEmissionRate),
              )
            : 0

          return { ...farm, apr, liquidity: totalLiquidity }
        })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [guildTokenPrice, query, isActive, guildSlug, guildSettings],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(numbersOfFarmsVisible)
  const [observerIsSet, setObserverIsSet] = useState(false)

  const farmsStakedMemoized = useMemo(() => {
    let farmsStaked = []

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr, 'desc')
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          )
        case 'earned':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
            'desc',
          )
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')

        case 'community':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.isCommunity, 'asc')
        case 'core':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.isCommunity, 'desc')
        default:
          return farms
      }
    }

    if (isActive) {
      farmsStaked = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeGuildFarms)
    }
    if (isInactive) {
      farmsStaked = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveGuildFarms)
    }
    if (isArchived) {
      farmsStaked = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedGuildFarms)
    }

    return sortFarms(farmsStaked).slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    activeGuildFarms,
    farmsList,
    inactiveGuildFarms,
    archivedGuildFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])

  useEffect(() => {
    const showMoreFarms = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfFarmsVisible((farmsCurrentlyVisible) => farmsCurrentlyVisible + numbersOfFarmsVisible)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreFarms, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [farmsStakedMemoized, observerIsSet, numbersOfFarmsVisible])

  const rowData = farmsStakedMemoized
    .filter((f) => f.guildSlug === guildSlug)
    .map((farm) => {
      const { token, quoteToken } = farm
      const tokenAddress = token.address
      const quoteTokenAddress = quoteToken.address
      const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')

      const row: RowProps = {
        apr: {
          value: farm.apr && farm.apr.toLocaleString('en-US', { maximumFractionDigits: 2 }),
          multiplier: farm.multiplier,
          lpLabel,
          tokenAddress,
          quoteTokenAddress,
          guildTokenPrice,
          originalValue: farm.apr,
        },
        farm: {
          image: farm.lpSymbol.split(' ')[0].toLocaleLowerCase(),
          label: lpLabel,
          pid: farm.pid,
          guildSlug: farm.guildSlug,
        },
        earned: {
          earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
          pid: farm.pid,
          locked: farm.percentLockupBonus * getBalanceNumber(new BigNumber(farm.userData.earnings)),
          unlocked: farm.percentUnlockedBonus * getBalanceNumber(new BigNumber(farm.userData.earnings)),
        },
        liquidity: {
          liquidity: farm.liquidity,
        },
        multiplier: {
          multiplier: farm.multiplier,
        },
        details: farm,
      }

      return row
    })
  // #endregion

  // #region Markup
  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} userDataReady={userDataReady} guildSlug={guildSlug} />
    }
    return (
      <div>
        <FlexLayout>
          <Route exact path={`${path}`}>
            {farmsStakedMemoized
              .filter((f) => f.guildSlug === guildSlug)
              .map((farm) => (
                <FarmCard
                  key={farm.pid}
                  farm={farm}
                  guildTokenPrice={guildTokenPrice}
                  account={account}
                  removed={false}
                  locked={farm.percentLockupBonus * getBalanceNumber(new BigNumber(farm.userData.earnings))}
                  unlocked={farm.percentUnlockedBonus * getBalanceNumber(new BigNumber(farm.userData.earnings))}
                  guildSlug={guildSlug}
                />
              ))}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsStakedMemoized
              .filter((f) => f.guildSlug === guildSlug)
              .map((farm) => (
                <FarmCard
                  key={farm.pid}
                  farm={farm}
                  guildTokenPrice={guildTokenPrice}
                  account={account}
                  removed
                  locked={farm.percentLockupBonus * getBalanceNumber(new BigNumber(farm.userData.earnings))}
                  unlocked={farm.percentUnlockedBonus * getBalanceNumber(new BigNumber(farm.userData.earnings))}
                  guildSlug={guildSlug}
                />
              ))}
          </Route>
          <Route exact path={`${path}/archived`}>
            {farmsStakedMemoized
              .filter((f) => f.guildSlug === guildSlug)
              .map((farm) => (
                <FarmCard
                  key={farm.pid}
                  farm={farm}
                  guildTokenPrice={guildTokenPrice}
                  account={account}
                  removed
                  locked={farm.percentLockupBonus * getBalanceNumber(new BigNumber(farm.userData.earnings))}
                  unlocked={farm.percentUnlockedBonus * getBalanceNumber(new BigNumber(farm.userData.earnings))}
                  guildSlug={guildSlug}
                />
              ))}
          </Route>
        </FlexLayout>
      </div>
    )
  }
  // #endregion

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  // #region html
  return (
    <PageGuildTheme>
      <PageHeader>
        <Heading as="h1" scale="xxl" color="secondary" mb="24px">
          <AnimatedText
            textColor={guildSettings.darkTheme.colors.primary}
            overlayColor={guildSettings.darkTheme.colors.secondary}
            guildSymbol={guildSettings.symbol}
          />
        </Heading>
        <Heading scale="lg" color="text">
          {t('Stake Liquidity Pool (LP) tokens to earn.')}
        </Heading>
      </PageHeader>
      <Page>
        <div>
          <Cards>
            {guildSettings.sprite !== '' && (
              <WalkingSprite
                image={guildSettings.sprite?.image}
                width={guildSettings.sprite?.width}
                height={guildSettings.sprite?.height}
              />
            )}
            <GuildStat />
          </Cards>
        </div>
        <ControlContainer>
          <ViewControls>
            <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
            <ToggleWrapper>
              <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />
              <Text> {t('Staked only')}</Text>
            </ToggleWrapper>
            <FarmTabButtons hasStakeInFinishedFarms={stakedInactiveFarms.length > 0} />
          </ViewControls>
          <FilterContainer>
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Sort by')}</Text>
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
                    label: t('Multiplier'),
                    value: 'multiplier',
                  },
                  {
                    label: t('Earned'),
                    value: 'earned',
                  },
                  {
                    label: t('Liquidity'),
                    value: 'liquidity',
                  },
                  {
                    label: t('Community'),
                    value: 'community',
                  },
                  {
                    label: t('Core'),
                    value: 'core',
                  },
                ]}
                onChange={handleSortOptionChange}
              />
            </LabelWrapper>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text textTransform="uppercase">{t('Search')}</Text>
              <SearchInput onChange={handleChangeQuery} placeholder={t('Search Guild Quests')} />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer>
        {renderContent()}
        <div ref={loadMoreRef} />
        <StyledImage src={footerImg.src} alt={footerImg.alt} width={footerImg.width} height={footerImg.height} />
      </Page>
    </PageGuildTheme>
  )
}
// #endregion
// #endregion

export default GuildPage
