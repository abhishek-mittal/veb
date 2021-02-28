const mongoose = require('mongoose');
mongoose.Promise = Promise;

const [modelName, schema] = require('./schemas/employee');

const handleError = (err) => {
    console.log(err);
}

function DB( settings ) {
    let { URI } = settings;
    URI = URI || process.env.DB_URL;

    const conn = mongoose.createConnection(URI, { useNewUrlParser: true, keepAlive: true, useUnifiedTopology: true});
    // extendible to multiple schema in this case only one.
    conn.model(modelName, schema);
    return conn;
}

module.exports = DB;