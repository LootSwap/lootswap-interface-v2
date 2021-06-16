import { BASE_HARMONY_SCAN_URL } from 'config'

export const getHarmonyScanAddressUrl = (address: string) => {
  return `${BASE_HARMONY_SCAN_URL}/#/address/${address}`
}

export const getHarmonyScanTransactionUrl = (transactionHash: string) => {
  return `${BASE_HARMONY_SCAN_URL}/#/tx/${transactionHash}`
}

export const getHarmonyScanBlockNumberUrl = (block: string | number) => {
  return `${BASE_HARMONY_SCAN_URL}/#/block/${block}`
}

export const getHarmonyScanBlockCountdownUrl = (block: string | number) => {
  return `${BASE_HARMONY_SCAN_URL}/#/block/countdown/${block}`
}
