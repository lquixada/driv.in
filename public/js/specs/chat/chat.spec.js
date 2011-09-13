
describe("Chat", function() {

    describe("Options", function() {

        it("should set the user name", function() {
            chat.init( { userName: 'Paul' } );

            expect( chat.userName ).toBe( 'Paul' );
        });
        
    });    
    
    describe("User message input", function() {
        
        beforeEach(function() {
            chat.init();

            this.enterKey = $.Event( 'keydown', { keyCode: 13 } );
            this.input = chat.inputUserMessage;
            this.ul = chat.ulMessages; 
        });
        
        it("should publish the user message", function() {
            var message, subscriber;

            subscriber = $.subscribe( 'user-message-sent', function ( event, data ) {
                message = data.userMessage;
            });

            this.input.val( 'foo bar' );
            this.input.trigger( this.enterKey );

            waits(50);

            runs(function() {
                expect( message ).toBe( 'foo bar' );
                subscriber.unsubscribe();
            });
        });

        it("should not show user message and name on message list", function() {
            this.input.val( 'foo bar' );
            this.input.trigger( this.enterKey );

            expect( this.ul.find( 'li' ).size() ).toBe( 0 );
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

        it("should not send text to the message list when key is not Enter", function() {
            this.input.val( 'foo' );
            this.input.keydown();
            
            expect( this.ul.find( 'li' ).size() ).toBe( 0 );
        });
        
    });

    describe("User name input", function() {

        beforeEach(function() {
            chat.init();

            this.enterKey = $.Event( 'keydown', { keyCode: 13 } );
            this.inputUserName = chat.inputUserName;
            this.inputUserMessage = chat.inputUserMessage;
        });

        it("should publish the new user name", function() {
            var userName, subscriber;

            subscriber = $.subscribe( 'user-name-changed', function ( event, data ) {
                userName = data.userName;
            });
            
            chat.userName = 'user';

            this.inputUserName.val( 'John' );
            this.inputUserName.trigger( this.enterKey );

            waits(50);

            runs(function() {
                expect( userName ).toBe( 'John' );
                expect( chat.userName ).toBe( 'John' );
                subscriber.unsubscribe();
            });
        });

        it("should give focus to the user message input on Enter key", function() {
            this.inputUserName.val( 'John' );
            this.inputUserName.trigger( this.enterKey );

            expect( this.inputUserMessage.is(':focus') ).toBe( true );
        });
        

        it("should not publish while Enter key is not pressed", function() {
            var subscriber;
            
            subscriber = $.subscribe( 'user-name-changed', jasmine.createSpy() );

            this.inputUserName.val( 'Jo' );
            this.inputUserName.keydown();

            waits(50);

            runs(function() {
                expect( subscriber.callback ).not.toHaveBeenCalled();
                subscriber.unsubscribe();
            });
        });

    });    
    
    describe("Message coming", function() {

        it("should add message to the message list", function() {
            var ul;

            chat.init();

            ul = chat.ulMessages; 

            $.publish( 'user-message-received', { userName: 'Bill', userMessage: 'foo bar' } );

            expect( ul.find( 'li' ).size() ).toBe( 1 );
            expect( ul.find( 'li' ).text() ).toBe( 'Bill foo bar' );
        });
        
    });
    
});    

