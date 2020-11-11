const _ = require('lodash');
const getOldDate = require('./utils/getOldDate');

function Store() {
  // Metric events are stored as arrays inside
  // this object, keyd by the metric key
  const storage = {};

  /**
   * Insert an event
   * @param {String} key 
   * @param {Number} value 
   * @param {Date} time 
   */
  function insert(key, value, time = new Date()) {
    const event = { value, time };

    if (!_.isArray(storage[key])) {
      storage[key] = [];
    }

    storage[key].push(event);
  }

  /**
   * Removes expired events specified by given input
   * @param {String} olderBy Any time expression supported by vercel/ms
   */
  function removeExpired(olderBy = '1h') {
    const olderByDate = getOldDate(olderBy);

    _.each(storage, (events) => {
      _.each(events, (event, index) => {
        if ((event.time <= olderByDate)) {
          if (_.isArray(events)) {
            events.splice(index, 1);
          } else {
            delete events[index];
          }
        }
      });
    });
  }

  /**
   * Returns non-expired events of the given key specified by given time input
   * @param {String} key 
   * @param {String} olderBy Any time expression supported by vercel/ms
   */
  function getNonExpired(key, olderBy = '1h') {
    const olderByDate = getOldDate(olderBy);
    const events = storage[key];
    return _.chain(events)
      .filter((event) => (event.time > olderByDate))
      .value();
  }

  return {
    insert,
    getNonExpired,
    removeExpired,
  };
}

module.exports = Store;
