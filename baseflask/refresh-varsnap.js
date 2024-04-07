import 'dotenv/config';

import calculateFibonacci from '../static/js/fibonacci.js';
import { setupVarsnap } from '../static/js/thirdparty.js';

process.env.ENV='production';

function loadFibonacci() {
  for (let i=0; i<20; i++) {
    console.log(calculateFibonacci(i));
  }
}

setupVarsnap();
loadFibonacci();
