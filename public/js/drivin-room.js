var room = {
    init: function () {
        this.div = $( 'div#video-audience' );
        this.divSpace = this.div.find( 'div#user-space' );
    },

    add: function ( user ) {
        console.log(this.divSpace.width());
        var width = this.divSpace.width(),
            height = this.divSpace.height(),
            bottom = Math.floor(Math.random()*height), /* de 20 a 120 */
            left = Math.floor(Math.random()*(width-100)), /* de 50 a 450 */
            /* Perspective issue: the more far the driver is from the video, the closest he is to the user */
            zIndex = -bottom; 
    
        this.divSpace.append( [
             '<div style="position:absolute; bottom:'+bottom+'px; left:'+left+'px; z-index:'+zIndex+';">',
                '<img src="'+user.avatar+'">',
             '</div>'
         ].join( '' ) ); 
    }
};
