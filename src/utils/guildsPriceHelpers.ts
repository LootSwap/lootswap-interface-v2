import { Guild } from 'state/types'

/**
 * Returns the first guild with a quote token that matches from an array of preferred quote tokens
 * @param guilds Array of guilds
 * @param preferredQuoteTokens Array of preferred quote tokens
 * @returns A preferred guild, if found - or the first element of the guilds array
 */
export const filterGuildsByQuoteToken = (
  guilds: Guild[],
  preferredQuoteTokens: string[] = ['BUSD', 'bscBUSD', 'wBNB', 'bscBNB', 'WONE', 'LOOT'],
): Guild => {
  const preferredGuild = guilds.find((guild) => {
    return preferredQuoteTokens.some((quoteToken) => {
      return guild.quoteToken.symbol === quoteToken
    })
  })
  return preferredGuild || guilds[0]
}

export default filterGuildsByQuoteToken
