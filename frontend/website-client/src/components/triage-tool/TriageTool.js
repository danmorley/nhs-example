import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TriageTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPanel: 0,
      answers: []
    }
  }

  render() {
    let { config } = this.props;

    return (
      <div>
        {this.state.currentPanel === 0 &&
          <Assess config={config.assessment.questions} />
        }
        {this.state.currentPanel === 1 &&
          <GetContext config={config.getContext.questions} />
        }
        {this.state.currentPanel === 2 &&
          <QuittingPlan config={config} dependencyLevel={} context={} />
        }
      </div>
    );
  }
}

TriageTool.propTypes = {
  config: PropTypes.object.isRequired,
  id: PropTypes.string
};

export default TriageTool;
