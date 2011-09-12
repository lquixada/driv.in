
var chat = {
    init: function ( options ) {
        this.section = $( 'section#chat' );
        this.inputUserMessage = this.section.find( 'input#user-message' );
        this.inputUserName = this.section.find( 'input#user-name' );
        this.ulMessages = this.section.find( 'ul' );
        
        if ( options ) {
            this.userName = options.userName || 'user';
        }

        this._bindSubscribers();
        this._bindEvents();
    },

    _bindEvents: function () {
        var that = this;

        this.inputUserMessage.keydown(function (event) {
            var userMessage = $( this ).val();
            
            if (event.keyCode == 13 && userMessage) {
                that._clearInputUserMessage();

                $.publish( 'user-message-sent', { userName: that.userName, userMessage: userMessage } );
            }
        });
        
        this.inputUserName.keydown(function (event) {
            var userName = $( this ).val();
            
            if (event.keyCode == 13) {
                that.userName = userName;
                that.inputUserMessage.focus();

                $.publish( 'user-name-changed', { userName: userName } );
            }
        });
    },

    _bindSubscribers: function () {
        var that = this;

        $.subscribe( 'user-message-received', function ( event, data ) {
            that._addMessage( data.userName, data.userMessage );
        } );
    },

    _addMessage: function ( userName, userMessage ) {
        this.ulMessages.append( '<li><strong>'+userName+'</strong> '+userMessage+'</li>' );
    },

    _clearInputUserMessage: function () {
        this.inputUserMessage.val( '' ); 
    }
};

