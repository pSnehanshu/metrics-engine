const _ = require('lodash');
const getOldDate = require('./utils/getOldDate');

function Store() {
  const storage = {};

  function insert(key, value, time = new Date()) {
    const event = { value, time };

    if (!_.isArray(storage[key])) {
      storage[key] = [];
    }

    storage[key].push(event);
  }

  function getExpired(key, olderBy = '1h') {
    const olderByDate = getOldDate(olderBy);
    const events = storage[key];
    return _.chain(events)
      .filter((event) => (event.time <= olderByDate))
      .value();
  }

  function getNonExpired(key, olderBy = '1h') {
    const olderByDate = getOldDate(olderBy);
    const events = storage[key];
    return _.chain(events)
      .filter((event) => (event.time > olderByDate))
      .value();
  }

  function latestSum(key, notOlderThan = '1h') {
    return _.sumBy(getNonExpired(key, notOlderThan), 'value');
  }

  return {
    insert,
    latestSum,
    getNonExpired,
    getExpired,
  };
}

module.exports = Store;
