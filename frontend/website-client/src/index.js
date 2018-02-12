import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import site from './sample-data/SiteSample';

global.rootUrl = '';

ReactDOM.render(<App site={site()}/>, document.getElementById('root'));
registerServiceWorker();
