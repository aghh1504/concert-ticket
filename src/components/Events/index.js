import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import '../../App.css';
import ViewEvent from './ViewEvent';
import EventsList from './EventsList';
import BasketOverview from '../BasketOverview';


class Events extends Component {

  render() {
    return (
      <div>
        <Route exact={true} path='/' component={EventsList}/>
        <Route exact={true} path='/events/basket' component={BasketOverview}/>
        <Route exact={true} path="/events/country/:countryName" component={EventsList}/>
        <Route exact={true} path='/events/:eventId' component={ViewEvent}/>
      </div>
    );
  }
}

export default Events;
