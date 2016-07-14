'use strict';

var SwaggerExpress = require('swagger-express-mw'),
    log = require('winston'),
    app = require('express')();

require('dotenv').load();
log.level = process.env.LOG_LEVEL || error;
module.exports = app;

var config = {
    appRoot: __dirname
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) {
        throw err;
    }
    swaggerExpress.register(app);

    var port = process.env.SERVICE_PORT || 80;
    log.info('Starting %s on port %s', process.env.SERVICE_NAME, process.env.SERVICE_PORT);
    app.listen(port);
});
