const ms = require('ms');

/**
 * Returns a date older than current date by the given input
 * @param {String} olderBy Any time expression supported by vercel/ms
 */
function getOldDate(olderBy = '1h') {
  const miliseconds = ms(olderBy);
  const now = Date.now();

  return new Date(now - miliseconds);
}

module.exports = getOldDate;
