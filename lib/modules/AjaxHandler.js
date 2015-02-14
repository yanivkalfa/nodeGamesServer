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

    this.login = function(userDetails){
        var Authorization = require(pathsList.Authorization)(_s)
            ,User = require(pathsList.User)(_s)
            ;

        Authorization.login(userDetails).then(function(user){
            if(user)
            {
                var payLoard = { userId : user.id }
                    , options = {
                        algorithm: 'HS512',
                        expiresInMinutes : _s.oConfig.session.maxAge / 1000 / 60
                    }
                    , visibleField = User.visibleField()
                    ;

                user.token = _s.oReq.jwt.sign(payLoard , _s.oConfig.session.secret, options);
                req.session.user = _.pick(user, visibleField);
                _this._setResp(_.pick(user, visibleField), true);
                return res.json(_this.toReturn);
            }
            else
            {
                _this._setResp("User with this email does not exist!", false);
                return res.json(_this.toReturn);
            }
        }).catch(function(err){
            _this._setResp("Some Error Occur please try again later", false);
            return res.json(_this.toReturn);
        });
    };


    this.startGame = function(gameDetails){
        //gameDetails
    };

    this.init();
};