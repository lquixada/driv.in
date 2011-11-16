
describe("Driv.in", function() {
    beforeEach(function() {
        window.tests = { done: false, success: false };        
    });

    afterEach(function() {
        removeIframe();
    });
    
    describe( 'Player Runner', function() {
        it("should have no errors", function() {
            testRunner( 'Player' );
        });
    });

    describe( 'Playlist Runner', function() {
        it("should have no errors", function() {
            testRunner( 'Playlist' );
        });
    });

    describe( 'Audience Runner', function() {
        it("should have no errors", function() {
            testRunner( 'Audience' );
        });
    });

    describe( 'Chat Runner', function() {
        it("should have no errors", function() {
            testRunner( 'Chat' );
        });
    });

    describe( 'User Runner', function() {
        it("should have no errors", function() {
            testRunner( 'User' );
        });
    });

    describe( 'Channel Runner', function() {
        it("should have no errors", function() {
            testRunner( 'Channel' );
        });
    });

    describe( 'Logger Runner', function() {
        it("should have no errors", function() {
            testRunner( 'Logger' );
        });
    });
});


function testRunner(runner) {
    createIframe( '/js/'+runner.toLowerCase()+'/runner.html' );

    waitsFor(function() {
        return window.tests.done;
    }, "Tests suite never never completed", 10000 );

    runs(function () {
        expect( window.tests.success ).toBe( true );
    });
}

function createIframe( url ) {
    var iframe = document.createElement( 'iframe' );

    iframe.src = url;

    document.body.insertBefore( iframe, document.body.firstChild );
}


function removeIframe() {
    var iframe = document.getElementsByTagName( 'iframe' )[0];
    iframe.parentNode.removeChild( iframe );
}
