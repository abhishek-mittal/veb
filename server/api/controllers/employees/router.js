const express = require('express');
const controller = require('./controller')

module.exports = express
  .Router()
  .post('/', controller.create)
  .delete('/', controller.delete)
  .get('/', controller.all);
