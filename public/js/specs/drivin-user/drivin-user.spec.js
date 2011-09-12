
describe("User", function() {

    describe("init", function() {
        beforeEach(function() {
            this.options = { id:123, name: 'John', avatar: 'avatar.png' }; 
            this.user = new User( this.options );
        });
        
        it("should have id", function() {
            expect( this.user.id ).toBe( this.options.id );
        });

        it("should have a name", function() {
            expect( this.user.name ).toBe( this.options.name );
        });

        it("should have an avatar", function() {
            expect( this.user.avatar ).toBe( this.options.avatar );
        });
    });    
    

    it("should speak", function() {
        var user = new User({id:123, name: 'John'});

        user.speak( 'blah' );

        expect( $( 'div.user' ).find( 'span.user-balloon' ).text() ).toBe( 'John blah' );
    });    
    
});    

