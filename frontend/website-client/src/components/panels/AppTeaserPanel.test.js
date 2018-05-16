import React from 'react';
import ReactDOM from 'react-dom';
import AppTeaserPanel from './AppTeaserPanel';
import { shallow } from 'enzyme';

describe('AppTeaserPanel', () => {
  let content = {
    image: 'test',
  };

  let content_update = {
    image: 'update',
  };

  let classNamePrefix = 'test'

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppTeaserPanel content={content} classNamePrefix={classNamePrefix}/>, div)
  });

  it('unmounts without crashing', () => {
    const wrapper = shallow(<AppTeaserPanel content={content} classNamePrefix={classNamePrefix}/>);
    expect(wrapper.exists()).toBe(true);
    wrapper.unmount();
  });

  it('it can receive new props without crashing', () => {
    const wrapper = shallow(<AppTeaserPanel content={content} classNamePrefix={classNamePrefix}/>);
    expect(wrapper.exists()).toBe(true);
    wrapper.setProps({ content_update });
  });
})
