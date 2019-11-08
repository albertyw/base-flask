var process = require('process');

var $ = require('jquery');
global.jQuery = $;
global.$ = $;

const LogFit = require('logfit');
const logfit = new LogFit({
  source: process.env.LOGFIT_CLIENT_TOKEN,
});
logfit.report();

var varsnap = require('varsnap');
varsnap.config = {
  varsnap: 'true',
  env: 'production',
  producerToken: process.env.VARSNAP_PRODUCER_TOKEN,
  consumerToken: process.env.VARSNAP_CONSUMER_TOKEN,
};

require('./rollbar.js');

require('./global.js');
