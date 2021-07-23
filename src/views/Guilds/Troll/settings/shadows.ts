import { light, dark } from '@lootswap/uikit'

export const lightTheme = {
  ...light.shadows,
  success: '0px 0px 0px 1px #00b415, 0px 0px 0px 4px rgba(0, 180, 21, 0.2)',
  focus: '0px 0px 0px 1px #81ed00, 0px 0px 0px 4px rgba(200, 211, 255, 0.6)',
}

export const darkTheme = {
  ...dark.shadows,
  success: '0px 0px 0px 1px #22912f, 0px 0px 0px 4px rgba(0, 180, 21, 0.2)',
  focus: '0px 0px 0px 1px #81ed00, 0px 0px 0px 4px rgba(200, 211, 255, 0.6)',
}
