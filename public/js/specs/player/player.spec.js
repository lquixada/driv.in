
describe("Player", function() {
    beforeEach(function() {
        this.youtubeApiMock = {
            playVideo: jasmine.createSpy(),
            pauseVideo: jasmine.createSpy(),
            seekTo: jasmine.createSpy(),
            addEventListener: jasmine.createSpy(),
            setVolume: jasmine.createSpy(),
            mute: jasmine.createSpy(),
            unmute: jasmine.createSpy(),
            cueVideoById: jasmine.createSpy()
        };

        player.element = this.youtubeApiMock;
    });
    
    describe("init", function() {
        beforeEach(function() {
            player.init( {
                element: this.youtubeApiMock
            } );
        });
        
        it("should set the video element", function() {
            expect( player.element ).toBe( this.youtubeApiMock );
        });

        it("should set the video volume to the max", function() {
            expect( player.element.setVolume ).toHaveBeenCalledWith( 100 );
        });

        it("should set the video bufferLayer", function() {
            expect( player.bufferLayer instanceof jQuery ).toBe( true );
        });

        it("should hide the video bufferLayer", function() {
            expect( player.bufferLayer.is( ':hidden' ) ).toBe( true );
        });
    });

    describe("play", function() {
        it("should play the video", function() {
            player.play()

            expect( player.element.playVideo ).toHaveBeenCalled();
        });
    });

    describe("pause", function() {
        it("should pause the video", function() {
            player.pause();

            expect( player.element.pauseVideo ).toHaveBeenCalled();
        });
    });

    describe("forceBuffer", function() {
        it("should force the video to buffer", function() {
            player.forceBuffer();

            expect( player.element.playVideo ).toHaveBeenCalled();
            expect( player.element.pauseVideo ).toHaveBeenCalled();
        });
    });

    describe("seek", function() {
        it("should seek to a point in the video", function() {
            player.seekTo( 200 );

            expect( player.element.seekTo ).toHaveBeenCalledWith( 200, true );
        });
    });

    describe("bindEvent", function() {
        it("should bind an event listener to the video", function() {
            var listener = jasmine.createSpy();

            player.bindEvent( 'some-event', listener );

            expect( player.element.addEventListener ).toHaveBeenCalledWith( 'some-event', listener );
        });
    });
    
    describe("loadId", function() {
        it("should load the video id", function() {
            player.loadId( 123 );

            expect( player.element.cueVideoById ).toHaveBeenCalledWith( 123 );
        });

        it("should load the video id in a certain point", function() {
            player.loadId( 123, 20 );

            expect( player.element.cueVideoById ).toHaveBeenCalledWith( 123, 20 );
        });

        it("should load the video id at the beggining if secs not valid", function() {
            player.loadId( 123, -1 );

            expect( player.element.cueVideoById ).toHaveBeenCalledWith( 123 );
        });

        it("should load the video muted when player is muted", function() {
            player.mute = true;
            player.loadId( 123 );

            expect( player.element.mute ).toHaveBeenCalled();
        });
    });

    describe("toggleMute", function() {
        beforeEach(function() {
            player.init({
                element: this.youtubeApiMock 
            });
        });
        
        it("should init with mute off", function() {
            expect( player.mute ).toBe( false );
        });
        
        it("should mute video when audio is on", function() {
            player.toggleMute();

            expect( player.mute ).toBe( true );
            expect( player.element.mute ).toHaveBeenCalled();
        });

        it("should unmute video when audio is off", function() {
            // player starts with mute = false
            // Then set mute = true
            player.toggleMute();
            
            // And then test unmute
            player.toggleMute();

            expect( player.mute ).toBe( false );
            expect( player.element.unmute ).toHaveBeenCalled();
        });
    });
    
});

