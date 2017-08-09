import React, {Component} from 'react'
import { connect } from "react-redux";
import * as actions from "../../action";

class Basket extends Component {

  render() {
    return (
        <div className='basket'>
          items: {this.props.items}
        </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.addToWishlist.items,
});

export default connect(mapStateToProps, actions)(Basket);
