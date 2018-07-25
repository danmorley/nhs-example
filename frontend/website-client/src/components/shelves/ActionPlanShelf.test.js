import React from 'react';
import ReactDOM from 'react-dom';
import ActionPlanShelf from './ActionPlanShelf';
import { shallow } from 'enzyme';

describe('ActionPlanShelf', () => {
  let content = {
    cta: [],
    action_groups: [
      {
        value: {
          title: 'Test Action Group',
          actions: [
            {
              value: {
                title: 'Test Action Group',
                action_code: 'test_code'
              }
            }
          ]
        }
      }
    ]
  };

  let classNamePrefix = 'action-plan-shelf';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ActionPlanShelf content={content} classNamePrefix={classNamePrefix}/>, div);
  });
})
