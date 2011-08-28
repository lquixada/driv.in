var testCase = require('nodeunit').testCase,
    DatabaseCleaner = require('database-cleaner'),
    databaseCleaner = new DatabaseCleaner('redis');
var redis  = require('redis');
var client = redis.createClient( 6379, 'localhost');

var Room = require('../lib/room');
var room = new Room('room1', client);

module.exports = testCase({
  setUp: function (callback) {
    client.del  (room.playlistId);
    client.rpush(room.playlistId, JSON.stringify({url: 'url1'}));
    client.rpush(room.playlistId, JSON.stringify({url: 'url2'}));
    callback();
  },

  tearDown: function (callback) {
    databaseCleaner.clean(client, callback);
  },

  'should clean the playlist': function(test) {
    room.clear();

    client.llen(room.playlistId, function(e, val){
        test.equal(0, val);
        test.done();
    });
  },

  'should add media to room': function(test) {
    room.broadcast     = function(){}; // stub off
    room.playNextVideo = function(){}; // stub off

    room.addMedia({url:'url3'}, function(e, val){
        client.llen(room.playlistId, function(elen, length){
            test.equal(3, length);
        });

        client.rpop(room.playlistId, function(etail, tail){
            var media = JSON.parse(tail)
            test.equal('url3', media.url);
            test.done();
        });
    });
  },

  'should retreive the current media': function(test) {
        room.currentMedia(function(e, current){
            test.equal('url1', current.url);

            client.llen(room.playlistId, function(elen, length){
                test.equal(2, length);
                test.done();
            });
        });
  },

  'should retreive playlist': function(test) {
    client.rpush(room.playlistId, JSON.stringify({url: 'url3'}));
    room.playlist(function(e, playlist){
      test.equal(2,      playlist.length);
      test.equal('url2', playlist[0]['url']);
      test.equal('url3', playlist[1]['url']);
      test.done();
    });
  },

  'should pop the current media': function(test) {
    room.popCurrentMedia(function(e, head){
        test.equal('url1', head.url);

        client.llen(room.playlistId, function(elen, length){
            test.equal(1, length);
            test.done();
        });
    });
  }
});
