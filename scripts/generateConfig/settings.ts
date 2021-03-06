import { SettingsObject, SettingsType } from './types'

const BASE_URL = 'https://pancake-config-api-chefkai.pancakeswap.vercel.app'
const settings: SettingsObject[] = [
  {
    name: 'quest log',
    url: `${BASE_URL}/questlog`,
    type: SettingsType.FARM,
  },
]
export default settings
