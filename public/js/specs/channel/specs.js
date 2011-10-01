
describe("Channel", function() {
    beforeEach(function() {
        this.data = { id: 123 };
        this.socket = {
            socket: { sessionid: null },
            on: function ( eventName, callback ) {
                this[eventName] = callback;
            },
            emit: function ( eventName, data ) {
                if ( this[eventName] ) {
                    this[eventName](data);
                }
            }
        };

        io = {
            connect: jasmine.createSpy().andReturn( this.socket )
        };

        channel.init({
            roomName: 'room1'
        });
    });
    
    describe("init", function () {
        it("should connect to socket", function () {
            expect( io.connect ).toHaveBeenCalled();
            expect( channel.socket ).toBe( this.socket );
        });

        it("should emit the room name", function () {
            spyOn( channel.socket, 'emit' ).andCallThrough();

            this.socket.emit( 'connect' );

            expect( channel.socket.emit ).toHaveBeenCalledWith( 'join', 'room1', 'user' );
        });
    });

    describe("publish socket events and data to the pubsub", function () {
        beforeEach(function () {
            spyOn( $, 'publish' );
            
            this.socket.emit( 'connect' );
        });
        
        it("should publish chat message event", function() {
            this.socket.emit( 'chat message', this.data );

            expect( $.publish ).toHaveBeenCalledWith( 'user-message-received', this.data );
        });

        it("should publish user leave event", function() {
            this.socket.emit( 'user leave', this.data );

            expect( $.publish ).toHaveBeenCalledWith( 'user-removed', this.data );
        });

        it("should publish user join event", function() {
            this.socket.emit( 'user join', this.data );

            expect( $.publish ).toHaveBeenCalledWith( 'user-added', this.data );
            expect( this.data.avatar ).toBe( '/img/avatar01.png' );
            expect( this.data.currentUser ).not.toBeDefined();
        });

        it("should publish user join event with current user", function() {
            console.log( this.data.id )
            this.socket.socket.sessionid = this.data.id;
            this.socket.emit( 'user join', this.data );

            console.log( this.socket.socket.sessionid )
            expect( $.publish ).toHaveBeenCalledWith( 'user-added', this.data );
            expect( this.data.avatar ).toBe( '/img/avatar01.png' );
            expect( this.data.currentUser ).toBe( true );
        });

        it("should publish next video event", function() {
            this.socket.emit( 'next video', this.data );

            expect( $.publish ).toHaveBeenCalledWith( 'video-next', this.data );
        });

        it("should publish video added event", function() {
            this.socket.emit( 'video added', this.data );

            expect( $.publish ).toHaveBeenCalledWith( 'video-added', this.data );
        });

        it("should publish video started event", function() {
            this.socket.emit( 'video started' );

            expect( $.publish ).toHaveBeenCalledWith( 'video-started' );
        });

        it("should publish video play now event", function() {
            this.socket.emit( 'play now' );

            expect( $.publish ).toHaveBeenCalledWith( 'play-now' );
        });

        it("should publish video move forward event", function() {
            this.socket.emit( 'move forward', this.data );

            expect( $.publish ).toHaveBeenCalledWith( 'move-forward', this.data );
        });

        it("should publish video ended event", function() {
            this.socket.emit( 'video ended' );

            expect( $.publish ).toHaveBeenCalledWith( 'video-ended' );
        });
    });

    describe("emit pubsub events and data to the socket", function() {
        beforeEach(function() {
            this.socket.emit( 'connect' );

            spyOn( this.socket, 'emit' );
        });

        it("should emit chat message", function() {
            this.data = { userName: 'John', userMessage: 'hey' };

            $.publish( 'user-message-sent', this.data );
            
            expect( this.socket.emit ).toHaveBeenCalledWith( 'chat message', this.data.userName, this.data.userMessage);
        });

        it("should emit video sent", function() {
            $.publish( 'video-sent', this.data );
            
            expect( this.socket.emit ).toHaveBeenCalledWith( 'add video', this.data );
        });

        it("should emit video sent", function() {
            $.publish( 'tomato-thrown' );
            
            expect( this.socket.emit ).toHaveBeenCalledWith( 'blame' );
        });
    });    
    
});

