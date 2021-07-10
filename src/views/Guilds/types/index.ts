export type Gradients = {
  bubblegum: string
  lootswap: string
}

export type Colors = {
  primary: string
  primaryBright: string
  primaryDark: string
  secondary: string
  tertiary: string
  success: string
  failure: string
  warning: string
  contrast: string
  invertedContrast: string
  input: string
  inputSecondary: string
  background: string
  backgroundDisabled: string
  text: string
  textDisabled: string
  textSubtle: string
  borderColor: string
  card: string
  popup: string
  icon: string

  // Gradients
  gradients: Gradients

  // Brand colors
  binance: string
  harmony: string
}

export type Page = {
  background: string
}

export type GuildTheme = {
  colors: Colors
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
  theme: GuildTheme
  guildSlug: string
  footerImg: Image
  background: string
}
