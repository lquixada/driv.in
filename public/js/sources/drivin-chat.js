
var chat = {
    init: function () {
        var that = this;

        $( 'section#chat' ).find( 'input#user-message' ).keydown(function (event) {
            var userMessage = $( this ).val();
            
            if (event.keyCode == 13) {
                $( 'section#chat' ).find( 'ul' ).append( '<li><strong>'+that.userName+'</strong> '+userMessage+'</li>' );
                $.publish( 'message.chat', { message: userMessage } );
            }
        });
        
        
        $( 'section#chat' ).find( 'input#user-name' ).keydown(function (event) {
            var userName = $( this ).val();
            
            if (event.keyCode == 13) {
                $.publish( 'username.chat', { userName: userName } );
            }
        });
    }
};

