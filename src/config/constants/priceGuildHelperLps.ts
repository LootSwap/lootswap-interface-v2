import tokens from './tokens'
import { GuildConfig } from './types'

const priceGuildHelperLps: GuildConfig[] = [
  /**
   * These LPs are just used to help with price calculation for MasterChef LPs (guilds.ts).
   * This list is added to the MasterChefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
   * The absense of a PID means the masterchef contract calls are skipped for this farm.
   * Prices are then fetched for all farms (masterchef + priceHelperLps).
   * Before storing to redux, farms without a PID are filtered out.
   */
  {
    pid: null,
    lpSymbol: '1renDOGE-ONE',
    lpAddresses: {
      1666600000: '0x32931EA9E2C36b44EE8010d3840F07c704C6d4f6',
      1666700000: '',
    },
    token: tokens.wone,
    quoteToken: tokens.onerendoge,
    guildSlug: 'all',
    helperId: 1,
  },
]

export default priceGuildHelperLps
