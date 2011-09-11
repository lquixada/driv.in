
var chat = {
    init: function ( options ) {
        var self = this;

        this.section = $( 'section#chat' );
        this.sectionChatMessages = this.section.find( 'section#chat-messages' );
        this.ul = this.section.find( 'ul' );
        this.inputUserMessage = this.section.find( 'input#user-message' );
        this.inputUserName = this.section.find( 'input#user-name' );

        this.onMessageSent = options.onMessageSent || $.noop();
        this.onUserNameChanged = options.onUserNameChanged || $.noop();
       
        this.scrollToBottom();
        this.bindEvents();


        socket.on('chat message', function(message) {
          self.addMessage(message.userName, message.userMessage);
          room.users[message.userId].speak(message.userName, message.userMessage);
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
        this.inputUserMessage.val( '' );
    },

    bindEvents: function () {
        var that = this;
        
        this.inputUserMessage.keydown(function ( event ) {
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
                currentUser.name = userName;
                $( this ).val('');
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

