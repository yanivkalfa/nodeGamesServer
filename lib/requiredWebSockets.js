
module.exports = function(_s){
    var _ = _s.oReq.lodash
        , pathsList = _s.oConfig.pathsList
        , Authorization = require(pathsList.Authorization)(_s)
        , sessSecret = _s.oConfig.session.secret
        , primusOptions = {
            transformer: 'engine.io'
        };

    _s.primus = new _s.oReq.Primus(_s.oReq.http, primusOptions);
    _s.primus.use('rooms', _s.oReq.primusRooms);

    _s.primus.on('connection', function (spark) {
        _s.oReq.jwt.verify(spark.query.token, sessSecret, function(err, decoded) {
            if(!_.isUndefined(decoded) && !_.isUndefined(decoded.userId)){
                Authorization.login({"_id" : decoded.userId}).then(function(user){
                    if(user === null)
                    {
                        spark.end({"method" : "disconnect", msg : "Could not authenticate user a."} );
                    }
                    else
                    {
                        var room, game, player;
                        room = spark.query.room;
                        game = spark.query.game;

                        if(!room || game) return spark.end({"method" : "disconnect", msg : "Get the fuck out"} );

                        spark.join(room, function(err, succ){
                            player = {
                                id : user._id,
                                name : user.username,
                                spark : spark
                            };

                            _s.Games.join(game, player);
                        });

                    }

                }).catch(function(err){
                    console.log(err);
                    if(err) spark.end({"method" : "disconnect", msg : "Could not authenticate user b."} );
                });
            }else{
                console.log(err);
                spark.end({"method" : "disconnect", msg : "Could not authenticate user c."} );
            }
        });
    });


    _s.primus.on('end', function () {});
    _s.primus.on('disconnection', function (spark) { });
    _s.primus.on('leaveallrooms', function (rooms, spark) { });
};