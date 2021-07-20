import { light, dark } from '@lootswap/uikit'

export const lightTheme = {
  ...light.colors,
  background: '#f0f4ea',
  failure: '#ed4b60',
  primary: '#838b00',
  primaryBright: '#e9e9a3',
  primaryDark: '#969042',
  secondary: '#52a76e',
  success: '#00b415',
  warning: '#FFB237',
  contrast: '#2357c5',
  text: 'rgba(53,56,5)',
  input: '#fff',
  inputSecondary: '#7ac100',
  textSubtle: '#6dad00',
  borderColor: '#eee7e1',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #ecf2c6 0%, #e0e9a2 100%)',
  },
}

export const darkTheme = {
  ...dark.colors,
  background: '#1d2520',
  failure: '#ed4b60',
  primary: '#838b00',
  primaryBright: '#e9e9a3',
  primaryDark: '#969042',
  secondary: '#418558',
  success: '#22912f',
  warning: '#FFB237',
  contrast: '#838b00',
  text: 'rgba(132,141,126)',
  input: '#22402c',
  inputSecondary: '#0b4b21',
  textSubtle: '#6dad00',
  textDisabled: 'rgba(255,255,255, .25)',
  backgroundDisabled: '#041b0c',
  borderColor: '#2e3e20',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #2d4937 0%, #243a2c 100%)',
  },
}
