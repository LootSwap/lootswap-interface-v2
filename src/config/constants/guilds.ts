import tokens from './tokens'
import { GuildConfig } from './types'

const farms: GuildConfig[] = [
  {
    pid: 0,
    lpSymbol: 'LOOT-GG',
    lpAddresses: {
      1666600000: '0x0499761c54812Fd8084d75D3674097b1232B89C7',
      1666700000: '',
    },
    token: tokens.gg,
    quoteToken: tokens.loot,
    guildSlug: 'gg',
  },
]

export default farms
