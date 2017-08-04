import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Events from '../../components/Events';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Search from '../../components/Search';
import EventsList from '../../components/Events/EventsList';

class App extends Component {
  render () {
    return (
      <div id='main-container'>
        <Header />
        <Route component={Search} />
        <Route component={Events} />
        {/*<Footer />*/}
      </div>
    );
  }
}

export {App};

export default connect()(App);
