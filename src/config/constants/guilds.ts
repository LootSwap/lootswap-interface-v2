import tokens from './tokens'
import { GuildConfig } from './types'

const farms: GuildConfig[] = [
  {
    pid: 0,
    lpSymbol: 'LOOT-GG',
    lpAddresses: {
      1666600000: '0x0499761c54812Fd8084d75D3674097b1232B89C7',
      1666700000: '',
    },
    token: tokens.gg,
    quoteToken: tokens.loot,
    guildSlug: 'gg',
  },
  {
    pid: 0,
    lpSymbol: 'TROLL-LOOT',
    lpAddresses: {
      1666600000: '0xa1808a54AeA27609ad55d58a0e1836Cb35fe872d',
      1666700000: '',
    },
    token: tokens.troll,
    quoteToken: tokens.loot,
    guildSlug: 'troll',
    startBlock: 15490489,
  },
  {
    pid: 1,
    lpSymbol: 'TROLL-ONE',
    lpAddresses: {
      1666600000: '0x20704b4e7C98eF18f05aFe0bDED99eb4D7ffE062',
      1666700000: '',
    },
    token: tokens.troll,
    quoteToken: tokens.wone,
    guildSlug: 'troll',
    startBlock: 15490489,
  },
  {
    pid: 2,
    lpSymbol: 'TROLL-bscUSDC',
    lpAddresses: {
      1666600000: '0xB8B9CF863b4F0f053E47EaB7b29F7F9f31D8ffAD',
      1666700000: '',
    },
    token: tokens.bscusdc,
    quoteToken: tokens.troll,
    guildSlug: 'troll',
    startBlock: 15490489,
  },
  {
    pid: 3,
    lpSymbol: 'bscBTCB-1WBTC',
    lpAddresses: {
      1666600000: '0x28C9AaD81cfd38Ca0f332fed9eAA1Ea2628d8A9B',
      1666700000: '',
    },
    token: tokens.bscbtbb,
    quoteToken: tokens.wbtc,
    guildSlug: 'troll',
    startBlock: 15490489,
  },
  {
    pid: 4,
    lpSymbol: 'bscETH-1ETH',
    lpAddresses: {
      1666600000: '0xAeBB1a861194fe6aD90B6ff24dF98E204A968984',
      1666700000: '',
    },
    token: tokens.bsceth,
    quoteToken: tokens.ether,
    guildSlug: 'troll',
    startBlock: 15490489,
  },
  {
    pid: 5,
    lpSymbol: '1renDOGE-bscDOGE',
    lpAddresses: {
      1666600000: '0xF5702714b266DB6e121445839d5ff5490E74eCef',
      1666700000: '',
    },
    token: tokens.bscdoge,
    quoteToken: tokens.onerendoge,
    guildSlug: 'troll',
    startBlock: 15490489,
  },
  {
    pid: 6,
    lpSymbol: 'bscBUSD-BUSD',
    lpAddresses: {
      1666600000: '0x63D75d38B7428A6C7a72Df9b74A14ae974B80410',
      1666700000: '',
    },
    token: tokens.bscbusd,
    quoteToken: tokens.busd,
    guildSlug: 'troll',
    startBlock: 15490489,
  },
  {
    pid: 7,
    lpSymbol: 'bscUSDC-1USDC',
    lpAddresses: {
      1666600000: '0x1Cb2F8e969d5e4C26596bE0E76fF9D47F2C666D4',
      1666700000: '',
    },
    token: tokens.bscusdc,
    quoteToken: tokens.oneusdc,
    guildSlug: 'troll',
    startBlock: 15490489,
  },
  {
    pid: 8,
    lpSymbol: 'bscDAI-1DAI',
    lpAddresses: {
      1666600000: '0x3852734Da9749f8d8899f7Bb21d68E300363a6f1',
      1666700000: '',
    },
    token: tokens.bscdai,
    quoteToken: tokens.onedai,
    guildSlug: 'troll',
    startBlock: 15490489,
  },
  {
    pid: 9,
    lpSymbol: 'bscUSDT-1USDT',
    lpAddresses: {
      1666600000: '0x2b0E0D76C0fdB830B81C3A52D895d55d852DE4D5',
      1666700000: '',
    },
    token: tokens.bscusdt,
    quoteToken: tokens.oneusdt,
    guildSlug: 'troll',
    startBlock: 15490489,
  },
]

export default farms
