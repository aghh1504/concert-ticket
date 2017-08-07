import React, { Component } from "react";
import { connect } from "react-redux";
import {object} from 'prop-types';
import * as actions from "../../action";
import {countryCodes, conutryNameToCode} from "../../helper/countrycodemapping";

class Search extends Component {
  constructor (props) {
    super(props);

    this.state = {
      inputValue: "",
      errorMessage: "",
      finalCountries: this.filterCountries(''),
      showList: false
    };
  }

  convertFromCountryCodeToName = name => {
    return conutryNameToCode[name];
  };

  filterCountries = (search) => {
    const regexp = new RegExp(search, 'i');

    return Object.values(countryCodes)
      .filter((countryName) => regexp.test(countryName));
  }

  handleSubmitForm = countryName => {
    const searchName = countryName.toLowerCase();
    const countryCode = conutryNameToCode[searchName];

     if (countryCode) {
        const {history, fetchListOfEvent} = this.props;
        const contryName = countryCodes[countryCode];

        fetchListOfEvent(countryCode);
        this.setState({errorMessage: '', inputValue: ''})
        history.push({pathname: `/events/country/${contryName.toLowerCase()}`})
    } else {
        this.setState({errorMessage: 'Sorry, we dont have any events in that country'})
    }
  };

  handleInputChange = e => {
    const inputValue = e.target.value;

    this.setState({ ...this.state,
      inputValue,
      finalCountries: this.filterCountries(inputValue)
    });
  };

  render() {
    const {finalCountries, showList} = this.state;

    return (
      <div className='container'>
      <form onSubmit={() => this.handleSubmitForm(this.state.inputValue)}>
        <input
          id='country-search'
          value={this.state.inputValue}
          placeholder='Enter country...'
          onChange={this.handleInputChange}
          onFocus={() => this.setState({...this.state, showList: true})}
          onBlur={() => setTimeout(() => this.setState({...this.state, showList: false}), 200)}
        />
        <button id='search-button' type="submit">Search</button>
        {showList && finalCountries.map((countryName) =>
            <div key={countryName} onClick={() => this.handleSubmitForm(countryName)}>{countryName}</div>)}
      </form>
     <p>{this.state.errorMessage}</p>
    </div>
    );
  }
}

Search.propTypes = {
  history: object.isRequired
};

const mapStateToProps = state => ({
  events: state.fetchListOfEvent.items
});

export default connect(mapStateToProps, actions)(Search);
