import React, { PureComponent, ReactElement } from 'react'
import styled from 'styled-components/native'

import { DateFormatter, EventModel, EVENTS_ROUTE, textTruncator } from 'api-client'

import EventPlaceholder1 from '../assets/EventPlaceholder1.jpg'
import EventPlaceholder2 from '../assets/EventPlaceholder2.jpg'
import EventPlaceholder3 from '../assets/EventPlaceholder3.jpg'
import ListItem from './ListItem'

const Description = styled.Text`
  color: ${props => props.theme.colors.textColor};
  font-family: ${props => props.theme.fonts.native.contentFontRegular};
`

const NUM_OF_CHARS_ALLOWED = 90
const placeholderThumbnails = [EventPlaceholder1, EventPlaceholder2, EventPlaceholder3]

type Props = {
  event: EventModel
  language: string
  navigateToEvent: () => void
  formatter: DateFormatter
}

// This should stay a PureComponent for performance reasons
class EventListItem extends PureComponent<Props> {
  render(): ReactElement {
    const { formatter, language, event, navigateToEvent } = this.props
    const thumbnail = event.thumbnail || placeholderThumbnails[event.path.length % placeholderThumbnails.length]!
    return (
      <ListItem thumbnail={thumbnail} title={event.title} language={language} navigateTo={navigateToEvent}>
        <Description>{event.date.toFormattedString(formatter)}</Description>
        {event.excerpt.length > 0 && <Description>{textTruncator(event.excerpt, NUM_OF_CHARS_ALLOWED)}</Description>}
      </ListItem>
    )
  }
}

export default EventListItem
