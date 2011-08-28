var redis  = require('redis');
var Timer = require('./timer');

var Room = function(name, redisClient){
    this.users = new Array();
    this.name = name;
    this.client = redisClient;
    this.playlistId = name + ':playlist';
    this.videoChannel = name + ':video';
    this.currentMedia = null;
    this.currentTime = 0;
};

Room.prototype.playing = function() {
    return this.currentMedia;
};

Room.prototype.moveUserForward = function(user) {
    var secondsForward = 10;
    var currentMedia = this.currentMedia;
    var latencyCompensation = 2;

    console.log('will send user forward');
    user.emit('move forward', currentMedia.id, this.currentTime + secondsForward);
    console.log('sended user forward');

    var self = this;
    setTimeout(function() {
      console.log('this.currentMedia:' + self.currentMedia.id);
      console.log('currentMedia:' + currentMedia.id);
      if (currentMedia.id == self.currentMedia.id) {
        user.emit('play now');
      }
    }, (secondsForward-latencyCompensation) * 1000);
};

Room.prototype.playNextVideo = function() {
    console.log('will play next video');
    var self = this;

    self.popCurrentMedia(function(err, media) {
      console.log(media);
      if (media) {
        self.broadcast('next video', media);
        setTimeout(function() {
          self.startTimer(media);
        }, 5000);
      }
    });
};

Room.prototype.startTimer = function(media) {
     var timer = Timer.create(this.videoChannel, parseInt(media.duration, 10));
     timer.start();

     this.currentMedia = media;

     this.broadcast('video started');

     var self = this;
     timer.on('current time', function(currentTime) {
       self.currentTime = currentTime;
       console.log(currentTime + " seconds passed");
     });
     timer.on('timer finished', function() {
       self.broadcast('video ended');
       console.log('video ended');
       self.currentMedia = null;
       self.currentTime = 0;
       self.playNextVideo();
     });
};

Room.prototype.broadcast = function(event, message) {
    this.users.forEach(function(user) {
      user.emit(event, message);
    });
};

Room.prototype.addUser = function(user) {
    console.log('user added')
    user.join(this.playList);
    user.join(this.videoChannel);
    this.users.push(user);
};

Room.prototype.clear = function(){
    this.client.del(this.playlistId);
};

Room.prototype.addMedia = function(media, f){
    console.log('adding media');
    var self = this;
    this.client.rpush(this.playlistId, JSON.stringify(media), function (err) {
        self.broadcast('video added', media);
        if (!self.playing()) {
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

Room.prototype.playlist = function(f){
    this.client.lrange(this.playlistId, 1, -1, function(err, playlist) {
        console.log('playlist err: ' + err);
        if(!playlist){
            playlist = [];
        }

        f(playlist.map(function(e) {
            return JSON.parse(e);
        }));
    });
};

Room.prototype.popCurrentMedia = function(f){
    this.client.lpop(this.playlistId, function(err, media) {
      f(err, JSON.parse(media));
    });
};

module.exports = Room;
