import { guildSettings as ggSettings } from '../GG/settings'
import { guildSettings as trollSettings } from '../Troll/settings'
import { guildSettings as arbSettings } from '../Arb/settings'
import { guildSettings as bardSettings } from '../Bard/settings'
import { guildSettings as cosmicSettings } from '../Cosmic/settings'
import { guildSettings as foolSettings } from '../Fool/settings'
// CHORE: GUILD SETTINGS
const useGuildSettings = (slug: string) => {
  switch (slug) {
    case 'troll':
      return trollSettings
    case 'arb':
      return arbSettings
    case 'bard':
      return bardSettings
    case 'cosmic':
      return cosmicSettings
    case 'fool':
      return foolSettings
    default:
      return null // TODO create a default for guilds theme
  }
}

export default useGuildSettings
