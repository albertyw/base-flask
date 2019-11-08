const process = require('process');

const Rollbar = require('rollbar');

function setupRollbar() {
  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_CLIENT_TOKEN,
    captureUncaught: true,
    payload: {
      environment: process.env.ENVIRONMENT,
    }
  };
  return Rollbar.init(rollbarConfig);
}

module.exports = setupRollbar();
