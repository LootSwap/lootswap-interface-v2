import { light, dark } from '@lootswap/uikit'

export const lightTheme = {
  ...light.colors,
  background: '#f5e8f6',
  failure: '#ed4b60',
  primary: '#c685d7',
  primaryBright: '#48c2df',
  primaryDark: '#128aa6',
  secondary: '#315296',
  success: '#1883c0',
  warning: '#FFB237',
  contrast: '#c685d7',
  text: 'rgba(0,17,54)',
  input: '#fff',
  inputSecondary: '#fae3bd',
  textSubtle: '#8f69b6',
  borderColor: '#eee7e1',
  textDisabled: 'rgba(100,100,100, .55)',
  backgroundDisabled: 'rgba(0,0,0, .1)',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #f0beef 0%, #f4e3f6 50%,  #b0c8fb 100%)',
  },
}

export const darkTheme = {
  ...dark.colors,
  background: '#1d2225',
  failure: '#ed4b60',
  primary: '#c685d7',
  primaryBright: '#f3ddf9',
  primaryDark: '#c083d0',
  secondary: '#315296',
  success: '#1883c0',
  warning: '#FFB237',
  contrast: '#c685d7',
  text: '#8b72cc',
  input: '#63175f',
  inputSecondary: '#44093f',
  textSubtle: '#b1cbf9',
  textDisabled: 'rgba(255,255,255, .25)',
  backgroundDisabled: 'rgba(0,0,0, .25)',
  borderColor: '#5c155b',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #5c155b 0%, #042260 100%)',
  },
}
