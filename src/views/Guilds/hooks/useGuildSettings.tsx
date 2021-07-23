import { guildSettings as ggSettings } from '../GG/settings'
import { guildSettings as trollSettings } from '../Troll/settings'

const useGuildSettings = (slug: string) => {
  switch (slug) {
    case 'gg':
      return ggSettings
    case 'troll':
      return trollSettings
    default:
      return null // TODO create a default for guilds theme
  }
}

export default useGuildSettings
