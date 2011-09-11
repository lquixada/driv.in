savedCode = '';

beforeEach(function() {
    savedCode = $( 'div#main' ).html();
});

afterEach(function() { 
    $( 'div#main' ).html( savedCode );
});


describe("Chat", function() {
    
    describe("User message input", function() {
        
        beforeEach(function() {
            this.enterKey = $.Event( 'keydown', { keyCode: 13 } );
            this.input = $( 'section#chat' ).find( 'input#user-message' );
            this.ul = $( 'section#chat' ).find( 'ul' ); 
            
            chat.init();
        });

        it("should show user message on message list", function() {
            this.input.val( 'foo bar' );
            this.input.trigger( this.enterKey );

            expect( this.ul.find( 'li' ).size() ).toBe( 1 );
            expect( this.ul.find( 'li' ).text() ).toMatch( /foo bar$/ );
        });

        it("should clear the input when message is sent", function() {
            this.input.val( 'foo bar' );
            this.input.trigger( this.enterKey );

            expect( this.input.val() ).toBe( '' );
        });

        it("should not send empty messages", function() {
            this.input.val( '' );
            this.input.trigger( this.enterKey );

            expect( this.ul.find( 'li' ).size() ).not.toBe( 1 );
        });

        it("should show user name on message list", function() {
            chat.userName = 'John';

            this.input.val( 'foo bar' );
            this.input.trigger( this.enterKey );

            expect( this.ul.find( 'li' ).size() ).toBe( 1 );
            expect( this.ul.find( 'li strong' ).text() ).toBe( 'John' );
        });

        it("should not send text to the message list when key is not Enter", function() {
            this.input.val( 'foo' );
            this.input.keydown();
            
            expect( this.ul.find( 'li' ).size() ).toBe( 0 );
        });

        it("should publish the text", function() {
            var message, subscriber;

            subscriber = $.subscribe( 'message.chat', function ( event, data ) {
                message = data.message;
            });

            this.input.val( 'foo bar' );
            this.input.trigger( this.enterKey );

            waits(50);

            runs(function() {
                expect( message ).toBe( 'foo bar' );
                subscriber.unsubscribe();
            });
        });
        
    });

    describe("User name input", function() {

        beforeEach(function() {
            this.enterKey = $.Event( 'keydown', { keyCode: 13 } );
            this.inputUserName = $( 'section#chat' ).find( 'input#user-name' );

            chat.init();
        });

        it("should publish the new user name", function() {
            var userName, subscriber;

            subscriber = $.subscribe( 'username.chat', function ( event, data ) {
                userName = data.userName;
            });

            this.inputUserName.val( 'John' );
            this.inputUserName.trigger( this.enterKey );

            waits(50);

            runs(function() {
                expect( userName ).toBe( 'John' );
                subscriber.unsubscribe();
            });
        });

        it("should not publish while Enter key is not pressed", function() {
            var subscriber;
            
            subscriber= $.subscribe( 'username.chat', jasmine.createSpy() );

            this.inputUserName.val( 'Jo' );
            this.inputUserName.keydown();

            waits(50);

            runs(function() {
                expect( subscriber.callback ).not.toHaveBeenCalled();
                subscriber.unsubscribe();
            });
        });

    });    
    
});    

