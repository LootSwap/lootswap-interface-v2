import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { Image } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import GuildPage from './Guild'
import useGuildSettings from './hooks/useGuildSettings'

const StyledLoadingImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
`
const PageGuildLoadingTheme = styled.div`
  background: ${(props) => (props.color ? props.color : '#cecdcd')};
  height: 100vh;
  padding-top: 10vw;
`

const Guilds: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const guildSettings = useGuildSettings(slug)
  const globalSettings = useTheme()

  // #region Force Load Screen
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 3000)
  }, [])
  // #endregion

  return !isLoaded && guildSettings.loading ? (
    <PageGuildLoadingTheme color={guildSettings.loading.backgroundColor}>
      <StyledLoadingImage
        src={guildSettings.loading.src}
        alt={guildSettings.loading.alt}
        width={guildSettings.loading.width}
        height={guildSettings.loading.height}
      />
    </PageGuildLoadingTheme>
  ) : (
    <ThemeProvider theme={{ ...globalSettings.theme, ...guildSettings.guildTheme }}>
      <GuildPage guildSlug={slug} footerImg={guildSettings.footerImg} />
    </ThemeProvider>
  )
}
export default Guilds
