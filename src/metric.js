const _ = require('lodash');
const express = require('express');
const app = express.Router();

app.post('/:key', (req, res) => {
  const { key } = req.params;
  const value = _.chain(req).get('body.value').toSafeInteger().value();
  res.json({});
});

app.get('/:key/sum', (req, res) => {

});

module.exports = app;
