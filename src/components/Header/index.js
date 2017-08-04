import React, {Component} from 'react'
import * as actions from "../../action";
import {connect} from 'react-redux';
import countryCodeHelper from '../../helper/countrycodemapping';

class Header extends Component {
  state = {
    inputValue: ''
  };
  findCityTimeoutId = null;

  convertFromCountryCodeToName = (name) => {
    for (var key in countryCodeHelper) {
      if (countryCodeHelper[key].toLowerCase() === name.toLowerCase()) 
        return key;
      }
    }

  handleSubmitForm = (e) => {
    e.preventDefault();
    console.log('this.state: ', this.state);
    const cityName = this.convertFromCountryCodeToName(this.state.inputValue);

    this
      .props
      .fetchListOfEvent(cityName);
  }

  handleInputChange = (e) => {
    this.setState({
      ...this.state,
      inputValue: e.target.value
    });
  }

  render() {
    return (
      <header>
        <div className='container'>
          {/*<section id='header-search'>*/}
            <form onSubmit={this.handleSubmitForm}>
              <input
                id='country-search'
                type='textbox'
                placeholder='Enter country...'
                value={this.state.inputValue}
                onChange={this.handleInputChange}></input>
              <button id='search-button' type='Sumbit'>
                Search</button>
            </form>
          {/*</section>*/}
          <section id='fav-links'></section>
        </div>
      </header>
    )
  }
}
const mapStateToProps = (state) => ({
  events: state.fetchListOfEvent.items
});

export default connect(mapStateToProps, actions)(Header)
