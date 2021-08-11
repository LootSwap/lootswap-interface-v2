import { Web3Provider } from '@ethersproject/providers'
import { Blockchain, ChainId } from '@lootswap/sdk'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import getNodeUrl from './getRpcUrl'

export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1666700000')

enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
  WalletLink = 'walletlink',
}

const POLLING_INTERVAL = 15000
const rpcUrl = getNodeUrl()

const injected = new InjectedConnector({ supportedChainIds: [NETWORK_CHAIN_ID] })

const walletconnect = new WalletConnectConnector({
  rpc: { [NETWORK_CHAIN_ID]: rpcUrl },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

const walletlink = new WalletLinkConnector({
  url: rpcUrl,
  appName: 'Lootswap',
  appLogoUrl:
    'https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg',
})

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.WalletLink]: walletlink,
}

function getBlockchain(chainId: ChainId | undefined): Blockchain {
  switch (chainId) {
    case ChainId.MAINNET:
    case ChainId.ROPSTEN:
    case ChainId.RINKEBY:
    case ChainId.GÖRLI:
    case ChainId.KOVAN:
      return Blockchain.ETHEREUM
    case ChainId.BSC_MAINNET:
    case ChainId.BSC_TESTNET:
      return Blockchain.BINANCE_SMART_CHAIN
    case ChainId.HARMONY_MAINNET:
    case ChainId.HARMONY_TESTNET:
      return Blockchain.HARMONY
    default:
      return Blockchain.ETHEREUM
  }
}

export const BLOCKCHAIN: Blockchain = getBlockchain(NETWORK_CHAIN_ID)

export const getLibrary = (provider): Web3Provider => {
  // return provider
  const library = new Web3Provider(provider, 'any')
  switch (BLOCKCHAIN) {
    case Blockchain.BINANCE_SMART_CHAIN:
      library.pollingInterval = 1500
      break
    case Blockchain.HARMONY:
      library.pollingInterval = 500
      break
    default:
      library.pollingInterval = 15000
      break
  }
  return library
}
