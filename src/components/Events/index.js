import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import * as actions from "../../action";
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
//import styles from './styles.scss';
import '../../App.css';
import ViewEvent from './ViewEvent';
import EventsList from './EventsList';


class Events extends Component {

  componentDidMount() {
    this.props.fetchListOfEvent()
  }

  render() {
    return (
      <div>
        <Route exact={true} path='/' component={EventsList} />
        <Route path='/events/:eventId' component={ViewEvent} />
      </div>
    );
  }
}

export default connect(null, actions)(Events);
