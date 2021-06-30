import React from 'react'
import SearchFeedback from '../SearchFeedback'
import { shallow } from 'enzyme'

jest.mock('react-i18next')

describe('SearchFeedback', () => {
  const cityCode = 'augsburg'
  const languageCode = 'de'

  it('should render a NothingFoundFeedbackBox if no results are found', () => {
    expect(
      shallow(<SearchFeedback cityCode={cityCode} languageCode={languageCode} query='abc' resultsFound={false} />)
    ).toMatchSnapshot()
  })

  it('should render a FeedbackButton if results are found and the query is not empty', () => {
    expect(
      shallow(<SearchFeedback cityCode={cityCode} languageCode={languageCode} query='ab' resultsFound />)
    ).toMatchSnapshot()
  })

  it('should render neither a NothingFoundFeedbackBox nor a FeedbackButton', () => {
    expect(
      shallow(<SearchFeedback cityCode={cityCode} languageCode={languageCode} query='' resultsFound />)
    ).toMatchSnapshot()
  })
})