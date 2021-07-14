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
  {
    pid: 0,
    lpSymbol: 'LOOT-TROLL',
    lpAddresses: {
      1666600000: '0x19Ac428e610f52c0ed1aC927e7C55Be8BFbaA1da',
      1666700000: '',
    },
    token: tokens.troll,
    quoteToken: tokens.loot,
    guildSlug: 'troll',
  },
]

export default farms
