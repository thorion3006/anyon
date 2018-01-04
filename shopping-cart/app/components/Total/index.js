/**
 *
 * Total
 * Renders the total amount for the cart in a div
 */

import React from "react";
import PropTypes from "prop-types";
// import styled from 'styled-components';

import Divider from "./Divider";
import Card from "./Card";

const Total = ({ netTotal, tax, grandTotal }) => {
  const subTax = [];
  for (const productTax in tax) {
    if (productTax !== "totalTax") {
      subTax.push(
        <div key={productTax}>
          <span className="grey-text accent-2">
            &nbsp;
            <i className="tiny material-icons">subdirectory_arrow_right</i>
            {`${productTax}%`}
            <span className="right">{`${tax[productTax]}\u20AC`}</span>
          </span>
        </div>,
      );
    }
  }
  return (
    <Card>
      <strong>
        Net Total
        <span className="right">{`${netTotal}\u20AC`}</span>
      </strong>
      <Divider />
      <strong>
        Tax <span className="right">{`${tax.totalTax}\u20AC`}</span>
      </strong>
      {subTax}
      <Divider />
      <strong>
        <span className="blue-text accent-2">
          Grand Total <span className="right">{`${grandTotal}\u20AC`}</span>
        </span>
      </strong>
    </Card>
  );
};

Total.propTypes = {
  netTotal: PropTypes.string.isRequired,
  tax: PropTypes.object.isRequired,
  grandTotal: PropTypes.string.isRequired,
};

export default Total;
