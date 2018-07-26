import React from 'react';
import ReactDOM from 'react-dom';
import ShareButtonShelf from './ShareButtonShelf';

describe('ShareButtonShelf', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ShareButtonShelf />, div)
  })

  it('renders without crashing with the share button on', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ShareButtonShelf showShareButton={true} />, div)
  })

  it('renders without crashing with the email button on', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ShareButtonShelf showEmailButton={true} />, div)
  })

  it('renders without crashing with the print button on', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ShareButtonShelf showPrintButton={true} />, div)
  })

  it('renders without crashing with the all buttons on', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ShareButtonShelf showShareButton={true} showEmailButton={true} showPrintButton={true} />, div)
  })
})
