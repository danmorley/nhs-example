// import React from 'react';
// import ReactDOM from 'react-dom';
// import BasicCtaShelf from './BasicCtaShelf';
// import { shallow } from 'enzyme';

// describe('BasicCTAShelf', () => {
//   let content = {
//     meta_variant: 'test',
//     image: {
//         renditions: {
//             mobile: 'mobile-image-link-address',
//             desktop: 'desktop-image-link-address'
//         }
//     }
//   }

//   let content_update = {
//     meta_variant: 'second_test',
//   }

//   it('renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<BasicCtaShelf content={content} />, div)
//   });

//   it('it can unmount without crashing', () => {
//     const wrapper = shallow(<BasicCtaShelf content={content} />);
//     expect(wrapper.exists()).toBe(true);
//     wrapper.unmount();
//   });

//   it('it can receive new props without crashing', () => {
//     const wrapper = shallow(<BasicCtaShelf content={content} />);
//     expect(wrapper.exists()).toBe(true);
//     wrapper.setProps({ content_update });
//   });

//   it('it can can use the variant from the props', () => {
//     let content = {
//       meta_variant: null
//     }
//     let variant = 'full_width';
//     const wrapper = shallow(<BasicCtaShelf content={content} variant={variant} />);
//     expect(wrapper.exists()).toBe(true);
//   });

//   it('renders without crashing with a image_on_left layout', () => {
//     let layout = 'image_on_left';
//     const div = document.createElement('div');
//     ReactDOM.render(<BasicCtaShelf content={content} layout={layout} />, div)
//   });

//   it('renders without crashing with a image_on_right layout', () => {
//     let layout = 'image_on_right';
//     const div = document.createElement('div');
//     ReactDOM.render(<BasicCtaShelf content={content} layout={layout} />, div)
//   });

//   it('renders without crashing with a cta_on_left layout', () => {
//     let layout = 'cta_on_left';
//     const div = document.createElement('div');
//     ReactDOM.render(<BasicCtaShelf content={content} layout={layout} />, div)
//   });

//   it('renders without crashing with a cta_on_right layout', () => {
//     let layout = 'cta_on_right';
//     const div = document.createElement('div');
//     ReactDOM.render(<BasicCtaShelf content={content} layout={layout} />, div)
//   });

//   it('renders without crashing with a full_to_half_width layout', () => {
//     let layout = 'full_to_half_width';
//     const div = document.createElement('div');
//     ReactDOM.render(<BasicCtaShelf content={content} layout={layout} />, div)
//   });

//   it('renders without crashing with a page_header layout', () => {
//     let layout = 'page_header';
//     const div = document.createElement('div');
//     ReactDOM.render(<BasicCtaShelf content={content} layout={layout} />, div)
//   });

//   it('renders without crashing with a section_heading layout', () => {
//     let layout = 'section_heading';
//     const div = document.createElement('div');
//     ReactDOM.render(<BasicCtaShelf content={content} layout={layout} />, div)
//   });

//   it('renders without crashing with a page-heading-shelf classNamePrefix', () => {
//     let classNamePrefix = 'page-heading-shelf';
//     const div = document.createElement('div');
//     ReactDOM.render(<BasicCtaShelf content={content} classNamePrefix={classNamePrefix} />, div)
//   });
// })
