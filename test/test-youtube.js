var YouTube  = require('../lib/youtube');
// var nodeunit = require('nodeunit');

var fakeweb = require('fakeweb'),
       http = require('http');

http.register_intercept({
    uri: '/feeds/api/videos/XYZ?alt=json',
    host: 'gdata.youtube.com',
    body: '{"entry": {"media$group": {"media$content": [{"duracao": 123}] }}}'
});

exports.testYoutubeMediaId = function(test){
    var url = "http://www.youtube.com/watch?v=XYZ&feature=feedwll";
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
    YouTube.onGetInfo('XYZ', function(media) {
        test.equal(123, media.duracao);
        test.done();
    });
};
