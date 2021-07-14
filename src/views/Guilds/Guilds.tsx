import React from 'react'
import { useParams } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import useTheme from 'hooks/useTheme'
import GuildPage from './Guild'
import useGuildSettings from './hooks/useGuildSettings'

const Guilds: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const guildSettings = useGuildSettings(slug)
  const globalSettings = useTheme()
  return (
    <ThemeProvider theme={{ ...globalSettings.theme, ...guildSettings.guildTheme }}>
      <GuildPage guildSlug={slug} footerImg={guildSettings.footerImg} />
    </ThemeProvider>
  )
}
export default Guilds
