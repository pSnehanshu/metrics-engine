const bodyParser = require('body-parser');
const metric = require('./metric');
const app = require('express')();

app.use(bodyParser.json());

app.use('/metric', metric);

module.exports = app;
