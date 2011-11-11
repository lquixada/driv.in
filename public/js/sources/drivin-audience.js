
var audience = {
    users: {},

    init: function () {
        this.divUserSpace = $( 'div#user-space' );
    },

    add: function ( user ) {
        this.users[user.id] = user;

        this.divUserSpace.append( [
            '<div id="'+user.id+'">',
                '<span class="user-balloon"></span>',
                '<img class="user-avatar" src="'+user.avatar+'">',
            '</div>'
        ].join( '' ) );
    },

    remove: function ( user ) {
        delete this.users[user.id];

        this.divUserSpace.find( 'div#'+user.id ).remove();
    }
};
