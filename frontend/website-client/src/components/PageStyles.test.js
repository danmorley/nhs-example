import React from 'react';
import ReactDOM from 'react-dom';
import PageStyles from './PageStyles.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PageStyles />, div);
});