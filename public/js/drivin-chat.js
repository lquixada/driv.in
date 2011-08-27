
var chat = {
    init: function ( options ) {
        this.section = $( 'section#chat' );
        this.ul = this.section.find( 'ul' );
        this.input = this.section.find( 'input#message' );

        this.user = options.user;

        this.bindEvents();
    },

    addMessage: function ( message ) {
        this.ul.append( '<li><strong>'+this.user.name+'</strong> '+message+'</li>' ).scrollTop(100000);
    },

    clearInput: function () {
        this.input.val( '' );
    },

    bindEvents: function () {
        var that = this;
        
        this.input.keydown(function ( event ) {
            
            if (event.keyCode === 13) {
                var message = that.input.val();
                
                that.user.send( message );
                that.addMessage( message );
                that.clearInput();
                
            }
        });
    }
};
