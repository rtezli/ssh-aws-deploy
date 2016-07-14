(function(module) {
    'use strict';

    function check(user, password) {
        return true;
    }

    function generate(user, password) {
        var config = '#cloud-config\nusers:\n' + '  - name: "' + user + '"\n' + '    passwd: "' + password + '"\n';
        return new Buffer(config).toString('base64');
    }

    module.exports = {
        generate: generate
    };
})(module);
