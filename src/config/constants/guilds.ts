import tokens from './tokens'
import { GuildConfig } from './types'

const farms: GuildConfig[] = [
  {
    pid: 0,
    lpSymbol: 'LOOT-GG',
    lpAddresses: {
      1666600000: '0x19Ac428e610f52c0ed1aC927e7C55Be8BFbaA1da',
      1666700000: '',
    },
    token: tokens.gg,
    quoteToken: tokens.loot,
    guildSlug: 'gg',
  },
]

export default farms
