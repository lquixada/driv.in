global.Node = {
    env: process.env.NODE_ENV || 'test'
};

require('../config/boot');

global.testCase = require('nodeunit').testCase;
global.app = {};