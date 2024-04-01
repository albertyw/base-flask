import { setupRollbar, setupLogfit, setupVarsnap, setupGoogleAnalytics } from './thirdparty.js';
setupRollbar();
setupLogfit();
setupVarsnap();
setupGoogleAnalytics();
import './global.js';

import calculateFibonacci from './fibonacci.js';
var random = Math.floor(Math.random() * 20);
console.log(calculateFibonacci(random));
