var process = require('process');

var $ = require('jquery');
global.jQuery = $;
global.$ = $;

var varsnap = require('varsnap');
varsnap.config = {
  varsnap: 'true',
  env: 'production',
  producerToken: process.env.VARSNAP_PRODUCER_TOKEN,
  consumerToken: process.env.VARSNAP_CONSUMER_TOKEN,
};

require('./global.js');
