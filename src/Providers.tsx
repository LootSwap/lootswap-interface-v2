import React from 'react'
import { ModalProvider } from '@lootswap/uikit'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { getLibrary } from 'utils/web3React'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { LanguageProvider } from 'contexts/Localization'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import { ToastsProvider } from 'contexts/ToastsContext'
import store from 'state'
import { NetworkContextName } from 'config/constants/network'
import Web3ReactManager from 'Web3ReactManager'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const Providers: React.FC = ({ children }) => {
  return (
    <LanguageProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <Web3ReactManager>
            <Provider store={store}>
              <ToastsProvider>
                <HelmetProvider>
                  <ThemeContextProvider>
                    <RefreshContextProvider>
                      <ModalProvider>{children}</ModalProvider>
                    </RefreshContextProvider>
                  </ThemeContextProvider>
                </HelmetProvider>
              </ToastsProvider>
            </Provider>
          </Web3ReactManager>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </LanguageProvider>
  )
}

export default Providers
