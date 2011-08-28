var redis  = require('redis');
var Timer = require('./timer');

var Room = function(name, redisClient){
    this.users = new Array();
    this.name = name;
    this.client = redisClient;
    this.playlistId = name + ':playlist';
    this.videoChannel = name + ':video';
    this.playing = false;
};

Room.prototype.notPlaying = function() {
    return !this.playing;
};

Room.prototype.playNextVideo = function() {
    console.log('will play next video');
    var self = this;
    
    self.popCurrentMedia(function(err, media) {
      console.log(media);
      if (media) { 
        self.broadcast('next video', media.id);
        setTimeout(function() {
          self.startTimer(media);
        }, 5000);
      }
    });
};

Room.prototype.startTimer = function(media) {


     var timer = Timer.create(this.videoChannel, parseInt(media.duration, 10));
     timer.start();

     this.playing = true;

     this.broadcast('video started');

     var self = this;
     timer.on('current time', function(currentTime) {
       console.log(currentTime + " seconds passed");
     });
     timer.on('timer finished', function() {
       self.broadcast('video ended');
       console.log('video ended');
       self.playing = false;
       self.playNextVideo();
     });
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
            console.log('added and will start another video');
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
