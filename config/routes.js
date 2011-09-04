var  RoomsController = requireLib( 'roomsController.js');
var VideosController = requireLib('videosController.js');

module.exports = function(app) {
    app.get('/',       RoomsController.index);
    app.get('/:id',    RoomsController.show );
    app.post('/rooms', RoomsController.create);

    app.post('/rooms/:id/videos', VideosController.create);

    app.get('/healthcheck', function(req, res) {
        res.send(200);
    });

    app.use(function(req, res, next){
        res.render('404', {
            layout:false,
            status: 404,
            url: req.url
        });
    });

    app.use(function(err, req, res, next){
        var status = err.status || 500;
        console.log('Error ' + status + ' on ' +
                    req.method + ':' + req.url);

        console.log(err);

        res.render('500', {
            layout: false,
            status: status,
            error: err
        });
    });

    app.get('/404', function(req, res, next){
        next();
    });

    app.get('/500', function(req, res, next){
        next(new Error('error'));
    });
};