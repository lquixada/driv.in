
var User = function ( options ) {
    this.name = options.name || 'Driver';
    this.avatar = options.avatar || 'img/driver03.png';
};


User.prototype.draw = function () {
    this.element = $( [
            '<div class="user">',
                '<span class="user-ballon"></span>',
                '<img class="user-avatar" src="'+this.avatar+'">',
            '</div>'
        ].join('') );

    return this.element;
}

User.prototype.send = function ( message ) {
    this.speak( message );
    // Send message through socket
};

User.prototype.speak = function ( message ) {
    var that = this;

    if ( this.element ) {
        this.element.find( 'span.user-ballon' ).html( message ).show();
        
        clearTimeout( this.timerSpeak );

        this.timerSpeak = setTimeout( function () {
            that.element.find( 'span.user-ballon' ).fadeOut( 'fast' );
        }, 4000 );
    }
};
