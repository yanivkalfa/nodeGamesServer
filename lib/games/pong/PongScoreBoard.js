module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , ScoreBoard = require(pathsList.games_ScoreBoard)(_s)
        ;


    /**
     *
     * @param {Game} game ref object
     * @api public
     */
    function PongScoreBoard(game){
        ScoreBoard.apply(this,arguments);

    }

    PongScoreBoard.prototype = Object.create(ScoreBoard.prototype);
    PongScoreBoard.prototype.constructor = PongScoreBoard;


    /**
     * initiates ScoreBoard
     *
     * @api public
     */
    PongScoreBoard.prototype.init = function(){
        var players, playerId, aPlayer, id;
        players = this.game.players.get();

        for(playerId in players ){
            if(players.hasOwnProperty(playerId)){
                aPlayer = players[playerId];

                id = (aPlayer.local) ? 'left' : 'right';
                console.log('scoreboard id: ', id);
                this.players.add({id:id, player : aPlayer});
            }
        }
    };


    /**
     * Renders ScoreBoard
     *
     * @overrides
     * @api public
     */
    PongScoreBoard.prototype.render = function(){};


    /**
     * load ScoreBoard
     *
     * @overrides
     * @api public
     */
    PongScoreBoard.prototype.load = function(){};

    return PongScoreBoard;
};