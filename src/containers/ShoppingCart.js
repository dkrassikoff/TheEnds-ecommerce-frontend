import React, { Component } from 'react';
import CardCheckout from '../components/StripeCheckout';

class ShoppingCart extends Component {
  render() {
    return (
      <div>
        This is the shopping cart.
        <CardCheckout />
      </div>
    );
  }
}

export default ShoppingCart;
