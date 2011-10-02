
beforeEach(function() {
    this.divMain = $( 'div#main' );
    this.savedCode = this.divMain.html();
});

afterEach(function() { 
    this.divMain.html( this.savedCode );
    
    $.unsubscribeAll();
});
