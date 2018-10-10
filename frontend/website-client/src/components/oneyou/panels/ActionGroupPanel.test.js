import React from 'react';
import ReactDOM from 'react-dom';
import ActionGroupPanel from './ActionGroupPanel';
import { shallow } from 'enzyme';

function setExpandedFunction() {
  console.log('setting expanded group')
}

describe('ActionGroupPanel', () => {
  let content = {
    title: 'Test Action Group',
    actions: [
      {
        value: {
          title: 'Test Action Group',
          action_code: 'test_code'
        }
      }
    ]
  };

  let classNamePrefix = 'action-group-panel';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ActionGroupPanel content={content} classNamePrefix={classNamePrefix}/>, div)
  });

  it('changes expanded state to true when the expand function is called', () => {
    const div = document.createElement('div');
    let component = ReactDOM.render(<ActionGroupPanel content={content} classNamePrefix={classNamePrefix}
      setExpandedGroup={setExpandedFunction} />, div);
    expect(component.state.expanded).toBeFalsy();
    component.expand();
    expect(component.state.expanded).toBeTruthy();
  });

  it('changes expanded state to false when the collapse function is called', () => {
    const div = document.createElement('div');
    let component = ReactDOM.render(<ActionGroupPanel content={content} classNamePrefix={classNamePrefix}
      setExpandedGroup={setExpandedFunction} />, div);
    component.expand();
    expect(component.state.expanded).toBeTruthy();
    component.collapse();
    expect(component.state.expanded).toBeFalsy();
  });

  it('expanded state is alternated when the toggle function is triggered', () => {
    const div = document.createElement('div');
    let component = ReactDOM.render(<ActionGroupPanel content={content} classNamePrefix={classNamePrefix}
      setExpandedGroup={setExpandedFunction} />, div);
    expect(component.state.expanded).toBeFalsy();
    component.toggle();
    expect(component.state.expanded).toBeTruthy();
    component.toggle();
    expect(component.state.expanded).toBeFalsy();
  });
})
