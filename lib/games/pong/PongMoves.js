module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , Moves = require(pathsList.games_Moves)(_s)
        ;


    /**
     *
     * @param {Game} game
     * @param {Entity} entity
     * @extends Moves
     * @api public
     */
    function PongMoves(game, entity){
        Moves.apply(this,arguments);
    }

    PongMoves.prototype = Object.create(Moves.prototype);
    PongMoves.prototype.constructor = PongMoves;


    /**
     * Moves entity by vector
     *
     *
     * @param {Vector} vector
     * @api public
     */
    PongMoves.prototype.moveVector = function(vector){
        var moveDist,nextPoint, moveTo;

        moveDist = this.getMoveDistance();
        nextPoint = this.calculateNextPoint(vector.x, vector.y);
        moveTo = this.checkForCollision(nextPoint, moveDist, +5);
        if(moveTo){
            this.move(moveTo.x, moveTo.y);
        }
    };


    /**
     * Moves entity in the up direction
     *
     * @api public
     */
    PongMoves.prototype.moveUp = function(){
        var moveDist,nextPoint, moveTo;

        moveDist = this.getMoveDistance();
        nextPoint = this.calculateNextPoint(0, -5);
        moveTo = this.checkForCollision(nextPoint, moveDist, -5);
        if(moveTo){
            this.move(moveTo.x, moveTo.y);
        }
    };


    /**
     * Moves entity in the down direction
     *
     * @api public
     */
    PongMoves.prototype.moveDown = function(){
        var moveDist,nextPoint, moveTo;

        moveDist = this.getMoveDistance();
        nextPoint = this.calculateNextPoint(0, 5);
        moveTo = this.checkForCollision(nextPoint, moveDist, +5);
        if(moveTo){
            this.move(moveTo.x, moveTo.y);
        }
    };

    return PongMoves;
};