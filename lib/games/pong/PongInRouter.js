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
     * @overrides
     * @api public
     */
    PongInRouter.prototype.init = function(){
        var self = this;
        this.entity.spark.on('data', function(msg){
            self[msg.m](msg.d);
        });
    };


    /**
     * we get Player ready
     *
     * @api public
     */
    PongInRouter.prototype.pr = function(){
        console.log('got player ready');
        if(this.game.checkPlayers()) this.game.prepareGame();
    };


    /**
     * We get keyPress
     *
     * @api public
     */
    PongInRouter.prototype.ks = function(msg){
        this.entity.setKeyPress(msg);
    };

    return PongInRouter;
};