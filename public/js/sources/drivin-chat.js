
var chat = {
    init: function () {
        this.section = $( 'section#chat' );
        this.inputUserMessage = this.section.find( 'input#user-message' );
        this.inputUserName = this.section.find( 'input#user-name' );
        this.ulMessages = this.section.find( 'ul' );

        this.bindEvents();
    },

    bindEvents: function () {
        var that = this;

        this.inputUserMessage.keydown(function (event) {
            var userMessage = $( this ).val();
            
            if (event.keyCode == 13 && userMessage) {
                that._clearInputUserMessage();
                that._addMessage( that.userName, userMessage );

                $.publish( 'message.chat', { message: userMessage } );
            }
        });
        
        this.inputUserName.keydown(function (event) {
            var userName = $( this ).val();
            
            if (event.keyCode == 13) {
                $.publish( 'username.chat', { userName: userName } );
            }
        });
    },

    _addMessage: function ( userName, userMessage ) {
        this.ulMessages.append( '<li><strong>'+userName+'</strong> '+userMessage+'</li>' );
    },

    _clearInputUserMessage: function () {
        this.inputUserMessage.val( '' ); 
    }
};

