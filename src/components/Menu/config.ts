import { MenuEntry } from '@lootswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Trade'),
    icon: 'SwapOneIcon',
    type: 'svg',
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
    icon: 'ErrorIcon',
    type: 'svg',
    href: '/questlog',
  },
  {
    label: t('Guilds'),
    icon: 'GuildIcon',
    type: 'svg',
    items: [
      {
        label: t('Coming Soon'),
        href: '#',
      },
    ],
  },
  {
    label: t('Analytics'),
    icon: 'InfoIcon',
    href: 'https://analytics.lootswap.finance/',
  },
  {
    label: t('More'),
    icon: 'MoreIcon',
    items: [
      {
        label: t('Github'),
        href: 'https://github.com/LootSwap',
      },
      // {
      //   label: t('Docs'),
      //   href: 'https://docs.lootswap.finance',
      // },
      {
        label: t('Blog'),
        href: 'https://lootswapfinance.medium.com/',
      },
    ],
  },
]

export default config
