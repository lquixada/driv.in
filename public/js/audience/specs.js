beforeEach(function() {
    this.newUser = { id: 1, name: 'John', avatar: '/img/avatar01.png' };
    this.div = $( 'div#user-space' );
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
        
        it("should store new user", function() {
            var user = audience.users[this.newUser.id];

            expect( user ).toBeDefined();
            expect( user.name ).toBe( this.newUser.name );
            expect( user.avatar ).toBe( this.newUser.avatar );

            expect( audience.currentUser ).not.toBeDefined();
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

    describe("add current user", function() {
        it("should store current user", function() {
            this.newUser.currentUser = true;

            audience.init();
            audience.add( this.newUser );

            expect( audience.currentUser.id ).toBe( this.newUser.id );
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

    describe("remove current user", function() {
        it("should remove current user from the list", function() {
            this.newUser.currentUser = true;

            audience.init();
            audience.add( this.newUser );
            audience.remove( this.newUser );

            expect( audience.currentUser ).not.toBeDefined();
        });
        
        it("should not remove current user when it's not", function() {
            var newUser2 = $.extend( {}, this.newUser );
            
            newUser2.id = 2;
            newUser2.currentUser = true;
            
            audience.init();
            audience.add( this.newUser );
            audience.add( newUser2 );
            audience.remove( this.newUser );

            expect( audience.currentUser ).toBeDefined();
        });
    });

    describe("user to speak", function() {
        it("should make user speak", function() {
            var divUser,
                fakeSpeak = jasmine.createSpy() 

            User.prototype.speak = fakeSpeak;

            audience.init();
            audience.add( this.newUser );
            audience.speak( {
                     userId: this.newUser.id,
                   userName: this.newUser.name,
                userMessage: 'foo bar!'
            } );
            
            expect( fakeSpeak ).toHaveBeenCalledWith( 'foo bar!' );
        });
    });

    describe("pubsub events", function() {
        it("should listen the to user:joined event", function() {
            spyOn( audience, 'add' );

            audience.init();

            $.publish( 'user:joined', this.newUser );
            
            waits(50);

            runs(function() {
                expect( audience.add ).toHaveBeenCalled();
            });
        });

        it("should listen the to user:left event", function() {
            spyOn( audience, 'remove' );

            audience.init();

            $.publish( 'user:left', this.newUser );
            
            waits( 50 );

            runs(function() {
                expect( audience.remove ).toHaveBeenCalled();
            });
        });

        it("should listen the user:message-received event", function() {
            spyOn( audience, 'speak' );

            audience.init();

            $.publish( 'user:message-received', this.newUser );
            
            waits( 50 );

            runs(function() {
                expect( audience.speak ).toHaveBeenCalled();
            });
        });

        it("should listen the to user:name-changed event", function() {
            var data = { userName: 'Bill' };

            this.newUser.currentUser = true;

            audience.init();
            
            $.publish( 'user:joined', this.newUser );
            
            waits(50);

            $.publish( 'user:name-changed', data );
            
            waits(50);

            runs(function() {
                expect( audience.currentUser.name ).toBe( data.userName );
            });
        });
    });
});    

