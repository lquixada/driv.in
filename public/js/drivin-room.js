var room = {
    init: function () {
        this.div = $( 'div#video-audience' );
    },

    add: function ( user ) {
        var bottom = 20+Math.floor(Math.random()*151), /* de 20 a 120 */
            left = 50+Math.floor(Math.random()*451), /* de 50 a 450 */
            /* Perspective issue: the more far the driver is from the video, the closest he is to the user */
            zIndex = -bottom; 
    
        this.div.append( [
             '<div style="position:absolute; bottom:'+bottom+'px; left:'+left+'px; z-index:'+zIndex+';">',
                '<img src="'+user.avatar+'">',
             '</div>'
         ].join( '' ) ); 
    }
};
