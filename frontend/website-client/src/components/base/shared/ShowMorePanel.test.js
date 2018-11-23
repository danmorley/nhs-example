import React from 'react';
import ReactDOM from 'react-dom';
import ShowMorePanel from './ShowMorePanel';
import ImageTeaserPanel from '../panels/ImageTeaserPanel/ImageTeaserPanel';
import { shallow } from 'enzyme';

describe('ShowMorePanel', () => {
  let imageTeaserContent = {};
  let children = [<ImageTeaserPanel content={imageTeaserContent} />,
                    <ImageTeaserPanel content={imageTeaserContent} />,
                    <ImageTeaserPanel content={imageTeaserContent} />,
                    <ImageTeaserPanel content={imageTeaserContent} />,
                    <ImageTeaserPanel content={imageTeaserContent} />];
  let rowsToShow = 0;


  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<ShowMorePanel children={children} rowsToShow={rowsToShow} />, div);
  });

  it('renders without crashing with a limited number of rows', () => {
    rowsToShow = 1;
    const div = document.createElement('div');
    ReactDOM.render(<ShowMorePanel children={children} rowsToShow={rowsToShow} />, div);
  });

  it('it can unmount without crashing when unexpanded', () => {
    const wrapper = shallow(<ShowMorePanel children={children} rowsToShow={rowsToShow} />);
    expect(wrapper.exists()).toBe(true);
    wrapper.unmount();
  });

  it('it can unmount without crashing when expanded', () => {
    const wrapper = shallow(<ShowMorePanel children={children} rowsToShow={rowsToShow} />);
    expect(wrapper.exists()).toBe(true);
    wrapper.setState({isExpanded: true})
    wrapper.unmount();
  });

  it('it can receive new props without crashing', () => {
    const wrapper = shallow(<ShowMorePanel children={children} rowsToShow={rowsToShow} />);
    expect(wrapper.exists()).toBe(true);
    wrapper.setProps({ children });
  });

  it('doExpand sets isExpanded in state to true', () => {
    const div = document.createElement('div');
    const component = ReactDOM.render(<ShowMorePanel children={children} rowsToShow={rowsToShow} />, div);
    component.doExpand();
    expect(component.state.isExpanded).toBe(true);
  });

  it('doContract sets isExpanded in state to false', () => {
    const div = document.createElement('div');
    const component = ReactDOM.render(<ShowMorePanel children={children} rowsToShow={rowsToShow} />, div);
    component.doContract();
    expect(component.state.isExpanded).toBe(false);
  });
})
