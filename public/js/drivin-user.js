
var User = function ( options ) {
    this.name = options.name || 'Driver';
    this.avatar = options.avatar || 'img/driver03.png';
    
    this.addToStage();
};

User.prototype.send = function ( message ) {
    console.log( this.name+' says: ' + message );
};

User.prototype.addToStage = function () {
    var top = Math.floor(Math.random()*51),
        left = Math.floor(Math.random()*501);
    
    $( 'div#video-audience' ).append( [
         '<div style="position:absolute; top:'+top+'px; left:'+left+'px;">',
            '<img src="'+this.avatar+'">',
         '</div>'
     ].join( '' ) );
}
