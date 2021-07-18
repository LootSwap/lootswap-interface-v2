import BigNumber from 'bignumber.js'
import { BIG_ONE, BIG_ZERO } from 'utils/bigNumber'
import { filterFarmsByQuoteToken } from 'utils/farmsPriceHelpers'
import { Farm } from 'state/types'

const getFarmFromTokenSymbol = (farms: Farm[], tokenSymbol: string, preferredQuoteTokens?: string[]): Farm => {
  const farmsWithTokenSymbol = farms.filter((farm) => farm.token.symbol === tokenSymbol)
  const filteredFarm = filterFarmsByQuoteToken(farmsWithTokenSymbol, preferredQuoteTokens)
  return filteredFarm
}

const getFarmBaseTokenPrice = (farm: Farm, quoteTokenFarm: Farm, lootPriceBusd: BigNumber): BigNumber => {
  const hasTokenPriceVsQuote = Boolean(farm.tokenPriceVsQuote)

  if (farm.quoteToken.symbol === 'BUSD') {
    return hasTokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (
    farm.quoteToken.symbol === 'wBNB' ||
    farm.quoteToken.symbol === 'bscBNB' ||
    farm.quoteToken.symbol === 'bscBUSD' ||
    farm.quoteToken.symbol === 'WONE' ||
    farm.quoteToken.symbol === 'LOOT'
  ) {
    return hasTokenPriceVsQuote ? lootPriceBusd.times(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  // We can only calculate profits without a quoteTokenFarm for BUSD/BNB farms
  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  // Possible alternative farm quoteTokens:
  // UST (i.e. MIR-UST), pBTC (i.e. PNT-pBTC), BTCB (i.e. bBADGER-BTCB), ETH (i.e. SUSHI-ETH)
  // If the farm's quote token isn't BUSD or wBNB, we then use the quote token, of the original farm's quote token
  // i.e. for farm PNT - pBTC we use the pBTC farm's quote token - BNB, (pBTC - BNB)
  // from the BNB - pBTC price, we can calculate the PNT - BUSD price
  if (quoteTokenFarm.quoteToken.symbol === 'wBNB' || quoteTokenFarm.quoteToken.symbol === 'bscBNB') {
    const quoteTokenInBusd = lootPriceBusd.times(quoteTokenFarm.tokenPriceVsQuote)
    return hasTokenPriceVsQuote && quoteTokenInBusd
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInBusd)
      : BIG_ZERO
  }

  if (
    quoteTokenFarm.quoteToken.symbol === 'BUSD' ||
    quoteTokenFarm.quoteToken.symbol === 'bscBUSD' ||
    quoteTokenFarm.quoteToken.symbol === 'WONE'
  ) {
    const quoteTokenInBusd = quoteTokenFarm.tokenPriceVsQuote
    return hasTokenPriceVsQuote && quoteTokenInBusd
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInBusd)
      : BIG_ZERO
  }

  // Catch in case token does not have immediate or once-removed BUSD/wBNB quoteToken
  return BIG_ZERO
}

const getFarmQuoteTokenPrice = (
  farm: Farm,
  quoteTokenFarm: Farm,
  lootPriceBusd: BigNumber,
  onePriceBusd: BigNumber,
): BigNumber => {
  if (farm.quoteToken.symbol === 'BUSD' || farm.quoteToken.symbol === 'bscBUSD') {
    return BIG_ONE
  }

  if (farm.quoteToken.symbol === 'wBNB' || farm.quoteToken.symbol === 'bscBNB' || farm.quoteToken.symbol === '1ETH') {
    // Converts current farm token to ONE then uses the price of BUSD from ONE <> BUSD to find the rate.
    const tokenToOne = quoteTokenFarm.tokenPriceVsQuote
    return new BigNumber(tokenToOne).div(onePriceBusd)
  }

  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'wBNB' || quoteTokenFarm.quoteToken.symbol === 'bscBNB') {
    return quoteTokenFarm.tokenPriceVsQuote
      ? new BigNumber(quoteTokenFarm.tokenPriceVsQuote).div(onePriceBusd)
      : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'BUSD') {
    return quoteTokenFarm.tokenPriceVsQuote ? new BigNumber(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'bscBUSD') {
    return quoteTokenFarm.tokenPriceVsQuote ? new BigNumber(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'WONE') {
    return quoteTokenFarm.tokenPriceVsQuote ? lootPriceBusd.times(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  return BIG_ZERO
}

const fetchFarmsPrices = async (farms) => {
  const lootbusdFarm = farms.find((farm: Farm) => farm.pid === 9)
  const onebusdFarm = farms.find((farm: Farm) => farm.pid === 1)
  const onePriceBusd = onebusdFarm?.tokenPriceVsQuote ? BIG_ONE.div(onebusdFarm.tokenPriceVsQuote) : BIG_ZERO
  const lootPriceBusd = lootbusdFarm?.tokenPriceVsQuote ? BIG_ONE.div(lootbusdFarm.tokenPriceVsQuote) : BIG_ZERO
  const farmsWithPrices = farms.map((farm) => {
    const quoteTokenFarm = getFarmFromTokenSymbol(farms, farm.quoteToken.symbol)
    const baseTokenPrice = getFarmBaseTokenPrice(farm, quoteTokenFarm, lootPriceBusd)
    const quoteTokenPrice = getFarmQuoteTokenPrice(farm, quoteTokenFarm, lootPriceBusd, onePriceBusd)
    const token = { ...farm.token, busdPrice: baseTokenPrice.toJSON() }
    const quoteToken = { ...farm.quoteToken, busdPrice: quoteTokenPrice.toJSON() }
    return { ...farm, token, quoteToken }
  })

  return farmsWithPrices
}

export default fetchFarmsPrices
