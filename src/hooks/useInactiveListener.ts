import { useEffect } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Blockchain } from '@lootswap/sdk'
import getBlockchain from 'utils/getBlockchain'

const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1')

const BLOCKCHAIN: Blockchain = getBlockchain(NETWORK_CHAIN_ID)

let supportedChainIds: number[]
switch (BLOCKCHAIN) {
  case Blockchain.BINANCE_SMART_CHAIN:
    supportedChainIds = [56, 97]
    break
  case Blockchain.HARMONY:
    supportedChainIds = [1666600000, 1666700000]
    break
  default:
    supportedChainIds = [1, 3, 4, 5, 42]
    break
}

export const injected = new InjectedConnector({
  supportedChainIds,
})

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
export default function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3ReactCore() // specifically using useWeb3React because of what this hook does

  useEffect(() => {
    const { ethereum } = window as any

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        activate(injected, undefined, true).catch((e) => {
          console.error('Failed to activate after chain changed', e)
        })
      }

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true).catch((e) => {
            console.error('Failed to activate after accounts changed', e)
          })
        }
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
    return undefined
  }, [active, error, suppress, activate])
}
