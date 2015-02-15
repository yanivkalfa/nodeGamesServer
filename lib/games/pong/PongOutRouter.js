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
     * we sent game starting in ... seconds
     *
     *
     * @param {Object} msg
     * @api public
     */
    PongOutRouter.prototype.gs = function(){
        this.game.primus.room(this.game.room).write({"gs": 20, t: Date.now()});
    };


    /**
     * we sends snapShots
     *
     * @param {Object} msg
     * @api public
     */
    PongOutRouter.prototype.ss = function(msg){
        this.game.primus.room(this.game.room).write(msg);
    };

// on game end server kills socket. and game, we kill game and go back to chat menu.


    return PongOutRouter;
};