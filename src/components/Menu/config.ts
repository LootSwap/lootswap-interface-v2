import { MenuEntry } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Trade'),
    icon: 'TradeIcon',
    items: [
      {
        label: t('Exchange'),
        href: '#swap',
      },
      {
        label: t('Liquidity'),
        href: '#liquidity',
      },
    ],
  },
  {
    label: t('Quest Log'),
    icon: 'FarmIcon',
    href: '/questlog',
  },
  {
    label: t('More'),
    icon: 'MoreIcon',
    items: [
      {
        label: t('Github'),
        href: 'https://github.com/LootSwap',
      },
      {
        label: t('Docs'),
        href: 'https://docs.lootswap.finance',
      },
      {
        label: t('Blog'),
        href: 'https://lootswap.medium.com',
      },
    ],
  },
]

export default config
