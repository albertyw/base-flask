const fs = require('fs');
const CleanCSS = require('clean-css');

const sources = [
  "app/static/css/normalize.css",
  "node_modules/bootstrap/dist/css/bootstrap.css",
  "app/static/css/global.css",
];
const outputFile = 'app/static/gen/bundle.min.css';

new CleanCSS({returnPromise: true})
  .minify(sources)
  .then(output => {
    const stream = fs.createWriteStream(outputFile);
    stream.write(output.styles);
  })
  .catch(error => { console.error(error); })
