var YouTube = requireLib('youtube');
var Room    = requireLib('room');

module.exports = {
    create: function(req, res) {
        Room.findOrCreate(req.params.id, function(room){
            YouTube.onGetInfo(req.body.video.url, function(media){
                room.addMedia(media, function(){
                    res.redirect('/' + room.id);
                });
            });
        });
    }
};