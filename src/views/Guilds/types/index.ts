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
  backgroundColor?: string
}

export type Sprite = {
  image?: string
  width?: number
  height?: number
}

export type LootFarms = {
  pid?: number
  useLootFarm?: boolean
}

export type GuildConfig = {
  numberOfFarmsVisible: number
  symbol: string
  darkTheme: any
  lightTheme: any
  guildSlug: string
  guildTokenPerBlock: number
  footerImg: Image
  sprite?: Sprite
  loading?: Image
  lootFarmOverride?: LootFarms
  hasLockUp?: boolean
}
