savedCode = '';

beforeEach(function() {
    savedCode = $( 'div#main' ).html();

    this.newUser = { id: 1, name: 'John', avatar: '/img/avatar01.png' };
    this.div = $( 'div#user-space' );
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
            audience.init();
            audience.add( this.newUser );
        });
        
        it("should store new users", function() {
            var user = audience.users[this.newUser.id];

            expect( user ).toBeDefined();
            expect( user.name ).toBe( this.newUser.name );
            expect( user.avatar ).toBe( this.newUser.avatar );
        });
        
        it("should add new user to the room", function() {
            var divUser = this.div.find( 'div#'+this.newUser.id );

            expect( divUser.size() ).toBe( 1 );
        });

        it("should add new user with avatar", function() {
            var divUser = this.div.find( 'div#'+this.newUser.id ),
                img = divUser.find( 'img.user-avatar' );

            expect( img.size() ).toBe( 1 );
            expect( img.attr( 'src' ) ).toBe( this.newUser.avatar );
        });
        
        it("should add new user with balloon", function() {
            var divUser = this.div.find( 'div#'+this.newUser.id ),
                span = divUser.find( 'span.user-balloon' );

            expect( span.size() ).toBe( 1 );
        });
    });


    describe("remove user", function() {
        beforeEach(function() {
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


    describe("pubsub events", function() {
        it("should listen the to user-added event", function() {
            spyOn(audience, 'add');

            audience.init();

            $.publish( 'user-added', this.newUser );
            
            waits(50);

            runs(function() {
                expect( audience.add ).toHaveBeenCalled();
            });
        });

        it("should listen the to user:remove event", function() {
            spyOn(audience, 'remove');

            audience.init();

            $.publish( 'user-removed', this.newUser );
            
            waits(50);

            runs(function() {
                expect( audience.remove ).toHaveBeenCalled();
            });
        });
    });
});    

