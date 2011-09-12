function User( options ) {
    this.id = options.id;
    this.name = options.name;
    this.avatar = options.avatar;
}

User.prototype = {
    speak: function ( message ) {
        $( 'div.user' ).find( 'span.user-balloon' ).html( '<strong>'+this.name+'</strong> '+message );
    }
};
