module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , Roles = require(pathsList.games_Roles)(_s)
        ;


    /**
     *
     * @param {Game} game
     * @extends Roles
     * @api public
     */
    function PongRoles(game){
        Roles.apply(this,arguments);
    }

    PongRoles.prototype = Object.create(Roles.prototype);
    PongRoles.prototype.constructor = PongRoles;

    /**
     * go through Rules and invoke rule functions
     *
     * @api public
     */
    PongRoles.prototype.check = function(){
        var toReturn = false, lPlayer, rPlayer;

        lPlayer = this.game.scoreBoard.players.list.left.player;
        rPlayer = this.game.scoreBoard.players.list.right.player;

        console.log(lPlayer.attributes.score, rPlayer.attributes.score );
        if(lPlayer.attributes.score >= 10 || rPlayer.attributes.score >= 10){
            this.game.kill();
            toReturn = true;
        }

        return toReturn;
    };

    return PongRoles;
};