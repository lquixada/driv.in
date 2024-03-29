// TODO: this require should happen once on all app
require('./javascriptSupport');

var redis  = require('redis');
var Timer = require('./timer');

var Room = function(name, redisClient){
    this.users = new Array();
    this.name = name;
    this.client = redisClient;
    this.playlistId = name + ':playlist';
    this.blamesId = name + ':blames';
    this.videoChannel = name + ':video';
    this.currentMedia = null;
    this.currentTime = 0;
    this.blamesCount = 0;
    this.timer = null;
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
      console.log('move user foward timeout');
      if(!self.currentMedia){
          console.log("video finished before user's seek");
          return;
      }

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
     this.timer = Timer.create(this.videoChannel, parseInt(media.duration, 10));
     this.timer.start();

     this.currentMedia = media;

     this.broadcast('video started');

     var self = this;
     this.timer.on('current time', function(currentTime) {
       self.currentTime = currentTime;
       console.log("room:" + self.name + " [" + currentTime + " seconds passed]");
     });

     this.timer.on('timer finished', function() {
       self.broadcast('video ended');
       console.log('video ended');
       self.currentMedia = null;
       self.currentTime = 0;
       self.timer = null;
       self.playNextVideo();
     });
};

Room.prototype.broadcast = function(event, message) {
    this.users.forEach(function(user) {
      user.emit(event, message);
    });
};

Room.prototype.addUser = function(user, f) {
    user.join(this.playList);
    user.join(this.videoChannel);

    if(this.users.indexOf(user) < 0){
        this.users.push(user);
    }

    if(f){ return f(user); }
};

Room.prototype.removeUser = function(user, f) {
    while(this.users.indexOf(user) >= 0){
        this.users.remove(this.users.indexOf(user));
    }

    if(f){ return f(user); }
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

Room.prototype.dropMedia = function(){
    console.log('dropping media on ' + this.name);
    this.timer.end();
    this.blamesReset();
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

Room.prototype.blamesReset = function(f){
    console.log('room ' + this.name + ' blames reseted');
    this.blamesCount = 0;
    if(f){ f(this.blamesCount); }
};

Room.prototype.blames = function(f){
    if(f){ f(this.blamesCount); }
};

Room.prototype.blame = function(f){
    this.blamesCount += 1;

    if(this.blamesCount > this.users.length / 2){
        this.dropMedia();
    }

    if(f){ f(this.blamesCount); }
};


module.exports = Room;
