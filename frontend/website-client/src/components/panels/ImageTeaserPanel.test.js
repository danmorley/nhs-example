import React from 'react';
import ReactDOM from 'react-dom';
import ImageTeaserPanel from './ImageTeaserPanel';
import { shallow } from 'enzyme';

describe('ImageTeaserPanel', () => {
  let content = {
    image: 'test',
  };

  let content_update = {
    image: 'update',
  };

  let classNamePrefix = 'test';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ImageTeaserPanel content={content} classNamePrefix={classNamePrefix} />, div)
  });

  it('unmounts without crashing', () => {
    const wrapper = shallow(<ImageTeaserPanel content={content} classNamePrefix={classNamePrefix} />);
    expect(wrapper.exists()).toBe(true);
    wrapper.unmount();
  });

  it('it can receive new props without crashing', () => {
    const wrapper = shallow(<ImageTeaserPanel content={content} classNamePrefix={classNamePrefix} />);
    expect(wrapper.exists()).toBe(true);
    wrapper.setProps({ content_update });
  });
})
