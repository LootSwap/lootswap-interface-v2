import React from 'react'
import { Menu as UikitMenu } from '@lootswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import { usePriceLootBusd } from 'state/hooks'
import config from './config'

// TODO: Have to fork UikitMenu
const Menu = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceLootBusd()
  const { currentLanguage, setLanguage, t } = useTranslation()

  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      tokenPriceUsd={cakePriceUsd.toNumber()}
      links={config(t)}
      logoSrc="https://legacy.lootswap.finance/static/media/loot_logo.5ca5dce3.png"
      logoAlt="lootswap"
      tokenSrc="https://lootswap.finance/images/loot.svg"
      {...props}
    />
  )
}

export default Menu
