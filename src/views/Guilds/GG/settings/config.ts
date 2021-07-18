import { GuildConfig } from '../../types'
import { guildTheme } from './theme'
import spriteImg from '../images/gg-sprite.png'
import loading from '../images/old-man.gif'

export const config: GuildConfig = {
  numberOfFarmsVisible: 12,
  symbol: 'GG',
  guildTheme,
  guildSlug: 'gg',
  guildTokenPerBlock: 0.159817361111111,
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
}

export default config
