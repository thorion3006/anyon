/**
 *
 * ErrorBoundary
 * HOC to catch errors gracefully
 *
 */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Ohh...Something went wrong. Please try again.</h1>;
    }
    return this.props.children;
  }
}
