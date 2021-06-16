import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import Web3 from 'web3'
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

export const getLibrary = (provider): Web3 => {
  return provider
}
