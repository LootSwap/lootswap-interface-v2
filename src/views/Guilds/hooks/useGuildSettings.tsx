import { guildSettings as trollSettings } from '../Troll/settings'

const useGuildSettings = (slug: string) => {
  switch (slug) {
    case 'troll':
      return trollSettings
    default:
      return trollSettings // TODO create a default for guilds theme
  }
}

export default useGuildSettings
