
var User = function ( options ) {
    this.name = options.name || 'Driver';
    this.avatar = options.avatar || 'img/driver03.png';
};


User.prototype.draw = function () {
    this.element = $( [
            '<div class="user">',
                '<span class="user-balloon"></span>',
                '<img class="user-avatar" src="'+this.avatar+'" width="150" height="150">',
            '</div>'
        ].join('') );

    return this.element;
}


User.prototype.speak = function ( message ) {
    var element = this.element;

    if ( element ) {
        element.find( 'span.user-balloon' ).html( message ).show();
        
        clearTimeout( this.timerSpeak );

        this.timerSpeak = setTimeout( function () {
            //element.find( 'span.user-ballon' ).fadeOut( 'fast' );
        }, 4000 );
    }
};
