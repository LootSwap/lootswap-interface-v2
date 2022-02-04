import { MenuEntry } from '@lootswap/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { BASE_SWAP_URL, BASE_LIQUIDITY_POOL_URL } from 'config'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    type: 'svg',
    href: '/',
  },
  {
    label: t('Trade'),
    icon: 'SwapOneIcon',
    type: 'svg',
    items: [
      {
        label: t('Exchange'),
        href: BASE_SWAP_URL,
      },
      {
        label: t('Liquidity'),
        href: BASE_LIQUIDITY_POOL_URL,
      },
      {
        label: t('AutoLooter'),
        href: 'https://legacy.lootswap.finance/#/autoLoot',
      },
    ],
  },
  {
    label: t('Quest Log'),
    icon: 'QuestLogsIcon',
    type: 'svg',
    href: '/questlog',
  },
  {
    label: t('Troll'),
    icon: 'QuestLogsIcon',
    type: 'svg',
    href: '/questlog',
  },
  {
    // CHORE: GUILD SETTINGS
    label: t('Guilds'),
    icon: 'GuildIcon',
    type: 'svg',
    initialOpenState: true,
    items: [
      {
        label: t('Troll'),
        href: '/guilds/troll',
      },
      {
        label: t('Arbiter'),
        href: '/guilds/arb',
      },
      {
        label: t('Bard'),
        href: '/guilds/bard',
      },
      {
        label: t('Cosmic Universe'),
        href: '/guilds/cosmic',
      },
      {
        label: t('Fools'),
        href: '/guilds/fool',
      },
    ],
  },
  {
    label: t('Loot Market'),
    icon: 'IfoIcon',
    href: '/market',
  },
  {
    label: t('Loot Blocks'),
    icon: 'LootBlockIcon',
    href: 'https://lootblocks.one/0x94d3433aAe74B0B9341B0e89F4663D49235bA8C5',
  },
  {
    label: t('Analytics'),
    icon: 'InfoIcon',
    href: 'https://dexscreener.com/harmony/lootswap',
  },
  {
    label: t('More'),
    icon: 'MoreIcon',
    items: [
      {
        label: t('White Paper'),
        href: 'https://lootswapfinance.medium.com/lootswap-white-papers-roadmap-d48747fa69',
      },
      {
        label: t('Github'),
        href: 'https://github.com/LootSwap',
      },
      {
        label: t('Blog'),
        href: 'https://lootswapfinance.medium.com/',
      },
      {
        label: t('Reddit'),
        href: 'https://www.reddit.com/r/Lootswap/',
      },
    ],
  },
]

export default config
