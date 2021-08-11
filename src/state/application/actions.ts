import { createAction } from '@reduxjs/toolkit'

// eslint-disable-next-line import/prefer-default-export
export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>('application/updateBlockNumber')
