import { light, dark } from '@lootswap/uikit'

const isDark = true

const theme = isDark ? dark : light

const lightTheme = {
  ...theme.shadows,
  success: '0px 0px 0px 1px #00b415, 0px 0px 0px 4px rgba(0, 180, 21, 0.2)',
  focus: '0px 0px 0px 1px #0030ed, 0px 0px 0px 4px rgba(200, 211, 255, 0.6)',
}

const darkTheme = {
  ...theme.shadows,
  success: '0px 0px 0px 1px #22912f, 0px 0px 0px 4px rgba(0, 180, 21, 0.2)',
  focus: '0px 0px 0px 1px #0030ed, 0px 0px 0px 4px rgba(0, 24, 118, 0.6)',
}

export const shadows = isDark ? darkTheme : lightTheme

export default shadows
