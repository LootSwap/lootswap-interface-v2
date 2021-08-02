import { guildSettings as ggSettings } from '../GG/settings'
import { guildSettings as trollSettings } from '../Troll/settings'
import { guildSettings as arbSettings } from '../Arb/settings'
// import { guildSettings as bardSettings } from '../Bard/settings'

const useGuildSettings = (slug: string) => {
  switch (slug) {
    case 'gg':
      return ggSettings
    case 'troll':
      return trollSettings
    case 'arb':
      return arbSettings
    default:
      return null // TODO create a default for guilds theme
  }
}

export default useGuildSettings
