/*
 *
 * ProductsContainer
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { makeSelectProducts, makeSelectQty } from "./selectors";
import { fetchProducts, addToCart, goToCart } from "./actions";

import ProductsList from "components/ProductsList";

export class ProductsContainer extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = { qty: this.props.qty };
  }

  static propTypes = {
    fetchProducts: PropTypes.func.isRequired,
    goToCart: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    qty: PropTypes.object.isRequired
  };

  onChange(e) {
    const qty = this.state.qty;
    qty[e.target.parentNode.id] = e.target.value;
    this.setState({ qty });
  }

  onClick(e) {
    const id = e.target.parentNode.id;
    const product = this.props.products.find(product => product.id === id);
    const updatedProduct = Object.assign({}, product);
    delete updatedProduct.id;
    updatedProduct.productId = id;
    updatedProduct.qty = this.state.qty[id];
    if (updatedProduct.qty > 0) {
      this.props.addToCart(updatedProduct);
    }
  }

  componentWillMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <ProductsList
        {...this.props}
        qty={this.state.qty}
        onChange={this.onChange}
        onClick={this.onClick}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  products: makeSelectProducts(),
  qty: makeSelectQty()
});

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    addToCart: product => dispatch(addToCart(product)),
    goToCart: () => dispatch(goToCart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
