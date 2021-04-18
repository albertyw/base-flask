const calculateFibonacci = require('../fibonacci');
const thirdParty = require('../thirdparty');

function loadFibonacci() {
  for (let i=0; i<20; i++) {
    console.log(calculateFibonacci(i));
  }
}

thirdParty.setupVarsnap();
loadFibonacci();
