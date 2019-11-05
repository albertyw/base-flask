const fs = require('fs');
const path = require('path');

const browserify = require('browserify');
const CleanCSS = require('clean-css');
require('dotenv').config();

// CSS Minification Configs
const cssSources = [
  "app/static/css/normalize.css",
  "node_modules/bootstrap/dist/css/bootstrap.css",
  "app/static/css/global.css",
];
const cssOutputFile = 'app/static/gen/bundle.min.css';

// JS Minification Configs
const jsInputFile = path.join(__dirname, '..', 'app', 'static', 'js', 'index.js');
const jsOutputFile = path.join(__dirname, '..', 'app', 'static', 'gen', 'bundle.min.js');
const jsRawAppends = [
  path.join(__dirname, '..', 'node_modules', 'bootstrap', 'dist', 'js', 'bootstrap.min.js')
];

// Minify js
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
    for(data of rawAppendData) {
      stream.write(data);
    }
  });
});


// Minify CSS
new CleanCSS({returnPromise: true})
  .minify(cssSources)
  .then(output => {
    const stream = fs.createWriteStream(cssOutputFile);
    stream.write(output.styles);
  })
  .catch(error => { console.error(error); })
