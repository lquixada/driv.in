
var chat = {
    init: function ( options ) {
        this.section = $( 'section#chat' );
        this.sectionChatMessages = this.section.find( 'section#chat-messages' );
        this.ul = this.section.find( 'ul' );
        this.inputMessage = this.section.find( 'input#message' );
        this.inputUserName = this.section.find( 'input#user-name' );

        this.onMessageSent = options.onMessageSent || $.noop();
        this.onUserNameChanged = options.onUserNameChanged || $.noop();
       
        this.scrollToBottom();
        this.bindEvents();

        var self = this;
        socket.on('chat message', function(message) {
          self.addMessage(message.userName, message.userMessage);
          room.users[message.userId].speak(message.userMessage);
        });

        socket.on('user join', function(user) {
          room.add(new User( {id: user.id, name: user.name, avatar:'img/avatar01.png'}));
        });

        socket.on('user leave', function(user) {
          debugInfo('user leave:' + user.id);
          room.remove(new User({id: user.id}));
        });
    },

    sendMessage: function(userName, userMessage) {
      socket.emit('chat message', userName, userMessage);      
    },

    addMessage: function ( userName, userMessage ) {
        this.ul.append( '<li><strong>'+userName+'</strong> '+userMessage+'</li>' );
        this.scrollToBottom();
    },

    clearInput: function () {
        this.inputMessage.val( '' );
    },

    bindEvents: function () {
        var that = this;
        
        this.inputMessage.keydown(function ( event ) {
            var message = $( this ).val();

            if (event.keyCode === 13 && message) {
                that.onMessageSent( message );
                that.scrollToBottom();
                that.clearInput();
            }
        });

        this.inputUserName.keydown(function ( event ) {
            var userName = $( this ).val();
            
            if (event.keyCode === 13 && userName) {
                that.onUserNameChanged( userName );
            }
        });
    },

    setUserName: function ( name ) {
        this.inputUserName.val( name );
    },

    scrollToBottom: function () {
        this.sectionChatMessages.scrollTop( this.ul.height() );
    }
};

