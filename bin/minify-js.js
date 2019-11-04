const fs = require('fs');
const path = require('path');

const browserify = require('browserify');
require('dotenv').config();

const inputFile = path.join(__dirname, '..', 'app', 'static', 'js', 'index.js');
const outputFile = path.join(__dirname, '..', 'app', 'static', 'gen', 'bundle.min.js');
const outputStream = fs.createWriteStream(outputFile);

browserify(inputFile, {debug: true})
  .transform('envify')
  .transform('babelify',  {presets: ['@babel/preset-env']})
  .transform('uglifyify', {compress: true, 'keep_fnames': true, global: true})
  .bundle()
  .pipe(outputStream);

// Append additional files at end of bundle
const rawAppends = [
  path.join(__dirname, '..', 'node_modules', 'bootstrap', 'dist', 'js', 'bootstrap.min.js')
];
const rawAppendPromises = rawAppends.map(rawAppend => {
  return fs.promises.readFile(rawAppend);
});
outputStream.on('finish', () => {
  Promise.all(rawAppendPromises).then(rawAppendData => {
    const stream = fs.createWriteStream(outputFile, {flags: 'a'});
    for(data of rawAppendData) {
      stream.write(data);
    }
  });
});
