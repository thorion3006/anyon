/**
 *
 * Table
 *
 */

import React from "react";
import PropTypes from "prop-types";
// import styled from 'styled-components';

import TableRow from "../TableRow";

const Table = ({
  heading,
  cart,
  onClick,
  onChange,
  mouseEnter,
  mouseLeave,
  hover
}) => (
  <table className="responsive-table white bordered highlight centered">
    <thead className="indigo darken-4 white-text">
      <tr>{heading.map(heading => <th key={heading}>{heading}</th>)}</tr>
    </thead>

    <tbody className="blue-grey-text lighten-2">
      {cart.map(cartProduct => (
        <TableRow
          key={cartProduct ? cartProduct.id : ""}
          cartProduct={cartProduct}
          onClick={onClick}
          onChange={onChange}
          mouseEnter={mouseEnter}
          mouseLeave={mouseLeave}
          hover={hover}
        />
      ))}
    </tbody>
  </table>
);

Table.propTypes = {
  heading: PropTypes.arrayOf(PropTypes.string).isRequired,
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  mouseEnter: PropTypes.func.isRequired,
  mouseLeave: PropTypes.func.isRequired,
  hover: PropTypes.string.isRequired
};

export default Table;
