const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const os = require('os');
const cors = require('cors');

// import errorHandler from '../api/middlewares/error.handler';

const app = express();

class ExpressServer {

    constructor() {
        const root = path.normalize(`${__dirname}/../..`);
        app.use(cors())

        app.use(bodyParser.json({
            limit: process.env.REQUEST_LIMIT || '100kb'
        }));
        app.use(
            bodyParser.urlencoded({
                extended: true,
                limit: process.env.REQUEST_LIMIT || '100kb',
            })
        );
        app.use(bodyParser.text({
            limit: process.env.REQUEST_LIMIT || '100kb'
        }));



        app.use(cookieParser(process.env.SESSION_SECRET));

        app.use(express.static(`${root}/public`));

    }

    db(init, settings) {
        try {
            const conn = init({ ...settings });
            app.use(function (req, res, next) {
                req.rootConn = conn;
                next();
            })
            return this;
        } catch (error) {
            console.log(error);
            process.exit(0);
        }
    }

    router(routes) {
        routes(app);
        // app.use(errorHandler);
        return this;
    }

    listen(port = process.env.PORT) {
        const welcome = (p) => () =>
            console.info(
                `up and running in ${process.env.NODE_ENV || 'development'
                } @: ${os.hostname()} on port: ${p}}`
            );

        const server = http.createServer(app).listen(port, welcome(port));
        return [app, server];
    }
}

module.exports = ExpressServer;