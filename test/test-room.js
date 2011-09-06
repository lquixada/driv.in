require('./testHelper');

var Room = requireLib('room');
module.exports = testCase({
    setUp: function (callback) {
        Room.all = {};
        this.room1 = new Room('room1');
        this.room2 = new Room('room2');

        this.newUser1 = { id: 123, join: function(){} };
        this.newUser2 = { id: 456, join: function(){} };
        this.newUser3 = { id: 789, join: function(){} };

        return callback();
    },

    tearDown: function (callback) { return callback(); },

    'should allow users to join rooms': function(test) {
        var self = this;
        self.room1.addUser(self.newUser1, function(u){
            test.equal(self.newUser1, u);
            test.equal(1, self.room1.users.length);
            test.done();
        });
    },

    'should not allow users to join twice': function(test) {
        var self = this;
        self.room1.addUser(self.newUser1, function(u1){
            self.room1.addUser(self.newUser1, function(u2){
                test.equal(self.newUser1, u1);
                test.equal(self.newUser1, u2);

                test.equal(1, self.room1.users.length);
                test.done();
            });
        });
    },

    'should allow users to leave the room': function(test){
        var self = this;

        self.room1.users = [self.newUser1, self.newUser2];
        self.room1.removeUser(self.newUser1, function(u){
            test.equal(1, self.room1.users.length);
            test.done();
        });
    },

    'should remove users from all rooms once': function(test){
        var self = this;

        self.room1.users = [self.newUser1, self.newUser2];
        self.room2.users = [self.newUser1, self.newUser3];

        Room.userLeave(self.newUser1, function(u){
            test.equal(1, self.room1.users.length);
            test.equal(1, self.room2.users.length);
            test.done();
        });
    }
});