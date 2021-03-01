// @flow

import React from 'react'
import SelectorItemModel from '../../../common/models/SelectorItemModel'
import { shallow } from 'enzyme'
import HeaderLanguageSelectorItem from '../HeaderLanguageSelectorItem'
import buildConfig from '../../../app/constants/buildConfig'

jest.mock('react-i18next')

describe('HeaderLanguageSelectorItem', () => {
  const selectorItems = [
    new SelectorItemModel({
      code: 'en',
      href: '/augsburg/en/',
      name: 'English'
    }),
    new SelectorItemModel({
      code: 'de',
      href: '/augsburg/de/',
      name: 'Deutsch'
    })
  ]

  const activeItemCode = 'de'
  const theme = buildConfig().lightTheme

  it('should render a HeaderDropDown with a Selector if there are selectorItems', () => {
    expect(shallow(
      <HeaderLanguageSelectorItem activeItemCode={activeItemCode} selectorItems={selectorItems} theme={theme} />
    ).dive()).toMatchSnapshot()
  })

  it('should render an icon with a tooltip if there are no selectorItems', () => {
    expect(shallow(
      <HeaderLanguageSelectorItem activeItemCode={activeItemCode} selectorItems={[]} theme={theme} />
    ).dive()).toMatchSnapshot()
  })
})
