import React from 'react';
import ReactDOM from 'react-dom';
import VideoModal from './VideoModal.js';

it('renders without crashing with no content', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VideoModal />, div);
});

it('renders without crashing with content', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VideoModal video={{}} />, div);
});
