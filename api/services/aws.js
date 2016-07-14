(function(module) {
    'use strict';

    var AWS = require('aws-sdk'),
        Promise = require('bluebird'),
        log = require('winston'),
        init = require('./cloud-init'),
        fs = require('fs');

    function Aws() {
        log.level = process.env.LOG_LEVEL || error;
        this.log = log;
        this.init = init;
        AWS.config.update = {
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        };
        this.log.debug('type=aws_config', AWS.config);
        this.aws = new AWS.EC2();
    }

    Aws.prototype.deploy = function(credentials) {
        var self = this;
        var config = this.init.generate(credentials.username, credentials.password);
        self.log.debug('type=credentials', credentials);
        self.log.debug('type=user_config ', config);
        return new Promise(function(resolve, reject) {
            var params = {
                ImageId: process.env.AWS_IMAGE_ID,
                InstanceType: process.env.AWS_INSTANCE_TYPE,
                Monitoring: {
                    Enabled: false
                },
                MinCount: 1,
                MaxCount: 1,
                UserData: config
            };
            if (process.env.LOG_LEVEL === 'debug') {
                params.DryRun = true;
            }
            self.log.debug('type=aws_params', AWS.config);
            self.aws.runInstances(params, function(error, data) {
                if (error) {
                    reject(error.message);
                    return;
                }
                resolve(data.Instances[0]);
            });
        });
    };

    Aws.prototype.destroy = function(instance) {
        var self = this;
        self.log.debug('Destroying instance : %', instance);
        return new Promise(function(resolve, reject) {
            var params = {
                InstanceIds: [instance]
            };
            self.aws.terminateInstances(params, function(error, data) {
                if (error) {
                    reject(error.message);
                    return;
                } else {
                    resolve(data);
                }
            });
        });
    };

    module.exports = Aws;

})(module);
