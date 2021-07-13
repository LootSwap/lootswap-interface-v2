import { light, dark } from '@lootswap/uikit'
import isDark from 'hooks/useTheme'

const theme = isDark ? light : dark

export const baseColors = {
  ...theme.colors,
  // primary: '#0DD714',
  // primaryBright: '#0DD714',
  // primaryDark: '#60632c',
  // secondary: '#6EC1E4',
  // text: '#0FA10F',
  // textSubtle: '#61CE70',
  // background: '#595959',
}

export default baseColors
