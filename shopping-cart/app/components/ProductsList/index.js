/**
 *
 * Products
 * Renders a product collection and calls Product for individual product render.
 */

import React from "react";
import PropTypes from "prop-types";
// import styled from 'styled-components';

import Product from "../Product";
import StyledH1 from "../StyledH1";
import StyledButton from "../StyledButton";

const ProductsList = ({ products, qty, goToCart, onChange, onClick }) => {
  const Fragment = React.Fragment;
  return (
    <Fragment>
      <div className="row">
        <StyledH1 className="col s3">Products</StyledH1>
        <StyledButton
          className="waves-effect waves-light btn indigo accent-2 col s2 offset-s3"
          onClick={goToCart}
        >
          <i className="material-icons">shopping_cart</i>
          Cart
        </StyledButton>
      </div>
      <ErrorBoundary>
        <ul className="collection">
          {products.map(product => (
            <Product
              key={product.id}
              product={product}
              qty={qty[product.id]}
              onChange={onChange}
              onClick={onClick}
            />
          ))}
        </ul>
      </ErrorBoundary>
    </Fragment>
  );
};

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  qty: PropTypes.object.isRequired,
  goToCart: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ProductsList;
