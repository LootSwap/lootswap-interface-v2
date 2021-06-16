import { FarmConfig } from 'config/constants/types'
import { SettingsType } from './types'

export const getFarms = (data) => {
  const farms: FarmConfig = data.map((farm) => {
    return {
      pid: farm.pid,
      lpSymbol: farm.lp_symbol,
      lpAddresses: {
        1666600000: farm.lp_mainnet_address,
        1666700000: '',
        56: '',
        97: '',
      },
      tokenSymbol: farm?.token?.symbol,
      tokenAddresses: {
        1666600000: farm?.token?.mainnet_address,
        1666700000: '',
        56: '',
        97: '',
      },
      quoteTokenSymbol: farm?.quote_token?.symbol,
      quoteTokenAdresses: farm?.quote_token?.mainnet_address,
      isCommunity: farm?.is_community,
    }
  })
  return farms
}

export const getFormattedData = (type: SettingsType, data) => {
  const handler = {
    FARM: () => getFarms(data),
  }

  const factory = () => {
    return handler[type]()
  }

  return factory()
}
