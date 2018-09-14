import React from 'react';
import ReactDOM from 'react-dom';
import ShareButtonShelf from './ShareButtonShelf';
import { shallow } from 'enzyme';

describe('ShareButtonShelf', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ShareButtonShelf />, div)
  })

  it('renders without crashing with the share button on', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ShareButtonShelf showShareButton={true} />, div);
  })

  it('renders without crashing with the email button on', () => {
    const wrapper = shallow(<ShareButtonShelf showEmailButton={true} />);
    expect(wrapper.exists()).toBe(true);
  })

  it('renders without crashing with the print button on', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ShareButtonShelf showPrintButton={true} />, div);
  })

  it('renders without crashing with the all buttons on', () => {
    const wrapper = shallow(<ShareButtonShelf showShareButton={true} showEmailButton={true} showPrintButton={true} />);
    expect(wrapper.exists()).toBe(true);
  })
})
