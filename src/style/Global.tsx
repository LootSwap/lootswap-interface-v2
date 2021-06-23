import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};
    background:  url(/images/decorations/background/lootswap-bg.webp), url(/images/decorations/background/lootswap-bg.png), ${({
      theme,
    }) => theme.colors.background};
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center center;
    opacity: 0.95;
    img {
      height: auto;
      max-width: 100%;
    }

    @media (max-width: 400px) {
      background: none;
      background-color: ${({ theme }) => theme.colors.background};
    }
  }
`

export default GlobalStyle
