var redis  = require('redis');
var Timer = require('./timer');

var Room = function(name, redisClient){
    this.users = new Array();
    this.name = name;
    this.client = redisClient;
    this.playlistId = name + ':playlist';
    this.videoChannel = name + ':video';
};

Room.prototype.notPlaying = function() {
    return true;
};

Room.prototype.playNextVideo = function() {
    console.log('will play next video');
    var self = this;
    
    // self.popCurrentMedia(function(err, media) {

    // });

    self.broadcast('next video');
  
    setTimeout(function() {
      self.timer = Timer.create(self.videoChannel, 20);
      self.timer.start();

      self.broadcast('video started');

      self.timer.on('current time', function(currentTime) {
        console.log(currentTime + " seconds passed");
      });
      self.timer.on('timer finished', function() {
        self.broadcast('video ended');
        console.log('video ended');
        self.playNextVideo();
      });
    }, 5000);
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

Room.prototype.addMedia = function(media, f){
    var self = this;
    this.client.rpush(this.playlistId, JSON.stringify(media), function (err) {
        self.broadcast('video added', media);
        if (self.notPlaying()) {
            self.playNextVideo();
        }

        if(f) { f(err); }
    });
};

Room.prototype.currentMedia = function(f){
    this.client.lrange(this.playlistId, 0, 0, function(err, media) {
      f(err, JSON.parse(media));
    });
};

Room.prototype.popCurrentMedia = function(f){
    this.client.lpop(this.playlistId, function(err, media) {
      f(err, JSON.parse(media));
    });
};

module.exports = Room;
