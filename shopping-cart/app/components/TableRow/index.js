/**
 *
 * TableRow
 * Renders the cart products in a table row
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
// import styled from 'styled-components';

import StyledInput from "./StyledInput";
import StyledI from "./StyledI";

const TableRow = ({
  cartProduct,
  onClick,
  onChange,
  mouseEnter,
  mouseLeave,
  hover,
}) => {
  return (
    <tr onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} id={cartProduct.id}>
      <td>
        <select className="browser-default" id="qty" onChange={onChange}>
          <option defaultValue={cartProduct.qty}>{cartProduct.qty}</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </td>
      <td>{cartProduct.name}</td>
      <td>{cartProduct.description}</td>
      <td className="input-field">
        <StyledInput
          id="comments"
          type="text"
          placeholder="Click to add comments"
          defaultValue={cartProduct.comments}
          onBlur={onChange}
        />
      </td>
      <td>{`${cartProduct.price}\u20AC`}</td>
      <td>{`${cartProduct.tax}%`}</td>
      <td>{`${cartProduct.productTotal}\u20AC`}</td>
      <td>
        <StyledI
          className={classNames("material-icons scale-transition", {
            "scale-out": hover !== cartProduct.id,
          })}
          onClick={onClick}
        >
          delete
        </StyledI>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  cartProduct: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  mouseEnter: PropTypes.func.isRequired,
  mouseLeave: PropTypes.func.isRequired,
  hover: PropTypes.string.isRequired,
};

export default TableRow;
