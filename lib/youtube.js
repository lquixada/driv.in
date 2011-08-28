var http = require('http');
var YouTube = {
    onGetInfo: function(url, callback) {
        var self = this, mediaId = this.mediaIdFrom(url);
        var options = {
            host: 'gdata.youtube.com', port: 80,
            path: '/feeds/api/videos/' + mediaId + '?alt=json'
        };

        var data = '';
        http.get(options, function(resp) {
            resp.on('data', function(chunk){ data += chunk; })
                .on('end',  function(){
                    try {
                        var youTubeData = JSON.parse(data);
                        self.convertMedia(mediaId, youTubeData, callback);
                    } catch (e) {
                        console.log('Media not found: ' + mediaId);
                        console.log(e);
                    }
                });
        });
    },

    convertMedia: function(mediaId, data, f){
        var media = {id: mediaId}, entry = data['entry'];
        var group = entry['media$group']; // WTF is this fucking media?group!!!

        media['title'   ] = entry['title']['$t'];
        media['url'     ] = group['media$content'  ][0]['url'];
        media['duration'] = group['media$content'  ][0]['duration'];
        media['thumbUrl'] = group['media$thumbnail'][0]['url'];

        f(media);
    },

    mediaIdFrom: function(url){
        return require('url')
            .parse(url, true)['query']['v'];
    }
};

module.exports = YouTube;
