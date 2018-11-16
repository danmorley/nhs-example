import React from 'react';
import ReactDOM from 'react-dom';
import Image from './Image.js';

beforeEach(function(){
  spyOn(console, 'error');
});

it('renders without crashing with not content', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Image />, div);
  expect(console.error).toHaveBeenCalled();
});

it('renders without crashing with content', () => {
  const imageSrc = 'http://localhost/test_image.png';
  const imageTitle = 'test image';
  const imageObject = {link: imageSrc, title: imageTitle};
  const div = document.createElement('div');
  const image = ReactDOM.render(<Image image={imageObject}/>, div);
  expect(image._reactInternalFiber.child.stateNode.src).toEqual(imageSrc);
  expect(image._reactInternalFiber.child.stateNode.alt).toEqual(imageTitle);
});