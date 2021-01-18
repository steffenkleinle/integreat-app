// @flow

import { lightTheme, darkTheme } from './theme'
import type {
  AndroidBuildConfigType,
  CommonBuildConfigType,
  iOSBuildConfigType,
  WebBuildConfigType
} from '../BuildConfigType'
import { INTEGREAT_ASSETS } from '../AssetsType'
import mainImprint from './mainImprint'

const APPLE_APP_ID = '1072353915'

const commonIntegreatBuildConfig: CommonBuildConfigType = {
  appName: 'Integreat',
  appIcon: 'app_icon_integreat',
  lightTheme,
  darkTheme,
  assets: INTEGREAT_ASSETS,
  cmsUrl: 'https://cms.integreat-app.de',
  switchCmsUrl: 'https://cms-test.integreat-app.de',
  shareBaseUrl: 'https://integreat.app',
  allowedHostNames: ['cms.integreat-app.de', 'cms-test.integreat-app.de'],
  internalLinksHijackPattern: 'https?:\\/\\/(cms(-test)?\\.integreat-app\\.de|web\\.integreat-app\\.de|integreat\\.app)(?!\\/[^/]*\\/(wp-content|wp-admin|wp-json)\\/.*).*',
  featureFlags: {
    pois: false,
    newsStream: true,
    pushNotifications: true,
    introSlides: true,
    sentry: true,
    developerFriendly: false
  },
  aboutUrls: {
    default: 'https://integreat-app.de/about/',
    en: 'https://integreat-app.de/en/about/'
  },
  privacyUrls: {
    default: 'https://integreat-app.de/datenschutz/',
    en: 'https://integreat-app.de/en/privacy/'
  }
}

export const androidIntegreatBuildConfig: AndroidBuildConfigType = {
  ...commonIntegreatBuildConfig,
  splashScreen: true,
  applicationId: 'tuerantuer.app.integreat',
  googleServices: {
    googleAppId: '1:164298278764:android:3fc1f67f3883df306fd549',
    gcmDefaultSenderId: '164298278764',
    defaultWebClientId: '164298278764-hhup7orh5rvg0oumhbabqvp5giudaste.apps.googleusercontent.com',
    gaTrackingId: null,
    firebaseDatabaseUrl: 'https://integreat-2020.firebaseio.com',
    googleApiKey: 'AIzaSyBvc08_Cqww8z2Dh-EXtwHW98HXBk8T7V4',
    googleCrashReportingApiKey: 'AIzaSyBvc08_Cqww8z2Dh-EXtwHW98HXBk8T7V4',
    projectId: 'integreat-2020'
  }
}

export const iosIntegreatBuildConfig: iOSBuildConfigType = {
  ...commonIntegreatBuildConfig,
  bundleIdentifier: 'de.integreat-app',
  provisioningProfileSpecifier: 'match Development de.integreat-app',
  appleId: APPLE_APP_ID,
  googleServices: {
    clientId: '164298278764-pemn49q7v283m0tqml3q8q0ltr5h8pni.apps.googleusercontent.com',
    reversedClientId: 'com.googleusercontent.apps.164298278764-pemn49q7v283m0tqml3q8q0ltr5h8pni',
    apiKey: 'AIzaSyBSnGYrUWfIAPcEsFya1OYvTMbjvfUyOEU',
    gcmSenderId: '164298278764',
    plistVersion: '1',
    bundleId: 'de.integreat-app',
    projectId: 'integreat-2020',
    storageBucket: 'integreat-2020.appspot.com',
    isAdsEnabled: false,
    isAnalyticsEnabled: false,
    isAppInviteEnabled: true,
    isGCMEnabled: true,
    isSigninEnabled: true,
    googleAppId: '1:164298278764:ios:2a69672da4d117116fd549',
    databaseUrl: 'https://integreat-2020.firebaseio.com'
  },
  launchScreen: 'LaunchScreenIntegreat'
}

export const webIntegreatBuildConfig: WebBuildConfigType = {
  ...commonIntegreatBuildConfig,
  mainImprint,
  itunesAppId: APPLE_APP_ID,
  manifestUrl: '/manifest.json',
  icons: {
    appLogo: '/app-logo.png',
    locationMarker: '/location-marker.svg',
    appleTouchIcon: '/apple-touch-icon.png',
    socialMediaPreview: '/social-media-preview.png',
    favicons: '/favicons/'
  },
  splashScreen: {
    backgroundColor: lightTheme.colors.themeColor,
    imageUrl: '/app-icon-cornered.jpg'
  }
}

const platformBuildConfigs = {
  common: commonIntegreatBuildConfig,
  web: webIntegreatBuildConfig,
  android: androidIntegreatBuildConfig,
  ios: iosIntegreatBuildConfig
}

export default platformBuildConfigs