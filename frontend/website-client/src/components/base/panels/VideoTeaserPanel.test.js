import React from 'react';
import ReactDOM from 'react-dom';
import VideoTeaserPanel from './VideoTeaserPanel';
import { shallow } from 'enzyme';

describe('VideoTeaserPanel', () => {
  let content = {
    image: 'test'
  };

  let content_update = {
    image: 'update'
  };

  let classNamePrefix = 'test';

  beforeEach(function(){
    spyOn(console, 'error');
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VideoTeaserPanel content={content} classNamePrefix={classNamePrefix}/>, div);
    expect(console.error).toHaveBeenCalled();
  });

  it('unmounts without crashing', () => {
    const wrapper = shallow(<VideoTeaserPanel content={content} classNamePrefix={classNamePrefix}/>);
    expect(wrapper.exists()).toBe(true);
    wrapper.unmount();
  });

  it('it can receive new props without crashing', () => {
    const wrapper = shallow(<VideoTeaserPanel content={content} classNamePrefix={classNamePrefix}/>);
    expect(wrapper.exists()).toBe(true);
    wrapper.setProps({ content_update });
  });
})
