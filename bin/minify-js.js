const fs = require('fs');
const path = require('path');

const browserify = require('browserify');
require('dotenv').config();

const inputFile = path.join(__dirname, '..', 'app', 'static', 'js', 'index.js');
const outputFile = path.join(__dirname, '..', 'app', 'static', 'gen', 'bundle.min.js');

browserify(inputFile, {debug: true})
  .transform('envify')
  .transform('babelify',  {presets: ['@babel/preset-env']})
  .transform('uglifyify', {compress: true, 'keep_fnames': true, global: true})
  .bundle()
  .pipe(fs.createWriteStream(outputFile));
