savedCode = '';

beforeEach(function() {
    savedCode = $( 'div#main' ).html();
});

afterEach(function() { 
    $( 'div#main' ).html( savedCode );
});

describe("Audience", function() {
    
    describe("init", function() {
        it("should have no users", function() {
            audience.init();

            expect( $.isEmptyObject(audience.users) ).toBe( true );
        });
    });

    describe("add users", function() {
        beforeEach(function() {
            this.newUser = { id: 1, name: 'John', avatar: 'avatar.png' };
            this.div = $( 'div#user-space' );

            audience.init();

            audience.add( this.newUser );
        });
        
        it("should store new users", function() {
            var user = audience.users[this.newUser.id];

            expect( user ).toBeDefined();
            expect( user.name ).toBe( 'John' );
            expect( user.avatar ).toBe( 'avatar.png' );
        });
        
        it("should add new user to the room", function() {
            var divUser = this.div.find( 'div#'+this.newUser.id );

            expect( divUser.size() ).toBe( 1 );
        });

        it("should add new user with avatar", function() {
            var divUser = this.div.find( 'div#'+this.newUser.id ),
                img = divUser.find( 'img.user-avatar' );

            expect( img.size() ).toBe( 1 );
            expect( img.attr( 'src' ) ).toBe( 'avatar.png' );
        });
        
        it("should add new user with balloon", function() {
            var divUser = this.div.find( 'div#'+this.newUser.id ),
                span = divUser.find( 'span.user-balloon' );

            expect( span.size() ).toBe( 1 );
        });
    });    
    
    describe("remove user", function() {
        beforeEach(function() {
            this.newUser = { id: 1, name: 'John', avatar: 'avatar.png' };
            this.div = $( 'div#user-space' );

            audience.init();
            audience.add( this.newUser );
            audience.remove( this.newUser );
        });
        
        it("should remove user from the list", function() {
            expect( $.isEmptyObject( audience.users ) ).toBe( true );
        });

        it("should remove user from the room", function() {
            var divUser = this.div.find( 'div#'+this.newUser.id );

            expect( divUser.size() ).toBe( 0 );
        });
    });
    
});    

