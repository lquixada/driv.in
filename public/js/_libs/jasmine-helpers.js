
beforeEach(function() {
    this.divMain = $( 'div#main' );
    this.savedCode = this.divMain.html();
});

afterEach(function() { 
    this.divMain.html( this.savedCode );

    $( document ).unbind( 'user-name-changed' );
    $( document ).unbind( 'user-message-received' );
    $( document ).unbind( 'user-message-sent' );
    $( document ).unbind( 'video-added' );
    $( document ).unbind( 'video-ended' );
    $( document ).unbind( 'video-next' );
});
