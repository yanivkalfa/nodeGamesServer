
module.exports = function(_s){
    var _ = _s.oReq.lodash
        , pathsList = _s.oConfig.pathsList
        , ajaxHandler = require(pathsList.AjaxHandler)
        ;

    _s.oReq.app.use(_s.oReq.bodyParser.json());
    _s.oReq.app.use(_s.oReq.bodyParser.urlencoded({ extended: true }));
    _s.oReq.app.get('/ajaxHandler', _.partial(ajaxHandler, _s));
    _s.oReq.app.post('/ajaxHandler', _.partial(ajaxHandler, _s));
    _s.oReq.app.get('/*', function (req, res) {
        return res.status(404).send('404 page !!!!');
    });

};