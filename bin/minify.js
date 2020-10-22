const fs = require('fs');
const path = require('path');

const browserify = require('browserify');
const CleanCSS = require('clean-css');
require('dotenv').config();

// CSS Minification Configs
const cssSources = [
  path.join('node_modules', 'normalize.css', 'normalize.css'),
  path.join('node_modules', 'bootstrap', 'dist', 'css', 'bootstrap.css'),
  path.join('static', 'css', 'global.css'),
];
const cssOutputFile = path.join('static', 'gen', 'bundle.min.css');

// JS Minification Configs
const jsInputFile = path.join('static', 'js', 'index.js');
const jsOutputFile = path.join('static', 'gen', 'bundle.min.js');
const jsRawAppends = [
  path.join('node_modules', 'bootstrap', 'dist', 'js', 'bootstrap.min.js'),
];

// Minify js
console.log('Minifying JS:');
console.log(jsInputFile);
console.log('');
const jsOutputStream = fs.createWriteStream(jsOutputFile);
browserify(jsInputFile, {debug: true})
  .transform('envify')
  .transform('babelify',  {presets: ['@babel/preset-env']})
  .transform('uglifyify', {compress: true, 'keep_fnames': true, global: true})
  .bundle()
  .pipe(jsOutputStream);

// Append additional files at end of bundle
const jsRawAppendPromises = jsRawAppends.map(rawAppend => {
  return fs.promises.readFile(rawAppend);
});
jsOutputStream.on('finish', () => {
  Promise.all(jsRawAppendPromises).then(rawAppendData => {
    const stream = fs.createWriteStream(jsOutputFile, {flags: 'a'});
    for(let data of rawAppendData) {
      stream.write(data + '\n');
    }
  });
});


// Minify CSS
console.log('Minifying CSS:');
console.log(cssSources.join(', '));
new CleanCSS({returnPromise: true})
  .minify(cssSources)
  .then(output => {
    const stream = fs.createWriteStream(cssOutputFile);
    stream.write(output.styles);
  })
  .catch(error => { console.error(error); });
