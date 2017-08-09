import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Events from '../../components/Events';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Search from '../../components/Search';
import Basket from '../../components/Basket';
import EventsList from '../../components/Events/EventsList';

class App extends Component {
  render () {
    return (
      <div id='main-container'>
        <Route component={Basket} />
        <Route component={Header}/>
        <Route component={Events} />
        <Footer />
      </div>
    );
  }
}

export {App};

export default connect()(App);
