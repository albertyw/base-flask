const LogFit = require('logfit');
const Rollbar = require('rollbar');
const varsnap = require('varsnap');

if (typeof window !== 'undefined') {
  require('normalize.css/normalize.css');
  require('bootstrap/dist/css/bootstrap.css');
  require('bootstrap/dist/js/bootstrap.js');
}

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

function setupGoogleAnalytics() {
  const script = document.createElement('script');
  script.onload = function () {
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', process.env.GOOGLE_ANALYTICS_TOKEN);
  };
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + process.env.GOOGLE_ANALYTICS_TOKEN;
  document.head.appendChild(script);
}

module.exports = {
  setupRollbar: setupRollbar,
  setupLogfit: setupLogfit,
  setupVarsnap: setupVarsnap,
  setupGoogleAnalytics: setupGoogleAnalytics,
};
