
(function ($) {
  
    $.publish = function ( eventName, message ) {
        $( document ).trigger( eventName, message );
    };

    $.subscribe = function ( eventName, callback ) {
        $( document ).bind( eventName, callback );
    };

    $.unsubscribe = function ( eventName, callback ) {
        $( document ).unbind( eventName, callback );
    };

})( jQuery );
