
module.exports = function(_s){
    var _ = _s.oReq.lodash
        , sessCon = _s.oConfig.session.connection
        , sessSecret = _s.oConfig.session.secret
        , sessMaxAge = _s.oConfig.session.maxAge
        , pathsList = _s.oConfig.pathsList
        , ajaxHandler = require(pathsList.AjaxHandler)
        ;

    /*
    _s.oReq.app.use(_s.oReq.session({
        store: new _s.oReq.RedisStore({
            port : _s.oConfig.connections[sessCon].port,
            host : _s.oConfig.connections[sessCon].host
        }),
        secret: sessSecret,
        saveUninitialized: true,
        resave: true,
        cookie: { maxAge: sessMaxAge }
    }));
    */

    _s.oReq.app.use(_s.oReq.bodyParser.json());
    _s.oReq.app.use(_s.oReq.bodyParser.urlencoded({ extended: true }));
    _s.oReq.app.get('/ajaxHandler', _.partial(ajaxHandler, _s));
    _s.oReq.app.post('/ajaxHandler', _.partial(ajaxHandler, _s));
    _s.oReq.app.get('/*', function (req, res) {
        return res.status(404).send('404 page !!!!');
    });

};