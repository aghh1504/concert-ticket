import React, {Component} from 'react'
import * as actions from "../../action";
import {connect} from 'react-redux'

class Search extends Component {

  state = {
    inputValue: ''
  };
  findCityTimeoutId = null;

  handleSubmitForm = (e) => {
    e.preventDefault()
    this.props.fetchListOfEvent(this.state.inputValue);
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

export default connect(null, actions)(Search)
