import React from 'react';
import ReactDOM from 'react-dom';
import BrightcoveVideo from './BrightcoveVideo.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrightcoveVideo />, div);
});
it('renders without crashing with content', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrightCoveVideo video={"video_source"} />, div);
});
