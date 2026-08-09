import LogFit from 'logfit';
import Rollbar from 'rollbar';
import varsnap from 'varsnap';

// The generated JS targets ES6 (tsconfig.json) with no further downleveling,
// so browsers that can't parse ES6 classes will error on load. Per caniuse's
// es6-class support table, that's IE, Opera Mini, BlackBerry, IE Mobile, old
// Android's stock browser, and pre-ES6 versions of the other major browsers.
function isOutdatedBrowser(userAgent: string): boolean {
  if (/MSIE|Trident\/|IEMobile/.test(userAgent)) return true;
  if (/Opera Mini/.test(userAgent)) return true;
  if (/BlackBerry|BB10/.test(userAgent)) return true;

  let match: RegExpMatchArray | null;
  if ((match = userAgent.match(/Edg\/(\d+)/))) return parseInt(match[1], 10) < 13;
  if ((match = userAgent.match(/Edge\/(\d+)/))) return parseInt(match[1], 10) < 13;
  if ((match = userAgent.match(/OPR\/(\d+)/))) return parseInt(match[1], 10) < 36;
  if ((match = userAgent.match(/SamsungBrowser\/(\d+)/))) return parseInt(match[1], 10) < 5;
  if ((match = userAgent.match(/Chrome\/(\d+)/))) return parseInt(match[1], 10) < 49;
  if ((match = userAgent.match(/Firefox\/(\d+)/))) return parseInt(match[1], 10) < 45;
  if (/Android/.test(userAgent) && !/Chrome/.test(userAgent)) return true;
  if ((match = userAgent.match(/Version\/(\d+).*Safari/))) return parseInt(match[1], 10) < 9;

  return false;
}

function checkIgnore(_isUncaught: boolean, _args: unknown[], item: Record<string, unknown>): boolean {
  const client = item.client as { javascript?: { browser?: string } } | undefined;
  const userAgent = client?.javascript?.browser;
  if (!userAgent) return false;
  return isOutdatedBrowser(userAgent);
}

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
    },
    checkIgnore: checkIgnore,
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
    env: process.env.ENV ?? '',
    producerToken: process.env.VARSNAP_PRODUCER_TOKEN,
    consumerToken: process.env.VARSNAP_CONSUMER_TOKEN,
    branch: process.env.GIT_BRANCH ?? '',
  });
}

export function setupGoogleAnalytics() {
  const script = document.createElement('script');
  script.onload = function () {
    (window as any).dataLayer = (window as any).dataLayer || [];  // eslint-disable-line @typescript-eslint/no-explicit-any
    function gtag(...args: unknown[]){(window as any).dataLayer.push(args);}  // eslint-disable-line @typescript-eslint/no-explicit-any
    gtag('js', new Date());
    gtag('config', process.env.GOOGLE_ANALYTICS_TOKEN);
  };
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + process.env.GOOGLE_ANALYTICS_TOKEN;
  document.head.appendChild(script);
}
