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
]

export default farms
