
var audience = {
    users: {},

    init: function () {
        this.divUserSpace = $( 'div#user-space' );

        this.bindSubscribers();
    },

    add: function ( user ) {
        var element,
            width = this.divUserSpace.width(),
            height = this.divUserSpace.height(),
            left = Math.floor( Math.random()*(width-100) ), /* from 50 to 450 */
            bottom = Math.floor( Math.random()*height ); /* from 20 to 120 */
        
        this.users[user.id] = user;

        element = $( [
            '<div class="user" id="'+user.id+'">',
                '<span class="user-balloon" style="display:none;"></span>',
                '<img class="user-avatar" src="'+user.avatar+'" width="150" height="150">',
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

    bindSubscribers: function () {
        var that = this;

        $.subscribe( 'user-added', function ( event, user ) {
            that.add( user );
        } );
        
        $.subscribe( 'user-removed', function ( event, user ) {
            that.remove( user );
        } );

        $.subscribe( 'user-message-received', function ( event, data ) {
            that.speak( data, data.message );
        } );
    },

    remove: function ( user ) {
        delete this.users[user.id];

        this.divUserSpace.find( 'div#'+user.id ).remove();
    },

    speak: function ( data ) {
        var balloon = this.divUserSpace.find( 'div#'+data.userId+' span.user-balloon' );

        balloon.html( '<strong>'+data.userName+'</strong> '+data.userMessage )
            .show();
        
        clearTimeout(this.timer);

        this.timer = setTimeout(function () {
            balloon.hide();
        }, 4000 );
    }
};
