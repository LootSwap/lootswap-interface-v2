import tokens from './tokens'
import { GuildConfig } from './types'

const farms: GuildConfig[] = [
  {
    pid: 0,
    lpSymbol: 'LOOT-TROLL',
    lpAddresses: {
      1666600000: '0xa1808a54AeA27609ad55d58a0e1836Cb35fe872d',
      1666700000: '',
    },
    token: tokens.troll,
    quoteToken: tokens.loot,
    guildSlug: 'troll',
  },
  {
    pid: 0,
    lpSymbol: 'LOOT-NECRO',
    lpAddresses: {
      1666600000: '0x9D29476f95a18AF6999555bfD3134Fc442695C07',
      1666700000: '',
    },
    token: tokens.necro,
    quoteToken: tokens.loot,
    guildSlug: 'necro',
  },
]

export default farms
