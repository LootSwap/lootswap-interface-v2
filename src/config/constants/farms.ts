import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'bscBNB-ONE',
    lpAddresses: {
      1666600000: '0xD45c14BDf45B4bd05325A7dc253fFCb0d205204D',
      1666700000: '',
    },
    token: tokens.bscbnb,
    quoteToken: tokens.wone,
  },
  {
    pid: 1,
    lpSymbol: 'bscBUSD-ONE',
    lpAddresses: {
      1666600000: '0xd2D94cDa8c29f96d879fc8c0cd09a6f224bEeB9e',
      1666700000: '',
    },
    token: tokens.wone,
    quoteToken: tokens.bscbusd,
  },
  {
    pid: 2,
    lpSymbol: '1ETH-ONE',
    lpAddresses: {
      1666600000: '0xd08F349774bcd447599AABDC72DF2a34145b7Ff9',
      1666700000: '',
    },
    token: tokens.ether,
    quoteToken: tokens.wone,
  },
  // skipped 3,
  {
    pid: 4,
    lpSymbol: '1WBTC-ONE',
    lpAddresses: {
      1666600000: '0xA8455021989Ce3530118E0d6229219Cc9bBCCA2b',
      1666700000: '',
    },
    token: tokens.wbtc,
    quoteToken: tokens.wone,
  },
  {
    pid: 5,
    lpSymbol: 'LOOT-ONE',
    lpAddresses: {
      1666600000: '0xa2DEBc3Cbe088Fff2bEdE17aC67eF5f285845038',
      1666700000: '',
    },
    token: tokens.wone,
    quoteToken: tokens.loot,
  },
  {
    pid: 6,
    lpSymbol: 'LOOT-bscWISB',
    lpAddresses: {
      1666600000: '0x97143dAF10e33f091673e1d0cbad294486eC08D9',
      1666700000: '',
    },
    token: tokens.bscwisb,
    quoteToken: tokens.loot,
    isCommunity: true,
  },
  {
    pid: 7,
    lpSymbol: 'LOOT-XYA',
    lpAddresses: {
      1666600000: '0xF6938ABb05F01D6089561FBF14121E3223ab43ba',
      1666700000: '',
    },
    token: tokens.xya,
    quoteToken: tokens.loot,
    isCommunity: true,
  },
  {
    pid: 8,
    lpSymbol: 'ONE-bscMatic',
    lpAddresses: {
      1666600000: '0xa1e2AE67A7Bf888AA8F702a6f07FC1196BFEEe33',
      1666700000: '',
    },
    token: tokens.bscmatic,
    quoteToken: tokens.wone,
    isCommunity: true,
  },
  {
    pid: 9,
    lpSymbol: 'LOOT-BUSD',
    lpAddresses: {
      1666600000: '0x50127657bD440E4158949c9C7CAe96EB3d0566f9',
      1666700000: '',
    },
    token: tokens.loot,
    quoteToken: tokens.busd,
  },
  {
    pid: 10,
    lpSymbol: '1ETH-1UNI',
    lpAddresses: {
      1666600000: '0xb8ce0515381009932020d359edA6263353De63B1',
      1666700000: '',
    },
    token: tokens.uni,
    quoteToken: tokens.ether,
    isCommunity: true,
  },
  {
    pid: 11,
    lpSymbol: 'bscBNB-bscCAKE',
    lpAddresses: {
      1666600000: '0x986Fdc9948b185d61941384acF196399F12eb756',
      1666700000: '',
    },
    token: tokens.bsccake,
    quoteToken: tokens.bscbnb,
    isCommunity: true,
  },
]

export default farms
