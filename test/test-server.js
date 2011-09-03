var testCase  = require('nodeunit').testCase;
var dbCleaner = new require('database-cleaner')('redis');

var redisClient = require('redis')
    .createClient(6379, 'localhost');

var Room = require('../lib/room');
var room = new Room('room1', redisClient);

module.exports = testCase({
    setUp: function(callback){
        // TODO: require server and boot app!
    },
    tearDown: function(callback){
        dbCleaner.clean(redisClient, callback);
    },

    'should GET index of hot rooms': function(test){
        httputil(app.cgi(), function(server, client){
            client.fetch('GET', '/', {}, function(resp){
                test.equals('hello world', resp.body);
                test.done();
            });
        });
    }
});

