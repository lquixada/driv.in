
var audience = {
    users: {},

    init: function () {
        this.divUserSpace = $( 'div#user-space' );

        this.bindSubscribers();
    },

    add: function ( data ) {
        //console.log(data);
        var divUser,
            user = new User( data );
            width = this.divUserSpace.width(),
            height = this.divUserSpace.height(),
            left = Math.floor( Math.random()*(width-100) ), /* from 50 to 450 */
            bottom = Math.floor( Math.random()*height ); /* from 20 to 120 */
        
        this.users[user.id] = user;
        //console.log('HUM?');
        //console.log(this.users[user.id]);
        divUser = user.render();
        divUser.css({
            bottom: bottom,
            left: left,
            /* Perspective issue: the more far the driver is from the video,
             * the closest he is to the user */
            zIndex: -bottom
        });

        this.divUserSpace.append( divUser );
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
            console.log( data );
            that.speak( data );
        } );
    },

    remove: function ( data ) {
        var user = this.users[data.id];

        user.remove();

        delete this.users[data.id];
    },

    speak: function ( data ) {
        this.users[data.userId].name = data.userName;
        this.users[data.userId].speak( data.userMessage );
    }
};
