import React, {Component} from "react";
import {array, bool, func} from "prop-types";
import {connect} from "react-redux";
import moment from "moment";
import actions from "../../action";
import {countryCodes, conutryNameToCode} from "../../helper/countrycodemapping.js";
import Event from "./Event";
import "../../App.css";

const getUniqueEvents = (events = []) => {
  const eventsMap = {};

  return events.reduce((result, item) => {
    const eventName = item.name;

    if (!eventsMap[eventName]) {
      eventsMap[eventName] = true;
      result.push(item);
    }

    return result;
  }, []);
};

class EventsList extends Component {
  state = {
    filteredEvents: [],
    error: ""
  };

  getCountryCode() {
    return conutryNameToCode[this.props.match.params.countryName];
  }

  componentDidMount() {
    if (!this.props.readyEvents) {
      this.props.fetchListOfEvent(this.getCountryCode());
    }
  }

  showWeek = () => {
    this.showFilteredEvents('week')
  };

  showMonth = () => {
    this.showFilteredEvents('month')
  }

  showAll = () => {
    this.showFilteredEvents('all')
  };

  showFilteredEvents = (period = 'all') => {
    if (period === 'all') {
      this.setState({
        filteredEvents: this.props.events,
        error: this.props.events.length > 0 ? '' : 'There are no events'
      });
    } else {
      const filteredEvents = this.props.events.filter((event) => {
        const eventDate = new Date(event.dates.start.localDate);
        const month = eventDate.getMonth();
        const dateNow = new Date(Date());
        const monthNow = dateNow.getMonth();

        const weekEvent = moment(event.dates.start.localDate).weeks();
        const weekNow = moment(Date()).weeks();

        if (period === 'month' && month === monthNow) {
          return event;
        }
        if (period === 'week' && weekEvent === weekNow) {
          return event
        }
      });
      this.setState({
        filteredEvents: filteredEvents,
        error: filteredEvents.length > 0 ? '' : `There are no ${period} events`
      });
    }
  };

  render() {
    const {events, inProgress, removeFromWishlist, addToWishlist} = this.props;
    const {error, filteredEvents} = this.state;
    const countryCode = this.getCountryCode();
    const countryName = countryCodes[countryCode];

    const showEvents = filteredEvents.length > 0 ? filteredEvents : events;

    if (inProgress) {
      return <div>Loading...</div>;
    }
    return (
      <div className="container">
        <h1>
          Events {countryName ? `in ${countryName}` : "everywhere"}
        </h1>
        <div>
          <div>
            <button onClick={this.showWeek}>This week</button>
            <button onClick={this.showMonth}>This month</button>
            <button onClick={this.showAll}>All</button>
          </div>
          {error && <p>
            {error}
          </p>}

          {!error && <ul className="c-list">
            {showEvents &&
            showEvents.map(item => <Event
              key={item.id}
              item={item}
              isInWishlist={Boolean(this.props.wishListEventsMap[item.id])}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}/>)}
          </ul>}
        </div>
      </div>
    );
  }
}

EventsList.propTypes = {
  readyEvents: array,
  events: array,
  wishListEventsMap: array,
  inProgress: bool,
  fetchListOfEvent: func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  wishListEventsMap: state.addToWishlist.items.reduce((result, item) => (result[item.id] = item, result), {}),
  events: ownProps.readyEvents || getUniqueEvents(state.fetchListOfEvent.items),
  inProgress: state.fetchListOfEvent.inProgress,
  error: state.fetchListOfEvent.error
});

export default connect(mapStateToProps, actions)(EventsList);
