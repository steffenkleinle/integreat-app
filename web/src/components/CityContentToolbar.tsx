import React, { ReactNode } from 'react'

import FeedbackToolbarItem, { FeedbackRatingType } from './FeedbackToolbarItem'
import Toolbar from './Toolbar'

type CityContentToolbarProps = {
  openFeedbackModal: (rating: FeedbackRatingType) => void
  children?: ReactNode
  viewportSmall: boolean
  iconDirection?: 'row' | 'column'
}

class CityContentToolbar extends React.PureComponent<CityContentToolbarProps> {
  render(): ReactNode {
    const { viewportSmall, children, openFeedbackModal, iconDirection } = this.props

    return (
      <Toolbar viewportSmall={viewportSmall} iconDirection={iconDirection}>
        {children}
        <FeedbackToolbarItem isPositiveRatingLink openFeedbackModal={openFeedbackModal} viewportSmall={viewportSmall} />
        <FeedbackToolbarItem
          isPositiveRatingLink={false}
          openFeedbackModal={openFeedbackModal}
          viewportSmall={viewportSmall}
        />
      </Toolbar>
    )
  }
}

export default CityContentToolbar