import { Guild } from 'state/types'
import fetchPublicGuildData from './fetchPublicGuildData'

const fetchGuild = async (guild: Guild): Promise<Guild> => {
  const guildPublicData = await fetchPublicGuildData(guild)

  return { ...guild, ...guildPublicData }
}

export default fetchGuild
