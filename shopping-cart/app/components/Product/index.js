/**
 *
 * Product
 *
 */

import React from "react";
import PropTypes from "prop-types";
// import styled from 'styled-components';

const Product = ({ product, qty, onClick, onChange }) => {
  return (
    <li className="collection-item">
      <h4>{product.name}</h4>
      <p>
        <strong>Description:</strong>&nbsp; {product.description}
      </p>
      <p>
        <strong>Price:</strong>&nbsp;&nbsp;&nbsp; {`${product.price}\u20AC`}
      </p>
      <p>
        <strong>Tax:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {`${product.tax}%`}
      </p>
      <form className="row" id={product.id}>
        <select className="browser-default col s1" onChange={onChange}>
          <option defaultValue={qty}>{qty ? qty : "Qty"}</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button
          className="waves-effect waves-light btn blue lighten-1 col s2 offset-s1"
          type="button"
          id={product.id}
          onClick={onClick}
        >
          <i className="material-icons">add_shopping_cart</i>
          Add to cart
        </button>
      </form>
    </li>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  qty: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Product;
