var http = require('http');
var YouTube = {
    onGetInfo: function(url, callback) {
        var mediaId = this.mediaIdFrom(url);
        var options = {
            host: 'gdata.youtube.com', port: 80,
            path: '/feeds/api/videos/' + mediaId + '?alt=json'
        };

        var data = '';
        http.get(options, function(resp) {
            resp.on('data', function(chunk){ data += chunk; })
                .on('end',  function(){
                    try {
                        var entry = JSON.parse(data)['entry'];
                        var media = entry['media$group']['media$content'][0];
                        callback(media);
                    } catch (e) {}
                });
        });
    },

    mediaIdFrom: function(url){
        return require('url')
            .parse(url, true)['query']['v'];
    }
};

module.exports = YouTube;