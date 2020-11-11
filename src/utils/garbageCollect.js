const _ = require('lodash');
const ms = require('ms');

function garbageCollect(store, olderBy = '1h') {
  const duration = ms(olderBy);
  setInterval(() => store.removeExpired(olderBy), duration);
}

module.exports = garbageCollect;
