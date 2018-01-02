/**
 *
 * Cart
 *
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
// import styled from 'styled-components';

import StyledH1 from "../StyledH1";
import StyledButton from "../StyledButton";
import Table from "../Table";
import Total from "../Total";

const Cart = ({
  isEmpty,
  netTotal,
  tax,
  grandTotal,
  cart,
  addNewProducts,
  clearCart,
  mouseEnter,
  mouseLeave,
  onClick,
  onChange,
  hover
}) => {
  const heading = [
    "#",
    "Name",
    "Description",
    "comments",
    "Price",
    "Tax",
    "Total Item",
    ""
  ];
  const tableProps = {
    heading,
    cart,
    mouseEnter,
    mouseLeave,
    onClick,
    onChange,
    hover
  };
  const totalProps = { netTotal, tax, grandTotal };
  const showCart = isEmpty ? (
    <div className="col s12 card-panel">
      <h5>Your cart is empty.</h5>
    </div>
  ) : (
    <div>
      <Table {...tableProps} />
      <Total {...totalProps} />
    </div>
  );
  return (
    <div className="row">
      <StyledH1 className="col s3">Your cart</StyledH1>
      <StyledButton
        clear
        className="waves-effect waves-light btn red lighten-1 col s2"
        type="button"
        onClick={clearCart}
      >
        <i className="material-icons">remove_shopping_cart</i>
        clear cart
      </StyledButton>
      <StyledButton
        className={classNames(
          "waves-effect waves-light btn indigo accent-2 col s3",
          { pulse: isEmpty }
        )}
        type="button"
        onClick={addNewProducts}
      >
        <i className="material-icons">add</i>
        add new product
      </StyledButton>
      {showCart}
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  netTotal: PropTypes.string.isRequired,
  tax: PropTypes.object.isRequired,
  grandTotal: PropTypes.string.isRequired,
  isEmpty: PropTypes.bool.isRequired,
  addNewProducts: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  mouseEnter: PropTypes.func.isRequired,
  mouseLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  hover: PropTypes.string.isRequired
};

export default Cart;
