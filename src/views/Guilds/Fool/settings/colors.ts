import { light, dark } from '@lootswap/uikit'

export const lightTheme = {
  ...light.colors,
  background: '#f5dfdf',
  failure: '#ed4b60',
  primary: '#B22222',
  primaryBright: '#48c2df',
  primaryDark: '#128aa6',
  secondary: '#315296',
  success: '#1883c0',
  warning: '#FFB237',
  contrast: '#B22222',
  text: '#0E4466',
  input: '#fff',
  inputSecondary: '#fae3bd',
  textSubtle: '#b56565',
  borderColor: '#eee7e1',
  textDisabled: 'rgba(100,100,100, .55)',
  backgroundDisabled: 'rgba(0,0,0, .1)',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #edbbbb 0%, #f4e3f6 50%,  #b0c8fb 100%)',
  },
}

export const darkTheme = {
  ...dark.colors,
  background: '#1d2225',
  failure: '#ed4b60',
  primary: '#B22222',
  primaryBright: '#daf7e1',
  primaryDark: '#7cc490',
  secondary: '#315296',
  success: '#1883c0',
  warning: '#FFB237',
  contrast: '#B22222',
  text: '#70c487',
  input: '#00661D',
  inputSecondary: '#083b15',
  textSubtle: '#b1cbf9',
  textDisabled: 'rgba(255,255,255, .25)',
  backgroundDisabled: 'rgba(0,0,0, .25)',
  borderColor: '#155726',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #155726 0%, #042260 100%)',
  },
}
