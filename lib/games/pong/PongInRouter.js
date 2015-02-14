module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , InRouter = require(pathsList.games_InRouter)(_s)
        ;


    /**
     *
     * @param {Game} game
     *
     * @extend InRouter
     * @api public
     */
    function PongInRouter(game){
        InRouter.apply(this,arguments);
    }

    PongInRouter.prototype = Object.create(InRouter.prototype);
    PongInRouter.prototype.constructor = PongInRouter;

    /**
     * Init inRouter
     *
     * @api public
     */
    InRouter.prototype.init = function(){
        var self = this;
        this.entity.spark.on('data', function(msg){
            self.entity.setKeyPress(msg);
        });
    };

    return PongInRouter;
};