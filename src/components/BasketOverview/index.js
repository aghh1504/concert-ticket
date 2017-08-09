import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {array} from 'prop-types'
import EventsList from '../Events/EventsList'


class BasketOverview extends Component {
  render() {
    const {events} = this.props;

    console.log('events in basketoverview',events)
    return (
      <Route render={(props) => <EventsList readyEvents={events || []} {...props} />}/>
    )
  }
}

BasketOverview.propTypes = {
  events: array
};

export default connect((state) => ({
  events: state.addToWishlist.items
}))(BasketOverview);
