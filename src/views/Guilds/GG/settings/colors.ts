import { light, dark } from '@lootswap/uikit'

export const lightTheme = {
  ...light.colors,
  background: '#f5f5f5',
  failure: '#ed4b60',
  primary: '#0030ed',
  primaryBright: '#2450ff',
  primaryDark: '#0026bd',
  secondary: '#aa9356',
  success: '#00b415',
  warning: '#FFB237',
  contrast: '#2357c5',
  text: 'rgba(38,32,19)',
  input: '#f3f0e8',
  inputSecondary: '#e5d6ce',
  textSubtle: '#bdac7c',
  borderColor: '#eee7e1',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #e7edfa 0%, #cfdcf6 100%)',
  },
}

export const darkTheme = {
  ...dark.colors,
  background: '#030303',
  failure: '#ed4b60',
  primary: '#3b53b1',
  primaryBright: '#2450ff',
  primaryDark: '#0026bd',
  secondary: '#9a8b65',
  success: '#22912f',
  warning: '#FFB237',
  contrast: '#2357c5',
  text: 'rgba(191,189,182)',
  input: '#171717',
  inputSecondary: '#333',
  xtSubtle: '#aaa',
  textDisabled: '#444',
  backgroundDisabled: '#222',
  borderColor: '#3e3620',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #000f51 0%, #00092f 100%)',
  },
}
