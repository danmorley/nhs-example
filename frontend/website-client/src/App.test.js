import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ContentStore from './services/__mocks__/ContentStore';
const fs = require('fs');

global.contentStore = new ContentStore('/api', 'oneyou', 'current');

it('renders without crashing', () => {
    const siteData = fs.readFileSync(`./src/services/__mocks__/__mockData__/site.json`, 'utf8');
    const siteJson = JSON.parse(siteData);
    const div = document.createElement('div');
    ReactDOM.render(<App site={siteJson} />, div);
});

it('returns true from isAppPage if path is to shelf samples', () => {
    const siteData = fs.readFileSync(`./src/services/__mocks__/__mockData__/site.json`, 'utf8');
    const siteJson = JSON.parse(siteData);
    const div = document.createElement('div');
    const component = ReactDOM.render(<App site={siteJson} />, div);
    expect(component.isAppPage('/shelf-samples/')).toBeTruthy();
})

it('returns false from isAppPage if path is not to shelf samples', () => {
    const siteData = fs.readFileSync(`./src/services/__mocks__/__mockData__/site.json`, 'utf8');
    const siteJson = JSON.parse(siteData);
    const div = document.createElement('div');
    const component = ReactDOM.render(<App site={siteJson} />, div);
    expect(component.isAppPage('/oneyou/')).not.toBeTruthy();
})

it("returns a path with a trailing / from pagePathToRender if there isn't one", () => {
    const siteData = fs.readFileSync(`./src/services/__mocks__/__mockData__/site.json`, 'utf8');
    const siteJson = JSON.parse(siteData);
    const div = document.createElement('div');
    const component = ReactDOM.render(<App site={siteJson} />, div);
    expect(component.pagePathToRender('/test-path')).toEqual('/test-path/');
})

it("returns a path unchanged from pagePathToRender if there is a trailing /", () => {
    const siteData = fs.readFileSync(`./src/services/__mocks__/__mockData__/site.json`, 'utf8');
    const siteJson = JSON.parse(siteData);
    const div = document.createElement('div');
    const component = ReactDOM.render(<App site={siteJson} />, div);
    expect(component.pagePathToRender('/test-path/')).toEqual('/test-path/');
})
