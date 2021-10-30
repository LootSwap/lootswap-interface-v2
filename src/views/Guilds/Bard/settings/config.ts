import { GuildConfig } from '../../types'
import { darkTheme, lightTheme } from './theme'

export const config: GuildConfig = {
  numberOfFarmsVisible: 12,
  symbol: 'BARD', // use to label symbols dynamically
  darkTheme,
  lightTheme,
  guildSlug: 'bard',
  guildTokenPerBlock: 1, // use to calculate apr
  footerImg: {
    // shown on the bottom of the guilds quest
    src: '/images/decorations/bard.png',
    alt: 'LootSwap illustration',
    width: 120,
    height: 103,
  },
  lootFarmOverride: {
    // use to set the price of the guild token
    pid: 15, // see src/constants/farms.ts
    useLootFarm: true,
  },
  hasLockUp: false, // use to show lock and unlock rewards
  lockupconfig: {
    guildIcon: '/images/tokens/bard.png',
  },
  tagline: '100% Unlocked', // use to customize the guild pages tagline
  social: [
    { label: 'Website', link: 'https://themarketplace.digital/' },
    { label: 'Telegram', link: 'https://t.me/joinchat/Xbz_TN66v7UzZDIx' },
    { label: 'Twitter', link: 'https://twitter.com/Marketplace_1' },
    { label: 'Discord', link: 'https://discord.gg/VqspC3h5MT' },
    { label: 'Medium', link: 'https://lootswapfinance.medium.com/bard-guild-introduction-1fd27ad11f75' },
  ],
}

export default config
