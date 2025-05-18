import { expect } from 'chai';

import { setupVarsnap } from '../thirdparty.js';
setupVarsnap();
import varsnap from 'varsnap';
import '../fibonacci.js';

context('Varsnap', function() {
  this.timeout(30 * 1000);
  it('runs with production', async function() {
    const status = await varsnap.runTests();
    expect(status).to.be.true;
  });
});
