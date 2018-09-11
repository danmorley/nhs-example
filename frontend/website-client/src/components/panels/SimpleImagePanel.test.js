import React from 'react';
import ReactDOM from 'react-dom';
import SimpleImagePanel from './SimpleImagePanel';
import Image from '../Image';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';

describe('SimpleImagePanel', () => {
  let content_without_link = {
    image: {
      title: 'Image name',
      link: 'https://blob store url'
    },
    image_cta: {}
  };

  let content_with_external_link = {
    image: {
      title: 'Image name',
      link: 'https://blob store url'
    },
    image_cta: {
      link_text: 'Find out more',
      link_external: 'http://www.somewebsite.co.uk'
    }
  };   

  let content_with_internal_link = {
    image: {
      title: 'Image name',
      link: 'https://blob store url'
    },
    image_cta: {
      link_text: 'Find out more',
      link_page: {
        relative_path: 'internal/page'
      }
    }
  };   

  let classNamePrefix = 'test';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SimpleImagePanel content={content_without_link} classNamePrefix={classNamePrefix} />, div)
  });

  it('renders an <Image /> component', () => {
    const wrapper = shallow(<SimpleImagePanel content={content_without_link} classNamePrefix={classNamePrefix}/>);
    expect(wrapper.find(Image).exists()).toEqual(true);
    expect(wrapper.find(Link).exists()).toEqual(false);
  });

  it('renders an <a /> component when an external image_cta is given', () => {
    const wrapper = shallow(<SimpleImagePanel content={content_with_external_link} classNamePrefix={classNamePrefix}/>);
    expect(wrapper.find(Image).exists()).toEqual(true);
    expect(wrapper.find('a').exists()).toEqual(true);
  });

  it('renders a <Link /> component when an internal image_cta is given', () => {
    const wrapper = shallow(<SimpleImagePanel content={content_with_internal_link} classNamePrefix={classNamePrefix}/>);
    expect(wrapper.find(Image).exists()).toEqual(true);
    expect(wrapper.find(Link).exists()).toEqual(true);
  });
})
