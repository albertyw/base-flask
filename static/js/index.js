var thirdParty = require('./thirdparty.js');
thirdParty.setupRollbar();
thirdParty.setupLogfit();
thirdParty.setupSegment();
thirdParty.setupVarsnap();
require('./global.js');

var calculateFibonacci = require('./fibonacci.js');
var random = Math.floor(Math.random() * 20);
console.log(calculateFibonacci(random));
