import React from 'react';
import ReactDOM from 'react-dom';
import BrightcoveVideo from './BrightcoveVideo.js';

beforeEach(function(){
  spyOn(console, 'error');
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrightcoveVideo />, div);
  expect(console.error).toHaveBeenCalled();
});

it('renders without crashing with content', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrightcoveVideo video={"video_source"} />, div);
});
