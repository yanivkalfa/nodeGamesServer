module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , OutRouter = require(pathsList.games_OutRouter)(_s)
        ;


    /**
     *
     * @param {Game} game
     *
     * @extend OutRouter
     * @api public
     */
    function PongOutRouter(game){
        OutRouter.apply(this,arguments);
    }

    PongOutRouter.prototype = Object.create(OutRouter.prototype);
    PongOutRouter.prototype.constructor = PongOutRouter;


    /**
     * Send offset timer
     *
     * @api public
     */
    PongOutRouter.prototype.os = function(){
        this.game.primus.room(this.game.room).write({"m":'os', d : Date.now()});
    };


    /**
     * we sent game starting in ... seconds
     *
     *
     * @api public
     */
    PongOutRouter.prototype.gs = function(){
        this.game.primus.room(this.game.room).write({"m":'gs', d : 20});
    };


    /**
     * we sends snapShots
     *
     * @param {Object} msg
     * @api public
     */
    PongOutRouter.prototype.ss = function(msg){
        this.game.primus.room(this.game.room).write({"m":'ss', d : msg});
    };

// on game end server kills socket. and game, we kill game and go back to chat menu.


    return PongOutRouter;
};