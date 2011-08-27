var redis  = require('redis');
var client = redis.createClient( 6379, 'localhost');

var Room = require('../lib/room');
var room = new Room('room1', client);

var setUp = function(){
    client.del  (room.playlistId);
    client.rpush(room.playlistId, 'url1');
    client.rpush(room.playlistId, 'url2');
};

var tearDown = function(t){
    client.del(room.playlistId);
    t.done();
};

exports.testPlaylistClear = function(test){
    setUp();
    room.clear();

    client.llen(room.playlistId, function(e, val){
        test.equal(0, val);
        tearDown(test);
    });
};

exports.testAddMedia = function(test){
    setUp();
    room.addMedia('url3', function(e, val){
        client.llen(room.playlistId, function(elen, length){
            test.equal(3, length);
        });

        client.rpop(room.playlistId, function(etail, tail){
            test.equal('url3', tail);
            tearDown(test);
        });
    });
};

exports.testCurrentMedia = function(test){
    setUp();
    room.currentMedia(function(e, current){
        test.equal('url1', current);

        client.llen(room.playlistId, function(elen, length){
            test.equal(2, length);
            tearDown(test);
        });
    });
};

exports.testPopCurrentMedia = function(test){
    setUp();
    room.popCurrentMedia(function(e, head){
        test.equal('url1', head);

        client.llen(room.playlistId, function(elen, length){
            test.equal(1, length);
            tearDown(test);
        });
    });

};
