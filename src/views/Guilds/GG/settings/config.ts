import { GuildConfig } from '../../types'
import { guildTheme } from './theme'

export const config: GuildConfig = {
  numberOfFarmsVisible: 12,
  symbol: 'GG',
  guildTheme,
  guildSlug: 'gg',
  footerImg: {
    src: '/images/decorations/background/loot-bg.svg',
    alt: 'LootSwap illustration',
    width: 120,
    height: 103,
  },
  background: '',
}

export default config
