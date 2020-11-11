const _ = require('lodash');
const ms = require('ms');
const express = require('express');
const Store = require('./store');

const app = express.Router();
const FRESH_METRIC_AGE = _.get(process, 'env.FRESH_METRIC_AGE', '1h');

const store = Store();

// Kicking off garbage collector
setInterval(() => store.removeExpired(FRESH_METRIC_AGE), ms(FRESH_METRIC_AGE));

app.post('/:key', (req, res) => {
  const { key } = req.params;
  const value = _.chain(req).get('body.value').toSafeInteger().value();
  store.insert(key, value);
  res.json({});
});

app.get('/:key/sum', (req, res) => {
  const { key } = req.params;
  const value = _.sumBy(store.getNonExpired(key, FRESH_METRIC_AGE), 'value');
  res.json({ value });
});

module.exports = app;
