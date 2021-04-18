require('dotenv').config();

const calculateFibonacci = require('../static/js/fibonacci');
const thirdParty = require('../static/js/thirdparty');

process.env.ENV='production';

function loadFibonacci() {
  for (let i=0; i<20; i++) {
    console.log(calculateFibonacci(i));
  }
}

thirdParty.setupVarsnap();
loadFibonacci();
