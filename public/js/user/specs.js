
savedCode = '';

beforeEach(function() {
    this.div = $( 'div#main' );
    savedCode = this.div.html();
});

afterEach(function() { 
    this.div.html( savedCode );
});


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

    describe("remove", function() {
        it("should render", function() {
            this.user = new User( { id:123, name: 'John', avatar: 'avatar.png' } );
            this.div.append( this.user.render() );

            this.user.remove();

            expect( this.div.find( this.user.element ).size() ).toBe( 0 );
        });
    });    
    
    
    describe("render", function() {
        beforeEach(function() {
            this.user = new User( { id:123, name: 'John', avatar: 'avatar.png' } );
            this.divUser = this.user.render();
        });
        
        it("should render", function() {
            expect( this.divUser ).toBe( this.user.element );
            expect( this.divUser.attr( 'id' ) ).toBe( String(this.user.id) );
        });

        it("should render user's avatar", function() {
            expect( this.divUser.find( 'img.user-avatar' ).size() ).toBe( 1 );
            expect( this.divUser.find( 'img.user-avatar' ).attr( 'src' ) ).toBe( this.user.avatar );
        });

        it("should render user's balloon", function() {
            expect( this.divUser.find( 'span.user-balloon' ).size() ).toBe( 1 );
            expect( this.divUser.find( 'span.user-balloon' ).is( ':hidden' ) ).toBe( true );
        });
    });

    describe("speak", function() {
        beforeEach(function() {
            this.user = new User({id:123, name: 'John'});
            this.div.append( this.user.render() );
        });
        
        it("should show user's balloon", function() {
            this.user.speak( 'blah' );
            
            expect( this.div.find( 'span.user-balloon' ).text() ).toBe( 'John blah' );
            expect( this.div.find( 'span.user-balloon' ).is( ':visible' ) ).toBe( true );
        });

        it("should hide user's ballon after 4 seconds", function() {
            jasmine.Clock.useMock(); 
            
            this.user.speak( 'blah' );
            
            jasmine.Clock.tick(4000); 
            
            expect( this.div.find( 'span.user-balloon' ).text() ).toBe( 'John blah' );
            expect( this.div.find( 'span.user-balloon' ).is( ':hidden' ) ).toBe( true );
        });
        
    });    
    
});    

