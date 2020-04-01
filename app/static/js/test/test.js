const expect = require('chai').expect;
const varsnap = require('varsnap');

require('../thirdparty');

context('Varsnap', function() {
  this.timeout(30 * 1000);
  it('runs with production', async function() {
    const status = await varsnap.runTests();
    expect(status).to.be.true;
  });
});
