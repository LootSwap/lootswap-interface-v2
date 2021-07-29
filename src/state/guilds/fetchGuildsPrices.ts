import BigNumber from 'bignumber.js'
import { BIG_ONE, BIG_ZERO, BIG_TEN } from 'utils/bigNumber'
import { filterGuildsByQuoteToken } from 'utils/guildsPriceHelpers'
import { Guild, Farm } from 'state/types'
import fetchFarms from 'state/farms/fetchFarms'
import { farmsConfig } from 'config/constants'

const getGuildFromTokenSymbol = (guilds: Guild[], tokenSymbol: string, preferredQuoteTokens?: string[]): Guild => {
  const guildsWithTokenSymbol = guilds.filter((guild) => guild.quoteToken.symbol === tokenSymbol)
  const filteredGuild = filterGuildsByQuoteToken(guildsWithTokenSymbol, preferredQuoteTokens)
  return filteredGuild
}

const getGuildBaseTokenPrice = (guild: Guild, quoteTokenFarm: Guild, lootPriceBusd: BigNumber): BigNumber => {
  const hasTokenPriceVsQuote = Boolean(guild.tokenPriceVsQuote)
  if (guild.quoteToken.symbol === 'BUSD') {
    return hasTokenPriceVsQuote ? new BigNumber(guild.tokenPriceVsQuote) : BIG_ZERO
  }

  if (
    guild.quoteToken.symbol === 'wBNB' ||
    guild.quoteToken.symbol === 'bscBNB' ||
    guild.quoteToken.symbol === 'bscBUSD' ||
    guild.quoteToken.symbol === 'WONE' ||
    guild.quoteToken.symbol === 'LOOT'
  ) {
    return hasTokenPriceVsQuote ? lootPriceBusd.times(guild.tokenPriceVsQuote) : BIG_ZERO
  }

  // We can only calculate profits without a quoteTokenFarm for BUSD/BNB guilds
  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  // Possible alternative guild quoteTokens:
  // UST (i.e. MIR-UST), pBTC (i.e. PNT-pBTC), BTCB (i.e. bBADGER-BTCB), ETH (i.e. SUSHI-ETH)
  // If the guild's quote token isn't BUSD or wBNB, we then use the quote token, of the original guild's quote token
  // i.e. for guild PNT - pBTC we use the pBTC guild's quote token - BNB, (pBTC - BNB)
  // from the BNB - pBTC price, we can calculate the PNT - BUSD price
  if (quoteTokenFarm.quoteToken.symbol === 'wBNB' || quoteTokenFarm.quoteToken.symbol === 'bscBNB') {
    const quoteTokenInBusd = lootPriceBusd.times(quoteTokenFarm.tokenPriceVsQuote)
    return hasTokenPriceVsQuote && quoteTokenInBusd
      ? new BigNumber(guild.tokenPriceVsQuote).times(quoteTokenInBusd)
      : BIG_ZERO
  }

  if (
    quoteTokenFarm.quoteToken.symbol === 'BUSD' ||
    quoteTokenFarm.quoteToken.symbol === 'bscBUSD' ||
    quoteTokenFarm.quoteToken.symbol === 'WONE'
  ) {
    const quoteTokenInBusd = quoteTokenFarm.tokenPriceVsQuote
    return hasTokenPriceVsQuote && quoteTokenInBusd
      ? new BigNumber(guild.tokenPriceVsQuote).times(quoteTokenInBusd)
      : BIG_ZERO
  }

  // Catch in case token does not have immediate or once-removed BUSD/wBNB quoteToken
  return BIG_ZERO
}

const getGuildQuoteTokenPrice = (
  guild: Guild,
  quoteTokenFarm: Guild,
  lootPriceBusd: BigNumber,
  onePriceBusd: BigNumber,
  ethPriceBusd: BigNumber,
  btcPriceBusd: BigNumber,
  oneRenDogePriceBusd: BigNumber,
): BigNumber => {
  if (
    // Calculating rate for stable coins
    guild.quoteToken.symbol === 'BUSD' ||
    guild.quoteToken.symbol === 'bscBUSD' ||
    guild.quoteToken.symbol === '1USDT' ||
    guild.quoteToken.symbol === '1USDC' ||
    guild.quoteToken.symbol === '1DAI' ||
    guild.quoteToken.symbol === 'bscUSDC'
  ) {
    return BIG_ONE
  }

  // Calculating rate for 1renDOGE base pools
  if (guild.quoteToken.symbol === '1renDOGE' || guild.quoteToken.symbol === 'bscDOGE') {
    return oneRenDogePriceBusd
  }

  // Calculating rate for 1ETH base pools
  if (guild.quoteToken.symbol === '1ETH' || guild.quoteToken.symbol === 'bscETH') {
    return ethPriceBusd
  }

  // Calculating rate for 1WBTC base pools
  if (guild.quoteToken.symbol === '1WBTC' || guild.quoteToken.symbol === 'bscBTCB') {
    return btcPriceBusd
  }

  if (guild.quoteToken.symbol === 'wBNB' || guild.quoteToken.symbol === 'bscBNB') {
    // Converts current farm token to ONE then uses the price of BUSD from ONE <> BUSD to find the rate.
    const tokenToOne = quoteTokenFarm.tokenPriceVsQuote
    return new BigNumber(tokenToOne).div(onePriceBusd)
  }

  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'BUSD') {
    return quoteTokenFarm.tokenPriceVsQuote ? new BigNumber(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'bscBUSD') {
    return quoteTokenFarm.tokenPriceVsQuote ? new BigNumber(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'LOOT') {
    return quoteTokenFarm.tokenPriceVsQuote ? lootPriceBusd : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'WONE') {
    return quoteTokenFarm.tokenPriceVsQuote ? BIG_ONE.div(onePriceBusd) : BIG_ZERO
  }

  return BIG_ZERO
}

const fetchGuildsPrices = async (guilds) => {
  // Guild Farm Helpers
  const onerendogeoneFarm = guilds.find((guild: Guild) => guild.helperId === 1)
  // TODO we could put this in the priceGuildHelperLPs and call it from there. Dont know if its worth it if it doesnt optimize calls
  // Fetching the prices from our Loot farms
  const farms = await fetchFarms(farmsConfig)

  // - Utilizing Loot Quests to fetch price rate ie 1 ETH === 29406.3 ONE from our Loot farms
  const lootbusdFarm = farms.find((farm: Farm) => farm.pid === 9)
  const onebusdFarm = farms.find((farm: Farm) => farm.pid === 1)
  const ethoneFarm = farms.find((farm: Farm) => farm.pid === 2)
  const btconeFarm = farms.find((farm: Farm) => farm.pid === 4)

  // Helper Price for quoteTokens
  const onePriceBusd = onebusdFarm?.tokenPriceVsQuote ? BIG_ONE.div(onebusdFarm.tokenPriceVsQuote) : BIG_ZERO
  const ethPriceBusd = ethoneFarm?.tokenPriceVsQuote
    ? new BigNumber(ethoneFarm.tokenPriceVsQuote).div(onePriceBusd)
    : BIG_ZERO
  const btcPriceBusd = ethoneFarm?.tokenPriceVsQuote
    ? new BigNumber(btconeFarm.tokenPriceVsQuote).div(onePriceBusd)
    : BIG_ZERO
  const lootPriceBusd = lootbusdFarm?.tokenPriceVsQuote
    ? new BigNumber(lootbusdFarm.tokenPriceVsQuote).div(BIG_ONE)
    : BIG_ZERO

  const oneRenDogePriceBusd = onerendogeoneFarm?.tokenPriceVsQuote
    ? new BigNumber(onerendogeoneFarm.tokenPriceVsQuote).div(onePriceBusd).times(BIG_TEN)
    : BIG_ZERO
  // --------

  const guildsWithPrices = guilds.map((g) => {
    const quoteTokenFarm = getGuildFromTokenSymbol(guilds, g.quoteToken.symbol)
    const baseTokenPrice = getGuildBaseTokenPrice(g, quoteTokenFarm, lootPriceBusd)
    const quoteTokenPrice = getGuildQuoteTokenPrice(
      g,
      quoteTokenFarm,
      lootPriceBusd,
      onePriceBusd,
      ethPriceBusd,
      btcPriceBusd,
      oneRenDogePriceBusd,
    )
    const token = { ...g.token, busdPrice: baseTokenPrice.toJSON() }
    const quoteToken = { ...g.quoteToken, busdPrice: quoteTokenPrice.toJSON() }
    return { ...g, token, quoteToken }
  })

  return guildsWithPrices
}

export default fetchGuildsPrices
