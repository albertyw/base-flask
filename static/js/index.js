var thirdParty = require('./thirdparty.js');
thirdParty.setupRollbar();
thirdParty.setupLogfit();
thirdParty.setupVarsnap();
thirdParty.setupGoogleAnalytics();
require('./global.js');

var calculateFibonacci = require('./fibonacci.js');
var random = Math.floor(Math.random() * 20);
console.log(calculateFibonacci(random));
