import React from 'react';

function withOwnContent(WrappedComponent, ownContent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        content: ownContent
      };
    }

    render() {
      return <WrappedComponent page={this.state.content} {...this.props} />;
    }
  };
}

export default withOwnContent;
