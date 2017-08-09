import React, { Component } from "react";
import { connect } from "react-redux";
import {object} from 'prop-types';
import * as actions from "../../action";
import {countryCodes, conutryNameToCode} from "../../helper/countrycodemapping";

class Search extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedItemIndex: null,
      inputValue: "",
      errorMessage: "",
      finalCountries: this.filterCountries(''),
      showList: false
    };

    this.input = null;
  }


  convertFromCountryCodeToName = name => {
    return conutryNameToCode[name];
  };

  filterCountries = (search) => {
    const regexp = new RegExp(search, 'i');

    return Object.values(countryCodes)
      .filter((countryName) => search ? regexp.test(countryName) : true);
  }

  handleSubmitForm = countryName => {
    const searchName = countryName.toLowerCase();
    const countryCode = conutryNameToCode[searchName];

     if (countryCode) {
        const {history, fetchListOfEvent} = this.props;
        const contryName = countryCodes[countryCode];

        fetchListOfEvent(countryCode);
        this.setState({
          errorMessage: '',
          inputValue: '',
          showList: false
        });
        this.resetInput();
        history.push({pathname: `/events/country/${contryName.toLowerCase()}`})
    } else {
        this.setState({errorMessage: 'Sorry, we dont have any events in that country'})
    }
  }

  resetInput () {
    this.input && this.input.blur();
    this.setState({
      selectedItemIndex: null,
      inputValue: '',
      filterCountries: this.filterCountries()
    });
  }

  handleInputChange = e => {
    const inputValue = e.target.value;

    this.setState({
      inputValue,
      finalCountries: this.filterCountries(inputValue)
    });
  };

  onhandleKeypress = (event) => {
    const {selectedItemIndex, finalCountries} = this.state;

    if(event.key === 'Enter') {
      event.preventDefault();
      if (Number.isFinite(selectedItemIndex)) {
        this.handleSubmitForm(finalCountries[selectedItemIndex]);
      } else {
        this.handleSubmitForm(this.state.inputValue);
      }
    }
  }

  onhandleKeyDown = (event) => {
    const {selectedItemIndex} = this.state;
    const {finalCountries} = this.state;

    if(event.key === 'ArrowDown') {
      event.preventDefault();
      this.setState({
        selectedItemIndex: Math.min(selectedItemIndex === null ? 0 : selectedItemIndex + 1, finalCountries.length - 1)
      });
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.setState({
        selectedItemIndex: Math.max(selectedItemIndex === null ? 0 : selectedItemIndex - 1, 0)
      });
    }
  }


  render() {
    const {finalCountries, showList} = this.state;

    return (
      <div className='container'>

      <div className='input-dropdown'>
        <input
          ref={(input) => this.input = input}
          autoComplete='off'
          id='country-search'
          value={this.state.inputValue}
          placeholder='Enter country...'
          onChange={this.handleInputChange}
          onKeyPress={this.onhandleKeypress}
          onKeyDown={this.onhandleKeyDown}
          onFocus={() => this.setState({...this.state, showList: true})}
          onBlur={() => setTimeout(() => this.setState({...this.state, showList: false}), 200)}
        />
        <button id='search-button'>Search</button>
        {showList && <div className='dropdown'>
          {finalCountries.map((countryName, index) =>
              <div
                key={countryName}
                className={'country-item' + (index === this.state.selectedItemIndex && ' selected')}
                onClick={() => this.handleSubmitForm(countryName)}>{countryName}</div>)
          }
        </div>}
      </div>
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
