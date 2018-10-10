import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.log('Shelf render error', error, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Render hidden message to show that a shelf could not display.
      return <div className="shelf-section hidden">Unable to render shelf</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
