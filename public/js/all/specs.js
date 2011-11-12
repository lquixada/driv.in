
var runners = [ 'Player', 'Playlist', 'Audience', 'Chat', 'User', 'Channel', 'Logger' ];

describe("Driv.in", function() {
    beforeEach(function() {
        window.tests = { done: false, success: false };        
    });

    afterEach(function() {
        removeIframe();
    });
    
    for ( var i=0; i<runners.length; i++) {
        (function (runner) {
            describe( runner+' Runner', function() {
                it("should have no errors", function() {
                    createIframe( '/js/'+runner.toLowerCase()+'/runner.html' );

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


function createIframe( url ) {
    var iframe = document.createElement( 'iframe' );

    iframe.src = url;

    document.body.insertBefore( iframe, document.body.firstChild );
}


function removeIframe() {
    var iframe = document.getElementsByTagName( 'iframe' )[0];
    iframe.parentNode.removeChild( iframe );
}
