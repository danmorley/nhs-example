import React from 'react';

function withOwnContent(WrappedComponent, ownContent) {
  class WithOwnContent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        content: ownContent
      };
    }

    render() {
      return <WrappedComponent page={this.state.content} {...this.props} />;
    }
  }
  WithOwnContent.displayName = `WithOwnContent(${getDisplayName(WrappedComponent)})`;
  return WithOwnContent;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withOwnContent;
