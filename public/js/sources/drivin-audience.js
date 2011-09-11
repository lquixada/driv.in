
var audience = {
    users: {},

    init: function () {
        var that = this;

        this.divUserSpace = $( 'div#user-space' );

        $.subscribe( 'user-added', function ( event, message ) {
            that.add( message );
        } );
        
        $.subscribe( 'user-removed', function ( event, message ) {
            that.remove( message );
        } );
    },

    add: function ( user ) {
        var element,
            width = this.divUserSpace.width(),
            height = this.divUserSpace.height(),
            left = Math.floor( Math.random()*(width-100) ), /* from 50 to 450 */
            bottom = Math.floor( Math.random()*height ); /* from 20 to 120 */
        
        this.users[user.id] = user;

        element = $( [
            '<div id="'+user.id+'">',
                '<span class="user-balloon"></span>',
                '<img class="user-avatar" src="'+user.avatar+'">',
            '</div>'
        ].join( '' ) );
        
        element.css({
            bottom: bottom,
            left: left,
            /* Perspective issue: the more far the driver is from the video,
             * the closest he is to the user */
            zIndex: -bottom
        });

        this.divUserSpace.append( element );
    },

    remove: function ( user ) {
        delete this.users[user.id];

        this.divUserSpace.find( 'div#'+user.id ).remove();
    }
};
