const { expect } = require('chai');
const ms = require('ms');

// Ours
const getOldDate = require('../src/utils/getOldDate');
const Store = require('../src/store');

describe('utils', function () {
  describe('getOldDate', function () {
    it('should return correct date', function () {
      const round2secs = (ms) => Math.round(ms / 1000);

      const oldBy = '2h';
      const backThen = (() => {
        let d = new Date();
        d.setMilliseconds(d.getMilliseconds() - ms(oldBy));
        d = round2secs(+d);
        return d;
      })();

      const calculatedOldDate = round2secs(+getOldDate(oldBy));

      expect(calculatedOldDate).to.equal(backThen);
    });
  });
});

describe('Store', function () {
  it('should filter expired values', function (done) {
    const expiry = '2s';
    const expiryMs = ms(expiry);

    this.timeout(expiryMs + 5000);

    const store = Store();
    const key = 'random-key';
    const value = 20;

    // Insert an event
    store.insert(key, value);

    // Wait for x sec
    setTimeout(() => {
      // Insert another event
      store.insert(key, value);

      const unexpired = store.getNonExpired(key, expiry);
      expect(unexpired).to.have.length(1);
      done();
    }, expiryMs);
  });

  it('should remove expired values', function (done) {
    const expiry = '2s';
    const expiryMs = ms(expiry);

    this.timeout(expiryMs + 5000);

    const store = Store();
    const key = 'random-key';
    const value = 20;

    // Insert an event
    store.insert(key, value);

    // Wait for x sec
    setTimeout(() => {
      store.removeExpired(expiry);
      const unexpired = store.storage()[key];
      expect(unexpired).to.have.length(0);
      done();
    }, expiryMs);
  });
});
