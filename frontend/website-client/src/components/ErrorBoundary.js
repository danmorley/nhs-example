import React, { Component } from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Render hidden message to show that a shelf could not display.
      return <div class="hidden-warning">Unable to render shelf</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
