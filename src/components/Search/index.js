import React, {Component} from 'react'
import * as actions from "../../action";
import {connect} from 'react-redux';
import countryCodeHelper from '../../helper/countrycodemapping';

class Search extends Component {

  state = {
    inputValue: ''
  };
  findCityTimeoutId = null;

  convertFromCountryCodeToName = (name) => {
           for(var key in countryCodeHelper){
              if (countryCodeHelper[key].toLowerCase() === name.toLowerCase()) return key;
      }
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
  console.log('this.state: ', this.state);
    const cityName = this.convertFromCountryCodeToName(this.state.inputValue);

    this.props.fetchListOfEvent(cityName);
  }

  handleInputChange = (e) => {
    this.setState({...this.state, inputValue: e.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmitForm}>
        <input value={this.state.inputValue} onChange={this.handleInputChange}/>
        <button type='submit'>Search</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  events: state.fetchListOfEvent.items
});

export default connect(mapStateToProps, actions)(Search)
