import { GuildConfig } from 'config/constants/types'
import fetchGuild from './fetchGuild'

const fetchGuilds = async (guildsToFetch: GuildConfig[]) => {
  const data = await Promise.all(
    guildsToFetch.map(async (guildConfig) => {
      const guild = await fetchGuild(guildConfig)
      return guild
    }),
  )
  return data
}

export default fetchGuilds
