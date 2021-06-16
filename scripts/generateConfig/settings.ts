import { SettingsObject, SettingsType } from './types'

const BASE_URL = 'https://pancake-config-api-chefkai.pancakeswap.vercel.app'
const settings: SettingsObject[] = [
  {
    name: 'farms',
    url: `${BASE_URL}/farms`,
    type: SettingsType.FARM,
  },
]
export default settings
