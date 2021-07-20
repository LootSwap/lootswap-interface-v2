import { GuildConfig } from '../../types'
import { darkTheme, lightTheme } from './theme'

export const config: GuildConfig = {
  numberOfFarmsVisible: 12,
  symbol: 'GTROLL', // use to label symbols dynamically
  darkTheme,
  lightTheme,
  guildSlug: 'gtroll',
  guildTokenPerBlock: 1, // use to calculate apr
  footerImg: {
    // shown on the bottom of the guilds quest
    src: '/images/decorations/troll-under-bridge.png',
    alt: 'LootSwap illustration',
    width: 120,
    height: 103,
  },
  lootFarmOverride: {
    // use to set the price of the guild token
    pid: 12, // see src/constants/farms.ts
    useLootFarm: true,
  },
  hasLockUp: true, // use to show lock and unlock rewards
  tagline: '95% Rewards locked up till 1st April 2022 "National Troll Day".', // use to customize the guild pages tagline
}

export default config
