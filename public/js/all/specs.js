
var runners = [ 'Player', 'Playlist', 'Audience', 'Chat', 'User', 'Channel', 'Logger' ];

describe("Driv.in", function() {
    beforeEach(function() {
        window.tests = { done: false, success: false };        
    });

    afterEach(function() { 
        $( 'div#main' ).html( '' );
    });
    
    for ( var i=0; i<runners.length; i++) {
        (function (runner) {
            describe( runner+' Runner', function() {
                it("should have no errors", function() {
                    var url = '/js/'+runner.toLowerCase()+'/runner.html';

                    $( 'div#main' ).html( '<iframe src="'+url+'"></iframe>' );

                    waitsFor(function() {
                        return window.tests.done;
                    }, "Tests suite never never completed", 10000 );

                    runs(function () {
                        expect( window.tests.success ).toBe( true );
                    });
                });
            });
        })(runners[i]);
    };
}); 
