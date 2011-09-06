require('./testHelper');

var RoomsHelper = requireLib('roomsHelper');
module.exports = testCase({
    setUp: function (callback) {
        var self = this;
        self.app = {
            helpers: function(helperObjs){
                for(var helperName in helperObjs){
                    if(helperObjs.hasOwnProperty(helperName)){
                        self.app[helperName] =
                            helperObjs[helperName];
                    }
                }
            }
        };

        RoomsHelper.all(self.app);
        return callback();
    },

    'persons helper should pluralize properly': function(test){
        test.equal('No one',   this.app.persons(0));
        test.equal('1 person', this.app.persons(1));
        test.equal('3 people', this.app.persons(3));
        test.done();
    }
});