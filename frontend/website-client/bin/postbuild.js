// Create a non-hashed main.js file to allow dynamically loading main.js file with hash value
// This enables embedding react app using main.js file
var fs = require('fs');
var manifest=require ('../build/asset-manifest.json');
var hashedJs = manifest['main.js'];
var hashedCss = manifest['main.css'];
var main = './build/main.js';

fs.readFile(main, 'utf8', function (err,data) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  var result = data.replace(/%mainjs%/g, hashedJs).replace(/%maincss%/g, hashedCss);

  fs.writeFile(main, result, 'utf8', function (err) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });
});

fs.readFile('./build/index.html', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  var result = data.replace('/static/js/', '{{ js_path }}').replace('/static/css/', '{{ css_path }}');

  fs.writeFile('./build/index.html', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});