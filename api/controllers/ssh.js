(function(module) {
    'use strict';

    var Aws = require('../services/aws.js'),
        log = require('winston'),
        request = require('request');

    var aws = new Aws();
    log.level = process.env.LOG_LEVEL || error;

    function deploy(req, res) {
        var instruction = req.swagger.params.instruction.value;
        aws.deploy(instruction)
            .then(function(data) {
                log.info('Successfully deployed instance : ', data.InstanceId);
                call(instruction.callback, data.InstanceId);
            })
            .catch(function(error) {
                log.error('Failed to deploy instance : ', error);
            });
        res.status(201).json();
    }

    function destroy(req, res) {
        var instance = req.swagger.params.instance.value;
        aws.destroy(instance.id)
            .then(function(data) {
                log.info('Successfully destroyed instance : ', instance.id);
            })
            .catch(function(error) {
                log.error('Failed to destroy instance : ', error);
            });
        res.status(201).json();
    }

    function call(url, id) {
        log.info('Calling back', url, 'with id', id);
        var options = {
            method: 'POST',
            uri: url,
            json: true,
            body: {
                id: id
            }
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                log.info('Called back Successfully ');
            } else {
                log.error('Callback failed : ', error);
            }
        }

        request(options, callback);
    }

    module.exports = {
        deploy: deploy,
        destroy: destroy
    };
})(module);
