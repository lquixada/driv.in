function User( options ) {
    this.id = options.id;
    this.name = options.name;
    this.avatar = options.avatar;
}

User.prototype = {
    speak: function ( message ) {
        var balloon = this.element.find( 'span.user-balloon' );
        
        balloon.html( '<strong>'+this.name+'</strong> '+message ).show();

        clearTimeout( this.timer );

        this.timer = setTimeout( function () {
            balloon.hide();
        }, 4000 )
    },

    render: function () {
        this.element = $( [
            '<div class="user" id="'+this.id+'">',
                '<span class="user-balloon" style="display:none;"></span>',
                '<img class="user-avatar" src="'+this.avatar+'" width="150" height="150">',
            '</div>'
        ].join( '' ) );

        return this.element;
    },

    remove: function () {
        this.element.remove();
    }
};
