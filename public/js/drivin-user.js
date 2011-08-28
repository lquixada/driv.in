
var User = function ( options ) {
    this.id = options.id;
    this.name = options.name || 'Driver';
    this.avatar = options.avatar || 'img/driver03.png';
};


User.prototype.draw = function () {
    var self = this;
    this.element = $( [
            '<div class="user" id="' + self.id  + '">',
                '<span class="user-balloon"></span>',
                '<img class="user-avatar" src="'+this.avatar+'" width="150" height="150">',
            '</div>'
        ].join('') );

    return this.element;
}

User.prototype.remove = function() {
  $( '#' + this.id ).remove();
},

User.prototype.speak = function ( userName, message ) {
    var element = this.element;

    if ( element ) {
        message = '<strong>'+userName+'</strong>'+message;
        element.find( 'span.user-balloon' ).html( message ).show();
        
        clearTimeout( this.timerSpeak );

        this.timerSpeak = setTimeout( function () {
            element.find( 'span.user-balloon' ).fadeOut( 'fast' );
        }, 4000 );
    }
};
