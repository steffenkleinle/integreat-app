// @flow

import * as React from 'react'
import type { NavigationContainer } from 'react-navigation'
import { generateKey } from '../generateRouteKey'
import AppSettings from '../../settings/AppSettings'
import createAppNavigationContainer from '../createAppNavigationContainer'
import { Text } from 'react-native'
import SentryIntegration from '../SentryIntegration'
import { AsyncStorageVersion } from '../../settings/constants'

type PropsType = {|
  fetchCategory: (cityCode: string, language: string, key: string) => void,
  clearCategory: (key: string) => void,
  fetchCities: (forceRefresh: boolean) => void
|}

type StateType = {| waitingForSettings: boolean, errorMessage: null |}

class Navigator extends React.Component<PropsType, StateType> {
  appNavigationContainer: ?NavigationContainer<*, *, *>
  state = { waitingForSettings: true, errorMessage: null }

  componentDidMount () {
    const { fetchCities } = this.props
    fetchCities(false)
    this.initializeAppContainer().catch(error => this.setState({ errorMessage: error.message }))
  }

  async initializeAppContainer () {
    const { fetchCategory, clearCategory } = this.props
    const appSettings = new AppSettings()
    const [introShown, settings, cityCode, language, storageVersion] = await Promise.all([
      appSettings.loadIntroShown(),
      appSettings.loadSettings(),
      appSettings.loadSelectedCity(),
      appSettings.loadContentLanguage(),
      appSettings.loadVersion()
    ])

    if (!storageVersion) {
      await appSettings.clearAppSettings()
      await appSettings.setVersion(AsyncStorageVersion)
    }
    if (storageVersion !== AsyncStorageVersion) {
      // start a migration routine
      await appSettings.setVersion(AsyncStorageVersion)
    }
    if (!language) {
      throw Error('The contentLanguage has not been set correctly by I18nProvider!')
    }

    if (!introShown) {
      this.appNavigationContainer = createAppNavigationContainer({ initialRouteName: 'Intro' })
    } else {
      if (settings.errorTracking) {
        const sentry = new SentryIntegration()
        await sentry.install()
      }

      if (cityCode) {
        const key = generateKey()
        this.appNavigationContainer = createAppNavigationContainer({
          initialRouteName: 'CityContent', cityCode, language, clearCategory, key
        })
        fetchCategory(cityCode, language, key)
      } else {
        this.appNavigationContainer = createAppNavigationContainer({ initialRouteName: 'Landing' })
      }
    }

    this.setState({ waitingForSettings: false })
  }

  render () {
    if (this.state.errorMessage) {
      return <Text>{this.state.errorMessage}</Text>
    }
    const AppContainer = this.appNavigationContainer
    return AppContainer ? <AppContainer /> : null
  }
}

export default Navigator
