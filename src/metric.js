const _ = require('lodash');
const express = require('express');
const Store = require('./store');

const app = express.Router();

const store = Store();

app.post('/:key', (req, res) => {
  const { key } = req.params;
  const value = _.chain(req).get('body.value').toSafeInteger().value();
  store.insert(key, value);
  res.json({});
});

app.get('/:key/sum', (req, res) => {
  const { key } = req.params;
  const value = _.sumBy(store.getNonExpired(key, '10s'), 'value');
  res.json({ value });
});

module.exports = app;
