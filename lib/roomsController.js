var Room = requireLib('room');

module.exports = {
    index: function(req, res) {
        Room.last(4, function(rooms){
            Room.nextId(function(nextId){
                res.render('index', {
                    layout: false, rooms: rooms,
                    newRoom: nextId
                });
            });
        });
    },

    show: function(req, res) {
        Room.find(req.params.id, function(room){
            if (!room) {
                return res.render('404', {
                    layout:false, status: 404, url: req.url
                });
            }

            room.playlist(function(playlist){
                res.render('room', {
                    layout: false, room: room, playlist: playlist
                });
            });
        });
    },

    create: function(req, res) {
        Room.findOrCreate(req.body.name, function(room){
            res.redirect('/' + room.id);
        });
    }
};