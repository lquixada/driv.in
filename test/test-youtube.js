var YouTube  = require('../lib/youtube');
// var nodeunit = require('nodeunit');

var fakeweb = require('fakeweb'),
       http = require('http');

var url = "http://gdata.youtube.com/feeds/api/videos/XYZ?alt=jsonc&v=2";
var fakeBody = {
    'apiVersion': '2.1',
    'data': {
        'id': 'XYZ',
        'title': 'A fantastic geek movie',
        'duration': 123,
        'content': {
            5: 'http://www.youtube.com/v/XYZ?f=videos&app=youtube_gdata'
        },
        'thumbnail': {
            'sqDefault': 'http://i.ytimg.com/vi/XYZ/default.jpg',
            'hqDefault': 'http://i.ytimg.com/vi/XYZ/hqdefault.jpg'
        }
    }
};

http.register_intercept({
    uri: '/feeds/api/videos/XYZ?alt=jsonc&v=2',
    host: 'gdata.youtube.com',
    body: JSON.stringify(fakeBody)
});

exports.testYoutubeMediaId = function(test){
    var mediaId = YouTube.mediaIdFrom(url);
    test.equal('XYZ', mediaId);
    test.done();
};

exports.testYoutubeMediaWithBuggedURL = function(test){
    var url = "http://www.youtube.com/watch?bug";
    test.equal(null, YouTube.mediaIdFrom(url));
    test.done();
};

exports.testMediaInfo = function(test){
    YouTube.onGetInfo(url, function(media) {
        test.equal('XYZ', media.id);
        test.done();
    });
};

exports.testConvertMedia = function(test){
    YouTube.convertMedia(fakeBody, function(media) {
        test.equal(123, media.duration);

        test.equal('A fantastic geek movie',  media.title);
        test.equal('XYZ', media.id);

        test.equal('http://i.ytimg.com/vi/XYZ/default.jpg', media.thumbUrl);
        test.equal('http://www.youtube.com/v/XYZ?f=videos&app=youtube_gdata', media.url);

        test.done();
    });
};
