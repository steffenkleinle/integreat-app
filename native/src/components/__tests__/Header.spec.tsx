import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'

import CityModelBuilder from 'api-client/src/testing/CityModelBuilder'
import buildConfig from '../../constants/buildConfig'
import Header from '../Header'
import createNavigationScreenPropMock from '../../testing/createNavigationPropMock'
import { SEARCH_ROUTE } from 'api-client'

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const t = key => key
  const goToLanguageChange = jest.fn()
  const dispatch = jest.fn()
  const [city] = new CityModelBuilder(1).build()
  const navigation = createNavigationScreenPropMock()

  const buildProps = (
    peeking: boolean,
    categoriesAvailable: boolean,
    mode: 'float' | 'screen',
    goToLanguageChange
  ): React.ComponentProps<typeof Header> => {
    // @ts-ignore
    return {
      t,
      theme: buildConfig().lightTheme,
      peeking,
      categoriesAvailable,
      goToLanguageChange,
      routeCityModel: city,
      language: 'de',
      shareUrl: 'testUrl',
      dispatch,
      mode,
      navigation
    }
  }

  it('search header button should be enabled and visible after loading was finished', () => {
    const { getByLabelText } = render(<Header {...buildProps(false, true, 'screen', goToLanguageChange)} />)
    expect(getByLabelText('search')).toHaveStyle({ opacity: 1 })
    fireEvent.press(getByLabelText('search'))
    expect(navigation.navigate).toHaveBeenCalledTimes(1)
    expect(navigation.navigate).toHaveBeenCalledWith(SEARCH_ROUTE)
  })
  it('language header button should be enabled and visible after loading was finished', () => {
    const { getByLabelText } = render(<Header {...buildProps(false, true, 'screen', goToLanguageChange)} />)
    expect(getByLabelText('changeLanguage')).toHaveStyle({ opacity: 1 })
    fireEvent.press(getByLabelText('changeLanguage'))
    expect(goToLanguageChange).toHaveBeenCalledTimes(1)
  })
  it('search header button should be disabled and invisible while loading', () => {
    const { getByLabelText } = render(<Header {...buildProps(true, true, 'screen', goToLanguageChange)} />)
    expect(getByLabelText('search')).toHaveStyle({ opacity: 0 })
    expect(getByLabelText('changeLanguage')).toBeDisabled()
    fireEvent.press(getByLabelText('search'))
    expect(navigation.navigate).not.toHaveBeenCalled()
  })
  it('language header button should be disabled and invisible while loading', () => {
    const { getByLabelText } = render(<Header {...buildProps(true, true, 'screen', goToLanguageChange)} />)
    expect(getByLabelText('changeLanguage')).toHaveStyle({ opacity: 0 })
    expect(getByLabelText('changeLanguage')).toBeDisabled()
    fireEvent.press(getByLabelText('changeLanguage'))
    expect(goToLanguageChange).not.toHaveBeenCalled()
  })
})