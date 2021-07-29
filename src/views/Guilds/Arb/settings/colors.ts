import { light, dark } from '@lootswap/uikit'

export const lightTheme = {
  ...light.colors,
  background: '#dff8ff',
  failure: '#ed4b60',
  primary: '#24a9c8',
  primaryBright: '#48c2df',
  primaryDark: '#128aa6',
  secondary: '#1884c2',
  success: '#1883c0',
  warning: '#FFB237',
  contrast: '#2357c5',
  text: 'rgba(0,17,54)',
  input: '#fff',
  inputSecondary: '#fae3bd',
  textSubtle: '#fb6327',
  borderColor: '#eee7e1',
  textDisabled: 'rgba(255,255,255, .55)',
  backgroundDisabled: 'rgba(0,0,0, .1)',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #e1f9ff 0%, #b2e5f1 100%)',
  },
}

export const darkTheme = {
  ...dark.colors,
  background: '#1d2225',
  failure: '#ed4b60',
  primary: '#24a9c8',
  primaryBright: '#48c2df',
  primaryDark: '#128aa6',
  secondary: '#1884c2',
  success: '#1883c0',
  warning: '#FFB237',
  contrast: '#24a9c8',
  text: 'rgba(117,138,149)',
  input: '#1e4e6a',
  inputSecondary: '#14405a',
  textSubtle: '#e77548',
  textDisabled: 'rgba(255,255,255, .25)',
  backgroundDisabled: 'rgba(0,0,0, .25)',
  borderColor: '#202d3e',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #1e4e6a 0%, #003655 100%)',
  },
}
