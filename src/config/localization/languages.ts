import { Language } from '@pancakeswap/uikit'

export const EN: Language = { locale: 'en-US', language: 'English', code: 'en' }
export const ESES: Language = { locale: 'es-ES', language: 'Español', code: 'es-ES' }

export const languages = {
  'en-US': EN,
  'es-ES': ESES,
}

export const languageList = Object.values(languages)
