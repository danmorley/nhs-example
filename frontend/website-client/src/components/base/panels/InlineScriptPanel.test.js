import React from 'react';
import ReactDOM from 'react-dom';
import InlineScriptPanel from './InlineScriptPanel';
import Panel from './Panel';
import { shallow, mount } from 'enzyme';

describe('InlineScriptPanel', () => {
  let content = {
    script_id: 'myScriptPanel',
    script: 'alert("test");'
  };

  let contentWithPlaceHolder = {
    script_id: 'myScriptPanel',
    script: 'alert("test");',
    placeholder_id: 'myPlaceHolder'
  };

  let classNamePrefix = 'test';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<InlineScriptPanel content={content} classNamePrefix={classNamePrefix} />, div)
  });

  it('renders a <Panel /> component', () => {
    const wrapper = shallow(<InlineScriptPanel content={content} classNamePrefix={classNamePrefix}/>);
    expect(wrapper.find(Panel).exists()).toEqual(true);
  });

  it('renders a placeholder component when given a placeholder id', () => {
    const wrapper = shallow(<InlineScriptPanel content={contentWithPlaceHolder} classNamePrefix={classNamePrefix}/>);
    expect(wrapper.find('#myPlaceHolder').exists()).toEqual(true);
  });

  it('does not render a placeholder component when there is no placeholder id', () => {
    const wrapper = shallow(<InlineScriptPanel content={content} classNamePrefix={classNamePrefix}/>);
    expect(wrapper.find('#myPlaceHolder').exists()).toEqual(false);
  });
})
