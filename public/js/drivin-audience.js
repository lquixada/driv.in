var audience = {
    users: {},

    init: function () {
        var that = this;

        this.div = $( 'div#video-audience' );
        this.divSpace = this.div.find( 'div#user-space' );

        socket.on('user join', function(user) {
          debugInfo('user join:' + user.id);
          that.add(new User( {id: user.id, name: user.name, avatar:'img/avatar01.png'}));
        });

        socket.on('user leave', function(user) {
          debugInfo('user leave:' + user.id);
          that.remove(new User({id: user.id}));
        });
    },

    add: function ( user ) {
        this.users[user.id] = user;

        var width = this.divSpace.width(),
            height = this.divSpace.height(),
            bottom = Math.floor( Math.random()*height ), /* de 20 a 120 */
            left = Math.floor( Math.random()*(width-100) ), /* de 50 a 450 */
            /* Perspective issue: the more far the driver is from the video, the closest he is to the user */
            zIndex = -bottom; 
        
        divUser = user.draw();
        divUser.css({
            bottom: bottom,
            left: left,
            zIndex: zIndex
        });

        this.divSpace.append( divUser ); 
    },

    remove: function(user) {
      user.remove();
      this.users[user.id] = null;
    }

};
