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
    src: '/images/tokens/magic.png',
    alt: 'Fool illustration',
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
  tagline: 'Rewards are 25% locked up until block 000', // use to customize the guild pages tagline
  overrideBannerTitle: 'FOOL', // use to change the guild banner title
}

export default config
