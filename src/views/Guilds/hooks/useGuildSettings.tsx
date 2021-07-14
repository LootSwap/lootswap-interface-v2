import { guildSettings as ggSettings } from '../GG/settings'

const useGuildSettings = (slug: string) => {
  switch (slug) {
    case 'gg':
      return ggSettings
    default:
      return ggSettings // TODO create a default for guilds theme
  }
}

export default useGuildSettings
