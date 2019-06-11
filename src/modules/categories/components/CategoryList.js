// @flow

import * as React from 'react'

import Caption from 'modules/common/components/Caption'
import CategoryListItem from './CategoryListItem'
import HTML from 'react-native-render-html'
import type { ThemeType } from 'modules/theme/constants/theme'
import { View } from 'react-native'
import styled from 'styled-components'
import SiteHelpfulBox from '../../common/components/SiteHelpfulBox'
import SpaceBetween from '../../common/components/SpaceBetween'

type PropsType = {
  categories: Array<{|
    model: { title: string, thumbnail: string, path: string },
    subCategories: Array<{ title: string, thumbnail: string, path: string }>
  |}>,
  title?: string,
  content?: string,
  /** A search query to highlight in the categories titles */
  query?: string,
  theme: ThemeType,
  onItemPress: (tile: { title: string, thumbnail: string, path: string }) => void,
  navigateToFeedback: (positiveFeedback: boolean) => void
}

/**
 * Displays a ContentList which is a list of categories, a caption and a thumbnail
 */
class CategoryList extends React.Component<PropsType> {
  render () {
    const {categories, title, content, query, theme, onItemPress, navigateToFeedback} = this.props
    return <SpaceBetween>
      <View>
        {title && <Caption title={title} theme={theme} />}
        {!!content && <HTML html={content} />}
        {categories.map(({model, subCategories}) =>
          <CategoryListItem key={model.path}
                            category={model}
                            subCategories={subCategories}
                            query={query}
                            theme={theme}
                            onItemPress={onItemPress} />
        )}
      </View>
      <SiteHelpfulBox navigateToFeedback={navigateToFeedback} theme={theme} />
    </SpaceBetween>
  }
}

export default CategoryList
