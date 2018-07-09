import React from 'react';
import ReactDOM from 'react-dom';
import WirewaxVideo from './WirewaxVideo.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WirewaxVideo />, div);
});

it('renders without crashing with content', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WirewaxVideo video={"video_source"} />, div);
});
