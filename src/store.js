const _ = require('lodash');
const ms = require('ms');

function getOldDate(olderBy = '1h') {
  const miliseconds = ms(olderBy);
  const now = Date.now();

  return new Date(now - miliseconds);
}

function Store() {
  const storage = {};

  function insert(key, value, time = new Date()) {
    const event = { value, time };

    if (!_.isArray(storage[key])) {
      storage[key] = [];
    }

    storage[key].push(event);
  }

  function latestSum(key, notOlderThan = '1h') {
    const notOlderThanDate = getOldDate(notOlderThan);
    const events = storage[key];
    return _.chain(events)
      .filter((event) => (event.time > notOlderThanDate))
      .sumBy('value')
      .value();
  }

  return {
    insert,
    latestSum,
  };
}

module.exports = Store;
