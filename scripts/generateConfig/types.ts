export enum SettingsType {
  'FARM' = 'FARM',
}

export interface SettingsObject {
  name: string
  url: string
  type: SettingsType
}
