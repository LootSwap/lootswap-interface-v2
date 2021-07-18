import { GuildConfig } from '../../types'
import { guildTheme } from './theme'

export const config: GuildConfig = {
  numberOfFarmsVisible: 12,
  symbol: 'TROLL',
  guildTheme,
  guildSlug: 'troll',
  guildTokenPerBlock: 0,
  footerImg: {
    src: '/images/decorations/background/loot-bg.svg',
    alt: 'LootSwap illustration',
    width: 120,
    height: 103,
  },
}

export default config
