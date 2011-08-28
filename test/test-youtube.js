var YouTube  = require('../lib/youtube');
// var nodeunit = require('nodeunit');

var fakeweb = require('fakeweb'),
       http = require('http');

var url = "http://www.youtube.com/watch?v=XYZ&feature=feedwll";
var fakeBody = {
    'entry': {
        'title': { '$t': 'A fantastic geek movie' },
        'media$group': {
            'media$content': [
                {
                    'url': 'http://www.youtube.com/v/XYZ?f=videos&app=youtube_gdata',
                    'duration': 123
                }
            ],
            'media$thumbnail': [
                {
                    'url': 'http://i.ytimg.com/vi/XYZ/0.jpg',
                    'height': 360, 'width': 480
                }
            ]
        }
    }
};

http.register_intercept({
    uri: '/feeds/api/videos/XYZ?alt=json',
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
    YouTube.convertMedia('XYZ', fakeBody, function(media) {
        test.equal(123, media.duration);

        test.equal('A fantastic geek movie',  media.title);
        test.equal('XYZ', media.id);

        test.equal('http://i.ytimg.com/vi/XYZ/0.jpg', media.thumbUrl);
        test.equal('http://www.youtube.com/v/XYZ?f=videos&app=youtube_gdata', media.url);

        test.done();
    });
};
