
var User = function ( options ) {
    this.name = options.name || 'Driver';
    this.avatar = options.avatar || 'img/driver03.png';
};

User.prototype.send = function ( message ) {
    console.log( this.name+' says: ' + message );
};

