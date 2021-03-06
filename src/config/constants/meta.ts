import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'LootSwap',
  description: 'AMM and yield farm on the Harmony protocol',
  image: 'https://pancakeswap.finance/images/lootswap.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('LootSwap')}`,
      }
    case '/questlog':
      return {
        title: `${t('Quest Log')} | ${t('LootSwap')}`,
      }
    default:
      return null
  }
}
