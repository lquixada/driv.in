var redis  = require('redis');
var Room = function(name, redisClient){
    this.users = new Array();
    this.name = name;
    this.client = redisClient;
    this.playlistId = name + ':playlist';
    this.videoChannel = name + ':video';
};

Room.prototype.broadcast = function(event, message) {
    this.users.forEach(function(user) {
      user.emit(event, message);
    });
};

Room.prototype.addUser = function(user) {
    user.join(this.playList);
    user.join(this.videoChannel);
    this.users.push(user);
};

Room.prototype.clear = function(){
    this.client.del(this.playlistId);
};

Room.prototype.addMedia = function(url, f){
    this.client.rpush(this.playlistId, url, f);
};

Room.prototype.currentMedia = function(f){
    this.client.lrange(this.playlistId, 0, 0, f);
};

Room.prototype.popCurrentMedia = function(f){
    this.client.lpop(this.playlistId, f);
};

module.exports = Room;
