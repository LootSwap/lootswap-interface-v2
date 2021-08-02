import { light, dark } from '@lootswap/uikit'

export const lightTheme = {
  ...light.colors,
  background: '#fcf6f0',
  failure: '#ed4b60',
  primary: '#8f664e',
  primaryBright: '#a77354',
  primaryDark: '#795038',
  secondary: '#5fa4ad',
  success: '#5fa4ad',
  warning: '#FFB237',
  contrast: '#3d686e',
  text: 'rgba(52,58,59)',
  input: '#fff',
  inputSecondary: '#fee8d1',
  textSubtle: '#5fa4ad',
  borderColor: '#eee7e1',
  textDisabled: 'rgba(255,255,255, .85)',
  backgroundDisabled: 'rgba(0,0,0, .1)',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #fbe9de 0%, #f8ddcc 100%)',
  },
}

export const darkTheme = {
  ...dark.colors,
  background: '#25221d',
  failure: '#ed4b60',
  primary: '#8f664e',
  primaryBright: '#a77354',
  primaryDark: '#795038',
  secondary: '#5fa4ad',
  success: '#5fa4ad',
  warning: '#FFB237',
  contrast: '#8f664e',
  text: 'rgba(149,139,147)',
  input: '#503c27',
  inputSecondary: '#5a3214',
  textSubtle: '#81e5ff',
  textDisabled: 'rgba(255,255,255, .25)',
  backgroundDisabled: 'rgba(0,0,0, .25)',
  borderColor: '#203a3e',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #3f3321 0%, #352917 100%)',
  },
}
