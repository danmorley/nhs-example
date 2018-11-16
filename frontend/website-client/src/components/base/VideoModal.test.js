import React from 'react';
import ReactDOM from 'react-dom';
import VideoModal from './VideoModal';
import BrightcoveVideo from './BrightcoveVideo';
import WirewaxVideo from './WirewaxVideo';

beforeEach(function(){
  spyOn(console, 'error');
});

it('renders without crashing with no content', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VideoModal />, div);
    expect(console.error).toHaveBeenCalled();
});

it('renders without crashing with content', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VideoModal video={"video_source"} host={'brightcove'} />, div);
});

it('renders a brightcove component when brightcove is selected as host', () => {
    const div = document.createElement('div');
    let videoModal = ReactDOM.render(<VideoModal video={"video_source"} host={'brightcove'} />, div);
    let renderedVideoComponent = videoModal.renderVideo(videoModal.props.video, videoModal.props.host);
    let actualComponent = new renderedVideoComponent.type
    let expectedComponent = new BrightcoveVideo;

    expect(actualComponent.constructor.name).toEqual(expectedComponent.constructor.name);
});

it('renders a wirewax component when wirewax is selected as host', () => {
    const div = document.createElement('div');
    let videoModal = ReactDOM.render(<VideoModal video={"video_source"} host={'wirewax'} />, div);
    let renderedVideoComponent = videoModal.renderVideo(videoModal.props.video, videoModal.props.host);
    let actualComponent = new renderedVideoComponent.type
    let expectedComponent = new WirewaxVideo;

    expect(actualComponent.constructor.name).toEqual(expectedComponent.constructor.name);
});

it('returns null if there is no selected host', () => {
    const div = document.createElement('div');
    let videoModal = ReactDOM.render(<VideoModal video={"video_source"} />, div);
    let renderedVideoComponent = videoModal.renderVideo(videoModal.props.video, videoModal.props.host);
    expect(renderedVideoComponent).toEqual(null);
});
