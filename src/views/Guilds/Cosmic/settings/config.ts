import { GuildConfig } from '../../types'
import { darkTheme, lightTheme } from './theme'

export const config: GuildConfig = {
  numberOfFarmsVisible: 12,
  symbol: 'MAGIC', // use to label symbols dynamically
  darkTheme,
  lightTheme,
  guildSlug: 'cosmic',
  guildTokenPerBlock: 1, // use to calculate apr
  footerImg: {
    // shown on the bottom of the guilds quest
    src: '/images/tokens/magic.png',
    alt: 'Cosmic illustration',
    width: 80,
    height: 80,
  },
  lootFarmOverride: {
    useLootFarm: false,
  },
  hasLockUp: true, // use to show lock and unlock rewards
  lockupconfig: {
    guildIcon: '/images/tokens/magic.png',
  },
  tagline: 'Rewards are 95% locked up until block 21612813', // use to customize the guild pages tagline
  overrideBannerTitle: 'COSMIC', // use to change the guild banner title
}

export default config
