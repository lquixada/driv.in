
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

