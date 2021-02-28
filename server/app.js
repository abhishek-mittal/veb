

require('./common/env'); ;
const Server = require('./common/server');;
const routes = require('./routes'); 
const db = require('./db');

module.exports = new Server().db(db, {
    URI: process.env.DB_TEST
}).router(routes).listen(process.env.PORT);
