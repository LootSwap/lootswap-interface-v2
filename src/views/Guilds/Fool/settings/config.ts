import { GuildConfig } from '../../types'
import { darkTheme, lightTheme } from './theme'

export const config: GuildConfig = {
  numberOfFarmsVisible: 12,
  symbol: 'FOOL', // use to label symbols dynamically
  darkTheme,
  lightTheme,
  guildSlug: 'fool',
  guildTokenPerBlock: 1, // use to calculate apr
  footerImg: {
    // shown on the bottom of the guilds quest
    src: '/images/tokens/fool.png',
    alt: 'Fool illustration',
    width: 80,
    height: 80,
  },
  lootFarmOverride: {
    useLootFarm: false,
  },
  hasLockUp: true, // use to show lock and unlock rewards
  lockupconfig: {
    guildIcon: '/images/tokens/fool.png',
  },
  tagline: 'Rewards are 25% locked up until block 25150000', // use to customize the guild pages tagline
  overrideBannerTitle: 'FOOL', // use to change the guild banner title
  social: [
    { label: 'Website', link: '' },
    { label: 'Telegram', link: '' },
    { label: 'Twitter', link: 'https://twitter.com/TheFOOLsGuild' },
    { label: 'Discord', link: 'https://discord.gg/u6ErGaDfke' },
    { label: 'Medium', link: '' },
    { label: 'Reddit', link: '' },
    { label: 'Youtube', link: '' },
    { label: 'Blockster', link: '' },
    { label: 'GitBook', link: 'https://fools-guild.gitbook.io/fools-guild-1/' },
    { label: 'Scrollpaper', link: '' },
  ],
}

export default config
