var http = require('http');
var YouTube = {
    onGetInfo: function(url, callback) {
        var self = this, mediaId = this.mediaIdFrom(url);
        var options = {
            host: 'gdata.youtube.com', port: 80,
            path: '/feeds/api/videos/' + mediaId + '?alt=jsonc&v=2'
        };

        var data = '';
        http.get(options, function(resp) {
            resp.on('data', function(chunk){data += chunk;})
                .on('end',  function(){
                    try {
                        var youTubeData = JSON.parse(data);
                        self.convertMedia(youTubeData, callback);
                    } catch (e) {
                        console.log('Media not found: ' + mediaId);
                        console.log(e);
                    }
                });
        });
    },

    // See example video data on:
    // http://gdata.youtube.com/feeds/api/videos/X_hMZYDMps4?alt=jsonc&v=2
    convertMedia: function(youTubeData, f){
        var data  = youTubeData['data'];
        var media = {
            id:       data['id'],
            url:      data['content']['5'],
            title:    data['title'],
            duration: data['duration'],
            thumbUrl: data['thumbnail']['sqDefault']
        };

        f(media);
    },

    mediaIdFrom: function(url){
        var parsed = require('url')
            .parse(url, true);

        var videoIdMatchs = parsed.pathname.match(/videos\/([^\/]*)/);
        if(videoIdMatchs) {
            return videoIdMatchs[1];
        } else {
            return parsed['query']['v'];
        }
    }
};

module.exports = YouTube;
