/* eslint-disable no-param-reassign */
import RequestError from './RequestError'

export interface BatchItem {
  request: { jsonrpc: '2.0'; id: number; method: string; params: unknown }
  resolve: (result: any) => void
  reject: (error: Error) => void
}

// taken from ethers.js, compatible interface with web3 provider
export type AsyncSendable = {
  isMetaMask?: boolean
  host?: string
  path?: string
  sendAsync?: (request: any, callback: (error: any, response: any) => void) => void
  send?: (request: any, callback: (error: any, response: any) => void) => void
}

export default class MiniRpcProvider implements AsyncSendable {
  public readonly isMetaMask: false = false

  public readonly chainId: number

  public readonly url: string

  public readonly host: string

  public readonly path: string

  public readonly batchWaitTimeMs: number

  private nextId = 1

  private batchTimeoutId: ReturnType<typeof setTimeout> | null = null

  private batch: BatchItem[] = []

  constructor(chainId: number, url: string, batchWaitTimeMs?: number) {
    this.chainId = chainId
    this.url = url
    const parsed = new URL(url)
    this.host = parsed.host
    this.path = parsed.pathname
    // how long to wait to batch calls
    this.batchWaitTimeMs = batchWaitTimeMs ?? 50
  }

  public readonly clearBatch = async () => {
    console.debug('Clearing batch', this.batch)
    const { batch } = this
    this.batch = []
    this.batchTimeoutId = null
    let response: Response
    try {
      response = await fetch(this.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(batch.map((item) => item.request)),
      })
    } catch (error) {
      batch.forEach(({ reject }) => reject(new Error('Failed to send batch call')))
      return
    }

    if (!response.ok) {
      batch.forEach(({ reject }) => reject(new RequestError(`${response.status}: ${response.statusText}`, -32000)))
      return
    }

    let json
    try {
      json = await response.json()
    } catch (error) {
      batch.forEach(({ reject }) => reject(new Error('Failed to parse JSON response')))
      return
    }
    const byKey = batch.reduce<{ [id: number]: BatchItem }>((memo, current) => {
      memo[current.request.id] = current
      return memo
    }, {})
    // eslint-disable-next-line no-restricted-syntax
    for (const result of json) {
      const {
        resolve,
        reject,
        request: { method },
      } = byKey[result.id]
      if (resolve && reject) {
        if ('error' in result) {
          reject(new RequestError(result?.error?.message, result?.error?.code, result?.error?.data))
        } else if ('result' in result) {
          resolve(result.result)
        } else {
          reject(new RequestError(`Received unexpected JSON-RPC response to ${method} request.`, -32000, result))
        }
      }
    }
  }

  public readonly sendAsync = (
    request: { jsonrpc: '2.0'; id: number | string | null; method: string; params?: unknown[] | any },
    callback: (error: any, response: any) => void,
  ): void => {
    this.request(request.method, request.params)
      .then((result) => callback(null, { jsonrpc: '2.0', id: request.id, result }))
      .catch((error) => callback(error, null))
  }

  public readonly request = async (
    method: string | { method: string; params: unknown[] },
    params?: unknown[] | any,
  ): Promise<unknown> => {
    if (typeof method !== 'string') {
      return this.request(method.method, method.params)
    }
    if (method === 'eth_chainId') {
      return `0x${this.chainId.toString(16)}`
    }
    const promise = new Promise((resolve, reject) => {
      this.batch.push({
        request: {
          jsonrpc: '2.0',
          id: this.nextId++,
          method,
          params,
        },
        resolve,
        reject,
      })
    })
    this.batchTimeoutId = this.batchTimeoutId ?? setTimeout(this.clearBatch, this.batchWaitTimeMs)
    return promise
  }
}
