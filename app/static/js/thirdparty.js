const process = require('process');

const LogFit = require('logfit');
const Rollbar = require('rollbar');
const varsnap = require('varsnap');

function setupRollbar() {
  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_CLIENT_TOKEN,
    captureUncaught: true,
    payload: {
      environment: process.env.ENV,
    }
  };
  return Rollbar.init(rollbarConfig);
}

function setupLogfit() {
  const logfit = new LogFit({
    source: process.env.LOGFIT_CLIENT_TOKEN,
  });
  logfit.report();
}

function setupVarsnap() {
  varsnap.updateConfig({
    varsnap: 'true',
    env: process.env.ENV,
    producerToken: process.env.VARSNAP_PRODUCER_TOKEN,
    consumerToken: process.env.VARSNAP_CONSUMER_TOKEN,
  });
}

module.exports = {
  setupRollbar: setupRollbar,
  setupLogfit: setupLogfit,
  setupVarsnap: setupVarsnap,
};
