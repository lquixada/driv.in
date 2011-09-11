
(function ($) {
  
    $.publish = function ( eventName, message ) {
        $( document ).trigger( eventName, message );
    };

    $.subscribe = function ( eventName, callback ) {
        var doc = $( document );
        
        doc.bind( eventName, callback );

        return {
            callback: callback,
            unsubscribe: function () {
                doc.unbind( eventName, this.callback ); 
            }
        };
    };

})( jQuery );
