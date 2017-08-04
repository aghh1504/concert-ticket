import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Events from '../../components/Events';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

class App extends Component {
  render () {
    //const {events} = this.props;
    console.log('this.props: ', this.props);
    return (
      <div id='main-container'>
        <Header />
        <Route component={Events} />
        {/*<Footer />*/}
      </div>
    );
  }
}

export {App};

export default connect()(App);
