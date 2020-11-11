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
  const value = store.latestSum(key, '10 s');
  res.json({ value });
});

module.exports = app;
