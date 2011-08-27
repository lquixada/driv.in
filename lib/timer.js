var util = require('util');
var EventEmitter = require('events').EventEmitter;
var timers = new Array();

function Timer(identifier, duration) {
  EventEmitter.call(this);

  this.identifier = identifier;
  this.duration = duration;
  this.timer = null;
}

util.inherits(Timer, EventEmitter);

Timer.prototype.start = function() {
  var self = this;
  var currentTime = 0;

  clearInterval(self.timer);
  self.timer = null;

  self.timer = setInterval(function () {
    self.emit('current time', currentTime);
    if (++currentTime > self.duration) {
      self.stop();
      self.emit('timer finished');
      self.destroy();
    }
  }, 1000);
};

Timer.prototype.stop = function() {
  clearInterval(this.timer);
  this.timer = null;
};

Timer.prototype.destroy = function() {
  timers[this.identifier] = null;
  delete timers[this.identifier];
};

module.exports = {
  create: function(identifier, duration) {
    if (!timers[identifier]) {
      timers[identifier] = new Timer(identifier, duration);
    }
    return timers[identifier];
  }
};
