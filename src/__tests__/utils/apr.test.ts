import BigNumber from 'bignumber.js'
import { getFarmApr } from 'utils/apr'
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber'

describe('getFarmApr', () => {
  it(`returns null when parameters are missing`, () => {
    const apr = getFarmApr(null, null, null)
    expect(apr).toBeNull()
  })
  it(`returns null when APR is infinite`, () => {
    const apr = getFarmApr(BIG_ZERO, BIG_ZERO, BIG_ZERO)
    expect(apr).toBeNull()
  })
  it(`get the correct pool APR`, () => {
    const apr = getFarmApr(BIG_TEN, new BigNumber(1), new BigNumber(100000))
    expect(apr).toEqual(4204800)
  })
})
