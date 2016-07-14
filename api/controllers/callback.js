(function(module) {
    'use strict';
    var log = require('winston');
    log.level = process.env.LOG_LEVEL || error;

    function listen(req, res) {
        var id = req.swagger.params.instance.value;
        log.info('Called back because instance deployed successfully :', id);
        res.json();
    };

    module.exports = {
        listen: listen
    };

})(module);
