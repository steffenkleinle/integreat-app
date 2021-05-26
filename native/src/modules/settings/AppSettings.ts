import AsyncStorage from '@react-native-community/async-storage'
import { mapValues, toPairs } from 'lodash/object'
import { fromPairs } from 'lodash/array'
import { SignalType } from 'api-client'

export type SettingsType = {
  storageVersion: string | null
  contentLanguage: string | null
  selectedCity: string | null
  introShown: boolean | null
  errorTracking: boolean | null
  allowPushNotifications: boolean | null
  apiUrlOverride: string | null
  jpalTrackingEnabled: boolean | null
  jpalTrackingCode: string | null
  jpalSignals: Array<SignalType>
}
export const defaultSettings: SettingsType = {
  storageVersion: null,
  contentLanguage: null,
  selectedCity: null,
  introShown: null,
  errorTracking: true,
  allowPushNotifications: true,
  apiUrlOverride: null,
  jpalTrackingEnabled: null,
  jpalTrackingCode: null,
  jpalSignals: []
}

class AppSettings {
  asyncStorage: typeof AsyncStorage

  constructor(asyncStorage: typeof AsyncStorage = AsyncStorage) {
    this.asyncStorage = asyncStorage
  }

  loadSettings = async (): Promise<SettingsType> => {
    const settingsKeys = Object.keys(defaultSettings)
    const settingsArray = await this.asyncStorage.multiGet(settingsKeys)
    return mapValues(fromPairs(settingsArray), (value, key) => {
      const parsed = JSON.parse(value)

      if (parsed === null) {
        // null means this setting does not exist
        return defaultSettings[key]
      }

      return parsed
    })
  }

  setSettings = async (settings: Partial<SettingsType>) => {
    const settingsArray = toPairs(mapValues(settings, value => JSON.stringify(value)))
    await this.asyncStorage.multiSet(settingsArray)
  }

  setVersion = async (version: string) => {
    await this.setSettings({
      storageVersion: version
    })
  }

  loadVersion = async (): Promise<string | null> => {
    const settings = await this.loadSettings()
    return settings.storageVersion
  }

  setContentLanguage = async (language: string) => {
    await this.setSettings({
      contentLanguage: language
    })
  }

  loadContentLanguage = async (): Promise<string | null> => {
    const settings = await this.loadSettings()
    return settings.contentLanguage
  }

  setSelectedCity = async (city: string) => {
    await this.setSettings({
      selectedCity: city
    })
  }

  clearSelectedCity = async () => {
    await this.setSettings({
      selectedCity: null
    })
  }

  setJpalTrackingCode = async (jpalTrackingCode: string) => {
    await this.setSettings({
      jpalTrackingCode
    })
  }

  clearJpalTrackingCode = async () => {
    await this.setSettings({
      jpalTrackingCode: null
    })
  }

  setJpalTrackingEnabled = async (jpalTrackingEnabled: boolean) => {
    await this.setSettings({
      jpalTrackingEnabled
    })
  }

  clearJpalTrackingEnabled = async () => {
    await this.setSettings({
      jpalTrackingEnabled: false
    })
  }

  pushJpalSignal = async (signal: SignalType) => {
    const { jpalSignals } = await this.loadSettings()
    jpalSignals.push(signal)
    await this.setSettings({
      jpalSignals
    })
  }

  clearJpalSignals = async (): Promise<Array<SignalType>> => {
    const { jpalSignals } = await this.loadSettings()
    await this.setSettings({
      jpalSignals: []
    })
    return jpalSignals
  }

  loadSelectedCity = async (): Promise<string | null | undefined> => {
    const settings = await this.loadSettings()
    return settings.selectedCity
  }

  setIntroShown = async () => {
    await this.setSettings({
      introShown: true
    })
  }

  loadIntroShown = async (): Promise<boolean | null> => {
    const settings = await this.loadSettings()
    return settings.introShown
  }

  setApiUrlOverride = async (apiUrlOverride: string) => {
    await this.setSettings({
      apiUrlOverride
    })
  }

  loadApiUrlOverride = async (): Promise<string | null | undefined> => {
    const settings = await this.loadSettings()
    return settings.apiUrlOverride
  }

  clearAppSettings = async () => {
    const settingsKeys = Object.keys(defaultSettings)
    await this.asyncStorage.multiRemove(settingsKeys)
  }
}

export default AppSettings