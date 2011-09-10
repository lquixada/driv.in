
var chat = {
    init: function () {
        $( 'section#chat' ).find( 'input#user-message' ).keydown(function () {
            var message = $( this ).val();

            $( 'section#chat' ).find( 'ul' ).append( '<li>'+message+'</li>' );
        });
    }
};

