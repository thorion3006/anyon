/**
 *
 * LoadingIndicator
 * Displays a loading bar when ajax calls are made
 */

import React from "react";
import Wrapper from "./Wrapper";
// import styled from 'styled-components';

const LoadingIndicator = () => (
  <Wrapper className="progress red lighten-5">
    <div className="indeterminate red darken-2" />
  </Wrapper>
);

export default LoadingIndicator;
