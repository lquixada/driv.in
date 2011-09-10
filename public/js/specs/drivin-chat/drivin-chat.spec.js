
describe("Chat", function() {
    
    describe("message list", function() {

        it("should appear a message on the list", function() {
            var input = $( 'section#chat' ).find( 'input#user-message' ),
                ul = $( 'section#chat' ).find( 'ul' );
            
            chat.init();
            
            input.val( 'foo bar' );
            input.keydown();

            expect( ul.find( 'li' ).size() ).toBe( 1 );
            expect( ul.find( 'li' ).text() ).toBe( 'foo bar' );
        });

    });

});    

