import { GuildConfig } from '../../types'
import { darkTheme, lightTheme } from './theme'

export const config: GuildConfig = {
  numberOfFarmsVisible: 12,
  symbol: 'ARB', // use to label symbols dynamically
  darkTheme,
  lightTheme,
  guildSlug: 'arb',
  guildTokenPerBlock: 1, // use to calculate apr
  footerImg: {
    // shown on the bottom of the guilds quest
    src: '/images/decorations/arbiter.png',
    alt: 'Arbiter illustration',
    width: 120,
    height: 103,
  },
  lootFarmOverride: {
    // use to set the price of the guild token
    pid: 14, // see src/constants/farms.ts
    useLootFarm: true,
  },
  hasLockUp: false, // use to show lock and unlock rewards
  lockupconfig: {
    guildIcon: '/images/tokens/arb.png',
  },
  tagline: '', // use to customize the guild pages tagline
}

export default config
