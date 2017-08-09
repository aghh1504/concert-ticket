import React, {Component} from 'react'
import { connect } from "react-redux";
import * as actions from "../../action";
import {object} from 'prop-types';
import {Link} from 'react-router-dom';

class Basket extends Component {

  render() {
    const {successMessage, errorMessage} = this.props;
    console.log("items", this.props.amount);
    console.log('state in basket', this.props.items);

    return (
      <div>
        <Link className='basket' to='/events/basket'>
          items: {this.props.items.length || 0}
        </Link>
        {successMessage && <div>{successMessage}</div>}
        {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
      </div>
    )
  }
}

Basket.propTypes = {
  history: object.isRequired
};

const mapStateToProps = state => ({
  items: state.addToWishlist.items || {},
  successMessage: state.addToWishlist.successMessage,
  errorMessage: state.addToWishlist.errorMessage
});

export default connect(mapStateToProps, actions)(Basket);
