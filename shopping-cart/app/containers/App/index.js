/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { makeSelectLoadingStatus } from "./selectors";

import LoadingIndicator from "components/LoadingIndicator";

class App extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: PropTypes.node,
    loading: PropTypes.number.isRequired
  };

  render() {
    const loadingBar = this.props.loading ? <LoadingIndicator /> : null;

    return (
      <div className="container">
        {loadingBar}
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoadingStatus()
});

export default connect(mapStateToProps)(App);
