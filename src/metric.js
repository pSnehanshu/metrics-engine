const _ = require('lodash');
const ms = require('ms');
const express = require('express');
const app = express.Router();

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
    return _.chain(storage[key])
      .filter((event) => (event.time > notOlderThanDate))
      .sumBy('time')
      .value();
  }

  return {
    insert,
    latestSum,
  };
}

const store = Store();

app.post('/:key', (req, res) => {
  const { key } = req.params;
  const value = _.chain(req).get('body.value').toSafeInteger().value();
  store.insert(key, value);
  res.json({});
});

app.get('/:key/sum', (req, res) => {
  const { key } = req.params;
  const value = store.latestSum(key);
  res.json({ value });
});

module.exports = app;
