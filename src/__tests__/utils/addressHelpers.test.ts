import { getAddress } from 'utils/addressHelpers'

describe('getAddress', () => {
  const address = {
    1666600000: '0xbDa99C8695986B45a0dD3979cC6f3974D9753D30',
    1666700000: '0xCb14544950B6d81b9D0ff73af7876E50d64d6e8E',
  }

  it(`get address for mainnet (chainId 1666600000)`, () => {
    process.env.REACT_APP_CHAIN_ID = '1666600000'
    const expected = address[1666600000]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for testnet (chainId 1666700000)`, () => {
    process.env.REACT_APP_CHAIN_ID = '1666700000'
    const expected = address[1666700000]
    expect(getAddress(address)).toEqual(expected)
  })
})
