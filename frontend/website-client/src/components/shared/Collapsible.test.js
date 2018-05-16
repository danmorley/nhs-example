import React from 'react';
import ReactDOM from 'react-dom';
import Collapsible from './Collapsible';

describe('Collapsible', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Collapsible />, div);
  });

  it('renders without crashing when the state open is changed to true', () => {
    const div = document.createElement('div');
    const component = ReactDOM.render(<Collapsible />, div);
    component.setState({open: true});
  });

  it('returns open is false from getDerivedStateFromProps', () => {
    const returnedResponse = Collapsible.getDerivedStateFromProps({}, {});
    const component = expect(returnedResponse.open).toBe(false);
  });
})
