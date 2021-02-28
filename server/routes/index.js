const employeeRouter = require('./../api/controllers/employees/router');
const seedRouter = require('./../api/seeds/router');

function routes(app) {
  app.use('/api/v1/employee', employeeRouter);
  app.use('/api/v1/seed', seedRouter);
}

module.exports = routes;
