import { guildSettings as trollSettings } from '../Troll/settings'
import { guildSettings as necroSettings } from '../Necro/settings'

const useGuildSettings = (slug: string) => {
  switch (slug) {
    case 'troll':
      return trollSettings
    case 'necro':
      return necroSettings
    default:
      return trollSettings // TODO create a default for guilds theme
  }
}

export default useGuildSettings
