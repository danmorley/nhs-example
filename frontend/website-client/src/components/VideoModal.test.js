import React from 'react';
import ReactDOM from 'react-dom';
import VideoModal from './VideoModal.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VideoModal />, div);
});