import { DefaultTheme } from 'styled-components'

export type Gradients = {
  bubblegum: string
  lootswap: string
}

export type Page = {
  background: string
}

export type Image = {
  src: string
  alt: string
  width: number
  height: number
}

export type GuildConfig = {
  numberOfFarmsVisible: number
  symbol: string
  guildTheme: any
  guildSlug: string
  footerImg: Image
  background: string
}
