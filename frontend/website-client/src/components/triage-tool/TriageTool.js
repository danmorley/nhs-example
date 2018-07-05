import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TriageTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPanel: 0,
      answers: []
    }

    this.assessmentComplete = this.assessmentComplete.bind(this);
    this.getContextComplete = this.getContextComplete.bind(this);
  }

  assessmentComplete() {
    // Calculate dependency level from the assessment answers.
    this.setState({currentPanel: 1, dependencyLevel: 'high'});
  }

  getContextComplete() {
    // Store the user history.
    this.setState({currentPanel: 2, userHistory: []});
  }

  render() {
    let { config } = this.props;

    return (
      <div>
        {this.state.currentPanel === 0 &&
          <Assess config={config.assessment.questions} onComplete={this.assessmentComplete} />
        }
        {this.state.currentPanel === 1 &&
          <GetContext config={config.getContext.questions} onComplete={this.getContextComplete} />
        }
        {this.state.currentPanel === 2 &&
          <QuittingPlan config={config} dependencyLevel={this.state.dependencyLevel} context={this.state.userHistory} />
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
