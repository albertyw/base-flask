import LogFit from 'logfit';
import Rollbar from 'rollbar';
import varsnap from 'varsnap';

export function setupRollbar() {
  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_CLIENT_TOKEN,
    captureUncaught: true,
    payload: {
      environment: process.env.ENV,
      server: {
        branch: process.env.GIT_BRANCH,
        commit: process.env.GIT_COMMIT,
      },
    }
  };
  return Rollbar.init(rollbarConfig);
}

export function setupLogfit() {
  const logfit = new LogFit({
    source: process.env.LOGFIT_CLIENT_TOKEN,
  });
  logfit.report();
}

export function setupVarsnap() {
  varsnap.updateConfig({
    varsnap: true,
    env: process.env.ENV,
    producerToken: process.env.VARSNAP_PRODUCER_TOKEN,
    consumerToken: process.env.VARSNAP_CONSUMER_TOKEN,
    branch: process.env.GIT_BRANCH,
  });
}

export function setupGoogleAnalytics() {
  const script = document.createElement('script');
  script.onload = function () {
    (window as any).dataLayer = (window as any).dataLayer || [];  // eslint-disable-line @typescript-eslint/no-explicit-any
    function gtag(...args){(window as any).dataLayer.push(args);}  // eslint-disable-line @typescript-eslint/no-explicit-any
    gtag('js', new Date());
    gtag('config', process.env.GOOGLE_ANALYTICS_TOKEN);
  };
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + process.env.GOOGLE_ANALYTICS_TOKEN;
  document.head.appendChild(script);
}
