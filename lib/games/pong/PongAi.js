module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , Ai
        ;

    Ai = require(pathsList.games_Ai)(_s);


    /**
     *
     * @param {Game} game
     * @param {Entity} entity
     * @extends Ai
     * @api public
     */
    function PongAi(game, entity){
        Ai.apply(this, arguments);
    }
    PongAi.prototype = Object.create(Ai.prototype);
    PongAi.prototype.constructor = PongAi;


    /**
     * Start entity's movement
     *
     * @api public
     */
    PongAi.prototype.start = function(){
        var random = Math.floor(Math.random()*4);
        this.changeDirection(this.directions[random]);
    };


    /**
     * Stop entity's movement
     *
     * @api public
     */
    PongAi.prototype.stop = function(){
        this.entity.moveDirection = {x:0, y:0};
    };


    /**
     * Reset entity's
     *
     * @api public
     */
    PongAi.prototype.reset = function(){
        var self = this, random, timeout;
        this.entity.moveDirection = {x:0, y:0};
        this.entity.position.x = this.entity.starPosition.x;
        this.entity.position.y = this.entity.starPosition.y;

        timeout = setTimeout(function(){
            if(self.side == 1){
                random = Math.floor(Math.random()*2+0);
                self.changeDirection(self.directions[random]);
            }

            if(self.side == 2){
                random = Math.floor(Math.random()*2+2);
                self.changeDirection(self.directions[random]);
            }
            clearTimeout(timeout);
        }, 1000);
    };


    /**
     * Change entity direction
     *
     * @param {Object} vector
     * @api public
     */
    PongAi.prototype.changeDirection = function(vector){
        this.entity.moveDirection = vector;
    };

    return PongAi;
};