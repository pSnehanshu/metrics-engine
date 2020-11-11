const { expect } = require('chai');
const ms = require('ms');

// Ours
const getOldDate = require('../src/utils/getOldDate');

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
