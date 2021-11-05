import { GuildConfig } from '../../types'
import { darkTheme, lightTheme } from './theme'

export const config: GuildConfig = {
  numberOfFarmsVisible: 12,
  symbol: 'TROLL', // use to label symbols dynamically
  darkTheme,
  lightTheme,
  guildSlug: 'troll',
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
  hasLockUp: false, // use to show lock and unlock rewards
  lockupconfig: {
    guildIcon: '/images/tokens/troll.png',
  },
  tagline: '100% Unlocked', // use to customize the guild pages tagline
  // social: [
  //   {label: 'Website', link: ''},
  //   {label: 'Telegram', link: ''},
  //   {label: 'Twitter', link: ''},
  //   {label: 'Discord', link: ''},
  //   {label: 'Medium/WhitePaper', link: ''},
  //   {label: 'Reddit', link: ''},
  //   {label: 'Youtube', link: ''},
  //   {label: 'Blockster', link: ''},
  //   {label: 'Github', link: ''},
  //   {label: 'Scrollpaper', link: ''},
  // ],
  social: [
    { label: 'Website', link: 'https://www.trollguild.com/' },
    { label: 'Arcade Play Now!', link: 'https://www.trollarcade.one/' },
    { label: 'Telegram', link: 'https://t.me/trollguild' },
    { label: 'Twitter', link: 'https://twitter.com/GuildTroll' },
    { label: 'Discord', link: 'https://discord.gg/zC8pfeK8eV' },
    { label: 'Medium', link: 'https://lootswapfinance.medium.com/introducing-troll-guild-34ed139d8e84' },
    { label: 'Reddit', link: '' },
    { label: 'Youtube', link: '' },
    { label: 'Blockster', link: '' },
    { label: 'Github', link: '' },
    { label: 'Scrollpaper', link: '' },
  ],
}

export default config
