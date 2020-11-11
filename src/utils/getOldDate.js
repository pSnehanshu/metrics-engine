const ms = require('ms');

function getOldDate(olderBy = '1h') {
  const miliseconds = ms(olderBy);
  const now = Date.now();

  return new Date(now - miliseconds);
}

module.exports = getOldDate;
