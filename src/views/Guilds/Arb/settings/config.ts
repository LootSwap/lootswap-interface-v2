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
  tagline: '100% Unlocked', // use to customize the guild pages tagline
  overrideBannerTitle: 'Harmony Universe', // use to change the guild banner title
  social: [
    { label: 'Website', link: 'https://t.co/4BGm0C16gp?amp=1' },
    { label: 'Telegram', link: 'https://t.co/Iy1rNfXoON?amp=1' },
    { label: 'Twitter', link: 'https://twitter.com/HarmonyUnivrse' },
    { label: 'Discord', link: '' },
    { label: 'Medium', link: 'https://universearbiter.medium.com/arbiter-universe-au-white-paper-11f4d9d637d1' },
    { label: 'Reddit', link: '' },
    { label: 'Youtube', link: '' },
    { label: 'Blockster', link: '' },
    { label: 'Github', link: '' },
    { label: 'Scrollpaper', link: '' },
    { label: 'Whales NFTs', link: 'https://www.harmonywhales.com' },
  ],
}

export default config
