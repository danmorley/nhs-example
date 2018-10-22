//template-rendering.js
const swig  = require('swig-templates');
const fs = require('fs');

// render template for index.html
const template = swig.compileFile('./public/index-build.html');
var output = template({});
fs.writeFileSync('./public/index.html', output);