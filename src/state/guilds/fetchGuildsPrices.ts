import BigNumber from 'bignumber.js'
import { BIG_ONE, BIG_ZERO } from 'utils/bigNumber'
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

const getGuildQuoteTokenPrice = (guild: Guild, quoteTokenFarm: Guild, lootPriceBusd: BigNumber): BigNumber => {
  if (guild.quoteToken.symbol === 'BUSD' || guild.quoteToken.symbol === 'bscBUSD') {
    return BIG_ONE
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
    return quoteTokenFarm.tokenPriceVsQuote ? lootPriceBusd.times(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  return BIG_ZERO
}

const fetchGuildsPrices = async (guilds) => {
  const farms = await fetchFarms(farmsConfig)
  const lootbusdFarm = farms.find((f: Farm) => f.pid === 9)
  const lootPriceBusd = lootbusdFarm?.tokenPriceVsQuote
    ? new BigNumber(lootbusdFarm.tokenPriceVsQuote).div(BIG_ONE)
    : BIG_ZERO
  const guildsWithPrices = guilds.map((g) => {
    const quoteTokenFarm = getGuildFromTokenSymbol(guilds, g.quoteToken.symbol)
    const baseTokenPrice = getGuildBaseTokenPrice(g, quoteTokenFarm, lootPriceBusd)
    const quoteTokenPrice = getGuildQuoteTokenPrice(g, quoteTokenFarm, lootPriceBusd)
    const token = { ...g.token, busdPrice: baseTokenPrice.toJSON() }
    const quoteToken = { ...g.quoteToken, busdPrice: quoteTokenPrice.toJSON() }
    return { ...g, token, quoteToken }
  })

  return guildsWithPrices
}

export default fetchGuildsPrices
