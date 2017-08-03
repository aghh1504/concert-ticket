import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Events from '../../components/Events';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Search from '../../components/Search';

class App extends Component {
  render () {
    const {events} = this.props;

    return (
      <div>
        <Header />
        <Search />
        <Route component={Events} />
        <Footer />
      </div>
    );
  }
}

export {App};

export default connect()(App);
