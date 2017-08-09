import React, {Component} from 'react';
import {connect} from 'react-redux';
import {object, array, any} from 'prop-types';

class ViewEvent extends Component {

  render() {
    const {events, match} = this.props;
    const defaultResponse = <p>Loading...</p>
    if (!match.params || !match.params.eventId || !events) {
      return defaultResponse;
    }

    const event = events && events.find((event) => event.id === match.params.eventId);

    if (!event) return defaultResponse;

    return (
      <div>
        <h2>View Event</h2>
        This is an event view for <strong>{event.name}</strong>!!!
      </div>
    );
  }
}

ViewEvent.propTypes = {
  events: any,
  match: object.isRequired
}

const mapStateToProps = (state) => ({
  events: state.fetchListOfEvent.items
});

export {ViewEvent};

export default connect(mapStateToProps)(ViewEvent);
