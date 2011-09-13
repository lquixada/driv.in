
var Runners = {
    'Player': '/js/specs/player/SpecRunner.html',
    'Playlist': '/js/specs/playlist/SpecRunner.html',
    'Audience': '/js/specs/audience/SpecRunner.html',
    'Chat': '/js/specs/chat/SpecRunner.html',
    'User': '/js/specs/user/SpecRunner.html'
}


describe("Driv.in", function() {
    beforeEach(function() {
        window.done = false;
        window.noErrors = false;        
    });

    afterEach(function() { 
        $( 'div#main' ).html( '' );
    });
    
    for (var Runner in Runners) {
        var url = Runners[Runner];

        (function (Runner, url) {

            describe( Runner, function() {
                it("should have no errors", function() {
                    $( 'div#main' ).html( '<iframe src="'+url+'"></iframe>' );

                    waitsFor(function() {
                        return window.done;
                    }, "Tests suite never never completed", 10000 );

                    runs(function () {
                        expect( window.noErrors ).toBe( true );
                    });
                });
            });

        }(Runner, url));
    };

}); 
