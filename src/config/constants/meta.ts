import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'LootSwap',
  description: 'AMM and yield farm on Harmony Smart Chain',
  image: 'https://pancakeswap.finance/images/hero.png', // TODO: change picture
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('PancakeSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('PancakeSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('PancakeSwap')}`,
      }
    default:
      return null
  }
}
