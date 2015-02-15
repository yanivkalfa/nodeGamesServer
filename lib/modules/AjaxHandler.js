// export the class
module.exports = function(_s, req, res) {
    var _this = this
        ,_ = _s.oReq.lodash
        , pathsList = _s.oConfig.pathsList
        ;

    this.body = req.body;
    this.result = {
        "msg" : "",
        "success" : false
    };

    this.toReturn = _.cloneDeep({
        "status" : 0,
        "success" : false,
        "method" : _this.body.method,
        "data" : {}
    });

    this.init = function(){
        return (!_.isUndefined(_this.body.data))
            ? _this[_this.body.method](_this.body.data)
            : _this[_this.body.method]() ;
    };

    this._setResp = function(data,success){
        _this.toReturn.success = success;
        _this.toReturn.data = data;
    };

    this.startGame = function(data){
        var Authorization = require(pathsList.Authorization)(_s);

        console.log('trying to create a game');
        Authorization.login(data.userDetails).then(function(user){
            if(user)
            {
                var game = _s.Games.createNewGame(data.gameDetails);
                _this._setResp(game, true);
                return res.json(_this.toReturn);
            }
            else
            {
                _this._setResp("Some Error Occur please try again later", false);
                return res.json(_this.toReturn);
            }
        }).catch(function(err){
            _this._setResp("Some Error Occur please try again later", false);
            return res.json(_this.toReturn);
        });
    };

    this.init();
};