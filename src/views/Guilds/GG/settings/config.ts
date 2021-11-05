import { GuildConfig } from '../../types'
import { darkTheme, lightTheme } from './theme'
import spriteImg from '../images/gg-sprite.png'
import loading from '../images/old-man.gif'

export const config: GuildConfig = {
  numberOfFarmsVisible: 12,
  symbol: 'GG',
  darkTheme,
  lightTheme,
  guildSlug: 'gg',
  guildTokenPerBlock: 0.00000000159,
  tagline: 'INACTIVE',
  footerImg: {
    src: '/images/tokens/gg.png',
    alt: 'GG Guild',
    width: 120,
    height: 103,
  },
  sprite: {
    image: spriteImg,
    width: 64,
    height: 64,
  },
  loading: {
    src: loading,
    alt: 'old-man',
    width: 250,
    height: 250,
    backgroundColor: '#cecdcd',
  },
  lockupconfig: {
    guildIcon: '/images/tokens/gg.png',
  },
}

export default config
