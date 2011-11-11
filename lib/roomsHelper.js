module.exports = {
    all: function(app){
        var self = this;
        return app.helpers({
            'persons': self.persons
        });
    },
    persons: function(c){
        if(c < 1){
            return 'No one';
        } else if(c === 1) {
            return '1 person';
        } else {
            return c + ' people';
        }
    }
};