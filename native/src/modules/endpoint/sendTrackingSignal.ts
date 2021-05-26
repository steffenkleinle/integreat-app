import { createTrackingEndpoint, SpecificSignalType, SignalType } from 'api-client'
import AppSettings from '../settings/AppSettings'
import moment from 'moment'
import buildConfig from '../app/constants/buildConfig'
import { ErrorCode, fromError } from '../error/ErrorCodes'
import * as Sentry from '@sentry/react-native'

let systemLanguage: string
export const setSystemLanguage = (language: string) => {
  systemLanguage = language
}
export const sendRequest = async (signal: SignalType) => {
  const appSettings = new AppSettings()

  try {
    const { jpalTrackingCode, jpalTrackingEnabled } = await appSettings.loadSettings()

    if (buildConfig().featureFlags.jpalTracking && jpalTrackingEnabled && jpalTrackingCode) {
      await createTrackingEndpoint().request(signal)
    }
  } catch (e) {
    if (fromError(e) === ErrorCode.NetworkConnectionFailed) {
      // Offline usage, save signal to be sent later
      await appSettings.pushJpalSignal({ ...signal, offline: true })
    } else {
      console.error(e)
      Sentry.captureException(e)
    }
  }
}

const sendTrackingSignal = async ({
  signal: specificSignal,
  offline = false
}: {
  signal: SpecificSignalType
  offline?: boolean
}) => {
  const appSettings = new AppSettings()

  try {
    const settings = await appSettings.loadSettings()
    const { selectedCity, contentLanguage, allowPushNotifications, errorTracking, jpalTrackingCode } = settings
    if (jpalTrackingCode) {
      const signal: SignalType = {
        ...specificSignal,
        trackingCode: jpalTrackingCode,
        offline,
        timestamp: moment().toISOString(),
        currentCity: selectedCity,
        currentLanguage: contentLanguage,
        systemLanguage: systemLanguage ?? 'unknown',
        appSettings: {
          allowPushNotifications,
          errorTracking
        }
      }
      await sendRequest(signal)
    }
  } catch (e) {
    console.error(e)
  }
}

export default sendTrackingSignal