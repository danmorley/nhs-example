import React from 'react';
import ReactDOM from 'react-dom';
import PageStyles from './PageStyles.js';

it('renders without crashing with no content', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PageStyles />, div);
});


it('renders without crashing with content', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PageStyles content='width: 100%;'/>, div);
});
