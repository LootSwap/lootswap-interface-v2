import React from 'react'
import { ThemeProvider } from 'styled-components'
import { useParams } from 'react-router-dom'
import useTheme from 'hooks/useTheme'
import GuildPage from './Guild'
import useGuildSettings from './hooks/useGuildSettings'

const Guilds: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const globalStyle = useTheme()
  const guildSettings = useGuildSettings(slug)
  const guildTheme = {
    ...globalStyle.theme,
    ...guildSettings.theme,
  }
  return (
    <ThemeProvider theme={guildTheme}>
      <GuildPage guildSlug={slug} footerImg={guildSettings.footerImg} />
    </ThemeProvider>
  )
}
export default Guilds
