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
     * we sends players ready
     *
     * @api public
     */
    PongOutRouter.prototype.pr = function(){
        console.log('sending players');
        var players = this.game.players.get(), cleanPlayers = {};

        console.log('allPlayers', players);

        for(var pId in players){
            if(!players.hasOwnProperty(pId)) continue;
            cleanPlayers[pId] = {
                "id" : pId,
                "name" : players[pId].name,
                "local" : players[pId].local
            }

            console.log ('players[pId].local', players[pId].local);
        }

        console.log (cleanPlayers);
        this.game.primus.room(this.game.room).write({"m":'pr', d : cleanPlayers});
    };


    /**
     * we sent game starting in ... seconds
     *
     *
     * @api public
     */
    PongOutRouter.prototype.gs = function(){
        console.log('sending Game start');
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