// @flow

import { Linking } from 'react-native'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import buildConfig from '../app/constants/buildConfig'

const openExternalUrl = async (url: string) => {
  try {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url, {
        toolbarColor: buildConfig().lightTheme.colors.themeColor
      })
    } else {
      const canOpen = await Linking.canOpenURL(url)
      if (canOpen) {
        Linking.openURL(url)
      } else {
        // TODO Show a snackbar to indicate there is no suitable app to open the url
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export default openExternalUrl