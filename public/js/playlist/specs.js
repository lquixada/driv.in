beforeEach(function() {
    // Disabling temporarily for tests
    playlist.updateTrackDuration = jasmine.createSpy();
});


describe("Playlist", function() {

    describe("setCurrentTrack", function() {
        it("should display the new track", function() {
            playlist.init();
            playlist.setCurrentTrack( 'Some Title', '1:23' );

            expect( playlist.marquee.text() ).toBe( 'Some Title' );
            expect( playlist.span.text() ).toBe( '1:23' );
        });
    });

    describe("goToNextTrack", function() {
        it("should remove the top track from the playlist", function() {
            var video = { id: 1, title: 'Title 01', duration: '1:23' };
            
            playlist.init();

            playlist.ul.html( '' ).append( [
                '<li id="'+video.id+'"><img src="thumb01.jpg" />'+video.title+'</li>',
                '<li id="456"><img src="thumb02.jpg" />Title 02</li>'
            ].join('') );

            playlist.goToNextTrack( video );

            expect( playlist.ul.find( 'li:first' ).text() ).toBe( 'Title 02' );

            expect( playlist.marquee.text() ).toBe( video.title );
            expect( playlist.span.text() ).toBe( video.duration );
        });
    });

    describe("addTrack", function() {
        beforeEach(function() {
            this.url = 'http://www.youtube.com?v=abc';
        });
        
        it("should add a new track to the playlist", function() {
            var li, video = { id: 3, title: 'Title 03', thumbUrl: 'thumb01.jpg', duration: '3:03' };
            
            playlist.ul.html( '' ).append( [
                '<li id="1"><img src="thumb01.jpg" />Title 01</li>',
                '<li id="2"><img src="thumb02.jpg" />Title 02</li>'
            ].join('') );
            
            playlist.addTrack( video );
            
            li = playlist.ul.find( 'li:eq(2)' );

            expect( li.text() ).toBe( video.title );
            expect( li.attr( 'id' ) ).toBe( String( video.id ) );
            expect( li.find( 'img' ).attr( 'src' ) ).toBe( video.thumbUrl );
        });

        it("should allow user to add video through input and button", function() {
            var message, subscriber;

            subscriber = $.subscribe( 'video:sent', function ( event, data ) {
                message = data;
            }); 
            
            playlist.init();
            playlist.input.val( this.url );
            playlist.button.click();

            waits(50);

            runs(function() {
                expect( message ).toBe( this.url );
                subscriber.unsubscribe();
            }); 
        });

        it("should clear the video url when user add video", function() {
            var url = 'http://www.youtube.com?v=abc',
                message,
                subscriber;

            playlist.init();
            playlist.input.val( url );
            playlist.button.click();

            expect( playlist.input.val() ).toBe( '' );
        }); 
    });

    describe("tomatoes", function() {
        it("should publish tomato thrown", function() {
            var tomatoThrown = false, subscriber;

            subscriber = $.subscribe( 'tomato:thrown', function ( event, data ) {
                tomatoThrown = true;
            });
            
            playlist.init();
            playlist.a.click();

            waits(50);

            runs(function() {
                expect( tomatoThrown ).toBe( true );
                subscriber.unsubscribe();
            }); 
        });

        it("should disable the tomato button when clicked", function() {
            playlist.init();
            playlist.a.click();

            expect( playlist.a.hasClass( 'disabled' ) ).toBe( true );
        });
    });
    
    describe("listen to the PubSub", function() {
        it("should add video on video:added", function() {
            var video = { id: 3, title: 'Title 03', thumbUrl: 'thumb01.jpg', duration: '3:03' };

            playlist.init();
            playlist.addTrack = jasmine.createSpy();

            $.publish( 'video:added', video );
            
            waits(50);
            
            runs(function() {
                expect( playlist.addTrack ).toHaveBeenCalledWith( video );
            }); 
        });

        it("should clear current video on video:ended when none available", function() {
            playlist.init();
            playlist.setCurrentTrack = jasmine.createSpy();
            playlist.ul.html( '' );

            $.publish( 'video:ended' );
            
            waits(50);
            
            runs(function() {
                expect( playlist.setCurrentTrack ).toHaveBeenCalledWith( '', '' );
            }); 
        });

        it("should not clear current video on video:ended when one is available", function() {
            playlist.init();
            playlist.setCurrentTrack = jasmine.createSpy();
            playlist.ul.html( '<li></li>' );

            $.publish( 'video:ended' );
            
            waits(50);
            
            runs(function() {
                expect( playlist.setCurrentTrack ).not.toHaveBeenCalledWith( '', '' );
            }); 
        });

        it("should go to next video on video:next", function() {
            var video = { id: 1 };

            playlist.init();
            playlist.goToNextTrack = jasmine.createSpy();

            $.publish( 'video:next', video );
            
            waits(50);
            
            runs(function() {
                expect( playlist.goToNextTrack ).toHaveBeenCalledWith( video );
            }); 
        });

        it("should enable tomatoes on video:next", function() {
            var video = {};

            playlist.init();
            playlist.a.addClass( 'disabled' );
            playlist.goToNextTrack = jasmine.createSpy();

            $.publish( 'video:next', video );
            
            waits(50);
            
            runs(function() {
                expect( playlist.a.hasClass( 'disabled' ) ).toBe( false );
            }); 
        });
    });
    
});
