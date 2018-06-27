import React from 'react';
import ReactDOM from 'react-dom';
import NoticeShelf from './NoticeShelf';

describe('NoticeShelf', () => {
  let content = {
    header: 'test',
    body: 'test'
  }
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NoticeShelf content={content} />, div)
  })
})
