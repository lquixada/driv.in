
var audience = {
    users: {},

    init: function () {
        this.divUserSpace = $( 'div#user-space' );

        this.bindSubscribers();
    },

    add: function ( data ) {
        var divUser,
            user = new User( data ),
            /* random percentages: from 0.00 to 100.00 */
            left = Math.floor( Math.random()*10000 )/100, 
            bottom = Math.floor( Math.random()*10000 )/100;
        
        this.users[user.id] = user;
        
        divUser = user.render();
        divUser.css({
            bottom: bottom+'%',
            left: left+'%',
            /* Perspective issue: the more far the driver is from the video,
             * the closest he is to the user */
            zIndex: -Math.floor(bottom*100) 
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
            that.speak( data );
        } );
    },

    remove: function ( data ) {
        var user = this.users[data.id];
        
        // If user disconnects (ex: reloads the page) before
        // the user DOM renders, it throws an error.
        // use try ... finally instead?
        if (user) {
            user.remove();
        }

        delete this.users[data.id];
    },

    speak: function ( data ) {
        this.users[data.userId].name = data.userName;
        this.users[data.userId].speak( data.userMessage );
    }
};

