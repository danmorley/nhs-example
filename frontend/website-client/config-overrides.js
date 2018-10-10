//config-overrides.js
const rewireEslint = require('react-app-rewire-eslint');
const swig  = require('swig-templates');
const fs = require('fs');

module.exports = function override(config, env) {
  //render template for index.html
  const template = swig.compileFile('./public/index-build.html');
  var output = template({});
  fs.writeFileSync('./public/index.html', output);

  config = rewireEslint(config, env);
  return config;
}