import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {array, bool, func} from 'prop-types';
import { connect } from "react-redux"
import * as actions from "../../action";
import {countryCodes, conutryNameToCode} from '../../helper/countrycodemapping.js';
import '../../App.css';

const getUniqueEvents = (events = []) => {
  const eventsMap = {};

  return events.reduce((result, item) => {
    const eventName = item.name;

    if(!eventsMap[eventName]) {
      eventsMap[eventName] = true;
      result.push(item);
    }

    return result;
  }, []);
};

class EventsList extends Component {

  getCountryCode () {
    return conutryNameToCode[this.props.match.params.countryName];
  }

  componentDidMount() {
    this.props.fetchListOfEvent(this.getCountryCode());
  }

  showWeek = () => {
    this.props.events.map(event => {
      if(event.dates.start.localDate) {
        console.log('data',Date())
      }
    })
  }

  showMouth = () => {
    console.log('showMouth')

  }

  showAll = () => {
    console.log('showAll')

  }

  render() {
    const {events, inProgress} = this.props;
    const countryCode = this.getCountryCode();
    const countryName = countryCodes[countryCode];

    if (inProgress) {
        return <div>Loading...</div>
    }

    // const {countryName} = match.params;
    return (
      <div className='container'>
        <h1>Events {countryName ? `in ${countryName}` : 'everywhere'}</h1>
        {!events.length ? 'No events found' :  <div>
        <div>
            <button onClick={this.showWeek}>This week</button>
            <button onClick={this.showMouth}>This month</button>
            <button onClick={this.showAll}>All</button>
        </div>
        <ul className="c-list">
           {events.map(item => {
               return (
                   <li className="c-list__item" key={item.id}>
                           <div className="c-list__block">
                               <div className='c-list__image__container'>
                                  <img alt={item.name} className="c-list__image" src={item.images[0].url}/>
                              </div>
                            <div className='c-list__description'>
                              <h4 className="c-list__title">{item.name}</h4>
                              <p>Date: {item.dates.start.localDate}</p>
                              <p>Time: {item.dates.start.localTime}</p>
                              <p>Place: {item._embedded.venues[0].name} {item._embedded.venues[0].address.line1}, {item._embedded.venues[0].city.name}</p>
                            </div>
                              <div className='c-list__button'>
                                <button className='c-list__button__buy__ticket'><a target="_blank" href={item.url}>Buy ticket</a></button>
                                <Link to={`/events/${item.id}`}>
                                  <button className='c-list__button__see__more'>See more</button>
                                </Link>
                             </div>
                           </div>
                   </li>
               )
           })}
        </ul>
      </div> }
      </div>
    );
  }
}

EventsList.propTypes = {
  events: array,
  inProgress: bool,
  fetchListOfEvent: func.isRequired
};

const mapStateToProps = (state) => ({
  events: getUniqueEvents(state.fetchListOfEvent.items),
  inProgress: state.fetchListOfEvent.inProgress
});

export default connect(mapStateToProps, actions)(EventsList);
