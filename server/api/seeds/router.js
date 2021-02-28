const express = require('express');
const controller = require('./employees');

module.exports = express
  .Router()
  .post('/employee', controller.seedEmployeeData);
