import React from 'react';
import ReactDOM from 'react-dom';
import BrightCoveVideo from './BrightCoveVideo.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrightCoveVideo />, div);
});