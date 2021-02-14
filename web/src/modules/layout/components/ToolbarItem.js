// @flow

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StyledToolbarItem from './StyledToolbarItem'
import StyledSmallViewTip from './StyledSmallViewTip'
import Tooltip from '../../common/components/Tooltip'

type PropsType = {|
  href: string,
  icon: {},
  text: string,
  viewportSmall: boolean
|}

class ToolbarItem extends React.PureComponent<PropsType> {
  render () {
    const { href, text, icon, viewportSmall } = this.props
    return (
      <StyledToolbarItem href={href} ariaLabel={text}>
        <Tooltip text={text} direction='up' lowWidthFallback='right' smallViewport='down'>
          <FontAwesomeIcon icon={icon} />
          {viewportSmall && <StyledSmallViewTip>{text}</StyledSmallViewTip>}
        </Tooltip>
      </StyledToolbarItem>
    )
  }
}

export default ToolbarItem
