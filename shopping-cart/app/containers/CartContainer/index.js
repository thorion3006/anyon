/*
 *
 * CartContainer
 * HOC for the cart products, server calls to add and delete products are made here
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  makeSelectCart,
  makeSelectIsEmpty,
  makeSelectNetTotal,
  makeSelectTax,
  makeSelectGrandTotal,
} from "./selectors";
import {
  fetchCart,
  addNewProducts,
  clearCart,
  updateCartProduct,
  deleteCartProduct,
} from "./actions";

import Cart from "components/Cart";

export class CartContainer extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { hover: "" };
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  static propTypes = {
    cart: PropTypes.array.isRequired,
    netTotal: PropTypes.string.isRequired,
    tax: PropTypes.object.isRequired,
    grandTotal: PropTypes.string.isRequired,
    isEmpty: PropTypes.bool.isRequired,
    fetchCart: PropTypes.func.isRequired,
    addNewProducts: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
    updateCartProduct: PropTypes.func.isRequired,
    deleteCartProduct: PropTypes.func.isRequired,
  };

  mouseEnter(event) {
    const id = event.currentTarget.id;
    this.setState({ hover: id });
  }

  mouseLeave() {
    this.setState({ hover: "" });
  }

  onClick(event) {
    const productCartId = event.target.parentNode.parentNode.id;
    this.props.deleteCartProduct(productCartId);
  }

  onChange(event) {
    const productCartId = event.target.parentNode.parentNode.id;
    const productProperty = event.target.id;
    const value = event.target.value;
    const { cart, updateCartProduct } = this.props;
    const updatedProduct = cart.find(
      cartProduct => cartProduct.id === productCartId,
    );
    if (updatedProduct[productProperty] === value) {
      return;
    }
    updatedProduct[productProperty] = value;
    updateCartProduct(updatedProduct);
  }

  componentWillMount() {
    this.props.fetchCart();
  }

  render() {
    return (
      <Cart
        {...this.props}
        mouseEnter={this.mouseEnter}
        mouseLeave={this.mouseLeave}
        onClick={this.onClick}
        onChange={this.onChange}
        hover={this.state.hover}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  cart: makeSelectCart(),
  isEmpty: makeSelectIsEmpty(),
  netTotal: makeSelectNetTotal(),
  tax: makeSelectTax(),
  grandTotal: makeSelectGrandTotal(),
});

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    addNewProducts: () => dispatch(addNewProducts()),
    clearCart: () => dispatch(clearCart()),
    updateCartProduct: cartProduct => dispatch(updateCartProduct(cartProduct)),
    deleteCartProduct: productCartId =>
      dispatch(deleteCartProduct(productCartId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
