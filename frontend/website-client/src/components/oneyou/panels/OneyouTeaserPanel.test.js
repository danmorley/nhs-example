import React from 'react';
import ReactDOM from 'react-dom';
import OneyouTeaserPanel from './OneyouTeaserPanel';
import { shallow } from 'enzyme';

describe('OneyouTeaserPanel', () => {
  const cta = [{link_external: 'https://dummyurl.com'}];

  let content = {
    image: 'test',
  }

  let content_update = {
    image: 'update',
  };

  let classNamePrefix = 'test';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<OneyouTeaserPanel content={content} classNamePrefix={classNamePrefix} />, div)
  });

  it('renders without crashing with a CTA', () => {
    const div = document.createElement('div');
    content.cta = cta;
    ReactDOM.render(<OneyouTeaserPanel content={content} classNamePrefix={classNamePrefix} />, div)
  });

  it('unmounts without crashing', () => {
    const wrapper = shallow(<OneyouTeaserPanel content={content} classNamePrefix={classNamePrefix} />);
    expect(wrapper.exists()).toBe(true);
    wrapper.unmount();
  });

  it('it can receive new props without crashing', () => {
    const wrapper = shallow(<OneyouTeaserPanel content={content} classNamePrefix={classNamePrefix} />);
    expect(wrapper.exists()).toBe(true);
    wrapper.setProps({ content_update });
  });
})
