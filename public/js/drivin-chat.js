
var chat = {
    init: function ( options ) {
        this.section = $( 'section#chat' );
        this.sectionChatMessages = this.section.find( 'section#chat-messages' );
        this.ul = this.section.find( 'ul' );
        this.inputMessage = this.section.find( 'input#message' );
        this.inputUserName = this.section.find( 'input#user-name' );

        this.user = options.user;
       
        this.setUserName( this.user.name );
        this.scrollToBottom();
        this.bindEvents();
    },

    addMessage: function ( message ) {
        this.ul.append( '<li><strong>'+this.user.name+'</strong> '+message+'</li>' ).scrollTop(100000);
    },

    clearInput: function () {
        this.inputMessage.val( '' );
    },

    bindEvents: function () {
        var that = this;
        
        this.inputMessage.keydown(function ( event ) {
            if (event.keyCode === 13) {
                var message = $( this ).val();
                
                that.user.send( message );
                that.addMessage( message );
                that.scrollToBottom();
                that.clearInput();
            }
        });

        this.inputUserName.keydown(function ( event ) {
            if (event.keyCode === 13) {
                that.user.name = $( this ).val();
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

