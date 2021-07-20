import { light, dark } from '@lootswap/uikit'

export const lightTheme = {
  ...light.card,
  background: '#f9f9f9',
  boxShadow: '0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)',
  boxShadowActive: '0px 0px 0px 1px #0098A1, 0px 0px 4px 8px rgba(31, 199, 212, 0.4)',
  boxShadowSuccess: '0px 0px 0px 1px #31D0AA, 0px 0px 0px 4px rgba(49, 208, 170, 0.2)',
  boxShadowWarning: '0px 0px 0px 1px #ED4B9E, 0px 0px 0px 4px rgba(237, 75, 158, 0.2)',
  cardHeaderBackground: 'linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)',
  dropShadow: 'drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))',
}

export const darkTheme = {
  ...dark.card,
  background: '#171d19',
  boxShadow: '0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)',
  boxShadowActive: '0px 0px 0px 1px #0098A1, 0px 0px 4px 8px rgba(31, 199, 212, 0.4)',
  boxShadowSuccess: '0px 0px 0px 1px #31D0AA, 0px 0px 0px 4px rgba(49, 208, 170, 0.2)',
  boxShadowWarning: '0px 0px 0px 1px #ED4B9E, 0px 0px 0px 4px rgba(237, 75, 158, 0.2)',
  cardHeaderBackground: 'linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)',
  dropShadow: 'drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))',
}
